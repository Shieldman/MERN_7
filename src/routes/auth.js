const express = require("express");
const { signToken } = require("../config/jwt");

const authRouter = express.Router();

authRouter.get("/gettoken", (req, res, next) => {
   try {
      const token = signToken(req.body.username);
      res.status(200).json({data: token});
   } catch (error) {
     res.status(500).json({data: error})
   }
});


module.exports = authRouter;