module.exports = {
  "development": {
    "username": "root",
    "password": "George4810008968",
    "database": "shoemarket",
    "host": "127.0.0.1",
    //"port" : "3306",/// el 3306 es el servidor por defecto x eso no es necesario pero si usamos otro si es necesario
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
