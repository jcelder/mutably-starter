const express = require('express')
const fetch = require('node-fetch')
const ejs = require('ejs');

const app = express()

app.use(express.static('public'))

// set 'html' as the engine, using ejs's renderFile function

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

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
