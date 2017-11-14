
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
        const bookHtml = `
        <li class="book-info">
          <div class="container-fluid">
             <div class="row">
             <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                 <img src='${image}' class="book-image">
             </div>
                 <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                   <span class="book-title">Title: ${title}</span>
                   <span class="book-author">Author: ${author}</span>
                   <span class="book-releaseDate">Release Date: ${releaseDate}</span>
                 </div>
             </div>
             <button type="submit" class="btn btn-block btn-info btn-edit">Edit</button>
             <button type="submit" class="btn btn-block btn-danger btn-delete">Delete</button>
          </div>
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
