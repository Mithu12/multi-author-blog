const router = require('express').Router()
const {dashboard} = require('../controller/DashboardController')
const {isAuthenticated} = require('../middleware/authMiddleware')



router.get('/dashboard',isAuthenticated, dashboard)



module.exports = router