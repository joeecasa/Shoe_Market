import { useState } from "react";
import { useEffect } from "react";
import "./list.css"
import useAllProducts from "../../Hooks/useAllProducts";
import SideBar from '../../components/sidebar/SideBar';
import NavBar from '../../components/navBar/NavBar';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";




export default function UserList() {
  const { dataProducts, isLoadingProducts } = useAllProducts("http://localhost:4000/api/products")
  const { products, countByCategory } = !!dataProducts && dataProducts;
  const [arrayProducts, setArrayProducts] = useState("")

  const [ImglastProduct, setImglastProduct] = useState("")
  const urlImgProducto = "http://localhost:4000/img/products/"


  


  useEffect(() => {
    if (dataProducts) {
      setArrayProducts(products)
    }

  }, [products,dataProducts])






  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'category', headerName: 'Categoria', width: 150 },
    {
      field: '', headerName: 'Foto', width: 150, renderCell: (params) => {
        return (
          <div className="row-img">
            <img className="productListImg" src={ urlImgProducto + params.row.img} alt="" />
          </div>
        )
      }
    },
    {
      field: 'detail', headerName: 'Detalle', width: 100, renderCell: (params) => {
        return (
          
          <Link to={`/products/${params.id}`}>
            <button className="userListDetail">Detalle</button>
          </Link>
           
        )
      }
    },
    {
      field: 'Edit', headerName: 'Editar', width: 100, renderCell: () => {
        return (
          
          <Link to="/products ">
            <button className="userListEdit">Editar</button>
          </Link>
            
        )
      }
    },
    {
      field: 'Delete', headerName: 'Borrar', width: 100, renderCell: () => {
        return (
          
          <Link to="/ ">
            <button className="userListDelete">Borrar</button>
          </Link>
            
        
        )
      }
    },
  ];







  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div className="list-container"  >
          <DataGrid
           rows={arrayProducts} disableSelectionOnClick
           columns={columns} pageSize={10}
           rowsPerPageOptions={[1]}
           rowHeight={150}
          />
        </div>
      </div>
    </div>


  )
}