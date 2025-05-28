const mongoose = require('mongoose');

const userDashboard = async (req, res) => {

    const userModel = mongoose.model('users');
    const transactionModel = mongoose.model('transactions');
  
    console.log(req.user);
    
    const getUser = await userModel.findOne({
        _id: req.user._id,

    }).select("-mot_de_passe");

    const transactions = await transactionModel.find({
        user_id: req.user._id
    }).sort("-createdAt").limit(5);

    res.status(200).json({
        status: 'success',
        data: getUser,
        transactions
    });
}
module.exports = userDashboard;