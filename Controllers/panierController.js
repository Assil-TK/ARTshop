const Panier = require('../Models/panierModel');
const Produit = require('../Models/produitModel');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { userId, produitId, quantity } = req.body;
  
  try {
    let panier = await Panier.findOne({ user: userId });
    
    if (!panier) {
      panier = new Panier({ user: userId, products: [], totalPrice: 0 });
    }

    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingProductIndex = panier.products.findIndex(item => item.produit.toString() === produitId);
    if (existingProductIndex > -1) {
      panier.products[existingProductIndex].quantity += quantity;
    } else {
      panier.products.push({ produit: produitId, quantity });
    }

    panier.totalPrice = panier.products.reduce((total, item) => total + item.quantity * item.produit.price, 0);
    
    await panier.save();
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const panier = await Panier.findOne({ user: req.params.userId }).populate('products.produit');
    if (!panier) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(panier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
