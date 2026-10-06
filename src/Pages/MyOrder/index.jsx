import Layout from "../../Components/Layout"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import OrderCard from "../../Components/OrderCard"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { GiHorizontalFlip } from 'react-icons/gi'

const MyOrder = () => {
  const context = useContext(ShoppingContext)
  const { id } = useParams()
  const currentOrder = id === 'last'
    ? context.order[0]
    : context.order.find((order) => order.id === id)
  const products = currentOrder?.products || []
  return (
    <>
      <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
          <Link to={"/MyOrders"} className="absolute left-0" > 
            <GiHorizontalFlip className="h-6 w-6 text-black cursor-pointer" />
          </Link>
          <h1 className="font-medium text-xl">Orden</h1>
          
        </div>
        <div className="flex flex-col w-100">
            
            
            {products.length > 0 ? products.map(product => (
                <OrderCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    imageURL={product.images}
                    price={product.price}
                />
            )) : <p>No se encontró el pedido.</p>}
            </div>
      </Layout>
    </>
  )
}

export default MyOrder
