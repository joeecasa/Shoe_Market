window.addEventListener("DOMContentLoaded", function (event) {

    const local = JSON.parse(localStorage.getItem("platillos"))
    let burguer = document.querySelector(".burguer")
    let burguerList = document.querySelector(".burguer-list")
    const cartP = document.querySelector(".cart-p")
    const cartPXl = document.querySelector(".cart-p-xl")


    let suma = 0

    if (local && local.length > 0) {
         local.forEach((producto) => {
               suma = suma + producto.quantity
          })

    }


if (local && local.length > 0) {
    cartPXl.classList.remove("cart-none")
    cartPXl.innerHTML = suma

    } else {
        cartPXl.classList.add("cart-none")


    }

    if (local && local.length > 0) {
        cartP.classList.remove("cart-none")
        cartP.innerHTML = suma

    } else {
        cartP.classList.add("cart-none")

    }
    burguer.addEventListener("click", function () {
        burguerList.classList.add("show")
        burguerList.classList.remove("none")


    })
    burguerList.addEventListener("mouseleave", function () {
        burguerList.classList.add("none")
        burguerList.classList.remove("show")


    })





















})
