const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization, Origin, X-Requested-With")
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE")
    }
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CONTROLLERS
app.use('/api/users', require('./controllers/usersController'))
app.use('/api/products', require('./controllers/productsController'))

module.exports = app