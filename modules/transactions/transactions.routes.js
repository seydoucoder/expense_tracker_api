const express = require('express');
const auth = require('../../middleware/auth');
const addRevenu = require('./controllers/addRevenu');
const addDepense = require('./controllers/addDepense');
const getTransactions = require('./controllers/getTransactions');
const deleteTransaction = require('./controllers/deleteTransaction');
const editTransaction = require('./controllers/editTransaction');

const transactionRoutes = express.Router();

//Routes


transactionRoutes.use(auth);

//Proteger les routes

transactionRoutes.post('/addRevenu', addRevenu);
transactionRoutes.post('/addDepense',addDepense);
transactionRoutes.get('/', getTransactions);
transactionRoutes.delete('/:transactionId', deleteTransaction);
transactionRoutes.patch('/',editTransaction);

module.exports = transactionRoutes;