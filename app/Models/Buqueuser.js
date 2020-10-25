'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Buqueuser extends Model {
    cargobuques(){
        return this.hasMany('App/Models/Cargobuque')
    }
}

module.exports = Buqueuser
