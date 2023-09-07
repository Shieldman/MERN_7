const express = require("express");
const {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
  uploadCarPicture,
} = require("../controllers/cars");
const { hasValidAuthJwt } = require("../middlewares/authenticated");
const { uploadCarFile } = require("../middlewares/uploadFile");


const carsRouter = express.Router();

carsRouter.get("/", getAllCars);
carsRouter.get("/:id", getCarById);
carsRouter.post("/", hasValidAuthJwt, createCar);
carsRouter.put("/:id", hasValidAuthJwt, updateCarById);
carsRouter.delete("/:id", hasValidAuthJwt, deleteCarById);
carsRouter.post("/image/:id", hasValidAuthJwt,uploadCarFile.single('car'),uploadCarPicture);

module.exports = carsRouter;