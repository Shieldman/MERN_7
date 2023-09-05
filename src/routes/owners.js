const express = require("express");
const {
  getAllOwners,
  createOwner,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
} = require("../controllers/owners");

const ownersRouter = express.Router();

ownersRouter.get("/", getAllOwners);
ownersRouter.get("/:id", getOwnerById);
ownersRouter.post("/", createOwner);
ownersRouter.put("/:id", updateOwnerById);
ownersRouter.delete("/:id", deleteOwnerById);

module.exports = ownersRouter;