'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargosSchema extends Schema {
  up () {
    this.create('cargos', (table) => {
      table.increments()
      table.string('cargonombre')
      table.timestamps()
    })
  }

  down () {
    this.drop('cargos')
  }
}

module.exports = CargosSchema
