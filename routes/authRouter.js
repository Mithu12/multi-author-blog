const router = require('express').Router()

const signInValidator = require('../validator/Auth/signInFormValidator')

const signupValidator = require('../validator/Auth/signupFormValidator')

const {
    login,
    signup,
    postLogin,
    postSignup,
    logout
} = require('../controller/authController')

router.get('/signup', signup)
router.post('/signup', signupValidator , postSignup)


router.get('/login', login)
router.post('/login', signInValidator, postLogin)


router.get('/logout', logout)


module.exports = router