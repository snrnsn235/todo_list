const express = require('express')
const router = express.Router()
const todo = require('./todo')
const word = require('./word')

router.use('/todos', todo) // api/todos/app.get('/edit')
router.use('/words', word)
module.exports = router
