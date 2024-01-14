const express = require('express');
const router = express.Router()

const paint_controller = require('./controllers/paint_controller')
router.get('/paint', paint_controller.wrapped_method(paint_controller.index))

const server = express()
server.use('/api', router)

module.exports = server;