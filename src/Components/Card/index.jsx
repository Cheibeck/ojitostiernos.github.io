import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import { HiPlus, HiCheck} from "react-icons/hi"
import "./card.css"

const Card = (data) => {
    const context = useContext(ShoppingContext)
    const showProduct = (productDetail) => {
        context.detailOpen()
        context.setProduct(productDetail)
        context.cartClose()
    }
    const addCart = (event, productData) => {
        event.stopPropagation()
        context.setCount(context.count + 1)
        context.setCart([...context.cart, productData])
        context.cartOpen()
        context.detailClose()
    }
    const renderIcon = (id) => {
        const isInCart = context.cart.filter(product => product.id === id).length > 0
        if (isInCart){
            return(
                <div 
                        className="absolute flex top-0 right-0 justify-center items-center bg-green-800 w-6 h-6 rounded-full m-2 p-1"
                >
                        <HiCheck className="text-white"/>
                        
                </div>
            )
        }else
            return(
                <div 
                        className="absolute flex top-0 right-0 justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
                        onClick={(event) => addCart(event, data.data)}>
                        <HiPlus />
                </div>
            )
        }


    return(
        <div 
        onClick={()=>showProduct(data.data)}
        className="card bg-white cursor-pointer rounded-lg">
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{data.data.category.name}</span>
                    <img className="w-full h-full object-cover rounded-lg object-top" src={data.data.images[0]} alt="product"></img>
                    {renderIcon(data.data.id)}
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light">{ data.data.title }</span>
                {/* <span className="text-sm font-medium">${ data.data.price }</span> */}
            </p>
        </div>
    )
}

export default Card