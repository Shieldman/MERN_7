const bcrypt = require("bcrypt");

const saltRopunds = 10;

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRopunds);
  return hash;
};

const verifyPassword = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

module.exports = {
  hashPassword,
  verifyPassword,
};