const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailManager = require('../../../managers/emailManager');

const resetPassword = async(req, res) => {

    const userModel = mongoose.model('users');

    const { email, reset_code, new_password } = req.body;

    if (!email) throw "L'email est requis";
    if (!reset_code) throw "Le code de réinitialisation est requis";
    if (!new_password) throw "Le nouveau mot de passe est requis";
    if (new_password.length < 6) throw "Le mot de passe doit contenir au moins 6 caractères";

    const getUser = await userModel.findOne({
        email: email,
        reset_code: reset_code
    });

    if (!getUser) throw "Code de réinitialisation invalide";

    const hashPassword = await bcrypt.hash(new_password, 12);

    await userModel.updateOne(
        { email: email },
        { mot_de_passe: hashPassword, reset_code: "" },
        { runValidators: true }
    );

    await emailManager(
        email,
        "Mot de passe réinitialisé",
        `<h1>Votre mot de passe a été réinitialisé</h1><p>Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>`,
        "Réinitialisation de mot de passe - Gbudget Pro"
    );

    res.status(200).json({
        status: 'success',
        message: 'Mot de passe réinitialisé avec succès.',
    });
}

module.exports = resetPassword;