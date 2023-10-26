import "./checkout.css"
import { GiCrossMark } from 'react-icons/gi'
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import OrderCard from "../OrderCard"
import { totalPrice } from "../../utils"
import { Link } from 'react-router-dom'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingContext)
    
    const handleDelete = (id) => {
        const filteredProducts = context.cart.filter(product => product.id != id)
        context.setCart(filteredProducts)
        context.setCount(context.count - 1)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: '01.02.23',
            products: context.cart,
            totalProducts: context.cart.length,
            totalPrice: totalPrice(context.cart)
        }
        if(Array.isArray(context.order)){
            context.setOrder([...context.order, orderToAdd])
        }else{
            context.setOrder(orderToAdd)
        }               
        
        context.setCount(context.count = 0)
        context.setCart([])
        context.setSearchByTitle(null)
    }

    return (
        <aside className={`${context.isCartOpen ? 'flex' : 'hidden'} checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className="flex justify-between items-center p-2">
                <h2 className="font-medium text-xl">Orden</h2>
                <span className="abolsolute cursor-pointer"
                      onClick={()=>context.cartClose()}
                ><GiCrossMark /></span>
            </div>
            <div className="px-2 overflow-y-scroll flex-1">
                {
            context.cart.map((product)=>(
                <OrderCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    imageURL={product.images}
                    price={product.price}
                    handleDelete={handleDelete}
                />
            ))
            }
            </div>
            <div className="px-6 mt-2 mb-6">
                <p className="flex justify-between items-center">
                    <span className="font-light">Total:</span>
                    <span className="font-medium text-xl">${totalPrice(context.cart)}</span>
                </p>
                <Link to={'/myOrders/last'}>
                    <button className='bg-black py-3 text-white w-full rounded-lg' onClick={()=>{handleCheckout();context.cartClose()}}>Checkout</button>
                </Link>
            </div>
            
        </aside>
    )
}

export default CheckoutSideMenu