const express = require('express')
const app = express()

app.use(express.static('public'))

// set 'html' as the engine, using ejs's renderFile function
app.set('view engine', 'pug')

app.get('/', (request, response) => {
  fetch('https://mutably.herokuapp.com/books', {
    method: 'get'
  }).then((books) => {
    response.render('index', { books: books })
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
