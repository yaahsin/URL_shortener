// route/modules/home.js

const express = require('express')
const router = express.Router()
const URLlist = require('../../models/URL')

// route setting 首頁
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router