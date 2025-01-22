const mongoose = require('mongoose');
const Produit = require('./produitModel');

const panierSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
  products: [{
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit'},
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true}
});



module.exports = mongoose.model('Panier', panierSchema);
