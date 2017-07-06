$(document).ready(function () {

    books();
});

var booksListContainer = $('.books-list');


function books() {

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
                var row = $('<div class="row" data-id="' + id + '">');

                var divColName = $('<div>').addClass('name').addClass('col-xs-4');
                divColName.text(data[index]['name']);

                var divColAuthor = $('<div>').addClass('author').addClass('col-xs-4');
                divColAuthor.text(data[index]['author']);

                var divColDescription = $('<div>').addClass('description').addClass('col-sm-8');
                divColDescription.text(data[index]['book_desc']);

                row.append(divColName);
                row.append(divColAuthor);
                row.append(divColDescription);

                booksListContainer.append(row);
            }
        }
    })

    booksListContainer.on('click', 'div.name', function (event) {
        var bookID = $(this).parent().data('id');
        var divDesc = $(this).next().next();

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


}

