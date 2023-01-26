const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const fs = require('fs');

let userApiController = {

    list: function (req, res) {


        db.User.findAll({
            include: [
                { association: "roles" },

            ], where: {
                status: "Activo"
            }
        })

            //Borramos los campos que no queremos mostrar
            .then(users => {
                users.map(element => {
                    delete element.dataValues.document
                    delete element.dataValues.detail
                    delete element.dataValues.password
                    delete element.dataValues.rol_id
                    delete element.dataValues.updated_at
                    delete element.dataValues.created_at
                    element.dataValues.detail = `https://shoemarket.fly.dev/api/users/detail/${element.dataValues.id}`
                    element.dataValues.image = `https://shoemarket.fly.dev/img/user/${element.dataValues.image}`

                })
                res.json({
                    count: users.length,
                    users: users
                    //status: 200                                                       
                })
            }).catch(error => res.send(error));
    },//list

    detail: function (req, res) {
        db.User.findByPk(req.params.id, {
            include: [
                { association: "roles" },

            ], where: {
                status: "Activo"
            }
        })

            .then(user => {
                console.log(user)
                let userResponse = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    date_of_birth: user.date_of_birth,
                    image: `https://shoemarket.fly.dev/img/user/${user.image}`,
                    adress: user.adress,
                    rol: user.roles.name,

                }
                let response = {
                    user: userResponse,


                }

                res.json(response)
            }).catch(error => res.send(error));

    }//detail


}//userApiController

module.exports = userApiController;