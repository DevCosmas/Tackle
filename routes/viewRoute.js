const express = require('express')
const router = express.Router()
const authController= require('./../controller/authController')



router.get('/', (req, res) => {
    res.status(200).render('intro')
})

router.get('/login', (req, res) => {
    res.status(200).render('login')
})
router.get('/signUp', (req, res) => {
    res.status(200).render('signUp')
})

router.use(authController.isLoggedIn)

router.get('/overview', (req, res) => {
    res.status(200).render('overview')
})
router.get('/stats', (req, res) => {
    res.status(200).render('stats')
})
router.get('/search_query', (req, res) => {
    res.status(200).render('searchQuery')
})
module.exports = router