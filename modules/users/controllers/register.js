const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const userModel = mongoose.model("users");

  const { nom, email, password, confirmation_password, balance } = req.body;

  //Validations
  if (!email) throw "L'email est requis";
  if (!password) throw "Le mot de passe est requis";
  if (!nom) throw "Le nom complet est requis";
  if (!confirmation_password)
    throw "La confirmation du mot de passe est requise";
  if (password !== confirmation_password)
    throw "Les mots de passe ne correspondent pas";
  if (password.length < 6)
    throw "Le mot de passe doit contenir au moins 6 caractères";

  const getUser = await userModel.findOne({ email: email });

  if (getUser) throw "Cet email est déjà utilisé";

  //Hash password
  const hashPassword = await bcrypt.hash(password, 12);

  const createdUser = await userModel.create({
    nom_complet: nom,
    email: email,
    mot_de_passe: hashPassword,
    solde: balance,
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Bienvenue sur Gbudget Pro",
    "<h1>Bienvenue sur Gbudget Pro</h1><p>Nous sommes ravis de vous accueillir parmi nous pour vous aider à gérer vos finances personnelles.</p>",
    "Bienvenue sur Gbudget Pro"
  );

  res.status(201).json({
    status: "success",
    message: "Inscription réussie",
    accessToken: accessToken,
  });
};

module.exports = register;
