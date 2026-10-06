
import PropTypes from 'prop-types'

const OrdersCard = props =>{
    
    const { date, totalPrice, totalProducts } = props
    const formattedDate = date ? new Date(date).toLocaleDateString() : ''

    return(
            <div className='flex justify-between items-center mb-4 border border-black w-80 p-4 rounded-lg'>
                <p className='flex justify-between w-full'>
                    <div className='flex flex-col'>
                        <span className='font-light'>{formattedDate}</span>
                        <span className='font-light'>{totalProducts} articulos</span>
                    </div>
                    <span className='font-medium text-2xl'>${totalPrice}</span>
                </p>
            </div>
    )
}

OrdersCard.propTypes = {
    date: PropTypes.string,
    totalPrice: PropTypes.number.isRequired,
    totalProducts: PropTypes.number.isRequired,
}

export default OrdersCard