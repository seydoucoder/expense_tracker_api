const express = require('express');
const cors = require('cors');

const errorHandler = require('./handlers/errorHandler');

require('dotenv').config();

const mongoose = require('mongoose');
const userRoutes = require('./modules/users/users.routes');
const transactionRoutes = require('./modules/transactions/transactions.routes');

const app = express();
app.use(cors());

//Initialiser models
require('./models/users.model');
require('./models/transactions.model');

app.use(express.json());

mongoose.connect(process.env.mongo_connection,{})
    .then(() => {
        console.log('Connexion à la base de données réussie');
    })
    .catch((err) => {
        console.error('Erreur:', err);
    });


//Routes

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
//Fin des routes


app.use(errorHandler)




app.listen(8000, () => {
  console.log('Le serveur est démarré');
});