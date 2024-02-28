const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')



const createProduct = asyncHandler( async (req, res) => {
    const {
        name,
        sku,
        category,
        brand,
        quantity,        
        description,
        image,
        regularPrice,
        price,
        color,
    } = req.body

    if(!name || !category || !brand ||!quantity ||!price || !description) {
        res.status(400)
        throw new Error("Please fill in all fields")
    }

    // create Product

    const product = await Product.create({
        name,
        sku,
        category,
        brand,
        quantity,        
        description,
        image,
        regularPrice,
        price,
        color,
    })
    res.status(201).json(product)
}) 


//get Product

const getProducts = asyncHandler( async (req, res) => {
     const products = await Product.find().sort('-createdAt') 
     res.status(201).json(products)

})

const getProduct = asyncHandler( async (req, res) => {
   
   
     const product = await Product.findById(req.params.id)
      if(!product){
        res.status(404)
        throw new Error("Product Not Found")
     }
     res.status(201).json(product)


})



//delete Product
const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("Product Not Found")
    }
    await product.delete()
    res.status(200).json({message : 'Product Deleted' })

    

})


//Update Product

const updateProduct = asyncHandler( async (req, res) => {
    const { name,
        category,
        brand,
        quantity,        
        description,
        image,
        regularPrice,
        price,
        color,} = req.body

    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error("Product Not Found")
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        { _id : req.params.id},
        {
            name,
        category,
        brand,
        quantity,        
        description,
        image,
        regularPrice,
        price,
        color,
        },
        {
            new: true,
            runValidators: true

        }   
    )
    res.status(201).json(updatedProduct)


})



module.exports = {
    createProduct, getProducts, getProduct, deleteProduct,updateProduct
}