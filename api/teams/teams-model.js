const db = require('../data/db-config')


async function addTeam(team) {
    const [newTeam] = await db('teams').insert(team, ['PG'])
    return newTeam 
}


module.exports = {
    addTeam
}