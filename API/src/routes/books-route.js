const express = require('express')
const router = express.Router()
const controller = require('../controllers/books-controller')

router.post('/', controller.post)
router.get('/', controller.get)
router.put('/:id', controller.put)
router.put('/loan/:id', controller.putLoan)
router.put('/read/:id', controller.putRead)

module.exports = router
