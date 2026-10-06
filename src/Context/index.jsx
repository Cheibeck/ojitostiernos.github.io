import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { apiRequest } from '../utils/api'

export const ShoppingContext = createContext()

const getStoredToken = () => window.localStorage.getItem('authToken')

export const ShoppingProvider = ({ children }) => {
  const [count, setCount] = useState(0)
  const [isDetailOpen, setDetailOpen] = useState(false)
  const [product, setProduct] = useState({})
  const [cart, setCart] = useState([])
  const [isCartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState([])
  const [items, setItems] = useState([])
  const [itemsError, setItemsError] = useState('')
  const [ordersError, setOrdersError] = useState('')
  const [authError, setAuthError] = useState('')
  const [isLoadingItems, setIsLoadingItems] = useState(true)
  const [filteredItems, setFilteredItems] = useState(null)
  const [searchByTitle, setSearchByTitle] = useState(null)
  const [searchByCategory, setSearchByCategory] = useState(null)
  const [authToken, setAuthToken] = useState(getStoredToken)
  const [user, setUser] = useState(null)

  const detailOpen = () => setDetailOpen(true)
  const detailClose = () => setDetailOpen(false)
  const cartOpen = () => setCartOpen(true)
  const cartClose = () => setCartOpen(false)

  useEffect(() => {
    let isMounted = true

    apiRequest('/api/products')
      .then((products) => {
        if (isMounted) setItems(products)
      })
      .catch((error) => {
        if (isMounted) setItemsError(error.message)
      })
      .finally(() => {
        if (isMounted) setIsLoadingItems(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    if (!authToken) {
      setUser(null)
      setOrder([])
      return () => {
        isMounted = false
      }
    }

    apiRequest('/api/me', { token: authToken })
      .then(({ user: currentUser }) => {
        if (isMounted) setUser(currentUser)
      })
      .catch((error) => {
        if (isMounted) {
          if (error.status === 401) {
            window.localStorage.removeItem('authToken')
            setAuthToken(null)
          } else {
            setAuthError(error.message)
          }
        }
      })

    apiRequest('/api/orders', { token: authToken })
      .then((orders) => {
        if (isMounted) setOrder(orders)
      })
      .catch((error) => {
        if (isMounted && error.status !== 401) setOrdersError(error.message)
      })

    return () => {
      isMounted = false
    }
  }, [authToken])

  const signIn = async (credentials, endpoint = '/api/auth/login') => {
    const { token, user: currentUser } = await apiRequest(endpoint, {
      method: 'POST',
      body: credentials,
    })
    window.localStorage.setItem('authToken', token)
    setAuthToken(token)
    setUser(currentUser)
    setAuthError('')
    setOrdersError('')
    return currentUser
  }

  const signOut = () => {
    window.localStorage.removeItem('authToken')
    setAuthToken(null)
    setUser(null)
    setOrder([])
    setAuthError('')
    setOrdersError('')
  }

  const createOrder = async () => {
    const createdOrder = await apiRequest('/api/orders', {
      method: 'POST',
      token: authToken,
      body: { productIds: cart.map((item) => item.id) },
    })
    setOrder((orders) => [createdOrder, ...orders])
    setCart([])
    setCount(0)
    setSearchByTitle(null)
    return createdOrder
  }

  const filteredItemsByTitle = (products, title) =>
    products.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()))

  const filteredItemsByCategory = (products, category) =>
    products.filter((item) => item.category.name.toLowerCase().includes(category.toLowerCase()))

  useEffect(() => {
    let nextItems = items
    if (searchByCategory) nextItems = filteredItemsByCategory(nextItems, searchByCategory)
    if (searchByTitle) nextItems = filteredItemsByTitle(nextItems, searchByTitle)
    setFilteredItems(nextItems)
  }, [items, searchByTitle, searchByCategory])

  return (
    <ShoppingContext.Provider value={{
      count,
      setCount,
      detailOpen,
      detailClose,
      isDetailOpen,
      product,
      setProduct,
      cart,
      setCart,
      isCartOpen,
      cartOpen,
      cartClose,
      setCartOpen,
      order,
      setOrder,
      createOrder,
      items,
      setItems,
      itemsError,
      ordersError,
      authError,
      isLoadingItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      searchByCategory,
      setSearchByCategory,
      filteredItemsByCategory,
      signIn,
      signOut,
      user,
      authToken,
    }}>
      {children}
    </ShoppingContext.Provider>
  )
}

ShoppingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
