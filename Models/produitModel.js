const mongoose = require('mongoose');
const produitSchema = new mongoose.Schema ({
  name: { type: String, required: true },
  description: {type: String, required: true} ,
  price: { type: Number, required: true},
  type: { type: String, enum: ['physical','digital'], required: true} ,
  image: { type: String }
});
module.exports = mongoose.model('Produit', produitSchema);
