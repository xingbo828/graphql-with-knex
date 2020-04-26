exports.up = function(knex) {
  return knex.schema.table('todos', function (table) {
    table.text('notes')
  })
}

exports.down = function(knex) {
  return knex.schema.table('todos', function (table) {
    table.dropColumn('notes')
  })
}
