module.exports = (sequelize, dataTypes) => {
    const alias = "Rol",//// el alias es el nombre del modelo y se crea en singular y mayuscula
        cols = {
            id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            created_at: {
                field:"created_at",// tiraba error entonces le pusimos el campo field
                type: dataTypes.DATE,
                allowNull: true
            },
            updated_at: {
                field:"updated_at",
                type: dataTypes.DATE,
                allowNull: true,
            },
            name: {
                type: dataTypes.STRING(45),
                allowNull: false
            }
        }
        let config = {
            timestamps : true,
            underscored : true, // tiraba error entonces pusimos estas dos cosas en config
            tableName : "roles"
                
        }

const Rol = sequelize.define(alias,cols,config)

Rol.associate = function(models){
    Rol.hasMany(models.User,
        {
            as : "usuarios",
            foreignKey : "rol_id"
        })
}

    return Rol;
}