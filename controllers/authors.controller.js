const authorModel = require('../models/authors')

exports.getAllAuthors = async(req, res) => {
    await authorModel.find()
        .then(authors => {
            res.send(authors)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

exports.getAuthorByID = async  (req, res) => {
    const id = req.params.id
    await authorModel.findById(id)
        .then(author => {
            res.status(200).send(author)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

exports.addAuthor = async (req, res) => {
    const author = req.body
    author.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    await authorModel.create(author)
        .then(author => {
            res.status(201).send(author)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

exports.updateAuthor = async (req, res) => {
    const id = req.params.id
    const author = req.body
    author.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    await authorModel.findByIdAndUpdate(id, author, { new: true })
        .then(newAuthor => {
            res.status(200).send(newAuthor)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

exports.deleteAuthorByID = async  (req, res)=> {
    const id = req.params.id
    await authorModel.findByIdAndRemove(id)
        .then(author => {
            res.status(200).send(author)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}
