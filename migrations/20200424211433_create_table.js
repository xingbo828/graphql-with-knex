exports.up = function(knex) {
  return knex.schema.createTable('todos', function (table) {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todos')
}
