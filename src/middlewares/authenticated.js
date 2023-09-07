const { verifyToken } = require("../config/jwt");

const hasValidAuthJwt = (req,res,next)=>{
    try {
        const {authorization} = req.headers;
        const [,token] = authorization.split(' ')
        verifyToken(token);
        next();
      } catch {
        res.status(401).json({ data: "Unauthorised" });
      }
}

module.exports = {
    hasValidAuthJwt
}