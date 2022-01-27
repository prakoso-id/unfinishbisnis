const mongoose = require('mongoose')

const Schema = mongoose.Schema

const artikelSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    user_id: {
        type: String
    },
    trash: {
        type: String
    },
}, {
    timestamps: true
})

const Artikel = mongoose.model('Article', artikelSchema)
module.exports = Artikel;