const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.headers);


  try {
      const accessToken = req.headers.authorization.replace("Bearer ", "");

    const JWTverrify = jwt.verify(accessToken, process.env.jwt_salt);

    req.user = JWTverrify;
  } catch (e) {
    res.status(401).json({
      status: "error",
      message: "Non autorisé",
    });
  }


  next();
};

module.exports = auth;
