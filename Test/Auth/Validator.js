const router = require('express').Router()

const {check, validationResult} = require('express-validator')

router.get('/validator', (req, res, next) => {
    // console.log(req.flash())
    // console.log(req.flash('success'))
    res.render('pages/Test/TestSignUp', {
        title: 'test signup',
        message: req.flash()
    })
})


router.post('/validator', [
    check('userName')
        .not()
        .isEmpty()
        .withMessage('Please provide user name ')
        .isLength({max: 15})
        .withMessage('Maximum allowed character 15')
        .trim(),

    check('email')
        .isEmail()
        .withMessage('Enter A valid Email')
        .normalizeEmail(),

    check('password')
        .custom((pass) => {
            if (pass.length < 8) {
                throw new Error('password must be 8 characters long')
            }
            return true
        }),

    check('confirmPassword')
        .custom((confPass, {req}) => {
            if (confPass !== req.body.password) {
                throw new Error('password did not match')
            }
            return true
        })
], (req, res, next) => {

    let errors = validationResult(req)

    if (!errors.isEmpty()){
        req.flash('error', 'failed')
    }else {
        req.flash('success', 'succeed')
    }

    // const errorFormatter = (error) => error.msg
    //
    // console.log(errors.isEmpty())
    // console.log(errors.mapped())
    // console.log(errors.array())
    // console.log(errors.formatWith(errorFormatter).mapped())


    res.redirect('/validator')
})

module.exports = router