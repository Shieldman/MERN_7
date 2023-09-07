const { signToken } = require("../config/jwt");
const { hashPassword, verifyPassword } = require("../config/password");
const { Users } = require("../models/mongo");

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({data: "Password must have at least 6 characters, one uppercase letter, and one lowercase letter.",});
      return;
    }
    const user = await Users.findOne({ email });
    if (user) {
      res.status(400).json({data: "The user already exists"});
      return;
    }

    const passwordHash = await hashPassword(password);
    const newUser = new Users({
      email: email,
      password: passwordHash,
    });
    await newUser.save();
    res.status(200).json({ data: { email, password } });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(401).json({ data: "User does not exist" });
      return;
    }
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ data: "Incorrect email or password" });
      return;
    }

    const token = signToken(email);
    res.status(200).json({ data: token });
  } catch (err) {
    res.status(500).json({ data: error });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
