$(document).ready(function () {

    books();
});


// function to correct
function books() {

    $.ajax({
        url: "api/books.php",
        type: 'GET',
        data: "author, name, book_desc",
        dataType: 'JSON',

        success: function (json) {

            var booksTable = $('table .books');

            for (var key in json){

                var bookData =
                    '<tr>' +
                    '<td>' + json[key].name + '</td>' +
                    '<td>' + json[key].author + '</td>' +
                    '</tr>';

                var bookDescription =
                    '<tr>' +
                    '<td>' + json[key].book_desc + '</td>' +
                    '</tr>';

                booksTable.append(bookData);
                booksTable.append(bookDescription);

            }
        }
    })
}
