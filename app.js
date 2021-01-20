const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const Router = require('./routes/Routes')

//============================== custom middlewares
const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

const app = express()
const PORT = process.env.PORT || 8000
const DBUrl = 'mongodb://localhost:27017/multi_user_blog'


// ======================================== session

const store = new MongoDBStore({
    uri: DBUrl,
    collection: 'sessions'
});


// ========================================middle wares
const middleWares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || "SECRET_KEY",
        resave: false,
        saveUninitialized: false,
        store: store,
    }),
    bindUserWithRequest(),
    setLocals()
]


app.use(middleWares)
app.use(Router)
app.get('/', (req, res) => {
    res.render('pages/Home/home', {title: 'create account'})
})


// ===================================setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')


mongoose.connect(DBUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running at current port: ${PORT} \n`)
        })
    })
    .catch(e => {
        console.log(e)
    })
