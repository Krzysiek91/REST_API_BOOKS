$(document).ready(function () {

    books();
});


// function to correct
function books() {

    $.ajax({
        url: "api/books.php",
        type: 'GET',
      //  data: "author, name, book_desc",
        dataType: 'JSON',

        success: function (data) {

            var booksTable = $('table.books');

            console.log(data);

            for (var index in data){

                var bookData =
                    $('<tr>' +
                    '<td>' + data[index].name + '</td>' +
                    '<td>' + data[index].author + '</td>' +
                    '</tr>');

                var bookDescription =
                    $('<tr>' +
                    '<td>' + data[index].book_desc + '</td>' +
                    '</tr>');

                booksTable.append(bookData);
                booksTable.append(bookDescription);

            }
        }
    })
}
