const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const length_validator = (minimum_length) => {
    return (field) => field.length >= minimum_length
}

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [length_validator(3), 'too short']
    },
    passwordHash: String,
    name: String
})
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = {
    User,
}