const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.SECRET_KEY 


const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1D' });
    return token;
}

const decodedToken = (payload) => {
    const decoded = jwt.verify(payload, JWT_SECRET );
    console.log(decoded)
    return decoded;
}

module.exports = { generateToken, decodedToken }