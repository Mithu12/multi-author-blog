

const {body} = require('express-validator')
const User = require('../../models/User')


const signupValidator = [
    body('userName')
        .isLength({min: 2, max: 15})
        .withMessage("User Name Must Be Between 2 to 15 Characters")
        .custom(async (username) => {
            let user = await User.findOne({username})
            if (user) {
                return Promise.reject('Username Already Exists')
            }
        })
        .trim()
    ,
    body('email')
        .isEmail()
        .withMessage('Enter Valid Email')
        .custom(async (email) => {
            let user = await User.findOne({email})
            if (user) {
                return Promise.reject('Email Already Exists')
            }
        })
        .normalizeEmail()
    ,
    body('password')
        .isLength({min: 6})
        .withMessage('Password must contain at least 6 characters')
    ,
    body('confirmPassword')
        .custom((confPass, {req}) => {
            if (confPass !== req.body.password) {
                throw new Error('Password does not match')
            }
            return true
        })
]


module.exports = signupValidator