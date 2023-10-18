const express = require('express')
const userController = require('./../controller/userController')
const auth = require('./../controller/authController')
const userRouter = express.Router()


userRouter.delete('/delete_account', userController.deleteAcct)
userRouter.patch('/Update_profile', userController.updateProfile)
userRouter.post('/sign_Up', userController.signUp)
userRouter.post('/login', userController.Login)

userRouter.post('/logout',auth.isLoggedIn, userController.logout)


module.exports = { userRouter }