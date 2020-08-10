const BookModel = require('../models/book.model');


function getAllBook(){
    return BookModel.find();
}

function updateBook(id,book){
    return BookModel.updateOne({
        _id : id
    },book);
}

function createBook(book){
    return BookModel.create(book);
}
 function deleteBook(id){
     return BookModel.deleteOne({
        _id : id
     });
 }

module.exports = {
    getAllBook,
    updateBook,
    createBook,
    deleteBook
}