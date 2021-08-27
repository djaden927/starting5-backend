const router = require('express').Router()
const Teams = require('./teams-model')


router.post('/', (req, res, next) => {
    req.body.owner_name = req.decodedToken.subject
    Teams.addTeam(req.body)
        .then(newTeam => {
            res.status(201).json(newTeam)
        })
        .catch(next)
})


module.exports = router
