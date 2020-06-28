'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MonederoSchema extends Schema {
  up () {
    this.create('monederos', (table) => {
      table.increments()
      table.integer('user_id').unique().notNullable()
      table.integer('points').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('monederos')
  }
}

module.exports = MonederoSchema
