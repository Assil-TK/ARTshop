const express = require('express');
const router = express.Router();
const panierController = require('../Controllers/panierController');

router.post('/add', panierController.addToCart);
router.get('/:userId', panierController.getCart);

module.exports = router;
