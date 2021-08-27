exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
    })
  await knex.schema
    .createTable('teams', (teams) => {
      teams.string('PG', 40).notNullable()
      teams.string('SG', 40).notNullable()
      teams.string('SF', 40).notNullable()
      teams.string('PF', 40).notNullable()
      teams.string('C', 40).notNullable()
      teams.integer('wins')
      teams.integer('losses')
      teams.integer('owner_name').notNullable()
      teams.foreign('owner_name').references('user_id').inTable('users')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('teams')
}
