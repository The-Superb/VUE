const jwt = require('jsonwebtoken')
const secretKey = "9a7ecb03-2250-4fa3-a835-a043b44aae1b"

exports.genToken = (id) => {
    return jwt.sign({ id: id }, secretKey, { expiresIn: "1h" })   
}

exports.checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        req.userData = jwt.verify(token, secretKey)
        next()
    }
    catch {
        return res.status(401).json({
            statusCode: 401,
            status: false,
            message: 'Access Restricted! Please login in.'
        })
    }
}