const router = require('express').Router()

const signInValidator = require('../validator/Auth/signInFormValidator')

const signupValidator = require('../validator/Auth/signupFormValidator')
const {isLoggedIn} = require('../middleware/authMiddleware')

const {
    login,
    signup,
    postLogin,
    postSignup,
    logout
} = require('../controller/authController')

router.get('/signup', isLoggedIn, signup)
router.post('/signup', isLoggedIn, signupValidator , postSignup)


router.get('/login', isLoggedIn, login)
router.post('/login', isLoggedIn, signInValidator, postLogin)


router.get('/logout', logout)


module.exports = router