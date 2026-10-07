import "./Details.css"
import { GiCrossMark } from 'react-icons/gi'
import { useContext } from "react"
import { ShoppingContext } from "../../Context"

const Details = () => {
    const context = useContext(ShoppingContext)
    
    return (
        <aside className={`${context.isDetailOpen ? 'flex' : 'hidden'} product-detail flex flex-col fixed border border-black rounded-lg bg-white overflow-y-scroll`}>
            <div className="detail-heading">
                <div>
                    <p className="eyebrow">Una pieza especial</p>
                    <h2>Detalles</h2>
                </div>
                <button
                    className="detail-close"
                    type="button"
                    onClick={() => context.detailClose()}
                    aria-label="Cerrar detalles"
                >
                    <GiCrossMark />
                </button>
            </div>
            <figure className="detail-image">
                <img 
                    src={Array.isArray(context.product.images) ? context.product.images[0] : context.product.images}
                    alt={context.product.title} 
                />
            </figure>
            <div className="detail-copy">
                <h3>{context.product.title}</h3>
                <p>{context.product.description}</p>
                <span className="detail-price">${context.product.price}</span>
            </div>
        </aside>
    )
}

export default Details