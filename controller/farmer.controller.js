const FarmerModel = require("../models/farmer.model");
const express = require("express");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utility/errorHandlerClass");
const VeterinaryModel = require("../models/admin.model");
const { catchAsyncError } = require("../utility/catchSync");
const { generateRandomPassword } = require("../utility/generateRandomPassword");


//add farmer for the first time
const addFarmer = catchAsyncError(async (req, res, next) => {
  const mccEmail = req.user.email;

  const mcc = await VeterinaryModel.findOne({
    email: mccEmail,
  });

  if (!mcc) {
    return next(
      new errorHandler(400, `Access Denied. You are not authorized.`)
    );
  }
  const { email } = req.body;
  var farmerExists = await FarmerModel.findOne({ email: email });
  if (farmerExists)
    return res
      .status(200)
      .json({ message: "Farmer with this email already exists" });
  else {
    req.body.province = veterinary.province;
    req.body.district = veterinary.district;

    let defaultPassword = generateRandomPassword(12);
    let hashedPwd = bcryptjs.hashSync(defaultPassword, 10);

    console.log("defaultPassword---", defaultPassword);

    req.body.password = hashedPwd;
    req.body.role = "farmer";

    var addedFarmer = await FarmerModel.create(req.body);
    res.status(201).json({
      message: "Farmer recorded successfully",
      farmer: addedFarmer,
      defaultPassword,
    });
    // console.log(res);
  }
});
// removing a recorded farmer
const removeFarmer = async (req, res, next) => {
  try {
    var deletedFarmer = await FarmerModel.findByIdAndDelete(req.query.id);
    if (deletedFarmer) {
      res.status(200).json({
        message: "Farmer is Deleted",
      });
    } else {
      res.status(404).send("Farmer not found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//finding the farmer by id
const findFarmerById = async (req, res, next) => {
  var farmerTBF = await FarmerModel.findById(req.query.id);
  try {
    if (farmerTBF === null) {
      res.json({ message: "the farmer was deleted" });
    }
    res.json({
      message: "farmer is found",
      farmerTBF,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
//listing or the farmers recorded
const listOfFarmer = async (req, res, next) => {
  var farmerList = await FarmerModel.find();
  try {
    res.json({
      message: "this is the farmer list",
      farmerList,
    });
  } catch (error) {
    res.status(500).send("you don't have any farmer in the list");
  }
};
//updating a farmer's information according to his email
const updateFarmer = async (req, res, next) => {
  try {
    var updatedFarmer = await FarmerModel.findOneAndUpdate(
      { _id: req.query.id },
      req.body
    );
    var farmer = await FarmerModel.find(updatedFarmer._id);
    res.status(200).json({
      message: "The updated farmer became",
      farmer,
    });
  } catch (error) {
    res.status(500).send("can't be deleted");
  }
};

module.exports = {
  listOfFarmer,
  findFarmerById,
  removeFarmer,
  addFarmer,
  updateFarmer,
};
