const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManager = require('../../../managers/jwtManager');

const login = async (req, res) => {
    const userModel = mongoose.model('users');
    const { email, password } = req.body;

    const getUser = await userModel.findOne({ email: email });
    if (!getUser) throw 'Cet email n\'existe pas';

    const comparePassword = await bcrypt.compare(password, getUser.mot_de_passe);
    if (!comparePassword) throw 'Mot de passe incorrect';

    const accessToken = jwtManager(getUser);

    res.status(200).json({
        status: 'success',
        message: 'Connexion réussie',
        accessToken: accessToken,
    });
}


module.exports = login;