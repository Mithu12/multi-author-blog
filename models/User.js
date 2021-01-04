//name, email, password, profileId

const {Schema, model} = require('mongoose')
const {Profile} = {Profile:'Profile'}

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            trim: true,
            max: 15
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
            ref: Profile
        }
    },
    {
        timestamps: true
    }
    )


const User = model('USer', userSchema)

module.exports = User