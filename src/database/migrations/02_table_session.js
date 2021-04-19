exports.up = function (knex) {
  return knex.schema.createTable('session', table => {
    table.string('user_id').primary().unsigned().notNullable()
    table.string('token').notNullable()
    table.string('timestamp').notNullable()

    table.foreign('user_id').references('id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('session')
}