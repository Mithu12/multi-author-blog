const router = require('express').Router()

const {
    login,
    signup,
    postLogin,
    postSignup,
    logout
} = require('../controller/authController')




module.exports = router