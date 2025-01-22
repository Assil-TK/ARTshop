const express = require('express');
const router = express.Router();
const produitController = require('../Controllers/produitController');

router.post('/create', produitController.createProduit);
router.get('/', produitController.getProduits);
router.get('/:id', produitController.getProduit);

module.exports = router;
