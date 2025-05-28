const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    montant: {
        type: Number,
        required: true,
    },
    type_transaction: {
        type: String,
        enum: ["revenu", "depense"],
        required: true,
    },

    remarque: {
        type: String,
        required: true,
    },

  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("transactions", transactionSchema);

module.exports = transactionModel;
