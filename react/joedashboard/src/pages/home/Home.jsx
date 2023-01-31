import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navBar/NavBar'
import SideBar from '../../components/sidebar/SideBar'
import Card from '../../components/cards/Card'
import "./home.css"
import useAllProducts from "../../Hooks/useAllProducts"
import useAllUsers from '../../Hooks/useAllUsers'
import CardLastUser from '../../components/cards/cardLastUser'
import CardLastProduct from '../../components/cards/CardLastProduct'



const Home = () => {
  const { dataProducts, isLoadingProducts } = useAllProducts("https://shoemarket.fly.dev/api/products")
  const { countProduts, products, countByCategory } = !!dataProducts && dataProducts;
  const [lastProduct, setlastProduct] = useState("")
  const { description, name,img } = lastProduct
  const [categoryProd, setCategoryProd] = useState("")
  const [qcategoryProd, setqcategoryProd] = useState("")


  const { dataUsers, isLoadingUsers } = useAllUsers("https://shoemarket.fly.dev/api/users")
  const { count, users } = !!dataUsers && dataUsers;
  const [lastUser, setlastUser] = useState("")
  const { first_name, last_name, image, email, adress, date_of_birth } = lastUser
  const [rolUser, setRolUser] = useState("")


  useEffect(() => {

    if (dataUsers) {
      setlastUser(users[users.length - 1])

    }


  }, [dataUsers, users, lastUser.img, image])

  useEffect(() => {

    if (lastUser) {
      setRolUser(lastUser.roles.name)

    }

  },[lastUser])




  useEffect(() => {

    if (dataProducts) {
      setlastProduct(products[products.length - 1])

    }


  }, [products, dataProducts, lastProduct.img, lastProduct])
  useEffect(() => {

    if (lastProduct) {
      setCategoryProd(lastProduct.categorias.name)

    }


  }, [lastProduct])

  useEffect(() => {

    if (dataProducts) {
      const obj = Object.keys(countByCategory)
      setqcategoryProd(obj.length)
    }


  }, [dataProducts, countByCategory])





  return (
    <div className='home'>
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className="cards-container">
          <Card
            title="Productos activos"
            loading={isLoadingProducts}
            quantity={countProduts}
            link="products"
            color="rgb(90 34 130)"

          />
          <Card
            title="Categorias"
            loading={isLoadingProducts}
            link="products/category"
            quantity={qcategoryProd}
            color="rgb(90 34 130)"

          />

          <Card title="Usuarios activos"
            loading={isLoadingUsers}
            quantity={count}
            link="users"
            color="rgb(90 34 130)"


          />
        </div>
        <div className='last-container'>

          <CardLastUser title="Ultimo usuario creado"
            loading={isLoadingUsers}
            link="users/lastUser"
            img={image}
            name={`Nombre : ${first_name} ${last_name} `}
            email={`Correo : ${email}`}
            birth={`Fecha de Nacimiento : ${date_of_birth}`}
            address={`Direccion : ${adress}`}
            color="rgb(90 34 130)"
            rol={`Rol : ${rolUser}`}


          />
          <CardLastProduct
            title="Ultimo producto creado"
            loading={isLoadingProducts}
            img={img}
            link="products/lastProduct"
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

export default Home