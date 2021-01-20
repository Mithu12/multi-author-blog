

const {body} = require('express-validator') 


const signInValidator = [
    body('email')
        .isEmail()
        .withMessage('Enter Valid Email')
        .normalizeEmail()
    ,
    body('password')
        .isLength({min: 6})
        .withMessage('Password must contain at least 6 characters')
]


module.exports = signInValidator