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

        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({ result: "SUCCESS", Message: 'You have succesfully signed Up', token, userProfile: newUser })
    } catch (err) {
        res.status(500).json({ message: "internal server error", err })
    }
}
async function Login(req, res) {
    const loginDetails = req.body
    // confirm if user exist
    const isValidUser = await userModel.findOne({ email: loginDetails.email })
    if (!isValidUser) return res.status(404).json({ messag: 'this user is not found. kindly sign up' })
    // compare user password
    const isValidPassowrd = await isValidUser.isValidPassword(loginDetails.password, isValidUser.password)
    if (!isValidPassowrd) return res.status(404).json({ messag: 'invalid email or password' })
    // generate a token for use
    const token = await jwtToken(isValidUser._id)

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ result: "SUCCESS", Message: 'You are logged in now', token, user: isValidUser })
}
async function updateProfile(req, res) {

}
async function deleteAcct(req, res) {

}
module.exports = { signUp, updateProfile, deleteAcct, Login }