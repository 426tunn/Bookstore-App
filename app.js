const express = require('express')
const bodyParser = require('body-parser')
const CONFIG = require('./config')
const rateLimit = require('express-rate-limit')
const logger = require('./logging/logger')
const helmet = require('helmet')
const {requiresAuth} = require('express-openid-connect')

const auth0Middleware = require('./auth/auth0')

const dbConnect = require('./db/mongodb')
const bookRouter = require('./routes/books.routes')
const authorRouter = require('./routes/authors.routes') 

const app = express()

dbConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth0Middleware);

app.use('/api/v1/books', requiresAuth(), bookRouter)
app.use('/api/v1/authors', requiresAuth(), authorRouter)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


//Security Middleware
app.use(helmet())

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.get('/', (req, res)=> {
    res.send('Bookstore live')
})

//error handler middleware
app.use((err, req, res, next)=> {
    logger.error(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

app.listen(CONFIG.PORT, ()=> {
    logger.info(`app listening on ${CONFIG.PORT}`)
}) 