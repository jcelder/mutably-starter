
console.log("Sanity Check: JS is working!");

$(document).ready(() => {

  const listBooks = () => {
    window.fetch('https://mutably.herokuapp.com/books', {
      method: 'get',
    }).then((apiRes) => {
      return apiRes.json()
    }).then((json) => {
      return json.books
    }).then((books) => {
      books.map((book) => {
        const title = book.title
        const author = book.author
        const releaseDate = book.releaseDate
        const image = book.image
        const bookHtml = `<li class="book-info">
          <span class="book-title">Title: ${title}</span>
          <span class="book-author">Author: ${author}</span>
          <span class="book-releaseDate">Release Date: ${releaseDate}</span>
          <img src='${image}' class="book-image">
          </li>`
        $('.list-group').append(bookHtml)
      })
    })
  }

  $('#list-books').on('click', () => {
    listBooks()
  })
});
