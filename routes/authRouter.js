const router = require('express').Router()

const {
    login,
    signup,
    postLogin,
    postSignup,
    logout
} = require('../controller/authController')

router.get('/signup', signup)
router.post('/signup', postSignup)


router.get('/login', login)
router.post('/login', postLogin)


router.get('logout', logout)


module.exports = router