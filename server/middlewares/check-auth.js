const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, 'secrect')
    next()
  } catch (err) {

  }
}