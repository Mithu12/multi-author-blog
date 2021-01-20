const User = require('../models/User')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLogged) {
            return next()
        }

        try {
            const user = await User.findById(req.session.user._id)
            req.user = user
            next()
        }catch (e) {
            console.log(e)
        }

    }
}