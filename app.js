const express = require('express')
const cookieParser = require("cookie-parser")
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const { mongoDbConnection } = require('./config')
const { taskRouter } = require('./routes/taskRoute')
const { userRouter } = require('./routes/userRoutes')

require('dotenv').config()
const PORT = process.env.PORT

// connection
const app = express()
mongoDbConnection()

// Template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// middleWare
app.use(helmet())
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// routes
app.use('/api/v1', userRouter)
app.use('/api/v1', taskRouter)

app.get('/', (req, res) => {
    res.status(200).render('base')
})

// app.all('*')
app.listen(PORT, () => {
    console.log('Server is up and paying attention')
})

