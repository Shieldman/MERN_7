const express = require("express");
const {
  getAllOwners,
  createOwner,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
} = require("../controllers/owners");
const { hasValidAuthJwt } = require("../middlewares/authenticated");

const ownersRouter = express.Router();

ownersRouter.get("/", getAllOwners);
ownersRouter.get("/:id", getOwnerById);
ownersRouter.post("/", hasValidAuthJwt, createOwner);
ownersRouter.put("/:id",hasValidAuthJwt, updateOwnerById);
ownersRouter.delete("/:id",hasValidAuthJwt, deleteOwnerById);

module.exports = ownersRouter;