const router = require('express').Router()
const Vote = require('./vote-model')

router.get('/', (req, res, next) => {
    Vote.twoTeams()
        .then(teamPair => {
            res.status(200).json(teamPair)
        })
        .catch(next)
})

router.put('/', (req, res, next) => {
    const rb = req.body
    Vote.voteForTeam(rb.winningTeam, rb.losingTeam, rb.team1WinPercentage, rb.team2WinPercentage, rb.team1, rb.team2)
        .then(winningTeam => {
            res.status(201).json(winningTeam)
        })
        .catch(next)
})

module.exports = router
