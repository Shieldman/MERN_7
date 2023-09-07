const express = require("express");
const {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
} = require("../controllers/cars");
const { hasValidAuthJwt } = require("../middlewares/authenticated");

const carsRouter = express.Router();

carsRouter.get("/", getAllCars);
carsRouter.get("/:id", getCarById);
carsRouter.post("/", hasValidAuthJwt, createCar);
carsRouter.put("/:id", hasValidAuthJwt, updateCarById);
carsRouter.delete("/:id", hasValidAuthJwt, deleteCarById);

module.exports = carsRouter;