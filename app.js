require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const setRoutes = require('./routes/Routes')
const setMiddlewares = require('./middleware/Middlewares')

const config = require('config');
const chalk = require('chalk');

const app = express()
const PORT = config.get('port')
const DBUrl = `mongodb://${config.get('db_username')}:${config.get('db_password')}/multi_user_blog`


setMiddlewares(app)
setRoutes(app)



// ===================================setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')


mongoose.connect(DBUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(chalk.green('db connected'))
        app.listen(PORT, () => {
            console.log(chalk.green.inverse(`server running at current port: ${PORT} \n`))
        })
    })
    .catch(e => {
        console.log(e)
    })
