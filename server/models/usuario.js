

const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

let rolesValidos = {
      values: ['ADMIN_ROLE', 'USER_ROLE'],
      message: '{VALUE} no es un rol valido'
}
let Schema = mongoose.Schema

// definir esquema

let usuarioSchema = new Schema({
      nombre: {
            type: String,
            required: [true, 'El nombre es necesario']
      },
      email: {
            type: String,
            unique: true,
            required: [true, 'El email es requerido']            
      },
      password: {
            type: String,
            required: [true, 'El password es obligatoria']            
      },
      img: {
            type: String,
            required: false
      },
      role: {
            type: String,
            default: 'USER_ROLE',
            enum: rolesValidos
      },
      estado: {
            type: Boolean,
            default: true
      },
      google: {
            type: Boolean,
            default: false
      }

})

// Quitar password de la respuesta JSON del REST server
usuarioSchema.methods.toJSON = function () {
      let user = this;
      let userObject = user.toObject()
      delete userObject.password
      return userObject
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único'});

module.exports = mongoose.model('usuario', usuarioSchema)