const { Cars, Owners } = require("../models/mongo");

const getAllCars = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const nameFilterOptions = {
      name: { $regex: new RegExp(filter, "i") },
    };
    const cars = await Cars.find(filter ? nameFilterOptions : {})
      .populate({
        path: "owners",
        model: "Owner",
        select: {
          name: true,
        },
      })
      .lean();
    res.status(200).json({ data: cars });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

const createCar = async (req, res, next) => {
  try {
    const { name, age, year, owners } = req.body;

    // Check if the specified owner exists
    const existingOwner = await Owners.findById(owners);
    if (!existingOwner) {
      return res.status(400).json({ data: "Owner not found" });
    }

    const newCar = new Cars({
      name,
      age,
      year,
      owners,
    });

    await newCar.save();

    existingOwner.cars.push(newCar._id);

    await Owners.findByIdAndUpdate(existingOwner._id, {
      cars: existingOwner.cars,
    });

    res.status(201).json({ data: newCar });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Cars.findById(id)
      .populate({
        path: "owners",
        model: "Owner",
        select: {
          name: true,
        },
      })
      .lean();
    res.status(200).json({ data: car });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

const updateCarById = async (req, res, next) => {
  const { name, age, year, owner } = req.body;

  try {
    const { id } = req.params;
    const car = await Cars.findByIdAndUpdate(
      id,
      { name, age, year, owner },
      { new: true }
    );

    // Update the owner's car reference
    const existingOwner = await Owners.findById(car.owner);
    if (existingOwner) {
      existingOwner.car = car._id;
      await existingOwner.save();
    }

    res.status(200).json({ data: car });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

const deleteCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Cars.findById(id);

    // If the car is associated with a owner, remove the car reference from the owner
    if (car.owners) {
      const existingOwner = await Owners.findById(car.owners);
      console.log(existingOwner);
      const index = existingOwner.cars.indexOf(req.id);
      existingOwner.cars.splice(index, 1);

      await Owners.findByIdAndUpdate(existingOwner._id, {
        cars: existingOwner.cars,
      });
    }

    await Cars.deleteOne({ _id: id });
    res.status(200).json({ data: "OK" });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

module.exports = {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
};
