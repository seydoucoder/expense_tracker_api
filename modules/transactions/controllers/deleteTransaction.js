const mongoose = require('mongoose');
const validator = require('validator')
const deleteTransaction = async (req, res) => {

    const transactionModel = mongoose.model('transactions');
    const userModel = mongoose.model('users');

    const transactionId = req.params.transactionId;

    if(!validator.isMongoId(transactionId.toString())) throw 'ID de transaction invalide';

    const getTransaction = await transactionModel.findById(transactionId);
    if(!getTransaction) throw 'Transaction non trouvée';

    await transactionModel.deleteOne({_id: transactionId});
    
    if(getTransaction.type_transaction === 'revenu') {

        await userModel.updateOne(
            {_id: getTransaction.user_id},
            {$inc: {solde: getTransaction.montant * -1}},
            {runValidators: true}
        );
    }else{
        await userModel.updateOne(
            {_id: getTransaction.user_id},
            {$inc: {solde: getTransaction.montant}},
            {runValidators: true}
        );
    }

    res.status(200).json({
        status: 'success',
        message: 'Transaction supprimée avec succès',
    });
}

module.exports = deleteTransaction;