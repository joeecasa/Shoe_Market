const req = require("express/lib/request")
const res = require("express/lib/response")
const path = require("path")
const fs = require("fs")
const { validationResult } = require('express-validator')
const { title } = require("process")
const db = require("../database/models/index")
const { Op, where } = require("sequelize");


let roles = ["admin", "cliente", "vendedor", "invitado"]
let estados = ["Activo", "Inactivo"]



const controller = {
    index: (req, res) => {
        res.render("admin/indexAdmin", { title: "Admin Index" })
    },
    userList: (req, res) => {
        db.User.findAll({
            include: [
                { association: "roles" },
                { association: "order" }
            ]                      
        } )
            .then(users => {               
                return res.render('admin/listaUsuarios.ejs', { users, title: "Listado de usuarios" })
                
            })
        
    },

    disableduserList: (req, res) => {
        db.User.findAll({
            include: [
                { association: "roles" },
                { association: "order" }
            ]
                } )
            .then(users => {               
                return res.render('admin/listaUsuariosInactivos.ejs', { users, title: "Listado de usuarios inactivos" })
            })
        
    },


    adminProducts: (req, res) => {

        db.Product.findAll({
            include: [
                { association: "categorias" },
                { association: "ordenes" },
            ]
        })
            .then(products => {
                return res.render("admin/adminProductos", { products: products, title: "AdminProducts" })
            })

    },
    productsDisabled: (req, res) => {
        db.Product.findAll({
            include: [
                { association: "categorias" },
                { association: "ordenes" },
            ]
        })
            .then(products => {
                return res.render("admin/adminProductosInactivos", { products: products, title: "AdminProducts" })
            })
    },

    crearProducto: (req, res) => {
        db.Category.findAll({
            include: [
                { association: "productos" },
                
            ]
        })
            .then(categorias => {

                return res.render('admin/crearProducto', { title: "Crear Producto", categories: categorias })
            })
    },

    newproduct: async (req, res) => {

        const errors = validationResult(req)

        let categories = await db.Category.findAll()

        if (errors.errors.length > 0) {
            if (errors.errors.length > 0) {
                console.log(errors)
                return res.render("admin/crearProducto", {
                    errors: errors.mapped(),
                    old: req.body,
                    title: "Crear Producto",
                    categories: categories
                })
            }
        } else {
            db.Product.findOrCreate({
                where: { name: req.body.nombre },
                defaults: {
                    name: req.body.nombre,
                    description: req.body.description,
                    category_id: req.body.category,
                    price: req.body.price,
                    color: req.body.color,
                    status: "Enabled",
                    image: req.file.filename
                }
            })
                .then(([product, created]) => {
                    if (created != true) {

                        return res.render("admin/crearProducto", {
                            old: req.body,
                            title: "Crear Producto",
                            categories: categories,
                            errors: { nombre: { msg: "No se puede crear 2 productos con el mismo nombre" } }

                        })
                    } else {
                        return res.redirect("/admin/lista/productos")
                    }

                })
        }

    },

    disableProduct: (req, res) => {
        
        db.Product.update({
            status: "Disabled"
        }, {
            where: { id: req.params.id }
        })
            .then(() => {
                return res.redirect("/admin/lista/productosInactivos")
            })



    },
    enableProduct: (req, res) => {
        
        db.Product.update({
            status: "Enabled"
        }, {
            where: { id: req.params.id }
        })
            .then(() => {
                return res.redirect("/admin/lista/productos")
            })



    },
    deleteProduct: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect("/admin/lista/productosInactivos")

            })

    },
    editarProducto: (req, res) => {

        let categoriesInDb = db.Category.findAll()
        let productInDb = db.Product.findByPk(req.params.id, {
            include: [
                 { association: "categorias" },
                { association: "ordenes" },
            ]
        })
        Promise.all([categoriesInDb, productInDb])
            .then(function ([categorias, producto]) {

                return res.render('admin/editarProducto', { title: "Editar Producto", producto: producto, categories: categorias })

            })
        


    },

    update: (req, res) => {
        let img = function () {
            if (req.file) { return req.file.filename }
        }
        let newProduct = {
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category,
            price: req.body.price,
            color: req.body.color,
            status: req.body.status,
            image: img(),

        }

        db.Product.update(newProduct, {
            where: { id: req.params.id }
        })
            .then(() => {
                return res.redirect("/admin/lista/productos")
            })


    },
    userEdit: (req, res) => {
        let rol = db.Rol.findAll()
        let user = db.User.findByPk(req.params.id,{
            include: [ { association: "roles" } ]
        })
        Promise.all([rol,user])
            .then(function ([roles,usuario]) { res.render("users/editUsuario", { title: "Editar usuario", usuario: usuario, estados: estados, roles: roles }) })
            
    },

    userUpdate: (req, res) => {
                        
        let img = function () {
            if (req.file) { return req.file.filename }
        }
        db.User.update({
            document: 123456,
            first_name: req.body.Nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            // password:req.body.pass,
            date_of_birth: req.body.fecha,
            image: img(),
            rol_id:req.body.rol,
            adress: req.body.domicilio,
            updated_at: Date.now(),
            status: req.body.estado            
        }, {
            where: { id: req.params.id }
        })

            .then(() => {
                return res.redirect('/user/login')
            })
            .catch(error => res.send(error))

    },

    userSoftDelete: (req, res) => {
        db.User.update({
            updated_at: Date.now(),
            status: "Inactivo"
            }, {
            where: { id: req.params.id }
        })
            .then(() => {
                return res.redirect('/admin/lista/usuarios')
            })
            .catch(error => res.send(error))
        
    },

    userForeverDelete:(req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect("/admin/lista/usuariosinactivos")

            })

    },
    userActivar:(req, res) => {
        db.User.update({
            updated_at: Date.now(),
            status: "Activo"
            }, {
            where: { id: req.params.id }
        })
            .then(() => {
                return res.redirect('/admin/lista/usuariosinactivos')
            })
            .catch(error => res.send(error))
        
    },

    list: (req, res) => {
        db.Product.findAll({
            include: [
                { association: "categorias" },
                { association: "ordenes" },
            ],
            where: { name: "Lara Negro" }


        })
            .then(function (products) {
                //return res.json(products)
                return res.render("prueba", { products: products, title: "prueba" })
            })
            .catch(function (err) {
                console.log(err)
            })

    }

}

module.exports = controller

