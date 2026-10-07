import { useContext } from "react"
import PropTypes from "prop-types"
import { ShoppingContext } from "../../Context"
import { HiPlus, HiCheck } from "react-icons/hi"
import "./card.css"

const Card = ({ data }) => {
    const context = useContext(ShoppingContext)
    const isInCart = context.cart.some((product) => product.id === data.id)

    const showProduct = () => {
        context.detailOpen()
        context.setProduct(data)
        context.cartClose()
    }

    const addCart = (event) => {
        event.stopPropagation()
        if (isInCart) return
        context.setCount(context.count + 1)
        context.setCart([...context.cart, data])
        context.cartOpen()
        context.detailClose()
    }

    return (
        <article
            className="product-card"
            onClick={showProduct}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    showProduct()
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Ver detalles de ${data.title}`}
        >
            <figure className="product-image">
                <img src={data.images[0]} alt={data.title} loading="lazy" />
                <span className="product-category">{data.category.name}</span>
                <button
                    className={`add-to-cart${isInCart ? " added" : ""}`}
                    type="button"
                    onClick={addCart}
                    disabled={isInCart}
                    aria-label={isInCart ? `${data.title} ya está en la bolsa` : `Agregar ${data.title} a la bolsa`}
                >
                    {isInCart ? <HiCheck aria-hidden="true" /> : <HiPlus aria-hidden="true" />}
                </button>
            </figure>
            <div className="product-card-info">
                <h3>{data.title}</h3>
                <span className="product-price">${data.price}</span>
            </div>
            <p className="product-card-hint">Ver pieza <span aria-hidden="true">↗</span></p>
        </article>
    )
}

Card.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        category: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export default Card
