
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
        const id = book._id
        const title = book.title
        const author = book.author
        const releaseDate = book.releaseDate
        const image = book.image
        const bookHtml = `
        <li class="book-info" id="${id}">
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

$(document).on('click','.btn-edit', function () {
  const book = $(this).parent().parent()
  const bookId = book.attr('id')
$(this).replaceWith('<button type="submit" class="btn btn-block btn-success btn-save">Save</button>')
book.find('.book-title').replaceWith('<input type="text" name="editTitle" required placeholder="Enter book title" id="edit-title">')
book.find('.book-author').replaceWith('<input type="text" name="editAuthor" required placeholder="Enter book author" id="edit-author">')
book.find('.book-releaseDate').replaceWith('<input type="text" name="editReleaseDate" required placeholder="Enter book release date" id="editReleaseDate">')

  // book.querySelectorAll('.book-title')
})


});
