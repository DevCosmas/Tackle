const express = require('express')
const { mongoDbConnection } = require('./config')
const { taskRouter } = require('./routes/taskRoute')
const { userRouter } = require('./routes/userRoutes')

require('dotenv').config()
const PORT = process.env.PORT

// connection
const app = express()
mongoDbConnection()

// middleWare
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1', userRouter)
app.use('/api/v1', taskRouter)

// app.all('*')
app.listen(PORT, () => {
    console.log('Server is up and paying attention')
})

