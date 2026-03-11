//untuk autentikasi user

const { decodeToken } = require("../helpers/token");
const { product } = require("../models");
const { authentication, authorization } = require("../helpers/passport");


// cek login atau belum
const authentication = (req, res, next) => {
    // cek req nya mengandung token atau tidak
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = decodedToken(token)
    
        req.userId = decoded.id
        next()
    } catch (error) {
        next({ message: 'You should login', status: 401})
    }
}

const authorization = (req, res, next) => {
    // cocokkan apakah userId di product sama dengan userId di req
    Product.findById(req.params.id)
    .then(product => {
        if (product.userId == req.userId) {
            next()
        } else {
            next({ message: 'You are not allowed', status: 401})
        }
    })
    .catch(err => {
        next({ message: 'You are not allowed', status: 401})

    })
}

module.exports = { authentication, authorization }