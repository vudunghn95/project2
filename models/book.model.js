const mongoose = require('../config/dbConnect');

const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name: String
});

const BookModel = mongoose.model('book',bookSchema);

module.exports = BookModel;