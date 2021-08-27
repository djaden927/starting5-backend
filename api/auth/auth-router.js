const router = require('express').Router()
const Users = require('./auth-model')
const bcrypt = require('bcryptjs')
const { jwtSecret } = require("../secrets");

const {
    validateReqBody,
    checkUsernameUnique,
    checkUsernameExists
  } = require('./auth-middleware')

router.post('/register', validateReqBody, checkUsernameUnique, (req, res, next) => {
    let {username, password } = req.body
  
    const hash = bcrypt.hashSync(password, 8)
    Users.addUser({username, password: hash})
      .then(addedUser => {
        res.status(201).json(addedUser)
      })
      .catch(next)
});


router.post('/login', validateReqBody, checkUsernameExists, (req, res, next) => {
    const user = req.user
    
    if(bcrypt.compareSync(req.body.password, user.password)){
      const token = jwtSigner(user)
      res.status(200).json({
        message: `welcome, ${user.username}`,
        token: token
      })
    } else {
      next({
        status: 400,
        message: "invalid credentials"
      })
    }
});



const jwt = require('jsonwebtoken')

function jwtSigner(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    password: user.password
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router