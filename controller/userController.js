const { userModel } = require('./../model/user')
const { jwtToken } = require('./../utils/jwt')
const appError = require('./../utils/errohandler')


async function signUp(req, res, next) {
    try {
        const body = req.body
        const newUser = await userModel.create(body)
        if (!newUser) {
            return next(new appError('fill in the correct details pls', 400))
        }

        const token = await jwtToken(newUser._id)

        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ result: "SUCCESS", Message: 'You have succesfully signed Up', token, userProfile: newUser })
    } catch (err) {
        next(new appError(err, 500))
    }
}
async function Login(req, res, next) {
    try {
        const loginDetails = req.body
        // confirm if user exist
        const isValidUser = await userModel.findOne({ email: loginDetails.email })
        if (!isValidUser) {
            return next(new appError('this user is not found. kindly sign up', 404))
        }
        // compare user password
        const isValidPassowrd = await isValidUser.isValidPassword(loginDetails.password, isValidUser.password)


        if (!isValidPassowrd) {
            return next(new appError('invalid password or email', 401))
        }
        // generate a token for use
        const token = await jwtToken(isValidUser._id)

        res.cookie('jwt', token, { httpOnly: true });
        // console.log(req.cookies)
        res.status(200).json({ result: "SUCCESS", Message: 'You are logged in now', token, user: isValidUser })
    } catch (err) {
        next(new appError(err, 500))
    }
}


async function updateProfile(req, res, next) {
    try {
        const updatesDetails = req.body
        const updatedUser = userModel.findByIdAndUpdate(req.user, updatesDetails, { new: true, runValidators: true })
        if (updatedUser) res.status(200).json({ result: "Success", message: 'user details has been succefully updated' })
    } catch (err) {
        next(new appError(err, 500))
    }

}
async function deleteAcct(req, res, next) {
    try {

        const deleteUser = await userModel.findByIdAndUpdate(req.user)
        if (deleteUser) res.status(203).json({ result: "Success", message: 'Account deletion successful' })
    } catch (err) {
        next(new appError(err, 500))
    }

}

const logout = (req, res) => {


    res.clearCookie('jwt', {
        httpOnly: true
    })

    return res.status(200).json({ message: 'You have been successfully logged out' });
};


module.exports = { signUp, updateProfile, deleteAcct, Login, logout }