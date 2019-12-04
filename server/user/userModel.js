const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        name: { type: String, required: true },
        dob: { type: Date, required: false },
        email: { type: String, required: true },
        phone: { type: String, required: false },
    }
)

module.exports = mongoose.model('users', User)
