import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navBar/NavBar'
import SideBar from '../../components/sidebar/SideBar'
import "./lastProduct.css"
import useAllProducts from "../../Hooks/useAllProducts"
import CardLastProduct from '../../components/cards/CardLastProduct'

const LastProduct = () => {
  const { dataProducts, isLoadingProducts } = useAllProducts("https://shoemarket.fly.dev/api/products")
  const { products } = !!dataProducts && dataProducts;
  const [lastProduct, setlastProduct] = useState("")
  // const [ImglastProduct, setImglastProduct] = useState("")
  // const urlImgProducto = "https://shoemarket.herokuapp.com/img/products/"
  const { description, name,img } = lastProduct
  const [categoryProd, setCategoryProd] = useState("")
 



  useEffect(() => {

    if (dataProducts) {
      setlastProduct(products[products.length - 1])
      // setImglastProduct(urlImgProducto + lastProduct.img)

    }


  }, [products, dataProducts, lastProduct.img, lastProduct])
  useEffect(() => {

    if (lastProduct) {
      setCategoryProd(lastProduct.categorias.name)

    }


  }, [lastProduct])



  return (

    <div className='home'>
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className='lastProduct'>
          <CardLastProduct
            title="Ultimo producto creado"
            loading={isLoadingProducts}
            img={img}
            name={`Nombre : ${name}`}
            color="rgb(90 34 130)"
            description={`Descripcion : ${description}`}
            categoria={`Categoria : ${categoryProd}`}


          />
        </div>
      </div>
    </div>
  )
}

export default LastProduct