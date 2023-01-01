const bookModel = require('../models/books')

exports.getAllBooks = async (req, res) => {
  await  bookModel.find()
        .then(books => {
            res.send(books)
        })
        .catch(err => {
            console.log('No book(s) yet!', err)
            res.send(err)
        })
}

exports.getBookByID = async (req, res) => {
    const id = req.params.id
  await  bookModel.findById(id)
        .then(book => {
            res.status(200).send(book)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

exports.addBook = async (req, res)=> {
    const book = req.body
    book.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
   await bookModel.create(book)
        .then(book => {
            res.status(201).send(book)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

exports.updateBook = (req, res)=> {
    const id = req.params.id
    const book = req.body
    book.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    bookModel.findByIdAndUpdate(id, book, { new: true })
        .then(newBook => {
            res.status(200).send(newBook)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}
exports.deleteBookByID = async (req, res)=> {
    const id = req.params.id
    await bookModel.findByIdAndRemove(id)
        .then(book => {
            res.status(200).send(book)
        }).catch(err => {
            console.log(err)
           res.status(500).send(err)
        })
}
