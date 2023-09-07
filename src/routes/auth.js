const express = require("express");
const { registerUser, loginUser } = require("../controllers/users");
const { hasValidAuthJwt } = require("../middlewares/authenticated");
const {uploadFile} = require("../middlewares/uploadFile");
const { Users } = require("../models/mongo");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/login", loginUser);
authRouter.post(
  "/avatar",
  hasValidAuthJwt,
  uploadFile.single("avatar"),
  async (req, res, next) => {
    const { path } = req.file;
    const { email } = req.user;

    console.log(email);
    await Users.updateOne(
      { email: email },
      { avatar: path },
      {
        returnNewDocument: true,
        new: true,
        strict: false,
      }
    );
    res.status(201).json({ data: path });
  }
);

module.exports = authRouter;
