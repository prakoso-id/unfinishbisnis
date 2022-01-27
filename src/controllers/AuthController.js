const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async(req, res, next) => {
    const {
        username,
        name,
        email,
        password,
        role
    } = req.body
    const userExist = await User.findOne({ $or: [{ email: email }, { username: username }] })
    if (userExist) {
        return res.status(404).json({
            status: false,
            message: 'user sudah ada'
        })
    }
    bcrypt.hash(password, 10, function(err, hashedpassed) {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            username,
            name,
            email,
            password: hashedpassed,
            role,
        })
        user.save()
            .then(response => {
                res.status(201).json({
                    status: true,
                    message: "user berhasil ditambahkan"
                })
            })
            .catch(error => {
                res.status(404).json({
                    status: false,
                    message: 'Gagal'
                })
            })

    })


}


const login = async(req, res, next) => {
    const { usernames, password } = req.body
    console.log(req.body)
    const user = await User.findOne({ $or: [{ email: usernames }, { username: usernames }] })
    if (!user) {
        return res.status(404).json({
            message: "User tidak ditemukan"
        })
    }


    bcrypt.compare(password, user.password, function(err, results) {
        if (err) {
            // handle error
            return res.status(401).json({ success: false, message: err });

        }
        if (results) {
            let token = jwt.sign({ id: user._id }, process.env.Token, { expiresIn: process.env.ExpireToken })
            return res.status(200).json({
                message: "login berhasil",
                token,
                user
            })
        } else {
            // response is OutgoingMessage object that server response http request
            return res.status(401).json({ success: false, message: 'passwords salah' });
        }
    });
    // 
}

const getUser = async(req, res, next) => {
    console.log(req.id)
}

module.exports = {
    register,
    login,
    getUser
}