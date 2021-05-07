const express = require('express')
//================================ middleware
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
//============================== custom middlewares
const {bindUserWithRequest} = require('./authMiddleware')
const setLocals = require('./setLocals')
const config = require('config');


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
// console.log(config)

module.exports = (app) => {
    app.use(middleWares)
}