window.addEventListener("DOMContentLoaded", function (event) {

     let listaProductos = document.querySelector('#main-home'); // home donde se muestra todos los productos
     let agregarCarrito = document.querySelectorAll(".agregarCarrito")
     const btns = document.querySelectorAll("button[data-id]")
     const cartP = document.querySelector(".cart-p")
     const cartPXl = document.querySelector(".cart-p-xl")
     const local = JSON.parse(localStorage.getItem("platillos"))


     let suma = 0

     if (local && local.length > 0) {
          local.forEach((producto) => {
                suma = suma + producto.quantity
           })

     }




   

     
     
     btns.forEach((btn) => {
          btn.addEventListener("click", (event) => {
               event.target.classList.remove("form__button")
               event.target.classList.remove("btn-productHome")
               event.target.classList.add("hover-agregando")
               cartP.classList.remove("cart-none")
               cartPXl.classList.remove("cart-none")
               
               


          })
          btn.addEventListener("mouseleave", (event) => {
               event.target.classList.add("form__button")
               event.target.classList.add("btn-productHome")
               event.target.classList.remove("hover-agregando")
          })





     })

     agregarCarrito.forEach(btnAgregarCarrito => {
          btnAgregarCarrito.addEventListener("click", cargarEventListeners)

     })

     function cargarEventListeners(event) {
          listaProductos.addEventListener("click", agregarProducto);


     }


     function agregarProducto(event) {

          // Delegation para agregar-carrito
          if (event.target.classList.contains('agregarCarrito')) {
               let curso = event.target.closest('.produc')//captura el contenedor padre
               //let curso = event.target.parentNode;//captura el contenedor padre
               // Enviamos el curso seleccionado para tomar sus datos
               const productId = curso.querySelector('.agregarCarrito').getAttribute('data-id') //id del producto seleccionado
               leerDatosProducto(productId);
          }
     }

     function leerDatosProducto(productId) {

          if (localStorage.getItem('platillos') === null) {

               const listProducts = []
               fetch(`https://shoemarket.fly.dev/api/products/detail/${productId}`)
                    .then((response) => response.json())
                    .then((data) => {
                         listProducts.push(data.product)
                         localStorage.setItem("platillos", JSON.stringify(listProducts))
                    })
                    suma  = 1
                    cartPXl.innerHTML = suma
                    
               }
               else {
                    let aux = 0
                    let localStorageProduct = JSON.parse(localStorage.getItem("platillos"))
                    
                    console.log("Este es productId ", productId)
                    suma = suma + 1
                    cartPXl.innerHTML = suma

               for (let i = 0; i < localStorageProduct.length; i++) {
                    if (JSON.stringify(localStorageProduct[i].id) === productId) {
                         JSON.stringify(localStorageProduct[i].quantity++)
                         //JSON.stringify(localStorageProduct[i].price)= JSON.stringify(localStorageProduct[i].price)*(JSON.stringify(localStorageProduct[i].quantity))
                         aux = 1
                         console.log("Encontrado")
                    }
               }
               if (aux === 1) {
                    localStorage.setItem("platillos", JSON.stringify(localStorageProduct))
               }

               else {
                    fetch(`https://shoemarket.fly.dev/api/products/detail/${productId}`)
                         .then((response) => response.json())
                         .then((data) => {
                              localStorageProduct.push(data.product)
                              //localStorage.clear()
                              localStorage.setItem("platillos", JSON.stringify(localStorageProduct))
                         })
               }
          }


     } //function leerDatosProducto(productId)  

}) //window.addEventListener("DOMContentLoaded", function (event)
