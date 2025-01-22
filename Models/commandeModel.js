const mongoose = require('mongoose');

const Produit = require('./produitModel');

const commandeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Commande', commandeSchema);
