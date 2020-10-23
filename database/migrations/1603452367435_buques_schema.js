'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BuquesSchema extends Schema {
  up () {
    this.create('buques', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('nombrebuque').notNullable().unique()
      table.string('empresa').notNullable()
      table.string('eslora').notNullable()
      table.string('potencia').notNullable()
      table.string('manga').notNullable()
      table.string('DWT').notNullable()
      table.string('puntal').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('buques')
  }
}

module.exports = BuquesSchema
