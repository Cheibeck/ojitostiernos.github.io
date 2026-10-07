import { useContext } from "react"
import Card from "../../Components/Card"
import Layout from "../../Components/Layout"
import Details from "../../Components/Details"
import "./home.css"
import { ShoppingContext } from "../../Context"

const Home = () => {
  const context = useContext(ShoppingContext)
  const category = context.searchByCategory

  const renderView = () => {
    if (context.isLoadingItems) {
      return <p className="catalog-message">Preparando el catálogo...</p>
    }
    if (context.itemsError) {
      return <p className="catalog-message error-message" role="alert">{context.itemsError}</p>
    }
    if (context.filteredItems?.length > 0) {
      return context.filteredItems.map((item) => (
        <Card key={item.id} data={item} />
      ))
    }
    return (
      <div className="empty-catalog">
        <span aria-hidden="true">♡</span>
        <h3>No encontramos coincidencias</h3>
        <p>Prueba con otra búsqueda o explora todas nuestras piezas.</p>
        <button
          type="button"
          onClick={() => {
            context.setSearchByTitle("")
            context.setSearchByCategory(null)
          }}
        >
          Ver todos los productos
        </button>
      </div>
    )
  }

  return (
    <>
      <Layout>
        <main className="storefront">
          <section className="welcome-banner">
            <div className="welcome-copy">
              <p className="eyebrow">Pequeñas piezas, grandes historias</p>
              <h1>Hecho a mano.<br /><em>Hecho para querer.</em></h1>
              <p className="welcome-description">
                Creaciones únicas tejidas con paciencia y mucho cariño, para regalar o llenar de ternura tus espacios.
              </p>
              <a className="welcome-link" href="#catalogo">
                Explorar colección <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="welcome-art" aria-hidden="true">
              <span className="art-stitch stitch-one" />
              <span className="art-stitch stitch-two" />
              <span className="art-flower">✿</span>
              <span className="art-caption">una puntada<br />a la vez</span>
            </div>
          </section>

          <section className="catalog" id="catalogo">
            <div className="catalog-heading">
              <div>
                <p className="eyebrow">Descubre algo especial</p>
                <h2>{category || "Nuestra colección"}</h2>
              </div>
              <p className="product-count">
                {context.isLoadingItems ? " " : `${context.filteredItems?.length || 0} piezas`}
              </p>
            </div>
            <div className="product-grid">
              {renderView()}
            </div>
          </section>
        </main>
        <Details />
      </Layout>
    </>
  )
}

export default Home
