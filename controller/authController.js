const jwt = require('jsonwebtoken')
const { userModel } = require('./../model/user')

const isAuthenticated = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            return token
        }
        if (req.cookies) var token = req.cookies.jwt
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const date = new Date
        const time = parseInt(date.getTime() / 1000)
        const user = await userModel.findById(decodedToken.id)

        if (user && decodedToken.iat < time)
            req.user = user

        return next()
    } catch (error) {
        res.status(500).json({ result: 'error', error })

    }
}
const isLoggedIn = async (req, res, next) => {
    try {

        if (req.cookies.jwt) {
            const decodedToken = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
            const date = new Date
            const time = parseInt(date.getTime() / 1000)
            const user = await userModel.findById(decodedToken.id)

            if (user && decodedToken.iat < time)
                res.locals.user = user

        }
        return next()

    } catch (error) {
        res.status(500).json({ result: 'error', message: error.message })

    }

}

module.exports = { isAuthenticated, isLoggedIn }