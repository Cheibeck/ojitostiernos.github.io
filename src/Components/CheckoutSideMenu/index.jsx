import "./checkout.css"
import { GiCrossMark } from 'react-icons/gi'
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import OrderCard from "../OrderCard"
import { totalPrice } from "../../utils"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingContext)
    const navigate = useNavigate()
    const [checkoutError, setCheckoutError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const handleDelete = (id) => {
        const filteredProducts = context.cart.filter(product => product.id != id)
        context.setCart(filteredProducts)
        context.setCount(filteredProducts.length)
    }

    const handleCheckout = async () => {
        if (!context.authToken) {
            setCheckoutError('Inicia sesión para guardar tu pedido.')
            return
        }

        setIsSubmitting(true)
        setCheckoutError('')
        try {
            await context.createOrder()
            context.cartClose()
            navigate('/MyOrders/last')
        } catch (error) {
            setCheckoutError(error.message)
        } finally {
            setIsSubmitting(false)
        }               
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
                {checkoutError && (
                    <p role="alert" className="my-2 text-sm text-red-700">
                        {checkoutError}{' '}
                        {!context.authToken && <Link className="underline" to="/Signin">Iniciar sesión</Link>}
                    </p>
                )}
                <button
                    className='bg-black py-3 text-white w-full rounded-lg disabled:opacity-50'
                    disabled={isSubmitting || context.cart.length === 0}
                    onClick={handleCheckout}
                >
                    {isSubmitting ? 'Guardando pedido…' : 'Checkout'}
                </button>
            </div>
            
        </aside>
    )
}

export default CheckoutSideMenu