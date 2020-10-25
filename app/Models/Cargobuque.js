'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cargobuque extends Model {
    buquesuser(){
        return this.belongsTo('App/Models/Buqueuser')
    }
}

module.exports = Cargobuque
