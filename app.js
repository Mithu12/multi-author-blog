const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
// const Router = require('./routes/Routes')

const app = express()
const PORT = process.env.PORT || 8000

// ========================================middle wares
const middleWares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
]

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>')
})
app.use(middleWares)

// ===================================setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')


mongoose.connect('mongodb://localhost:27017/multi_user_blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running at current port: ${PORT}`)
        })
    })
    .catch(e => {
        console.log(e)
    })
