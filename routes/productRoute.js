const express = require('express');
const { createProduct, getProducts, getProduct } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddelware');
const router = express.Router()



router.post('/', protect, adminOnly, createProduct)
router.get('/', getProducts)
router.get('/:id', getProduct)



module.exports = router