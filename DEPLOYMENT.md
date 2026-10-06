# Despliegue

El frontend se publica como sitio de proyecto en GitHub Pages:
<https://cheibeck.github.io/ojitostiernos.github.io/>. La API Node/Express se
despliega como Web Service en Render y usa MongoDB Atlas. El frontend y la API
son despliegues independientes. La API nunca expone la URI de MongoDB ni el
secreto JWT al navegador.

## Configuración de MongoDB Atlas

1. Crea una base de datos y un usuario de base de datos con acceso únicamente a
   esa base.
2. En la configuración de red de Atlas, permite las direcciones IP salientes
   del servicio de Render.
3. Conserva la URI de conexión como secreto; no la guardes en el frontend ni en
   el repositorio.

### Importar los productos

Para importar o actualizar productos desde `DB.json` en un entorno local:

1. Copia `.env.example` a `.env` y completa `MONGODB_URI`, `MONGODB_DB` y
   `JWT_SECRET`. El secreto JWT debe tener al menos 32 caracteres aleatorios.
2. Ejecuta `npm run seed`. El importador hace upsert por `id`, de modo que se
   puede volver a ejecutar sin duplicar los productos.

## API en Render

Crea un **Web Service** conectado al repositorio con la raíz del proyecto:

- Build Command: `npm install`
- Start Command: `npm start`

Configura estas variables de entorno en Render:

| Variable | Valor |
| --- | --- |
| `MONGODB_URI` | URI privada de conexión de MongoDB Atlas |
| `MONGODB_DB` | Nombre de la base, por ejemplo `ojitos_tiernos` |
| `JWT_SECRET` | Secreto aleatorio de al menos 32 caracteres |
| `FRONTEND_ORIGIN` | `https://cheibeck.github.io` (sin ruta ni barra final) |

Se pueden indicar varios orígenes en `FRONTEND_ORIGIN`, separados por comas.
Después de cambiar las variables, espera a que Render reinicie el servicio.

La ruta `GET /` no sirve una página web y puede responder `Cannot GET /`; eso es
normal. Comprueba el estado de la API en `GET /api/health`, que debe responder
`{"status":"ok"}`. `GET /api/products` devuelve el catálogo.

## Frontend en GitHub Pages

1. En la configuración del repositorio, abre **Settings → Pages** y selecciona
   **GitHub Actions** como fuente.
2. En **Settings → Secrets and variables → Actions → Variables**, crea la
   variable de repositorio `VITE_API_URL` con la URL HTTPS pública de Render,
   sin barra final (por ejemplo, `https://nombre-del-servicio.onrender.com`).
3. Sube los cambios a la rama `ghp`. El workflow
   [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) instala
   dependencias, construye el frontend y lo publica automáticamente.

El workflow construye el frontend con la ruta base del sitio de proyecto
`/ojitostiernos.github.io/`. `public/404.html` permite que las rutas internas de
React Router funcionen al abrirlas directamente o al recargar la página.

## Desarrollo local

1. Copia `.env.example` a `.env`. Para la API local, configura
   `FRONTEND_ORIGIN=http://localhost:5173` y `VITE_API_URL=http://localhost:3000`.
2. Ejecuta `npm run dev` y `npm start` en terminales separadas.
3. No subas `.env` al repositorio.

La API crea las colecciones e índices al iniciar. Incluye registro e inicio de
sesión por correo y contraseña, lectura pública de productos y pedidos ligados
a la cuenta autenticada. El precio de los pedidos se calcula con el catálogo de
MongoDB, no con los precios enviados por el navegador.

## Solución de problemas

- **GitHub Actions falla en “Verify API URL”:** comprueba que `VITE_API_URL`
  esté creada como variable del repositorio y no como secreto.
- **La web carga, pero no obtiene productos o falla CORS:** verifica que
  `VITE_API_URL` tenga la URL HTTPS correcta de Render y que
  `FRONTEND_ORIGIN` en Render sea exactamente `https://cheibeck.github.io`.
  Vuelve a ejecutar el workflow si cambias `VITE_API_URL`.
- **La API no inicia o devuelve errores de base de datos:** revisa los logs de
  Render y valida la URI, las credenciales, el nombre de la base y la lista de
  IP permitidas en Atlas.
- **El sitio muestra `Cannot GET /`:** asegúrate de abrir la URL de GitHub Pages
  (no la raíz de Render). En Render, usa `/api/health` para comprobar la API.
