const { userModel } = require('./../model/user')
const { jwtToken } = require('./../utils/jwt')


async function signUp(req, res) {
    try {
        const body = req.body
        const newUser = await userModel.create(body)
        if (!newUser) {
            return res.status(400).json({ result: 'FAIL', Message: 'fill in the correct details pls' })
        }

        const token = await jwtToken(newUser._id)

        res.cookie('jwt', token, { httpOnly: true });
        res.status(201).json({ result: "SUCCESS", Message: 'You have succesfully signed Up', token, userProfile: newUser })
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }
}
async function Login(req, res) {
    try {
        const loginDetails = req.body
        // confirm if user exist
        const isValidUser = await userModel.findOne({ email: loginDetails.email })
        if (!isValidUser){
            return res.status(404).json({ messag: 'this user is not found. kindly sign up' })}
        // compare user password
        const isValidPassowrd = await isValidUser.isValidPassword(loginDetails.password, isValidUser.password)
        // console.log(isValidPassowrd)
        // console.log(isValidUser)

        if (!isValidPassowrd) {
            return res.status(401).json({ result: 'FAIL', message: 'invalid email or password' })
        }
        // generate a token for use
        const token = await jwtToken(isValidUser._id)

        res.cookie('jwt', token, { httpOnly: true });
        // console.log(req.cookies)
        res.status(200).json({ result: "SUCCESS", Message: 'You are logged in now', token, user: isValidUser })
    } catch (err) {
        res.status(500).json({ message: "internal server error /login", error: err.message })
    }
}


async function updateProfile(req, res) {
    try {
        const updatesDetails = req.body
        const updatedUser = userModel.findByIdAndUpdate(req.user, updatesDetails, { new: true, runValidators: true })
        if (updatedUser) res.status(200).json({ result: "Success", message: 'user details has been succefully updated' })
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}
async function deleteAcct(req, res) {
    try {

        const deleteUser = await userModel.findByIdAndUpdate(req.user._id)
        if (deleteUser) res.status(203).json({ result: "Success", message: 'Account deletion successful' })
    } catch (err) {
        res.status(500).json({ message: "internal server error", error: err.message })
    }

}
module.exports = { signUp, updateProfile, deleteAcct, Login }