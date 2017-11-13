
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
        $('.list-group').prepend(bookHtml)
      })
    })
  }

  $('#list-books').on('click', () => {
    listBooks()
  })

  const addBookAjax = function(e){
    e.preventDefault()
    $.ajax({
          url: 'https://mutably.herokuapp.com/books',
          type: 'POST',
          data: {
                  'title':$('#title').val(),
                  'author':$('#author').val(),
                  'image':$('#image').val(),
                  'releaseDate':$('#releaseDate').val()
                },
          success: function (data) {
            listBooks()
          }
      });
  }

  $('#addBook').on({
    click: function(e){
      if($('#title').val() && $('#author').val() && $('#releaseDate').val() && $('#image').val()){
         addBookAjax(e)
       } else {
        $( ".add-book" ).append('<p>Must enter a movie</p>')
       }
    }
  });
});
