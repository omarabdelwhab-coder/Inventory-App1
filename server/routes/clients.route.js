const express = require('express')
const clientController = require('../controllers/clients.controller.js')
const router =express.Router()
router.get('/',clientController.getAllClients)
router.put('/:clientName',clientController.updateClient)
router.post('/',clientController.addClient)


module.exports = router;
