// app.js
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

// 短網址功能
// 1: 長網址縮短
// 2: 短網址跳轉到長網址

// 流程設計
// A 將映射關係進行存儲，並可以取出回覆
// 收到長網址 input req.param req.body ?
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


