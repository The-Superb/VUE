const mongodb = require('mongoose')
const User = require('./userSchema')
const auth = require('../../authentication/auth')
const encrypt = require('bcrypt')

exports.registerUser = (req, res) => {

    User.find({ email: req.body.email })
    .then(exits => {
        if (exits > 0) {
            return res.status(400).json({
                statusCode: 400,
                status: false,
                message: 'User with same email address already exists.'
            })
        }

        encrypt.hash(req.body.password, encrypt.genSaltSync(10), (error, hash) => {
            if(error) {
                return res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Error: Failed to create user password hash.'
                })                
            }

            const user = new User(
                {
                    _id:            new mongodb.Types.ObjectId,
                    firstName:      req.body.firstName,
                    lastName:       req.body.lastName,
                    email:          req.body.email,
                    passwordHash:   hash
                }
            )

            user.save()
            .then(() => {
                res.status(201).json({
                    statusCode: 201,
                    status: true,
                    message: 'User was successfully created.'
                })                 
            })
            .catch(error => {
                res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Unable to create user. Please contact the System Administrator.'
                })                   
            })
        })
    })
}

exports.loginUser = (req, res) => {
   
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user === null) {
            return res.status(401).json({
                statusCode: 401,
                status: false,
                message: 'Incorrect email address or password'
            })
        }

        try {
            encrypt.compare(req.body.password, user.passwordHash, (error, result) => {
                if (result) {
                    return res.status(200).json({
                        statusCode: 200,
                        status: true,
                        message: 'Authentication was successful.',
                        token: auth.genToken(user._id),
                        user: {
                            id: user._id,
                            email: user.email
                        }
                    })                
                }

                return res.status(401).json({
                    statusCode: 401,
                    status: false,
                    message: 'Incorrect email address or password'
                })    

            })
        }
        catch {
            return res.status(500).json({
                statusCode: 500,
                status: false,
                message: 'Unable to authenticate user. Please contact the System Administrator'
            })    
        }
    })
}