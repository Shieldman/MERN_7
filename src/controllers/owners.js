const { Cars, Owners } = require("../models/mongo");

const getAllOwners = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const nameFilterOptions = {
      name: { $regex: new RegExp(filter, "i") },
    };

    const owners = await Owners.find(filter ? nameFilterOptions : {})
      .populate({
        path: "cars",
        model: "Car",
        select: {
          name: true,
          age: true,
        },
      })
      .lean();

    res.status(200).json({ data: owners });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

const createOwner = async (req, res, next) => {
  try {
    const newOwner = new Owners({
      name: req.body.name,
      surname: req.body.surname,
      country: req.body.country,
      cars: req.body.cars,
    });

    await newOwner.save();
    res.status(201).json({ data: newOwner });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

const getOwnerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = await Owners.findById(id)
      .populate({
        path: "cars",
        model: "Car",
        select: {
          name: true,
        },
      })
      .lean();
    res.status(200).json({ data: owner });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

const updateOwnerById = async (req, res, next) => {
  const { name, surname, country, cars } = req.body;

  try {
    const { id } = req.params;
    const owner = await Owners.findByIdAndUpdate(
      id,
      { name, surname, country },
      { new: true }
    );

    // If you want to update the cars associated with the owner, you can use car IDs.
    if (cars && cars.length > 0) {
      owner.cars = cars;
      await owner.save();
    }

    res.status(200).json({ data: owner });
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

const deleteOwnerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = await Owners.findById(id)
      .populate({
        path: "cars",
        model: "Car",
        select: {
          name: true,
        },
      })
      .lean();
    console.log(owner);
    if (owner.cars.length == 0) {
      await Owners.deleteOne({ _id: id });
      res.status(200).json({ data: "OK" });
    } else {
      res
        .status(409)
        .json({
          data: "This owner still has cars in it, please delete the Cars fist",
        });
    }
  } catch (err) {
    res.status(500).json({ data: err.message });
  }
};

module.exports = {
  getAllOwners,
  createOwner,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
};
