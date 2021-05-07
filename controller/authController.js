const User = require('../models/User')
const bcrypt = require('bcrypt')

const {validationResult} = require('express-validator')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signup = (req, res, next) => {

    console.log(req.session.isLogged)
    console.log(req.session.user)


    res.render('pages/Auth/signup', {title: 'create account', errors: {}, values: {}})
}


exports.postSignup = async (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormatter)
    const {email, userName, password} = req.body
    if (!errors.isEmpty()) {
        // console.log(errors.mapped())
        return res.render('pages/Auth/signup', {
            title: 'create account',
            errors: errors.mapped(),
            values: {
                email, userName, password
            }
        })
    }


    try {
        let hashPass = await bcrypt.hash(password, 11)
        let user = new User({
            username: userName,
            password: hashPass,
            email
        })
        let createdUser = await user.save()
        console.log('User Created Successfully', createdUser)
        res.redirect('/login')
    } catch (e) {
        console.log(e)
        next(e)
    }


}


exports.login = (req, res, next) => {

    res.render('pages/Auth/login', {title: 'login', errors: {}, values: {}})
}


exports.postLogin = async (req, res, next) => {
    const {email, password,} = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        return res.render('pages/Auth/login',
            {
                title: 'login',
                errors: errors.mapped(),
                values: {email, password}

            }
        )
    }

    try {
        let user = await User.findOne({email})
        if (!user) {
            return res.json({
                message: 'invalid email or password'
            })
        }
        let matched = await bcrypt.compare(password, user.password)
        if (!matched) {
            return res.json({
                message: 'invalid email or password'
            })
        }

        req.session.isLogged = true
        req.session.user = user
        req.session.save(err=>{
            if (err)
            {
                console.log(err)
                return next(err)
            }
            return res.redirect('/dashboard')
        })

    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.logout = (req, res, next) => {
    req.session.destroy(err=>{
        if (err){
            console.log(err)
            return next(err)
        }
        return res.redirect('/login')
    })
}