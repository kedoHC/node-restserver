require('./config/config')

const express = require('express')
const app = express()
const mongoose = require('mongoose')

// -----------Intermediario-----------
// NOs permite tener acceso al cuerpo de la peticion -> let body = req.body
// para pooder "parsear" el cuerpo de la petición a JSON
// Bodyparser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded data&=valor
app.use(bodyParser.urlencoded({ extended : false}))
//parse application/json
app.use(bodyParser.json())

// importar las rutas y usuarlas
app.use( require('./routes/usuario') )

// conectar mongo db
mongoose.connect(process.env.URLDB, (err, res)=>{
      
      if ( err ) throw err;

      console.log("base de datos ONLINE");
});

// levantar el servidor
app.listen(process.env.PORT, () => {
      console.log("escuchando el puerto ", process.env.PORT);
})