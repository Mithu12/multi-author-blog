const User = require('../models/User')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLogged) {
            return next()
        }

        try {
            const user = await User.findById(req.session.user._id)
            req.user = user
            req.isLogged = true
            next()
        }catch (e) {
            next(e)
        }

    }
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.session.isLogged)
        return res.redirect('/login')
    next()
}
exports.isLoggedIn = (req, res, next) => {
    if (req.session.isLogged)
        return res.redirect('/dashboard')
    next()
}