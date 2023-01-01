const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

//Define book schema
const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: [true, 'title must be unique']
    },
    shortDescription: {
        type: String,
        required: false
    },
    longDescription: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: true,
        max: [2022, 'Year must be less than or equal to 2022'] //validation with custom message
    },
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'ISBN must be unique'] //validation with custom message
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be greater than or equal to 0'] //validation with custom message
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    lastUpdated : {
        type: Date,
        default: Date.now
    },
});

// Export the model
module.exports = mongoose.model('Books', BookSchema); //collection name is Books. This is the name of the collection in the database