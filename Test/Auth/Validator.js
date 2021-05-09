const router = require('express').Router()
const uploader = require('../../middleware/ImageUploadMiddleware')
const {check, validationResult} = require('express-validator')

router.get('/validator', (req, res, next) => {
    // console.log(req.flash())
    // console.log(req.flash('success'))
    res.render('pages/Test/TestSignUp', {
        title: 'test signup',
        message: req.flash()
    })
})


router.post('/validator',uploader.single('testFile'), (req, res, next) => {

    let errors = validationResult(req)

    if (!errors.isEmpty()){
        req.flash('error', 'failed')
    }else {
        if (req.file)
            req.flash('success', 'image added')
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