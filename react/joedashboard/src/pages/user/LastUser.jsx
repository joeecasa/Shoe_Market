import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navBar/NavBar'
import SideBar from '../../components/sidebar/SideBar'
import useAllUsers from '../../Hooks/useAllUsers'
import CardLastUser from '../../components/cards/cardLastUser'
import "./lastUser.css"


const LastUser = () => {
  const { dataUsers, isLoadingUsers } = useAllUsers("https://shoemarket.fly.dev/api/users")
  const {  users } = !!dataUsers && dataUsers;
  const [lastUser, setlastUser] = useState("")
  const [rolUser, setRolUser] = useState("")

  const { first_name, last_name, image, email, adress, date_of_birth } = lastUser
  
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

  return (
    <div className='home'>
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className='lastUser'>
        <CardLastUser title="Ultimo usuario creado"
            loading={isLoadingUsers}
            img={image}
            name={`Nombre : ${first_name} ${last_name} `}
            email={`Correo : ${email}`}
            birth={`Fecha de Nacimiento : ${date_of_birth}`}
            address={`Direccion : ${adress}`}
            color= "#936d19"
            rol={`Rol : ${rolUser}`}
            

          />

        </div>




      </div>
    </div>
  )
}

export default LastUser