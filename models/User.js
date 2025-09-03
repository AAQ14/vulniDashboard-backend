const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)
module.exports = User