$(document).ready(function () {

    booksDisplay();
});

var booksListContainer = $('.books-list');

// Displaying all books that are in DB
function booksDisplay() {

    $.ajax({
        url: "api/books.php",
        type: 'GET',
        data: "author, name, book_desc",
        dataType: 'JSON',

        success: function (data) {

            console.log(data);

            for (var index in data) {

                // create div with row class and id from DB
                var id = data[index]['id'];

                var row1 = $('<div class="row" data-id="' + id + '">');
                var divTitle = $('<div>').addClass('title').addClass('col-xs-5');
                divTitle.html('<span class="glyphicon glyphicon-plus btn btn-xs plus"></span>&nbsp;' + data[index]['name']);
                var divAuthor = $('<div>').addClass('author').addClass('col-xs-5');
                divAuthor.text(data[index]['author']);
                var options = $('<div class="options"><span class="add btn btn-xs">add</span><span class="modify btn btn-xs">modify</span><span class="delete btn btn-xs">delete</span></div>').addClass('col-xs-2');

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
    })





    booksListContainer.on('click', '.plus', function (event) {
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



    var addForm = $('#addForm');

    booksListContainer.on('click', '.add' || '.cancle', function (event) {
        addForm.slideToggle();
    });

}

