const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./dbConnect')
const userRouter = require('./user/userRouter')

const app = express()
const { apiPort } = config

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Native API!')
})

app.use('/api', userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
