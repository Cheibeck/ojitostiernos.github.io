/**
 * funcion parametrizada suma el total de productos en el carrito de compras
 * @param {Array} products cartproduct es un array de objetos
 * @returns {Number} total price
 */
export const totalPrice = (products) => {
    let sum = 0
    products.forEach(product => sum += product.price)
    return sum
}
