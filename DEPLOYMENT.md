# Migración a MongoDB Atlas y Render

El frontend continúa como sitio estático en GitHub Pages. La API Node/Express se
despliega como Web Service en Render y usa MongoDB Atlas. La API nunca expone la
URI de MongoDB ni el secreto JWT al navegador.

## Importar los productos existentes

1. Crea una base de datos en MongoDB Atlas y un usuario de base de datos con
   acceso únicamente a esa base. Restringe el acceso de red de Atlas a las IP
   salientes del servicio de Render.
2. Copia `.env.example` a `.env` y completa `MONGODB_URI` y `MONGODB_DB`.
   Genera `JWT_SECRET` con un valor aleatorio de al menos 32 caracteres.
3. Ejecuta `npm run seed`. El importador lee `DB.json` y hace upsert por `id`,
   por lo que volver a ejecutarlo actualiza los productos existentes sin
   duplicarlos.

## Desplegar la API en Render

1. Crea un Web Service conectado al repositorio; usa el directorio raíz, el
   comando de build `npm install` y el comando de inicio `npm start`.
2. Configura en Render `MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET` y
   `FRONTEND_ORIGIN`. Para este sitio, incluye
   `https://www.ojitostiernos.com.ar` (sin ruta final); admite varios orígenes
   separados por comas.
3. Configura `VITE_API_URL` con la URL HTTPS pública de la API al compilar el
   frontend. GitHub Pages debe compilarlo con esa variable disponible.

Para desarrollo local, `FRONTEND_ORIGIN` debe incluir `http://localhost:5173`,
`VITE_API_URL` debe ser `http://localhost:3000`, y se ejecuta `npm run dev` y
`npm start` en terminales separadas. No subas `.env` al repositorio.

La API crea las colecciones e índices al iniciar. Incluye registro e inicio de
sesión por correo y contraseña, pedidos asociados a la cuenta autenticada y
lectura pública de productos. Los pedidos calculan su precio usando el catálogo
de MongoDB, no los precios enviados por el navegador.
