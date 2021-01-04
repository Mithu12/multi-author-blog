const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.signup = (req, res, next) => {
    res.render('pages/Auth/signup', {title: 'create account'})
}
exports.postSignup = async (req, res, next) => {
    const {email, userName, password, confirmPassword} = req.body

    try {
        let hashPass = await bcrypt.hash(password, 11)
        let user = new User({
            username: userName,
            password: hashPass,
            email
        })
        let createdUser = await user.save()
        console.log('User Created Successfully', createdUser)
    } catch (e) {
        console.log(e)
        next(e)
    }


    res.render('pages/Auth/signup', {title: 'create account'})

}



exports.login = (req, res, next) => {
    res.render('pages/Auth/login', {title: 'login'})
}



exports.postLogin = async (req, res, next) => {
    const {email, password, } = req.body

    try {
        let user = await User.findOne({email})
        if(!user){
            return res.json({
                message: 'invalid email or password'
            })
        }
        let matched = await bcrypt.compare(password, user.password)
        if(!matched){
            return res.json({
                message: 'invalid email or password'
            })
        }

        console.log('login successful', user)
        res.render('pages/Auth/login', {title: 'login'})
    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.logout = (req, res, next) => {

}