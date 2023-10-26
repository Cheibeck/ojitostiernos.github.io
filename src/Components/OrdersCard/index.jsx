
const OrdersCard = props =>{
    
    const { totalPrice, totalProducts } = props      

    return(
            <div className='flex justify-between items-center mb-4 border border-black w-80 p-4 rounded-lg'>
                <p className='flex justify-between w-full'>
                    <div className='flex flex-col'>
                        <span className='font-light'>01.02.23</span>
                        <span className='font-light'>{totalProducts} articulos</span>
                    </div>
                    <span className='font-medium text-2xl'>${totalPrice}</span>
                </p>
            </div>
    )
}

export default OrdersCard