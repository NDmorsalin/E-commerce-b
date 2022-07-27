/* eslint-disable radix */
const jwt = require('jsonwebtoken');

const generateCookie = (name, payload, res) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.COOKIE_EXPIRE),
    });

    res.cookie(name, token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE)),
        signed: true,
    });

    return token;
};

module.exports = generateCookie;
