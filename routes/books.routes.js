const booksController = require('../controllers/books.controller')
const {AddBookValidationMw, UpdateBookValidationMw } = require('../validators/books.validator')
const express = require('express')

const bookRouter = express.Router()

bookRouter.get('/', booksController.getAllBooks)
bookRouter.post('/', AddBookValidationMw, booksController.addBook)
bookRouter.get('/:id', booksController.getBookByID)
bookRouter.put('/:id', UpdateBookValidationMw, booksController.updateBook)
bookRouter.delete('/:id', booksController.deleteBookByID)

module.exports = bookRouter