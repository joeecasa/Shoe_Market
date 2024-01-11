// ************ Require's ************/
const express = require("express")
const path = require("path")
const methodOverride =  require('method-override'); 
const cookies = require("cookie-parser")
const session = require("express-session")
const userLoggedMiddleware = require("./middlewares/UserLoggedMiddleware")
const adminLoggedMiddleware = require('./middlewares/AdminLoggedMiddleware');
const cors= require("cors");

const publicPath = path.resolve(__dirname,'./public')

// const mysql = require('mysql');
// const connection = mysql.createConnection(process.env.JAWSDB_URL);

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();


/*** Main Router (require) */
const mainRoutes = require('./routes/mainRoutes')

const ApiMainRoutes = require("./routes/ApiRoutes/ApiMainRoutes")

// ************ Express() ************/
const app = express()

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// ************  Middlewares ************/
app.use(session({secret: " shhhh",
resave: false,
saveUninitialized: true}))
app.use(express.static(publicPath))
app.use(cookies())
app.use(userLoggedMiddleware)
app.use(adminLoggedMiddleware);


//permite capturar la información que se envía desde un formulario vía post en req.body
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'));// Pasar poder usar los métodos PUT y DELETE

//Configurando EJS
app.set('view engine', 'ejs')



/*** Main Router (use) */
app.use('/',mainRoutes)

/*** Main Router (use) */
app.use('/api', ApiMainRoutes)


/*** Error (404) */
 app.use((req, res, next)=>{
    res.status(404).render('error404')
});

//Definiendo pueto y levantando servidor
const puerto = 3000
app.listen(process.env.PORT || puerto, ()=>console.log("Servidor corriendo en el puerto ---> " + puerto))