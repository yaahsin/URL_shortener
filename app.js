// app.js
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const res = require('express/lib/response')
const URLlist = require('./models/URL')
const mongoose = require('mongoose') // 載入 mongoose

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// route setting 首頁
app.get('/', (req, res) => {
  res.render('index')
})

// routes setting 取得input value
app.get('/shorten', (req, res) => {
  // 收到長網址 input req.query
  const original = req.query.original
  // 1. 比對是否有效
  function isValidHttpUrl (string) {
    let url

    try { //試看看這個可能有錯的東西
      url = new URL(string);
      //constructor 利用字串建立URL, 可得其屬性
    } catch (MONGODB_URI) { //真的有錯, 就這麼做
      return false;
    }
    // boolean: 回報其協議是htt: 或https:
    return url.protocol === "http:" || url.protocol === "https:";
  }

  if (isValidHttpUrl(original)) {
    let inputURL = ""
    let shorten = ""
    const base = "http://localhost:3000/"

    URLlist.find()
      .lean()
      .then((URL) => {
        inputURL = URL.find((url) => url.original === original)
        // 2. 比對是否有在資料庫
        // 3. 若有, 取出對應短網址
        if (inputURL) {
          shorten = base + inputURL.shorten
          console.log(shorten)
          return res.render('index', { original, shorten })
        }
      })
  } else {
    console.log("invalid URL")
  }


  // 4. 若無, 建立短網址進database

})

function Errorlog (e) {
  console.log(e)
}

// 比對新的內容
app.post('/', (req, res) => {
  const original = req.query.original
  const base = "http://localhost:3000/"

  URLlist.find()
    .lean()
    .then((URL) => {
      let inputURL = URL.find((url) => url.original === original)
    })

})

// route setting shorten to original URL 短網址跳轉到長網址
app.get('/:shorten', (req, res) => {
  const shortLink = req.params.shorten
  URLlist.findOne({ shorten: shortLink })
    .lean()
    .then((relink => {
      if (relink) {
        console.log(relink)
        res.status(301).redirect(relink.original)
      }
    }))
    .catch(() => { res.sendStatus(404) })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

// 短網址功能
// 1: 長網址縮短
// 2: 短網址跳轉到長網址

// 流程設計
// A 將映射關係進行存儲，並可以取出回覆
// 收到長網址 input req.query
// 1. 比對是否有效
// 2. 比對是否有在資料庫
// 3. 若有, 取出對應短網址
// 4. 若無, 建立短網址進database
// 10進位轉62進位 (26大寫+26小寫+10數字)
// 長短網址資料存進database _id產生沒問題

// 點選連結, 可查找對應長網址
// 1. 比對是否有效
// 2. 比對是否有在資料庫
// 3. 有效則導入對應route
// 302跳轉
// 4. 無效則顯示404錯誤


