const express = require('express')
const cashController = require('../controllers/cash.controller.js')
const router =express.Router()
router.get('/',cashController.getCash)


module.exports = router;
