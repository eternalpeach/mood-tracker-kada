const bcrypt = require('bcryptjs');

const hash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const compare = (password, hash) => {
    const isMatch = bcrypt.compareSync(password, hash);
    return isMatch;
}

module.exports = { hash, compare }

