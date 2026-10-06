# Ojitos Tiernos

Tienda web de Ojitos Tiernos. El frontend está construido con React y Vite; la
API Node/Express utiliza MongoDB Atlas para productos, cuentas y pedidos.

## Sitio publicado

- **Tienda:** <https://cheibeck.github.io/ojitostiernos.github.io/>
- **API:** Web Service en Render
- **Productos:** `GET /api/products`
- **Estado de la API:** `GET /api/health`

El frontend y la API se despliegan por separado. La raíz del servicio de Render
no es una página web; `Cannot GET /` es esperado. Consulta
[DEPLOYMENT.md](./DEPLOYMENT.md) para la configuración completa de Atlas,
Render, GitHub Pages, variables y desarrollo local.

## Desarrollo

Requiere Node.js 18 o posterior.

```sh
npm install
npm run dev
```

Para usar funciones que requieren la API local, copia `.env.example` a `.env`,
completa las credenciales de MongoDB Atlas, configura `VITE_API_URL` como
`http://localhost:3000` y `FRONTEND_ORIGIN` como `http://localhost:5173`. Luego
inicia la API en otra terminal:

```sh
npm start
```

No guardes ni publiques `.env`, credenciales de MongoDB o secretos JWT.

## Despliegue

Cada push a la rama `ghp` ejecuta GitHub Actions y publica el frontend en GitHub
Pages. La variable de repositorio `VITE_API_URL` debe apuntar a la URL HTTPS
pública de Render. Render necesita `MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET` y
`FRONTEND_ORIGIN`. Los pasos detallados y la solución de problemas están en
[la guía de despliegue](./DEPLOYMENT.md).
