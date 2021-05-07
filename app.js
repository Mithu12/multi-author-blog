require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Router = require('./routes/Routes')

//================================ middleware
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
//============================== custom middlewares
const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')
const config = require('config');

const app = express()
const PORT = config.get('port')
const DBUrl = `mongodb://${config.get('db_username')}:${config.get('db_password')}/multi_user_blog`


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
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: store,
    }),
    bindUserWithRequest(),
    setLocals(),
    flash()
]
// ========================================= config
console.log(config)


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
