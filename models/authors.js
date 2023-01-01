const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

//Define book schema
const AuthorSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: [true, 'title must be unique']
    },
    lastname: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
    },
    country: {  
        type: String,
        required: false,
   },
    books: {
        type: Array,
        default: []
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date, 
        default: Date.now
    }
});

// Export the model
module.exports = mongoose.model('Authors', AuthorSchema); //collection name is Books. This is the name of the collection in the database