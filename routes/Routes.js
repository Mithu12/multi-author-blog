const authRoutes = require('./authRouter')
const dashboardRoutes = require('./DashboardRoute')




const validatorTestRoutes = require('../Test/Auth/Validator')


module.exports = [
    authRoutes,
    dashboardRoutes,
    validatorTestRoutes, // todo temp block

]