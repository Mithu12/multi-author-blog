const authRoutes = require('./authRouter')
const homeRoutes = require('./HomeRoutes')
const dashboardRoutes = require('./DashboardRoute')
const validatorTestRoutes = require('../Test/Auth/Validator')

routes = [
    authRoutes,
    homeRoutes,
    dashboardRoutes,
    validatorTestRoutes, // todo temp block


]


module.exports = (app) => {
    app.use(routes)
    app.use((req, res, next)=>{
        let error = new Error('404 page not found')
        error.status = 404
        next(error)
    })
    app.use((error, req, res, next)=>{
        if (error.status === 404)
            return res.render('pages/Errors/404',{
                title:'404 not found',
                message: req.flash()
            })

        return res.render('pages/Errors/500',{
            title:'Something went wrong',
            message: req.flash()
        })
    })
}
