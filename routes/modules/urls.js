// routes/modules/urls.js

const express = require('express')
const router = express.Router()
const URLlist = require('../../models/URL')


// routes setting 取得input value
router.post('/shorten', (req, res) => {
  // 收到長網址
  const original = req.body.original
  let message = ""

  // 比對是否有效
  function isValidHttpUrl (string) {
    let url = ""

    try { //試看看這個可能有錯的東西
      url = new URL(string);
      //constructor 利用字串建立URL, 可得其屬性
    } catch (MONGODB_URI) { //真的有錯, 就這麼做
      return false;
    }
    // boolean: 回報其協議是htt: 或https:
    return url.protocol === "http:" || url.protocol === "https:";
  }
  // 10進位轉62進位 (26大寫+26小寫+10數字)
  function ShortLink () {
    let str = '';
    const arr = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];
    for (let i = 0; i < 5; i++) {
      const pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    return str;
  }

  // 1. 比對是否有效
  if (isValidHttpUrl(original)) {
    let inputURL = ""
    let shorten = ""
    const base = "http://localhost:3000/"

    URLlist.find()
      .lean()
      .then((URL) => {
        // 2. 比對是否有在資料庫
        inputURL = URL.find((url) => url.original === original)
        // 3. 若有, 取出對應短網址
        if (inputURL) {
          shorten = base + inputURL.shorten
          return res.render('index', { original, shorten })
          // 4. 若無, 建立短網址進database
        }
        else {
          shorten = ShortLink()
          URLlist.create({
            original: original,
            shorten: shorten
          })
        }
      })
  } else {
    if (!original) {
      res.redirect("/")
    }
    message = "請再確認網址是否正確或有多餘空白！"
    res.render("index", { message })
  }
})

// route setting shorten to original URL 短網址跳轉到長網址
router.get("/:shorten", (req, res) => {
  const { shorten } = req.params;
  URLlist.findOne({ shorten: shorten })
    .lean()
    .then((relink) => {
      if (relink) {
        console.log(relink);
        // 302 暫時重定向, 多用於A/B test 活動頁, 不影響原本頁面
        res.status(302).redirect(relink.original);
      } else {
        // 客製化404 page
        res.status(404).render("error")
      }
    })
});

module.exports = router