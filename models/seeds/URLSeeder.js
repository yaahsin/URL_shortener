// models/URLSeeder.js

const mongoose = require('mongoose')
const URL = require('../URL')
// 取得上上一層目錄的json檔資料
const URLlist = require('../URLlist.json').results

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  URL.create(URLlist)
})