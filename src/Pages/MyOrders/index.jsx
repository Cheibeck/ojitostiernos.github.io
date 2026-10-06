import Layout from "../../Components/Layout"
import  OrdersCard  from "../../Components/OrdersCard"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import { Link } from "react-router-dom"


const MyOrders = () => {
  const context = useContext(ShoppingContext)
  return (
    <>
      <Layout>
        <div className="flex items-center justify-center relative w-80">
        
          <h1 className="font-medium text-xl">Mis Ordenes</h1>
          
        </div>
        {context.ordersError && <p role="alert">{context.ordersError}</p>}
        {!context.authToken && <p>Inicia sesión para consultar tus pedidos.</p>}
        {
          context.order.map((order) => (
            <Link key={order.id} to={`/MyOrders/${order.id}`}>
              <OrdersCard
                date={order.createdAt}
                totalPrice={order.totalPrice}
                totalProducts={order.totalProducts}
              />
            </Link>
          ))
        }
      </Layout>
    </>
  )
}

export default MyOrders
