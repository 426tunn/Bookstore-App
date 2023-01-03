const mongoose = require('mongoose')
const CONFIG = require('../config')
const logger = require('../logging/logger')

mongoose.set({strictQuery: false})
function dbConnect() {
    mongoose.connect(CONFIG.MONGODB_URL)

    mongoose.connection.on('connected', ()=>{
        logger.info('mongoose connected')
    })
    mongoose.connection.on('error', (err)=>{
       logger.error('error occured', err)
    })
}


module.exports = dbConnect 