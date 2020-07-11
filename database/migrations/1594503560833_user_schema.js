'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.date('cumpleaños',8).nullable()
      // alter table
    })
  }

  down () {
    this.table('users', (table) => {
      table.date('edad',6).nullable()
      // reverse alternations
    })
  }
}

module.exports = UserSchema
