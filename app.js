const express = require('express')
const bodyParser = require('body-parser')
const CONFIG = require('./config')
const dbConnect = require('./db/mongodb')
const bookRouter = require('./routes/books.routes')
const authorRouter = require('./routes/authors.routes') 

const app = express()

dbConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)

app.get('/', (req, res)=> {
    res.send('Bookstore live')
})

//error handler middleware
app.use((err, req, res, next)=> {
    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(CONFIG.PORT, ()=> {
    console.log(`app listening on ${CONFIG.PORT}`)
}) 