const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A user must have an emmail'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Invalid email address',
        },
    },
    photo: {
        type: String,
        trim: true,
        default: 'TackleDefaultPics.png'
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true
    }
})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = ''
})
userSchema.methods.isValidPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const userModel = mongoose.model('user', userSchema)
module.exports = { userModel }