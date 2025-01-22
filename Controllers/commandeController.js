const Commande = require('../Models/commandeModel');
const Panier = require('../Models/panierModel');

// Place an order
exports.placeOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const panier = await Panier.findOne({ user: userId });
    if (!panier) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const commande = new Commande({
      user: userId,
      products: panier.products,
      totalPrice: panier.totalPrice,
      status: 'pending'
    });

    await commande.save();
    // Clear the cart after order
    panier.products = [];
    panier.totalPrice = 0;
    await panier.save();

    res.status(201).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's orders
exports.getOrders = async (req, res) => {
  try {
    const commandes = await Commande.find({ user: req.params.userId }).populate('products.produit');
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
