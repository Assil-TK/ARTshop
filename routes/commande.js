const express = require('express');
const router = express.Router();
const commandeController = require('../Controllers/commandeController');

router.post('/place', commandeController.placeOrder);
router.get('/:userId', commandeController.getOrders);

module.exports = router;
