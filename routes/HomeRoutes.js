const router = require('express').Router()


router.get('/', (req, res) => {
    res.render('pages/Home/home', {title: 'create account', message: req.flash()})
})

module.exports = router