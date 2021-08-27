const jwt = require('jsonwebtoken') 
const { jwtSecret } = require("../secrets");
 
 const restrict = (req, res, next) => {

  const token = req.headers.authorization
  if(!token) {
   return next({ status: 401, message: 'Token required'})
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if(err) {
      next({ status: 401, message: "Token invalid"})
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
};


module.exports = {
  restrict
}
