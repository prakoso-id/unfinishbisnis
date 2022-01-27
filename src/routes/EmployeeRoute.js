const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')

const { runValidation, validationDaftar } = require('../validation')

router.get('/', EmployeeController.index)
router.post('/show', EmployeeController.show)
router.post('/store', validationDaftar, runValidation, EmployeeController.store)
router.put('/update', EmployeeController.update)
router.delete('/delete', EmployeeController.destroy)

module.exports = router