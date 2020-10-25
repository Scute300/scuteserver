'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BuqueuserSchema extends Schema {
  up () {
    this.create('buqueusers', (table) => {
      table.increments()
      table.string('username').notNullable()
      table.string('name').notNullable()
      table.string('apellido').notNullable()
      table.string('email').notNullable()
      table.string('cargo').notNullable()
      table.string('rol').notNullable()
      table.boolean('doublecheck').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('buqueusers')
  }
}

module.exports = BuqueuserSchema
