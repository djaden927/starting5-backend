const db = require('../data/db-config')


async function getTeamById(id1, id2){
    let randomTeam1 = await db('teams').where('team_id', id1)
    let randomTeam2 = await db('teams').where('team_id', id2)
    return [randomTeam1, randomTeam2]
}

async function twoTeams(){
    const totalRows = await db('teams').max('team_id').first()
    const randomNumber1 = Math.ceil(Math.random() * totalRows.max)
    let randomNumber2 = Math.ceil(Math.random() * totalRows.max)
    while(randomNumber1 === randomNumber2){
        randomNumber2 = Math.ceil(Math.random() * totalRows.max)
    }
    const randomTeamArray = getTeamById(randomNumber1, randomNumber2)
    return randomTeamArray
}

async function voteForTeam(winningTeam, losingTeam, team1wp, team2wp, team1id, team2id){
    await db('teams').where('team_id', winningTeam).increment('wins', 1)
    await db('teams').where('team_id', losingTeam).increment('losses', 1)
    await db('teams').where('team_id', team1id).update({win_percentage: team1wp})
    await db('teams').where('team_id', team2id).update({win_percentage: team2wp})
    return winningTeam
}

module.exports = {
    twoTeams,
    voteForTeam
}