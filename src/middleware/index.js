const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {
    const token = req.header('X-Token-Authorization')

    if (!token) {
        return res.status(401).json({
            message: "token tidak ada"
        })
    }

    try {
        let decoded = jwt.verify(token, process.env.Token);
        req.id = decoded.id;
        console.log(req.id)
        next()
    } catch (err) {
        res.status(403).send({
            success: false,
            message: err.message
        })
    }

    // if(err.name === 'TokenExpiredError') {
    //     return res.status(401).json({
    //         message: "token tidak ada"
    //     })
    // }


    // req.id = decode.id
    // next()
}