const mongoose = require('mongoose');
const emailManager = require('../../../managers/emailManager');


const forgotPassword = async (req, res) => {
    const userModel = mongoose.model('users');
    const { email } = req.body;
    if (!email) throw "L'email est requis";

    const getUser = await userModel.findOne({
        email: email,
    });

    if (!getUser) throw "Aucun utilisateur trouvé avec cet email";

    const resetCode = Math.floor(10000 + Math.random() * 90000);

    await userModel.updateOne(
        { email: email },
        { reset_code: resetCode },
        { runValidators: true }
    );


    await emailManager(
        email,
        "Réinitialisation de mot de passe",
        `<h1>Réinitialisation de mot de passe</h1><p>Votre code de réinitialisation est : ${resetCode}</p>`,
        "Réinitialisation de mot de passe - Gbudget Pro"
    );

    res.status(200).json({
        status: 'success',
        message: 'Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.',
    });
}

module.exports = forgotPassword;