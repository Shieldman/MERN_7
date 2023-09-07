var jwt = require('jsonwebtoken')

const TOKEN_SECRET = "supersecret_123456?!";

const signToken = (payload) => {
    const token = jwt.sign({email: payload},TOKEN_SECRET, {expiresIn: "1h"});
    return token;
}

const verifyToken = (token) =>{
    const payload = jwt.verify(token,TOKEN_SECRET);
    return payload;
}

module.exports = {
    signToken,
    verifyToken,
}