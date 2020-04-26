// Update with your config settings.
require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: {
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
  },
};
