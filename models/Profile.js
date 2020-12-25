// user, title, bio, profilePic, posts, bookmarks, links{fb, twitter, ...}

const {Schema, model} = require('mongoose')
const {Post, User} = require('./Models')
const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        maxlength: 50
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    profilePic: String,
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ],
    links: {
        fb: String,
        twitter: String,
        github: String,
        website: String
    },
}, {timeStamp: true})

const Profile = new model("Profile", profileSchema)

module.exports = Profile