const { check, validationResult, checkSchema } = require('express-validator')

const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            message: errors.array()[0].msg
        })
    }
    next()
}

const SchemaRoles = {
    "role": { in: 'body',
        matches: {
            options: [/\b(?:admin|user)\b/],
            errorMessage: "Invalid role"
        }
    }
}

const validationDaftar = [
    check('name', 'nama tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().isEmail().withMessage(
        'Not an email'
    )

]

const validationRegistrasi = [
    check('username', 'username tidak boleh kosong').notEmpty().isLength({ min: 5 }).withMessage(
        'username minimal 5 karakter'
    ),
    check('name', 'nama tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().isEmail().withMessage(
        'Not an email'
    ),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({ min: 5 }).withMessage(
        'Password minimal 5 karakter'
    ),
    checkSchema(SchemaRoles)
]

const validationLogin = [
    check('usernames', 'username tidak boleh kosong').notEmpty(),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({ min: 5 }).withMessage(
        'Password minimal 5 karakter'
    )

]

const validationAddArticle = [
    check('title', 'judul tidak boleh kosong').notEmpty(),
    check('body', 'body tidak boleh kosong').notEmpty().isLength({ min: 5 }).withMessage(
        'isi minimal 5 karakter'
    ),
]


module.exports = {
    runValidation,
    validationDaftar,
    validationRegistrasi,
    validationLogin,
    validationAddArticle
}