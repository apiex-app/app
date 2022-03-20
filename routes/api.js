const app = require('../config/app')
const router = require('express').Router()
const bodyParser = require('body-parser')
const validation = require('../config/validation')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

module.exports = router
