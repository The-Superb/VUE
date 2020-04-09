const route = require('express').Router()
const userModel = require('../models/user/userModel')

route.post('/register', userModel.registerUser)
route.post('/login', userModel.loginUser)

module.exports = route