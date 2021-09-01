const router = require('express').Router()
const Teams = require('./teams-model')
const {
    validatePayload
} = require('./teams-middleware')


router.post('/', validatePayload, (req, res, next) => {
    req.body.owner_name = req.decodedToken.subject
    req.body.username = req.decodedToken.username
    Teams.addTeam(req.body)
        .then(newTeam => {
            res.status(201).json(newTeam)
        })
        .catch(next)
})


module.exports = router
