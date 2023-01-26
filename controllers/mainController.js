const req = require("express/lib/request")
const res = require("express/lib/response")
const path = require("path")
const fs = require("fs")
const { validationResult } = require('express-validator')
const db = require("../database/models")
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { categoria } = require("./ProductsController")



const controller = {
    index: (req, res) => {
        db.Product.findAll({
            include: [
                { association: "categorias" },
                { association: "ordenes" },

            ],
            where: {
                status : "Enabled"
            },
            limit: 6,
            order: sequelize.random() 

        }).then(function (productos) {
            return res.render("home", { productos, title: "Shoe Market" })
        })

    },
    descripcion: (req, res) => { res.render('products/descripcion', { title: "Descripcion" }) },
    carrito: (req, res) => { res.render('products/carrito', { title: "Carrito de compras" }) },

    search: (req, res) => {
        let search = req.query.search.toLowerCase()
        db.Product.findAll({
            include: [
                { association: "categorias" },
                { association: "ordenes" },
            ],
            where: {
                [Op.or]: [
                    {
                        name: { [Op.like]: `%${search}%` }
                    },
                    {
                        '$categorias.name$': { [Op.like]: `%${search}%` }
                    },
                    {
                        color : { [Op.like]: `%${search}%` }
                    }
                ]

            }, order : [
                ["name","ASC"]
            ]
        })
            .then(products => {
                res.render("products/results", { products: products, title: "Busqueda" })
            })
    },
    detalle: (req, res) => {
        db.Product.findOne({
            where : {
                id : req.params.id,
                status : "Enabled"
            }
        }, {
            include: [
                { association: "categorias" },
                { association: "ordenes" },
            ]
        })
            .then(function (producto) {
                return res.render("products/detalle", { producto, title: "Detalle del producto" })
            })
    },
    contact: (req, res) => {
        res.render("contact", {
            title: "Contacto"
        })
    },
    processContact: (req, res) => {
        const pathLogContact = path.join(__dirname, "../logs/contact.json")
        const errors = validationResult(req)
        let old = req.body
        if (!errors.isEmpty()) {
            res.render("contact", { errors: errors.mapped(), old: old, title: "Contacto" })
        } else {
            let logForm = {
                name: req.body.name,
                email: req.body.email,
                mensaje: req.body.msg
            }
            let NewMsg = []
            const readContactJson = fs.readFileSync(pathLogContact)
            NewMsg = JSON.parse(readContactJson)
            NewMsg.push(logForm)
            fs.writeFileSync(pathLogContact, JSON.stringify(NewMsg, null, "\t"))
            res.redirect("/")
        }
    }
}

module.exports = controller

