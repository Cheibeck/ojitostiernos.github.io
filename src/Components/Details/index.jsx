import "./Details.css"
import { GiCrossMark } from 'react-icons/gi'
import { useContext } from "react"
import { ShoppingContext } from "../../Context"

const Details = () => {
    const context = useContext(ShoppingContext)
    
    return (
        <aside className={`${context.isDetailOpen ? 'flex' : 'hidden'} product-detail flex flex-col fixed border border-black rounded-lg bg-white overflow-y-scroll`}>
            <div className="flex justify-between items-center p-2">
                <h2 className="font-medium text-xl">Detalles</h2>
                <span className="abolsolute cursor-pointer"
                      onClick={()=>context.detailClose()}
                ><GiCrossMark /></span>
            </div>
            <figure className="px-6">
                <img 
                    src={context.product.images}
                    alt={context.product.title} 
                    className="w-full h-auto rounded-lg"
                />
            </figure>
            <p className="flex flex-col p-6">
                <span className="font-medium text-2xl mb-3">{context.product.title}</span>
                <span className="font-medium text-md mb-2">{context.product.description}</span>
                {/* <span className="font-medium text-xl">${context.product.price}</span> */}
            </p>
        </aside>
    )
}

export default Details