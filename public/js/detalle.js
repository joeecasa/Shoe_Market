window.addEventListener("DOMContentLoaded", function (event) {
    
    let agregarCarrito = document.querySelector(".agregar-carrito")
    const productId = agregarCarrito.getAttribute('data-id') //id del producto seleccionado
    const cartP = document.querySelector(".cart-p")
     const cartPXl = document.querySelector(".cart-p-xl")

   
        agregarCarrito.addEventListener("click", (event) => {
            event.target.classList.remove("form__button")
            event.target.classList.remove("btn-detail-view")
            event.target.classList.add("hover-agregando-detail")
            cargarAlCarrito(productId)
            cartP.classList.remove("cart-none")                    
           cartPXl.classList.remove("cart-none")  
         })
         agregarCarrito.addEventListener("mouseleave", (event) => {
              event.target.classList.add("form__button")
              event.target.classList.add("btn-detail-view")
              event.target.classList.remove("hover-agregando-detail")
         })
 
 
        })


function cargarAlCarrito(productId) {

     if (localStorage.getItem('platillos') === null) {

          const listProducts = []
          fetch(`http://localhost:4000/api/products/detail/${productId}`)
               .then((response) => response.json())
               .then((data) => {
                    listProducts.push(data.product)
                    localStorage.setItem("platillos", JSON.stringify(listProducts))
               })

     } 
     else 
           {   let aux = 0 
               let localStorageProduct = JSON.parse(localStorage.getItem("platillos")) 
               
               console.log("Este es productId " , productId)  
               
               for(let i=0; i<localStorageProduct.length; i++){
                    if(JSON.stringify(localStorageProduct[i].id) === productId){
                       JSON.stringify(localStorageProduct[i].quantity++)
                       //JSON.stringify(localStorageProduct[i].price)= JSON.stringify(localStorageProduct[i].price)*(JSON.stringify(localStorageProduct[i].quantity))
                       aux = 1
                       console.log("Encontrado")
                    }
               }                                                                                                                                
               if(aux === 1){
                    localStorage.setItem("platillos", JSON.stringify(localStorageProduct))
               }
                
               else{
                         fetch(`http://localhost:4000/api/products/detail/${productId}`)
                         .then((response) => response.json())
                         .then((data) => {
                         localStorageProduct.push(data.product)                                    
                         //localStorage.clear()
                         localStorage.setItem("platillos", JSON.stringify(localStorageProduct))
                         })
                    }
          }          
          

} //function leerDatosProducto(productId)  
    
 




    // function cargarEventListeners(event) {
    //           listaProductos.addEventListener("click", agregarProducto);                          
                        
    //         }


    // function agregarProducto(event) {
    //      event.preventDefault();
    //      // Delegation para agregar-carrito
    //      if (event.target.classList.contains('agregarCarrito')) {
    //           let curso = event.target.closest('.produc')//captura el contenedor padre
    //           //let curso = event.target.parentNode;//captura el contenedor padre
    //           // Enviamos el curso seleccionado para tomar sus datos
    //           const productId = curso.querySelector('.agregarCarrito').getAttribute('data-id') //id del producto seleccionado
    //           leerDatosProducto(productId);
    //      }
    // }

    // Lee los datos del curso
