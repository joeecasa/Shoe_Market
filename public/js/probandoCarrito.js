
window.addEventListener("DOMContentLoaded", function (event) {


    let probandoCarrito = document.querySelector(".probandoCarrito")
    let fila1Nombre = document.querySelector(".fila1-nombre")
    let fila1Precio = document.querySelector(".fila1-precio")
    let fila1Img = document.querySelector(".fila1-img")
    let local = JSON.parse(localStorage.getItem("platillos"))
    let tablaCarrito = document.querySelector(".tabla-carrito")
    let totalPrice = document.querySelector(".contenedor-total__price")
    let filaCarritoPrice = document.querySelector("#hola")



    if (local && local.length > 0 ) {

        local.forEach(producto => {
            if(producto.price === null){
                localStorage.clear()
                window.location.reload()
            } else{

                tablaCarrito.innerHTML +=
                    `<tr class="filaCompleta-carrito" >` +
                    `<td class="fila-carrito">` + `<img class="img-carrito" src=${producto.img} >` + "</img>" + "</td>" +
                    `<td class="fila-carrito">` + producto.quantity + "</td>" +
                    `<td class="fila-carrito-price">` + "$" + producto.price + "</td>" +
                    `<td><button class="borrar-curso"  data-id="${producto.id}">X</button> </td>`
                "</tr>"
            }



        });
    } else {
        tablaCarrito.innerHTML +=
            `<tr class="filaCompleta-carrito" >` +
            `<td class="fila-carrito">` + "No hay productos en el carrito" + "</td>" +
            `<td class="fila-carrito">` + "" + "</td>" +
            `<td class="fila-carrito">` +
            `<a href="/">` +
            `<button class="form__button">` + "Ir a Comprar" + "</button>"
            + `</a>` +
            "</td>" +
            "</tr>"

    }

    let td = document.querySelectorAll(".fila-carrito-price")
    let arrayPrecios = []
    let total = 0
    if (td) {
        td.forEach((producto) => {
            let precio = parseInt(producto.outerText.replace("$", "0"))
            total += precio
        })
    }

    totalPrice.innerHTML += "$ " + total

    let vaciarCarritoDelLS = document.getElementById('vaciar-carrito'); //botón para vaciar carrito del LS

    vaciarCarritoDelLS.addEventListener('click', vaciarLocalStorage)

    function vaciarLocalStorage() {
        localStorage.clear()
        window.location.reload()

    }

    const btns = document.querySelectorAll("button[data-id]")

    btns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            console.log(event.target.dataset.id)

            let localPlatillos = JSON.parse(localStorage.getItem("platillos"))

            const filterPlatillos = localPlatillos.filter((producto) => {

                return event.target.dataset.id != producto.id
            })
            localStorage.setItem("platillos",JSON.stringify(filterPlatillos))
            window.location.reload()


        })


    })











})