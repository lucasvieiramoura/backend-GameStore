const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/authMiddleware');

//1. Rota para listar todos os produtos: GET /api/products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao buscar produtos.'});
    }
});

//2. Rota para adicionar um novo produto: POST /api/products
router.post('/products', auth, async (req, res) => {
    try { 
        const {name, description, price, category, imageUrl} = req.body;
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            imageUrl
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao criar produto.'});
    }
});

module.exports = router;