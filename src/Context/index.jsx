import { createContext, useState, useEffect } from "react";

export const ShoppingContext = createContext()

export const ShoppingProvider = ({ children }) => {
    //contador de shopping cart
    const [count, setCount] = useState(0)
    
    //apertura y cierre de detail
    const [isDetailOpen, setDetailOpen] = useState(false)
    const detailOpen = () => setDetailOpen(true)
    const detailClose = () => setDetailOpen(false)
    
    //mostrar imagenes en detail
    const [product, setProduct] = useState({})
    
    //carrito de compras
    const [cart, setCart] = useState([])
    const [isCartOpen, setCartOpen] = useState(false)
    const cartOpen = () => setCartOpen(true)
    const cartClose = () => setCartOpen(false)
    
    //shoping cart - order
    const [order, setOrder] = useState([])

    // get
    const [items, setItems] = useState([])
    // filtrado de items
    const [filteredItems, setFilteredItems] = useState(null)
    //get items by title
    const [searchByTitle, setSearchByTitle] = useState(null)
    // filtrado por categorias
    const [searchByCategory, setSearchByCategory] = useState(null)
    
    //DB
    const dataBase = 
    [
        {
          "id": 1,
          "title": "Nina",
          "price": 687,
          "description": "Amigurumi de compañera de Pocoyo",
          "category": {
            "id": 2,
            "name": "Amigurumis",
            "image": "https://i.postimg.cc/cCYqBQhm/20221205-175714.jpg"
          },
          "images": [
            "https://i.postimg.cc/d1BywGkf/My-project-1.png",
            "https://i.postimg.cc/hvt7jhVt/My-project-2.png"
          ]
        },
        {
            "id": 2,
            "title": "Pocoyo",
            "price": 687,
            "description": "Amigurumi de Pocoyo",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/WbX9hyPd/IMG-20220507-WA0003.jpg"
            },
            "images": [
              "https://i.postimg.cc/Bt9YcQjG/My-project-1.png",
              "https://i.postimg.cc/KjgpMgvN/My-project-2.png"
             
            ]
            
          },
          {
            "id": 3,
            "title": "Elsa",
            "price": 687,
            "description": "Amigurumi de Elsa de la pelicula animada Frozen",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/4x7XqLD0/IMG-20230313-WA0002.jpg"
            },
            "images": [
              "https://i.postimg.cc/SRg8srH5/My-project-1.png",
              "https://i.postimg.cc/wMqLgP4L/IMG-20230312-WA0006.jpg"
              
            ]
          },
          {
            "id": 4,
            "title": "Frida",
            "price": 687,
            "description": "Amigurumi de Frida Calo",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/br7m3wbF/20230123_175246.jpg"
            },
            "images": [
              "https://i.postimg.cc/wxnzS5Qn/20230107-160135.jpg",
              "https://i.postimg.cc/br7m3wbF/20230123_175246.jpg"
              
            ]
          },
          {
            "id": 5,
            "title": "Dinosaurios",
            "price": 687,
            "description": "Coleccion de Dinosaurios como suvenier",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/P5hgjSpV/20230213_161637.jpg"
            },
            "images": [
              "https://i.postimg.cc/P5hgjSpV/20230213_161637.jpg",
              "https://i.postimg.cc/gk3CQCJ6/20230213_161714.jpg",
              "https://i.postimg.cc/gj879hYP/20230213_161728.jpg"
            ]
          },
          {
            "id": 6,
            "title": "Jirafa",
            "price": 687,
            "description": "Amigurumi de animales Jirafa",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/269VgTg3/IMG-20230222-WA0003.jpg"
            },
            "images": [
              "https://i.postimg.cc/269VgTg3/IMG-20230222-WA0003.jpg",
              "https://i.postimg.cc/GtZ9mtLC/IMG-20230222-WA0004.jpg",
              "https://i.postimg.cc/SsX5r53R/20230123_175235.jpg",
              "https://i.postimg.cc/DZtNY63g/20230123_175229.jpg"
            ]
          },
          {
            "id": 7,
            "title": "Oveja",
            "price": 687,
            "description": "Llavero de oveja",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/bvpWgXPr/20230107-160110.jpg"
            },
            "images": [
              "https://i.postimg.cc/bvpWgXPr/20230107-160110.jpg",
              "https://i.postimg.cc/bwQ41yK4/20230107-160118.jpg"
            ]
          },
          {
            "id": 8,
            "title": "Muñeca Eli",
            "price": 687,
            "description": "amigurumi de muñeca de Eli, de la serie animada Pocoyo",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/gkYScW19/IMG-20221008-WA0016.jpg"
            },
            "images": [
              "https://i.postimg.cc/W3cD8KMg/IMG-20221008-WA0016.jpg",
              "https://i.postimg.cc/4djkc86y/20221205-175617.jpg",
              "https://i.postimg.cc/PxCnPG80/20221205-175654.jpg"
            ]
          },
          {
            "id": 9,
            "title": "Eli",
            "price": 687,
            "description": "amigurumi de Eli, de la serie animada Pocoyo",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/k5XmPRMJ/20221205-175641.jpg"
            },
            "images": [
              "https://i.postimg.cc/NjJCK33s/My-project-1.png",
              "https://i.postimg.cc/4djkc86y/20221205-175617.jpg"
            ]
          },
          {
            "id": 10,
            "title": "Oso",
            "price": 687,
            "description": "amigurumi de animalito OSO V1",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/wxn6VBGB/20230107-155743.jpg"
            },
            "images": [
              "https://i.postimg.cc/wxn6VBGB/20230107-155743.jpg",
              "https://i.postimg.cc/zvsPR6pJ/20230107-155750.jpg"
            ]
          },
          {
            "id": 11,
            "title": "Conejo",
            "price": 687,
            "description": "amigurumi de animalito Conejo",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/kM2JKSwZ/20230107-155805.jpg"
            },
            "images": [
              "https://i.postimg.cc/kM2JKSwZ/20230107-155805.jpg",
              "https://i.postimg.cc/QC9yChQ4/20230107-155815.jpg"
            ]
          },
          {
            "id": 12,
            "title": "Chancho",
            "price": 687,
            "description": "amigurumi de animalito Chancho",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/T30MZ2Cg/20230107-160733.jpg"
            },
            "images": [
              "https://i.postimg.cc/T30MZ2Cg/20230107-160733.jpg",
              "https://i.postimg.cc/xdsQbjmn/20230107-160812.jpg"
            ]
          },
          {
            "id": 13,
            "title": "OSO V2",
            "price": 687,
            "description": "amigurumi de animalito Osito v2",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/pLHRw6xb/IMG-20230107-WA0000.jpg"
            },
            "images": [
              "https://i.postimg.cc/pLHRw6xb/IMG-20230107-WA0000.jpg",
              "https://i.postimg.cc/k5M94RBT/IMG-20230107-WA0001.jpg"
            ]
          },
          {
            "id": 14,
            "title": "Elefante",
            "price": 687,
            "description": "amigurumi de animalito Elefante",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/05VxQ1x3/IMG-20230326-WA0003.jpg"
            },
            "images": [
              "https://i.postimg.cc/05VxQ1x3/IMG-20230326-WA0003.jpg",
              "https://i.postimg.cc/c46WtkLJ/IMG-20230326-WA0004.jpg"
            ]
          },
          {
            "id": 15,
            "title": "Pato",
            "price": 687,
            "description": "amigurumi de Pato de serie animada Pocoyo",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/3wSH8rWg/20221205-175722.jpg"
            },
            "images": [
              "https://i.postimg.cc/90ZY1Sg7/My-project-1.png",
              "https://i.postimg.cc/23RVpzZm/20211213-191415.jpg"
            ]
          },
          {
            "id": 16,
            "title": "Conejo V2",
            "price": 687,
            "description": "amigurumi de animalito Conejo v2",
            "category": {
              "id": 2,
              "name": "Amigurumis",
              "image": "https://i.postimg.cc/d1fV53Ty/20230225_114601.jpg"
            },
            "images": [
              "https://i.postimg.cc/d1fV53Ty/20230225_114601.jpg",
              "https://i.postimg.cc/9fRmrVkX/20230225_114619.jpg"
            ]
          },
    ];
    
    
    
    // useEffect(()=> {
    //           fetch('https://api.escuelajs.co/api/v1/products').then(response => response.json()).then(data => setItems(data))
    //         }, [])
    

      useEffect(() => {
        setItems(dataBase)    
      }, [])
    
    
    // useEffect(()=> {
    //      fetch('https://sa-east-1.aws.data.mongodb-api.com/app/data-jqhwe/endpoint/data/v1').then(data => setItems(data))
    //  }, [])


    //funcion filtrados
    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    //funcion filtrados por categoria
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
    
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if(searchType === 'BY_TITLE'){
            return filteredItemsByTitle(items, searchByTitle)
        }
        if(searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }
        if(searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if(!searchType){
            return items
        }
    }

    useEffect(()=> {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
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
            items,
            setItems,
            searchByTitle, 
            setSearchByTitle,
            filteredItems,
            searchByCategory, 
            setSearchByCategory,
            filteredItemsByCategory,
            
            
        }}>
        { children }
        </ShoppingContext.Provider>
    )
}

