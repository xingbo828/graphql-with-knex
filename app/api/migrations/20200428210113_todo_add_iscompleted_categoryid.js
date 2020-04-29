exports.up = function(knex) {
  return knex.schema.table('todos', function (table) {
    table.boolean('is_completed').notNullable().defaultTo(false)
    table.integer('category_id').unsigned().nullable()
    table.foreign('category_id').references('category.id')
  })
}

exports.down = function(knex) {
  return knex.schema.table('todos', function (table) {
    table.dropColumn('is_completed')
    table.dropForeign('category_id')
    table.dropColumn('category_id')
  })
}
