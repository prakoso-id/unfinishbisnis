const Employee = require('../models/EmployeeModel')
const { body, validationResult } = require('express-validator')

const index = (req, res, next) => {
    Employee.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'ERROR',
                error,
            })
        })
}

const show = (req, res, next) => {
    let ID = req.body.IDE;
    Employee.findById(ID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'Tidak Ada'
            })
        })
}

const store = async(req, res, next) => {

    const { name, email } = req.body

    const emailExist = await Employee.findOne({ email: email })
    if (emailExist) {
        return res.status(404).json({
            status: false,
            message: 'email sudah ada'
        })
    }


    let employee = new Employee({
        name,
        email
    })
    employee.save()
        .then(response => {
            res.json({
                message: "employee berhasil ditambahkan"
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'Gagal'
            })
        })
        // 
}

const update = (req, res, next) => {
    let ID = req.body.ID

    let update = {
        name: req.body.name,
        email: req.body.email
    }
    Employee.findByIdAndUpdate(ID, { $set: update })
        .then(response => {
            res.json({
                message: "employee berhasil diubah"
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'Gagal'
            })
        })
}

const destroy = (req, res, next) => {
    let ID = req.body.ID
    Employee.findOneAndRemove(ID)
        .then(response => {
            res.json({
                message: "employee berhasil dihapus"
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'Gagal'
            })
        })
}


const validate = (method) => {
    switch (method) {
        case 'createUser':
            {
                return [
                    body('userName', 'tidak ada ').exists(),
                    body('email', 'Invalid email').exists().isEmail(),
                    body('phone').optional().isInt(),
                    body('status').optional().isIn(['enabled', 'disabled'])
                ]
            }
    }
}

module.exports = {
    index,
    show,
    update,
    destroy,
    store,
    validate
}