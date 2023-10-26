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
        {
          context.order.map((order, index) => (
            <Link key={index} to={`/MyOrders/${index}`}>
              <OrdersCard totalPrice={order.totalPrice} totalProducts={order.totalProducts} />             
            </Link>
          ))
        }
      </Layout>
    </>
  )
}

export default MyOrders
