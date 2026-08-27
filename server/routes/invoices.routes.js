const express = require('express')
const invoicesController =require('../controllers/invoices.controller.js')
const router=express.Router()
router.route('/')
   .get(invoicesController.getAllInvoices)
   .post(invoicesController.addInvoices)
router.get('/:id',invoicesController.getById)
module.exports = router;   