exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
    })
  await knex.schema
    .createTable('teams', (teams) => {
      teams.increments('team_id')
      teams.string('PG', 40).notNullable()
      teams.string('SG', 40).notNullable()
      teams.string('SF', 40).notNullable()
      teams.string('PF', 40).notNullable()
      teams.string('C', 40).notNullable()
      teams.decimal('win_percentage', [5], [4])
      teams.integer('wins').defaultTo(0)
      teams.integer('losses').defaultTo(0)
      teams.string('username', 40).notNullable()
      teams.integer('owner_name').notNullable()
      teams.foreign('owner_name').references('user_id').inTable('users')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('teams')
  await knex.schema.dropTableIfExists('users')
}
