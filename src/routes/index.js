const express = require('express')
const router = express.Router();

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

router.post('/users', UserController.create)
router.put('/users/:id', UserController.update)
router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.delete('/users', UserController.wipe)
router.delete('/users/:id', UserController.delete)

router.post('/session', SessionController.create)
router.get('/session', SessionController.index)
router.get('/session/:id', SessionController.show)

module.exports = router