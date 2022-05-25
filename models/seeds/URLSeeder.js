// models/URLSeeder.js

const URL = require('../URL')
// 取得上上一層目錄的json檔資料
const db = require('../../config/mongoose')
const URLlist = require('../URLlist.json').results

db.once('open', () => {
  console.log('mongodb connected!')
  URL.create(URLlist)
})