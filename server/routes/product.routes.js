const express = require('express')
const productController =require('../controllers/prouductsController.js')
let router= express.Router()
router.route('/')
   .get(productController.getAllProducts)
   .post(productController.addProduct)

router.route("/id/:id")
    .get(productController.getById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)

router.get('/name/:name',productController.searchByname)    
module.exports = router;