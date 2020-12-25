// title, body, author, tags, thumbnail, likes, dislike, comments, readTime
const {Schema, model} = require('mongoose')
const {Comment, User} = require('./Models')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: User
    }],
    dislike: [{
        type: Schema.Types.ObjectId,
        ref: User
    }],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: Comment
        }
    ],
    readTime: String,

}, {timeStamp: true})

const Post = model('Post', postSchema)

module.exports = Post