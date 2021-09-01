const router = require('express').Router()
const Teams = require('../teams/teams-model')


router.get('/', (req, res, next) => {
    Teams.getTop5()
        .then(top5 => {
            res.status(200).json(top5)
        })
        .catch(next)
})


module.exports = router