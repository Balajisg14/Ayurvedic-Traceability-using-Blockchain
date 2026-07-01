const router = require('express').Router();
const Product = require('../models/Product');

// list products
router.get('/', async (req, res) => {
  const items = await Product.find().limit(100);
  res.json(items);
});

// create product (no auth for simplicity)
router.post('/', async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
});

module.exports = router;
