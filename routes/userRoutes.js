const express = require('express')
const userController= require('./../controller/userController')
const userRouter = express.Router()


userRouter.patch('/Update_profile', userController.updateProfile)
userRouter.post('/sign_Up', userController.signUp)
userRouter.post('/login', userController.Login)
userRouter.delete('/delete_account', userController.deleteAcct)

module.exports = { userRouter }