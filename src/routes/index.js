const express = require('express')
const router = express.Router();

const UserController = require('../controllers/UserController')

router.post('/users', UserController.create)
router.put('/users/:id', UserController.update)
router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.delete('/users', UserController.wipe)
router.delete('/users/:id', UserController.delete)

module.exports = router