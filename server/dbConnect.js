const config = require('./config')
const mongoose = require('mongoose')

mongoose
    .connect(config.mongoURL, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
