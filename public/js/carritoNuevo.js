
window.addEventListener("DOMContentLoaded", function (event) {


    const local = JSON.parse(localStorage.getItem("platillos"))
    const tablaCarrito = document.querySelector(".tabla-carrito")
    const totalPrice = document.querySelector(".contenedor-total__price")
    const primeraPärte = document.querySelector(".primer-parte-carrito")
    


  
   
    if (local && local.length > 0) {

        local.forEach(producto => {
            if (producto.price === null) {
                localStorage.clear()
                window.location.reload()
            } else {

                tablaCarrito.innerHTML +=
                    `<div class="div-tabla">` +
                    `<div class="div-columna-img">` +
                    `<img src=${producto.img} >` +
                    "</div>" + 
                    `<div class="div-colmuna-nombre div-fila-carrito">` +
                    producto.name +
                    "</div>" +
                    `<div class="div-colmuna-cant div-fila-carrito">` +
                    producto.quantity +
                    "</div>" +
                    `<div class="div-colmuna-precio div-fila-carrito">` + "$ " +
                    producto.price * producto.quantity +
                    "</div>" +
                    `<div class="div-colmuna-btn">` +
                    `<button class="x-carrito div-fila-carrito" data-id="${producto.id}">` +
                    "X" +
                    "</button>" +
                    "</div>" +
                    "</div>"
            }

        });
    
       
        primeraPärte.innerHTML +=
            `<div class="div-btn-carrito-vaciar">` +
            `<button class="form__button" id="vaciar-carrito">` +
            "Vaciar Carrito" +
            "</button>" +
            "</div>"


    } else {
        tablaCarrito.innerHTML +=
                    `<div class="div-tabla">` +
                    `<div class="div-colmuna-cant">` +
                     "No hay productos en el carrito" +
                    "</div>" 

        primeraPärte.innerHTML +=
            `<div class="div-btn-carrito-vaciar">` +
            `<a href="/">` + 
            `<button class="form__button">` +
            "Ir a comprar" +
            "</button>" +
            "</a>" +
            "</div>"

    }

    let td = document.querySelectorAll(".div-colmuna-precio")
    let arrayPrecios = []
    let total = 0
    if (td) {
        td.forEach((producto) => {
            console.log(producto)
            if(producto){
                let precio = parseInt(producto.outerText.replace("$ ", "0"))
                total += precio

            }
            
        })
    }

    
    totalPrice.innerHTML += "$" + total
    




    let vaciarCarritoDelLS = document.getElementById('vaciar-carrito'); //botón para vaciar carrito del LS

    if(vaciarCarritoDelLS){

        vaciarCarritoDelLS.addEventListener('click', vaciarLocalStorage)
    
        function vaciarLocalStorage() {
            localStorage.clear()
            window.location.reload()
    
        }
    }

    const btns = document.querySelectorAll("button[data-id]")
    console.log(btns)

    btns.forEach((btn) => {
        btn.addEventListener("click", (event) => {

            let localPlatillos = JSON.parse(localStorage.getItem("platillos"))

            const filterPlatillos = localPlatillos.filter((producto) => {

                
                return event.target.dataset.id != producto.id
            })
            localStorage.setItem("platillos", JSON.stringify(filterPlatillos))
            window.location.reload()


        })


    })

})