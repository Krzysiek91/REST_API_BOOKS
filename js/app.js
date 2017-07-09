$(document).ready(function () {

    displayAllBooks();

    var booksListContainer = $('.books_list');

// Displaying all books that are in DB
    function displayAllBooks() {

        $.ajax({
            url: "api/books.php",
            type: 'GET',
            data: "author, name, book_desc",
            dataType: 'JSON',

            success: function (data) {

                var existingRows = booksListContainer.find('.row[data-id]');
                var existingRowsIDs = [];
                existingRows.each(function () {
                    existingRowsIDs.push($(this).data('id'));
                });

                for (var index in data) {
                    // create div with row class and id from DB
                    var id = data[index]['id'];

                    if ($.inArray(parseInt(id), existingRowsIDs) === -1) {

                        var row1 = $('<div class="row" data-id="' + id + '">');
                        var divTitle = $('<div>').addClass('title').addClass('col-xs-5');
                        divTitle.html('<span class="glyphicon glyphicon-plus btn btn-xs toggle_desc_btn"></span>&nbsp;' + data[index]['name']);
                        var divAuthor = $('<div>').addClass('author').addClass('col-xs-5');
                        divAuthor.text(data[index]['author']);
                        var options = $('<div class="options"><span class="modify_form_btn btn btn-xs">modify</span><span class="delete_book_btn btn btn-xs">delete</span></div>').addClass('col-xs-2');

                        row1.append(divTitle);
                        row1.append(divAuthor);
                        row1.append(options);
                        booksListContainer.append(row1);

                        var row2 = $('<div class="row">');
                        var divDescription = $('<div>').addClass('description').addClass('col-xs-12 col-xm-10');

                        row2.append(divDescription);
                        booksListContainer.append(row2);


                        var hr = $('<div class="hr">');
                        booksListContainer.append(hr);
                    }
                }
            }
        })
    }

//toggling description of each book
    booksListContainer.on('click', '.toggle_desc_btn', function (event) {
        var bookID = $(this).parent().parent().data('id');
        var divDesc = $(this).parent().parent().next().children();

        $.ajax({
            url: "api/books.php?id=" + bookID,
            type: 'GET',
            dataType: 'JSON',

            success: function (data) {
                var description = data[bookID]['book_desc'];
                divDesc.text(description);
                divDesc.slideToggle();
            }
        })
    });


//opening Add Book Form

    var addForm = $('#add_book_div');
    var openFormButton = $('.open_form_btn');

    openFormButton.on('click', function (event) {
        addForm.slideDown();
    });

//hide Add Book Form
    var hideAddFormButton = $('.hide_add_form_btn');

    hideAddFormButton.on('click', function (event) {
        addForm.slideUp();
    });


//adding book to DB
    var addBookButton = $('.add_book_btn');

    addBookButton.on('click', function (event) {

        event.preventDefault();

        var addBookForm = $('#add_book_form');
        // Serialize a form to a query string that could be sent to a server in an Ajax request.
        var serializedAddBookForm = addBookForm.serialize();

        $.ajax({
            url: "api/books.php",
            data: serializedAddBookForm,
            type: 'POST',

            success: function (data, textStatus, jqXHR) {

                //clear the form
                addBookForm.trigger('reset');
                displayAllBooks();
            }
        });
    });

    //deleting Book
    booksListContainer.on('click', '.delete_book_btn', function (event) {

        event.stopPropagation();
        event.preventDefault();

        var bookID = $(this).parent().parent().data('id');

        $.ajax({
            url: 'api/books.php?id=' + bookID,
            type: 'DELETE',

            success: function (){
    //removing selected book (title+author, description, hr)
                var row1ToDelete = $('.row[data-id=' + bookID + ']');
                var row2ToDelete = row1ToDelete.next();
                var hr = row2ToDelete.next();
                row1ToDelete.remove();
                row2ToDelete.remove();
                hr.remove();
            }
        });

    });

    //Open Modify Book Form with filled inputs with data from DB

    var modifyBookDiv = $('#modify_book_div');

    booksListContainer.on('click', '.modify_form_btn', function(event){

         event.stopPropagation();
         event.preventDefault();

        var bookID = $(this).parent().parent().data('id');

        $.ajax({
            url: 'api/books.php?id=' + bookID,
            type: 'GET',
            dataType: 'json',

            success: function (data){

                //modifyBookDiv.trigger('reset');
                //uploading data from DB and write in inputs

                modifyBookDiv.find('#modify_name').attr('value', data[bookID]['name']);
                modifyBookDiv.find('#modify_author').attr('value', data[bookID]['author']);
                modifyBookDiv.find('#modify_book_desc').text(data[bookID]['book_desc']);
            }
        });
        modifyBookDiv.slideDown();
    })

    //Hide Modify Book Form
    var hideModifyFormButton = $('.hide_modify_form_btn');

    hideModifyFormButton.on('click', function () {
        modifyBookDiv.slideUp();
    });


});































