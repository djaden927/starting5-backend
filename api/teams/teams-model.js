const db = require('../data/db-config')


async function addTeam(team) {
    const [newTeam] = await db('teams').insert(team, ['PG'])
    return newTeam 
}

async function getTop5(){
    console.log("teamsmodel")
    const leaders = await db('teams').whereNotNull('win_percentage').orderBy('win_percentage', 'desc').limit(3)
    console.log(leaders)
    return leaders
}


module.exports = {
    addTeam,
    getTop5
}