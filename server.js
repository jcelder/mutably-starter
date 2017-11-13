const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.use(express.static('public'))

// set 'html' as the engine, using ejs's renderFile function
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  fetch('https://mutably.herokuapp.com/books', {
    method: 'get',
  }).then((apiRes) => {
    return apiRes.json()
  }).then((json) => {
    console.log(json)
    res.render('index', { books: json.books })
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
