const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom_complet: {
        type: String,
        required: [true, 'Nom complet est requis'],
    },
    email: {
        type: String,
        required: [true, 'Email est requis'],
        unique: true,
        match: [/.+\@.+\..+/, 'Veuillez entrer un email valide'],
    },
    mot_de_passe: {
        type: String,
        required: [true, 'Mot de passe est requis'],
    },
    solde: {
        type: Number,
        required: [true, 'Le solde est requis'],
        default: 0,
    },

    reset_code:{
        type: Number,
    }

},
{
    timestamps:true,
});


const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
