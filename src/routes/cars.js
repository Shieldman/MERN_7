const express = require("express");
const {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
} = require("../controllers/cars");

const carsRouter = express.Router();

carsRouter.get("/", getAllCars);
carsRouter.get("/:id", getCarById);
carsRouter.post("/", createCar);
carsRouter.put("/:id", updateCarById);
carsRouter.delete("/:id", deleteCarById);

module.exports = carsRouter;