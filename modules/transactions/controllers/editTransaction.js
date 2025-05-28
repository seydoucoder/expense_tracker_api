const mongoose = require('mongoose');
const validator = require('validator');

const editTransaction = async (req, res) => {
    const transactionModel = mongoose.model('transactions');

   const { transactionId, montant, type_transaction, remarque } = req.body;

   if(!validator.isMongoId(transactionId.toString())) throw 'ID de transaction invalide';
   
   if(!transactionId) throw 'L\'ID de la transaction est requis';


   const getTransaction = await transactionModel.findById(transactionId);
   if(!getTransaction) throw 'Transaction non trouvée';

   await transactionModel.updateOne(
         {_id: transactionId},
         {
            montant,
            type_transaction,
            remarque,
         },
         { runValidators: true }
   );

 

    res.status(200).json({
        status: 'success',
        message: 'Transaction modifiée avec succès',
    });
}

module.exports = editTransaction;