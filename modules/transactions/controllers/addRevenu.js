const mongoose = require('mongoose');
const validator = require('validator');

const addRevenu = async (req, res) => {

    const userModel = mongoose.model('users');
    const transactionModel = mongoose.model('transactions');

    const {montant, remarque} = req.body;

    if(!montant) throw "Le montant est requis";
    if(!remarque) throw "La remarque est requise";
    if(remarque.length < 3) throw "La remarque doit contenir au moins 3 caractères";

    if(!validator.isNumeric(montant.toString())) throw "Le montant doit être un nombre";

    await transactionModel.create({
        user_id: req.user._id,
        montant: montant,
        type_transaction: 'revenu',
        remarque: remarque
    });

    await userModel.updateOne({
        _id: req.user._id
    },
    {
        $inc: {
            solde: montant
        }
    },
    {
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        message: 'Revenu ajouté avec succès',
    });
}


module.exports = addRevenu;