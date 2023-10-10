const express = require('express')
const taskRouter = express.Router()
const taskController= require('./../controller/task controller')


taskRouter.get('/allTask', taskController.getAll)
taskRouter.patch('/updateTask', taskController.updateTask)
taskRouter.post('/createTask', taskController.createNewTask)
taskRouter.delete('/delete', taskController.deleteTask)

module.exports = { taskRouter }