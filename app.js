const express = require('express')
const mongoose = require('mongoose')
// const Router = require('./routes/Routes')

const app = express()
const PORT = process.env.PORT || 8000


app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>')
})
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.use(Router)     //without prefix

// app.use('/f', Router)   //with prefix

app.set('view engine', 'ejs')


mongoose.connect('mongodb://localhost:27017/multi_user_blog', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running at current port: ${PORT}`)
        })
    })
    .catch(e => {
        console.log(e)
    })
