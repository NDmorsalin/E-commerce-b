/* eslint-disable radix */
const jwt = require('jsonwebtoken');

const generateCookie = async (name, payload, res) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.COOKIE_EXPIRE),
    });
    console.log(token);

    res.cookie(name, token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE)),
        signed: true,
    });
};

module.exports = generateCookie;
