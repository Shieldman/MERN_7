var jwt = require('jsonwebtoken')

const signToken = (payload) => {
    const token = jwt.sign({email: payload},process.env.TOKEN_SECRET, {expiresIn: "1h"});
    return token;
}

const verifyToken = (token) =>{
    const payload = jwt.verify(token,process.env.TOKEN_SECRET);
    return payload;
}

module.exports = {
    signToken,
    verifyToken,
}