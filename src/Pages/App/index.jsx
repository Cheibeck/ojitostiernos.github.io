import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import Signin from '../Signin'
import Navbar from '../../Components/Navbar'
import { ShoppingProvider } from '../../Context'
import './App.css'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'


const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/Amigurumis', element: <Home /> },
    { path: '/Plantas', element: <Home /> },
    { path: '/Otros', element: <Home /> },
    { path: '/MyAccount', element: <MyAccount /> },
    { path: '/MyOrder', element: <MyOrder /> },
    { path: '/MyOrders/last', element: <MyOrder /> },
    { path: '/MyOrders/:id', element: <MyOrder /> },
    { path: '/MyOrders', element: <MyOrders /> },
    { path: '/*', element: <NotFound /> },
    { path: '/Signin', element: <Signin /> },
  ])
  return routes
}

function App() {
  return (
    <ShoppingProvider>
        <BrowserRouter>
          <AppRoutes />
          <Navbar />
          <CheckoutSideMenu />
        </BrowserRouter>
    </ShoppingProvider>
  )
}

export default App
