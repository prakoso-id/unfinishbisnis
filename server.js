require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Employee = require('./src/routes/EmployeeRoute')
const Auth = require('./src/routes/AuthRoute')
const Article = require('./src/routes/ArticleRoute')


const mongoose = require('mongoose')
mongoose.set('debug', true);
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const connectedDB = mongoose.connection
connectedDB.on('error', (err) => {
    console.log('database :' + err)
})

connectedDB.once('open', () => {
    console.log('database terkonek')
        // var roleObjct = [
        //     { nama_role: "Admin" },
        //     { nama_role: "User" }
        // ];


    // connectedDB.db.listCollections({ name: 'roles' }).next(function(err, names) {
    //     if (names == null) {
    //         connectedDB.collection("roles").insertMany(roleObjct, function(err, res) {
    //             if (err) throw err;
    //             console.log("Number of documents inserted: " + res.insertedCount);
    //         });
    //     }

    // });




})
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`server start at ${PORT}`)
})

app.use('/api/karyawan', Employee)
app.use('/api/user', Auth)
app.use('/api/article', Article)