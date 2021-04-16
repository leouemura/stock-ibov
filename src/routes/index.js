const express = require('express')
const router = express.Router();

const UserController = require('../controllers/UserController')

router.post('/users', UserController.create)

module.exports = router