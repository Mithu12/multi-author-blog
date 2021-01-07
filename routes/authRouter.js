const router = require('express').Router()

const signupValidator = require('../validator/signupFormValidator')

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
router.post('/login', postLogin)


router.get('/logout', logout)


module.exports = router