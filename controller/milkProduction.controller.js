const milkProductionModel = require("../models/milkProduction.model");
const farmerModel = require("../models/farmer.model");
const MilkModel = require("../models/milkProduction.model");
const { errorHandler } = require("../utility/errorHandlerClass");

// Add milk production record
//const addmilkProduction = async (req, res, next) => {
//const {id, ...rest} = req.body;
//try {
//   var milkPExists = await farmerModel.findOne({ _id: req.body.id});
//   if (milkPExists){
//     return res
//       .status(200)
//       .json({ message: "MilkProduction with this name already exists" });
//   }
//   else {
//     var addedMilkProduction = await milkProductionModel.create(req.body);
//     res.status(201).json({
//       message: "MilkProduction is recorded successfully",
//       addedMilkProduction
//     });
//   }
//   await farmerModel.findByIdAndUpdate({_id:milkPExists.id},{quantity:addedMilkProduction} )
//   next();
// } catch (error){
//   console.error(error);
//   res.status(500).send('internal Server Error');
// }};
const addmilkProduction = async (req, res, next) => {
  try {
    const farmerEmail = req.user.email;

    const farmer = await farmerModel.findOne({ email: farmerEmail });

    if (!farmer) {
      return next(
        new errorHandler(400, `Access Denied. You are not authorized.`)
      );
    }

    // Get the new milk production quantity from the request body
    var newCollection = {
      farmerId: req.body.farmerId,
      quantity: req.body.quantity,
    };

    console.log(newCollection);

    // Initialize today's distribution
    var todayDistribution = 0;

    // Check if the farmer already has some quantity
    if (existFarmer.quantity === 0) {
      todayDistribution = newCollection;
    } else {
      todayDistribution = existFarmer.quantity + newCollection.quantity;
    }

    // Update the farmer's information with the new todayDistribution value
    await farmerModel.findByIdAndUpdate(
      { _id: existFarmer._id },
      { quantity: todayDistribution }
    );

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle the error if the update fails
    res.status(500).send({
      message: "Failed to save the milkProduction...",
      error: error.message,
    });
  }
};

const addedMilkProduction = async (req, res, next) => {
  try {
    var addedQuantity = await MilkModel.create(req.body);
    res.status(201).json({
      message: "Milk was recorded successfully",
      addedQuantity,
    });
  } catch (error) {
    next(new errorHandler(400, error.message));
  }
};

// removing a recorded farmer
const removemilkProduction = async (req, res, next) => {
  try {
    var deletedmilkProduction = await milkProductionModel.findByIdAndDelete(
      req.query.id
    );
    if (deletedmilkProduction) {
      res.status(200).json({
        message: "milkProduction is Deleted",
      });
    } else {
      res.status(404).send("milkProduction not found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//finding the farmer by id
const findmilkProductionById = async (req, res, next) => {
  var milkProductionTBF = await milkProductionModel.findById(req.query.id);
  try {
    if (milkProductionTBF === null) {
      res.json({ message: "the milkProduction was deleted" });
    }
    res.json({
      message: "milkProduction is found",
      milkProductionTBF,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
//listing or the farmers recorded
const listOfmilkProduction = async (req, res, next) => {
  var milkProduction = await milkProduction.find();
  try {
    res.json({
      message: "this is the milkProduction list",
      milkProduction,
    });
  } catch (error) {
    res.status(500).send("you don't have any milkProduction in the list");
  }
};
//updating a farmer's information according to his email
const updatemilkProduction = async (req, res, next) => {
  try {
    var updatedmilkProduction = await FarmerModel.findOneAndUpdate(
      { _id: req.query.id },
      req.body
    );
    var farmer = await milkProductionModel.find(updatedmilkProduction._id);
    res.status(200).json({
      message: "The updated milkProductio became",
      farmer,
    });
  } catch (error) {
    res.status(500).send("can't be deleted");
  }
};

module.exports = {
  listOfmilkProduction,
  findmilkProductionById,
  removemilkProduction,
  addmilkProduction,
  updatemilkProduction,
  addedMilkProduction,
};
