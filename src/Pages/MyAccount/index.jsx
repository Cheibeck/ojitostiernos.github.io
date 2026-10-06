
import Layout from "../../Components/Layout"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingContext } from "../../Context"

const MyAccount = () => {
  const context = useContext(ShoppingContext)
  const navigate = useNavigate()

  return (
    <>
      <Layout>
        <section className="flex w-80 flex-col gap-4">
          <h1 className="text-center text-xl font-medium">Mi cuenta</h1>
          {context.authError && <p role="alert">{context.authError}</p>}
          {context.user ? (
            <>
              <p>{context.user.name}</p>
              <p>{context.user.email}</p>
              <Link className="underline" to="/MyOrders">Ver mis pedidos</Link>
              <button
                className="bg-black py-3 text-white"
                onClick={() => {
                  context.signOut()
                  navigate('/')
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <p role="alert">
              Inicia sesión para ver tu cuenta. <Link className="underline" to="/Signin">Iniciar sesión</Link>
            </p>
          )}
        </section>
      </Layout>
    </>
  )
}

export default MyAccount
