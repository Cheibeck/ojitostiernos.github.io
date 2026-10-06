import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
  throw new Error('Configura MONGODB_URI y MONGODB_DB antes de importar los productos.')
}

const dataPath = new URL('../DB.json', import.meta.url)
const products = JSON.parse(await readFile(fileURLToPath(dataPath), 'utf8'))
if (!Array.isArray(products) || products.some((product) => !Number.isSafeInteger(product.id))) {
  throw new Error('DB.json debe contener un arreglo de productos con id entero.')
}

const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })

try {
  await client.connect()
  const collection = client.db(process.env.MONGODB_DB).collection('products')
  await collection.createIndex({ id: 1 }, { unique: true })
  const result = await collection.bulkWrite(
    products.map((product) => ({
      updateOne: {
        filter: { id: product.id },
        update: { $set: product },
        upsert: true,
      },
    })),
    { ordered: true },
  )
  console.log(
    `Importación terminada: ${result.upsertedCount} nuevos, ${result.modifiedCount} actualizados, ` +
    `${result.matchedCount} ya estaban al día.`,
  )
} finally {
  await client.close()
}
