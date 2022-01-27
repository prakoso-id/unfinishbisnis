const Artikel = require('../models/ArticleModel')
const User = require('../models/UserModel')

const { body, validationResult } = require('express-validator')


const show = async(req, res, next) => {
    let id_user = req.id;
    const user = await User.findOne({ _id: id_user })
    console.log(user);
    if (user.role === 'admin') {
        const artikel = await Artikel.find()
        if (artikel) {
            return res.status(200).json({
                status: true,
                artikel
            })
        }
    } else {
        const artikel = await Artikel.findOne({ user_id: id_user })
        if (artikel) {
            return res.status(200).json({
                status: true,
                artikel
            })
        }
    }
    // console.log(req.id)



}

const store = async(req, res, next) => {
    let id_user = req.id;

    const { title, body } = req.body

    let artikel = new Artikel({
        title,
        body,
        user_id: id_user
    })
    artikel.save()
        .then(response => {
            res.status(201).json({
                message: "artikel berhasil ditambahkan"
            })
        })
        .catch(error => {
            res.status(404).json({
                message: 'Gagal'
            })
        })
        // 
}

// const update = (req, res, next) => {
//     let ID = req.body.ID

//     let update = {
//         name: req.body.name,
//         email: req.body.email
//     }
//     Artikel.findByIdAndUpdate(ID, { $set: update })
//         .then(response => {
//             res.json({
//                 message: "employee berhasil diubah"
//             })
//         })
//         .catch(error => {
//             res.status(404).json({
//                 message: 'Gagal'
//             })
//         })
// }

// const destroy = (req, res, next) => {
//     let ID = req.body.ID
//     Artikel.findOneAndRemove(ID)
//         .then(response => {
//             res.json({
//                 message: "employee berhasil dihapus"
//             })
//         })
//         .catch(error => {
//             res.status(404).json({
//                 message: 'Gagal'
//             })
//         })
// }




module.exports = {
    show,
    store,
}