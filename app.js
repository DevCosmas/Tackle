const express = require('express')
const cookieParser = require("cookie-parser")
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const { mongoDbConnection } = require('./config')
const { taskRouter } = require('./routes/taskRoute')
const { userRouter } = require('./routes/userRoutes')
const viewRoute = require('./routes/viewRoute')
const appError = require('./utils/errohandler')
const errohandler = require('./controller/errorController')

require('dotenv').config()
const PORT = process.env.PORT

// connection
const app = express()
mongoDbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// csp config
// const cspConfig = {
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'"],
//     styleSrc: ["'self'"],
//     connectSrc: ["'self'", 'http://localhost:3000']
//   },
// };
// // middleWare
// app.use(helmet({
//   contentSecurityPolicy: cspConfig,
// }));
app.use(morgan('combined'))
app.use(cookieParser())




// routes
app.use('/api/v1', userRouter)
app.use('/api/v1', taskRouter)
app.use('/', viewRoute)

app.all('*', (req, res, next) => {
  next(new appError('page not found', 404))
});


app.use(errohandler)
app.listen(PORT, () => {
  console.log('Server is up and paying attention')
})

