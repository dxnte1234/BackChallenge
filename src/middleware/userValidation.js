const jwt = require('jsonwebtoken')

const validUser = async (req, res, next) => {

  try {
    const { authorization } = req.headers;
    if(!authorization){

      res.status(401).send({
        message: 'Required Login',
        data: null
      })
      return;
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN);

    req.user = decoded;
    next();

  } catch (error) {
    const tokenError = new Error(error);

    res.status(400).send({
      message:`${tokenError}`,
      data: null
    });
  }
}

module.exports = {
  validUser
}