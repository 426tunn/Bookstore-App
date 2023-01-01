const mongoose = require('mongoose')
const CONFIG = require('../config')

mongoose.set({strictQuery: false})
function dbConnect() {
    mongoose.connect(CONFIG.MONGODB_URL)

    mongoose.connection.on('connected', ()=>{
        console.log('mongoose connected')
    })
    mongoose.connection.on('error', (err)=>{
        console.log('error occured', err)
    })
}


module.exports = dbConnect 