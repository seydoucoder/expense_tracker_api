const jwt = require("jsonwebtoken");

const jwtManager = (user) => {
  const accessToken = jwt.sign(
    {
      _id: user._id,
      nom_complet: user.nom_complet,
      solde: user.solde,
    },
    process.env.jwt_salt
  );

  return accessToken;
};

module.exports = jwtManager;
