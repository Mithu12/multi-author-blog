//name, email, password, profileId

const {Schema, model} = require('mongoose')

const userSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            required: true,
            type: String
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile'
        }
    },{timeStamp: true})


const User = model('USer', userSchema)

module.exports = User