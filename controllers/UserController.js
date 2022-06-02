const req = require("express/lib/request")
const res = require("express/lib/response")
const path = require("path")
const fs = require("fs")
const userCrud = require("../models/UserCrud")
const bcryptjs = require("bcryptjs")
const { validationResult } = require('express-validator')

let productsFilePath = path.join(__dirname, '../data/SHOEMARKET.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));//JSON a JS

const controller = {
    register: (req, res) => { 
        res.render("users/registro", { title: "Registro" }) 
},

    createUser: function (req, res) {
        let usersFilePath = path.join(__dirname, '../data/users.json');
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //de JSON a JS
        let resultValidation = validationResult(req)
        
        if (resultValidation.errors.length > 0) {
            return res.render("users/registro", { errors: resultValidation.mapped(),oldData:req.body, title: "Registro de usuario" })//mapped convierte un array en un objeto literal
        }

        else {
            let ultimoElemento = users.length - 1
            let idNuevo = users[ultimoElemento].id + 1

            let userForm = {
                id: idNuevo,
                NombreYapellido: req.body.nombre,
                Email: req.body.email,
                FechaNacimiento: req.body.fecha,
                Domicilio: req.body.domicilio,
                Contraseña: bcryptjs.hashSync(req.body.pass, 10),
                image: req.file.filename                               
            }

            let NewUser = []
            let UsersJSON = fs.readFileSync(usersFilePath, 'utf-8')

            if (UsersJSON == "") {
                NewUser.push(userForm)
            }
            else {
                NewUser = JSON.parse(UsersJSON) //de JSON a JS
                NewUser.push(userForm)
            }

            fs.writeFileSync(usersFilePath, JSON.stringify(NewUser, null, "\t")) //de JS a JSON
            res.redirect("/user/login")
        }

    },

    login: (req, res) => { res.render('users/login', { title: "Login" }) },

    processLogin :(req,res) =>{
		const errors = validationResult(req)
        
		let userToLogin = userCrud.findByField("Email", req.body.email)
       
		if (userToLogin) {
			let isOkpassword = bcryptjs.compareSync(req.body.password, userToLogin.Contraseña)
			if (isOkpassword) {
				req.session.userLogged = userToLogin
                console.log("userloged",req.session.userLogged)
				if(req.body.record){
					res.cookie("userEmail", req.body.email, {maxAge : (1000 * 60)*2})
				}
				return res.redirect("/user/profile")
			} 
			res.render("users/login", {
				errors: {
					email: {
						msg: "la credenciales son invalidas"
					}
				},old : req.body, title : " login"
			}
            )
		}

		res.render("users/login", {
			errors: {
				email: {
					msg: " No se encuentra ese email en nuestra base de datos"
				}
			},old : req.body, title : " login"
		})

	},

    profile :   (req, res) => { 
        
		res.render("users/profile",{
		user : req.session.userLogged,title:"perfil"

	}) },
	logout : (req, res) => { 
		res.clearCookie("userEmail")
		req.session.destroy() 
	return res.redirect("/user/login")
	}

         
    
}

module.exports = controller