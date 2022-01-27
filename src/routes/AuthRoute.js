const express = require('express')
const router = express.Router()

const Auths = require('../controllers/AuthController')
const { runValidation, validationRegistrasi, validationLogin } = require('../validation')

const middleAuthToken = require('../middleware')

router.post('/signup', validationRegistrasi, runValidation, Auths.register)

router.post('/login', validationLogin, runValidation, Auths.login)

router.get('/', middleAuthToken, Auths.getUser)


module.exports = router