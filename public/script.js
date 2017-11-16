
console.log("Sanity Check: JS is working!");

$(document).ready(() => {

  const listBooks = () => {
    $('.list-group').empty()
    fetch('https://mutably.herokuapp.com/books', {
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
                 <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 book-text">
                   <span class="book-title book-info">Title: ${title}</span>
                   <span class="book-author book-info">Author: ${author}</span>
                   <span class="book-releaseDate book-info">Release Date: ${releaseDate}</span>
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

const editBook = (id, bookObject) => {
    return fetch(`https://mutably.herokuapp.com/books/${id}`, {
      method: 'put',
      body: JSON.stringify(bookObject),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json()
        // if (response.ok) {
        //   return response.body
        // }
    })
}



  $('#addBook').on({
    click: function(e) {
      if ($('#title').val() && $('#author').val() && $('#releaseDate').val() && $('#image').val()) {
        addBookAjax(e)
      } else {
        $( ".add-book" ).append('<p>Must enter a movie</p>')
      }
  },
  });

$('.list-group').on('click','.btn-edit', function () {
  const book = $(this).parent().parent()
  const bookTitle = book.find('.book-title').text().slice(7)
  const bookAuthor = book.find('.book-author').text().slice(8)
  const bookRelease = book.find('.book-releaseDate').text().slice(14)
  const bookImageUrl = book.find('.book-image').attr('src')

    $(this).replaceWith('<button type="submit" class="btn btn-block btn-success btn-save">Save</button>')
    book.find('.book-title').replaceWith(`<input type="text" name="editTitle" required value="${bookTitle}" id="edit-title" class="edit-text">`)
    book.find('.book-author').replaceWith(`<input type="text" name="editAuthor" required value="${bookAuthor}" id="edit-author" class="edit-text">`)
    book.find('.book-releaseDate').replaceWith(`<input type="text" name="editReleaseDate" required value="${bookRelease}" id="edit-releaseDate" class="edit-text">`)
    book.find('.book-text').append(`<input type="text" name="editImage" required value="${bookImageUrl}" id="edit-image" class="edit-text">`)
})

$('.list-group').on('click','.btn-save', async function () {
  const book = $(this).parent().parent()
  const bookId = book.attr('id')
  const editTitle = book.find('#edit-title').val()
  const editAuthor = book.find('#edit-author').val()
  const editRelease = book.find('#edit-releaseDate').val()
  const editImage = book.find('#edit-image').val()

  const bookObject = {
    _id: bookId,
    title: editTitle,
    author: editAuthor,
    image: editImage,
    releaseDate: editRelease
  }

  const bookData = await editBook(bookId, bookObject)
  listBooks()
})

$('.list-group').on('click', '.btn-delete', async function() {
  const book = $(this).parent().parent()
  const bookId = book.attr('id')
  await fetch(`https://mutably.herokuapp.com/books/${bookId}`, {
    method: 'delete',
  })
  listBooks()
})

});
