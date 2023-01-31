import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navBar/NavBar'
import SideBar from '../../components/sidebar/SideBar'
import useOneUser from '../../Hooks/useOneUser'
import CardLastUser from '../../components/cards/cardLastUser'
import "./lastUser.css"
import { useParams } from 'react-router-dom'


const UserDetail = () => {
  const { userId } = useParams()
  console.log(userId)

  const { dataUser, isLoadingUser } = useOneUser(`https://shoemarket.fly.dev/api/users/detail/${userId}`)
  const {  user } = !!dataUser && dataUser;
  const [usuario, setUsuario] = useState("")
  
  
  useEffect(() => {
    
    if (dataUser) {
      setUsuario(user)
    }
  }, [dataUser, user])
  
 
  
  const { first_name, last_name, image, email, adress, date_of_birth,rol } = usuario

  // if (!id) {
  //   return (
  //     <Navigate to="/" />
  //   )
  // }


  return (
    <div className='home'>
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className='lastUser'>
        <CardLastUser 
       
            loading={isLoadingUser}
            img={image}
            name={`Nombre : ${first_name} ${last_name} `}
            email={`Correo : ${email}`}
            birth={`Fecha de Nacimiento : ${date_of_birth}`}
            address={`Direccion : ${adress}`}
            color= "#936d19"
            rol={`Rol : ${rol}`}
            

          />

        </div>




      </div>
    </div>
  )
}

export default UserDetail