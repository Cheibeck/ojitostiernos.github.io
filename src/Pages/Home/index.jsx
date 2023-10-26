import { useContext } from "react"
import Card from "../../Components/Card"
import Layout from "../../Components/Layout"
import Details from "../../Components/Details"
import "./home.css"
import { ShoppingContext } from "../../Context"

const Home = () => {
  const context = useContext(ShoppingContext)
  const renderView = () => {
    
      if(context.filteredItems?.length > 0){
          return(
            context.filteredItems?.map(item => (
              <Card key={item.id} data={item}/>
            )))
      }else{
        return(
          <div>No hay coincidencias</div>
        )
      }
    
  }
  return (
    <>
      <Layout>
        <div className="layout grid w-full max-w-screen-2xl">
            {renderView()}
        </div>
        <Details />
      </Layout>
    </>
  )
}

export default Home
