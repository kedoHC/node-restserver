const express = require('express')
const app = express()

const bcrypt = require('bcrypt')

const _ = require('underscore')

// importar el esquema de usuario
const Usuario = require('../models/usuario')

// app.get('/', function(req, res){
//       res.json('hello world')
// })
app.get('/usuario', function(req, resp){
      // res.json('get usuario')

      // Parámetros opcionales res.query, pueden estar o NO
      // Que empiece desde el 0 en caso de no especificarlo en la url
      // ?desde=10 -> mandaria desde el registro 10 5 registros
      let desde = req.query.desde || 0
      desde = Number(desde)
      // que mande como maximo el valor de limite o mande 5
      // ?limite=2 -> Mandaria solo dos registros
      let limite = req.query.limite || 5
      limite = Number(limite)


      // saltar los 5 anteriores, limite de 5 registros
      Usuario.find({ estado: true}, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios) => {
                  if(err) {
                        return res.status(400).json({
                              ok: false,
                              err
                        })
                  }

                  // agragar cuantos registros tiene la busqueda

                  Usuario.count({ estado: true}, (err, conteo) => {
                        resp.json({
                              ok: true,
                              usuarios,
                              cuantos: conteo
                        })

                  })

            })
})

app.post('/usuario', function(req, res){

      let body = req.body
      // nueva instancia del esquema Usuario
      let usuario = new Usuario({

            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
      })
      // grabar en la BD
      usuario.save((err, usuarioDB)=> {
            if(err) {
                  return res.status(400).json({
                        ok: false,
                        err
                  })
            }
            res.json({
                  ok: true,
                  usuario: usuarioDB
            })
      })
      // Verificar que se manden los datos
      // if(body.nombre === undefined){
      //       res.status(400).json({
      //             ok: false,
      //             mensaje: "el nombre no esta definido"
      //       })
      // }
      // res.json({
      //       persona: body
      // })
})
app.put('/usuario/:id', function(req, res){
      let id = req.params.id
      //especificar que campos podemos modificar o que solo vamos a mandar en la peticion PUT 
      // las propiedades especificadas
      let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"])
      Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

            if (err) {
                  return res.status(400).json({
                        ok: false,
                        err
                  })
            }
            res.json({
                  ok: true,
                  usuario: usuarioDB
            })
            
      })
})

app.delete('/usuario/:id', function(req, res){
      // res.json('delete usuario')

      let id = req.params.id

      // Borrado fisico del registro

      // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
      //       if(err){
      //             return res.status(400).json({
      //                   ok: false,
      //                   err
      //             })
      //       }
      //       // error en caso de querer borrar un ID que no existe
      //       if(!usuarioBorrado){
      //             return res.status(400).json({
      //                   ok: false,
      //                   err: {
      //                         message: 'Usuario no encontrado'
      //                   }
      //             })
      //       }
      //       res.json({
      //             ok: true,
      //             usuario: usuarioBorrado
      //       })
      // })
      // --------------------------------------------------

      // Cambiar el estado del registro

      let cambiaEstado = {
            estado: false
      }
      Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {

            if (err) {
                  return res.status(400).json({
                        ok: false,
                        err
                  })
            }
            res.json({
                  ok: true,
                  usuario: usuarioDB
            })
            
      })

})


module.exports = app;