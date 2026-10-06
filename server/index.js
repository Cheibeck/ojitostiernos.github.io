import 'dotenv/config'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb'

const requiredEnvironment = ['MONGODB_URI', 'MONGODB_DB', 'JWT_SECRET', 'FRONTEND_ORIGIN']
const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name])
if (missingEnvironment.length) {
  throw new Error(`Faltan variables de entorno: ${missingEnvironment.join(', ')}`)
}
if (process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET debe tener al menos 32 caracteres.')
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
})
const allowedOrigins = new Set(process.env.FRONTEND_ORIGIN.split(',').map((origin) => origin.trim()))
const asyncRoute = (handler) => (request, response, next) =>
  Promise.resolve(handler(request, response, next)).catch(next)
const publicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
})

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true)
    return callback(new Error('Origen no permitido por CORS.'))
  },
}))
app.use(express.json({ limit: '32kb' }))

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (request, response) =>
    response.status(429).json({ error: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.' }),
})

const getDatabase = () => client.db(process.env.MONGODB_DB)

const createToken = (user) => jwt.sign(
  { sub: user._id.toString() },
  process.env.JWT_SECRET,
  { expiresIn: '7d' },
)

const requireUser = asyncRoute(async (request, response, next) => {
  const authorization = request.get('authorization') || ''
  const [scheme, token] = authorization.split(' ')
  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({ error: 'Inicia sesión para continuar.' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof payload.sub !== 'string' || !ObjectId.isValid(payload.sub)) {
      return response.status(401).json({ error: 'Sesión inválida.' })
    }
    request.user = await getDatabase().collection('users').findOne(
      { _id: new ObjectId(payload.sub) },
      { projection: { passwordHash: 0 } },
    )
    if (!request.user) return response.status(401).json({ error: 'La cuenta ya no existe.' })
    return next()
  } catch (error) {
    if (!(error instanceof jwt.JsonWebTokenError) && !(error instanceof jwt.TokenExpiredError)) {
      throw error
    }
    return response.status(401).json({ error: 'Sesión inválida o vencida.' })
  }
})

app.get('/api/health', (request, response) => response.json({ status: 'ok' }))

app.get('/api/products', asyncRoute(async (request, response) => {
  const products = await getDatabase().collection('products').find().sort({ id: 1 }).toArray()
  response.json(products.map(({ _id, ...product }) => product))
}))

app.post('/api/auth/register', authLimiter, asyncRoute(async (request, response) => {
  const body = request.body || {}
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  if (name.length < 2 || name.length > 80) {
    return response.status(400).json({ error: 'El nombre debe tener entre 2 y 80 caracteres.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return response.status(400).json({ error: 'Ingresa un correo válido.' })
  }
  if (password.length < 10 || password.length > 128) {
    return response.status(400).json({ error: 'La contraseña debe tener entre 10 y 128 caracteres.' })
  }

  const users = getDatabase().collection('users')
  const user = { name, email, passwordHash: await bcrypt.hash(password, 12), createdAt: new Date() }
  try {
    const result = await users.insertOne(user)
    user._id = result.insertedId
  } catch (error) {
    if (error.code === 11000) return response.status(409).json({ error: 'Ese correo ya tiene una cuenta.' })
    throw error
  }

  response.status(201).json({ token: createToken(user), user: publicUser(user) })
}))

app.post('/api/auth/login', authLimiter, asyncRoute(async (request, response) => {
  const body = request.body || {}
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  const user = await getDatabase().collection('users').findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return response.status(401).json({ error: 'Correo o contraseña incorrectos.' })
  }
  response.json({ token: createToken(user), user: publicUser(user) })
}))

app.get('/api/me', requireUser, (request, response) => {
  response.json({ user: publicUser(request.user) })
})

app.get('/api/orders', requireUser, asyncRoute(async (request, response) => {
  const orders = await getDatabase().collection('orders')
    .find({ userId: request.user._id })
    .sort({ createdAt: -1 })
    .toArray()
  response.json(orders.map(({ _id, ...order }) => ({ ...order, id: _id.toString() })))
}))

app.post('/api/orders', requireUser, asyncRoute(async (request, response) => {
  const productIds = request.body?.productIds
  if (!Array.isArray(productIds) || productIds.length < 1 || productIds.length > 50 ||
      productIds.some((id) => !Number.isSafeInteger(id) || id < 1)) {
    return response.status(400).json({ error: 'El pedido debe tener entre 1 y 50 productos válidos.' })
  }

  const products = await getDatabase().collection('products')
    .find({ id: { $in: [...new Set(productIds)] } })
    .toArray()
  const productsById = new Map(products.map((product) => [product.id, product]))
  if (productIds.some((id) => !productsById.has(id))) {
    return response.status(400).json({ error: 'Uno o más productos ya no están disponibles.' })
  }

  const orderProducts = productIds.map((id) => {
    const { _id, ...product } = productsById.get(id)
    return product
  })
  const order = {
    userId: request.user._id,
    products: orderProducts,
    totalProducts: orderProducts.length,
    totalPrice: orderProducts.reduce((total, product) => total + product.price, 0),
    createdAt: new Date(),
  }
  const result = await getDatabase().collection('orders').insertOne(order)
  response.status(201).json({ ...order, id: result.insertedId.toString() })
}))

app.use('/api', (request, response) =>
  response.status(404).json({ error: 'Ruta de API no encontrada.' }),
)

app.use((error, request, response, next) => {
  console.error('Error interno de API:', error.name, error.code || 'sin código')
  if (response.headersSent) return next(error)
  if (error.message === 'Origen no permitido por CORS.') {
    return response.status(403).json({ error: error.message })
  }
  if (error.type === 'entity.parse.failed') {
    return response.status(400).json({ error: 'El cuerpo de la solicitud no es JSON válido.' })
  }
  if (error.type === 'entity.too.large') {
    return response.status(413).json({ error: 'La solicitud supera el tamaño permitido.' })
  }
  return response.status(500).json({ error: 'Error interno del servidor.' })
})

const start = async () => {
  await client.connect()
  const database = getDatabase()
  await Promise.all([
    database.collection('users').createIndex({ email: 1 }, { unique: true }),
    database.collection('products').createIndex({ id: 1 }, { unique: true }),
    database.collection('orders').createIndex({ userId: 1, createdAt: -1 }),
  ])
  const port = Number(process.env.PORT) || 3000
  app.listen(port, '0.0.0.0', () => console.log(`API escuchando en el puerto ${port}`))
}

start().catch((error) => {
  console.error('No se pudo iniciar la API:', error.name, error.code || 'sin código')
  process.exitCode = 1
})
