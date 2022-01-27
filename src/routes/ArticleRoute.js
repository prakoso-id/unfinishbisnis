const express = require('express')
const router = express.Router()

const ArticleController = require('../controllers/ArticleController')

const { runValidation, validationAddArticle } = require('../validation')

const middleAuthToken = require('../middleware')

router.get('/', middleAuthToken, ArticleController.show)

router.post('/store', middleAuthToken, validationAddArticle, runValidation, ArticleController.store)
    // router.put('/update', ArticleController.update)
    // router.delete('/delete', ArticleController.destroy)

module.exports = router