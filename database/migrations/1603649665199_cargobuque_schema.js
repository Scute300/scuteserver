'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargobuqueSchema extends Schema {
  up () {
    this.create('cargobuques', (table) => {
      table.increments()
      table.integer('buqueuser_id').unsigned().references('id').inTable('buqueusers').onDelete('CASCADE')
      table.string('buque')
      table.timestamps()
    })
  }

  down () {
    this.drop('cargobuques')
  }
}

module.exports = CargobuqueSchema
