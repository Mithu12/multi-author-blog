// post, user, body, replies
const {Schema, model} = require('mongoose')
const {Post, User} = require('./Models')
// const {Post, User} = {Post:'Post', User:'User'}

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: Post,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    replies: [
        {
            body: {
                type: String,
                required: true
            },
            user:{
                type: Schema.Types.ObjectId,
                required: true,
                ref: User
            },
            createdAt: {
                type: Date,
                default: new Date()
            }
        }
    ],
}, {timeStamp: true})

const Comment = model('Comment', commentSchema)

module.exports = Comment