const express = require('express');
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddelware');
const router = express.Router()



router.post('/', protect, adminOnly, createProduct)
router.get('/', getProducts)
router.get('/:id', getProduct)
router.delete('/:id',protect, adminOnly, deleteProduct)
router.patch('/:id',protect, adminOnly, updateProduct)



module.exports = router