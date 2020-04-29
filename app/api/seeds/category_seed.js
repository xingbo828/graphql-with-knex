
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {name: 'Personal'},
        {name: 'Work'},
        {name: 'Life'},
        {name: 'Travel'}
      ])
    })
}
