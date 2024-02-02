const sendEmail = require("../utils/email");
const bcryptjs = require("bcryptjs");
const VeterinaryModel = require("../models/admin.model");
// const { UserSigninSchema } = require("../utils/validation");
const { generateRandomPassword } = require("../utility/generateRandomPassword");
const sendVeterinaryEmail = require("../middlewares/veterinaryEmail");
const { errorHandler } = require("../utility/errorHandlerClass");
const { catchAsyncError } = require("../utility/catchSync");
//adding a veterinaryc

const addVeterian = catchAsyncError(async (req, res, next) => {
  const requestingUser = req.user;


  if (requestingUser.role !== "admin") {
    return next(
      new errorHandler(`Access Denied. You are not authorized.`, 400)
    );
  }
  const { email, ...rest } = req.body;
  // var a = UserSigninSchema.validateAsync({email:req.body.email, password: req.body.password, nationalId: req.body.nationalId});
  var veterianExists = await VeterinaryModel.findOne({
    email: req.body.email,
  });
  if (veterianExists) {
    return res
      .status(200)
      .json({ message: "veterinary with this email already exists" });
  } else {
    let defaultPassword = generateRandomPassword(12);
    let hashedPwd = bcryptjs.hashSync(defaultPassword, 10);

    console.log("defaultPassword---", defaultPassword);

    req.body.password = hashedPwd;
    req.body.role = "veterinary";

    var addedVeterinary = await VeterinaryModel.create(req.body);
    var senderEmail = addedVeterinary.email;
    var subject = "Finished signing up your account";
    signUpLink = `<p> <h3>Hello Veterinary! </h3>Welcome to our Team!! Here are your credentials<br> User email: ${addedVeterinary.email} <br> Password: ${defaultPassword}  <br>  <br>   </p> <a href="http://localhost:5173/login">Sign in to continue</a>`;
    sendEmail(senderEmail, subject, signUpLink);
    sendVeterinaryEmail;

    res.status(201).json({
      message:
        "Veterinary is recorded successfully, email is sent to the veterinary",
      veterian: addedVeterinary,
      defaultPassword,
    });
  }
});

const removeVeterinary = async (req, res, next) => {
  const { email, ...rest } = req.body;
  try {
    var deletedVeterinary = await VeterinaryModel.findByIdAndDelete(
      req.query.id
    );
    console.log(deletedVeterinary);
    if (deletedVeterinary) {
      res.status(200).json({
        message: "Veterinary is Deleted",
      });
      var receiver = deletedVeterinary.body.email;
      var theme = "Finished signing up your account";
      var message = `<p>Hello <h3>${deletedVeterinary.fullName}</h3> </p> <br> You are no have been dismissed from your post`;
      sendEmail(receiver, theme, message);
    } else {
      res.status(404).send("Veterinary not found!");
    }
  } catch (error) {
    next(new errorHandler(500, error.message));
  }
};

//finding the Veterinary by id
const findVeterinaryById = async (req, res, next) => {
  var veterinary = await VeterinaryModel.findById(req.query.id);
  try {
    if (veterinary === null) {
      return next(new errorHandler(400, "No Veterinary with given ID"));
    }
    res.json({
      message: "veterinary is found",
      veterinary,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
//listing all the Veterinary recorded
const listOfVeterinary = async (req, res, next) => {
  var veterinaryList = await VeterinaryModel.find();
  try {
    if (veterinaryList === null) {
      return next(new errorHandler(400, "No Veterinary with given ID"));
    }
    res.json({
      message: "this is the veterinary list",
      veterinaryList,
    });
  } catch (error) {
    res.status(500).send("you don't have any veterinary in the list");
  }
};
//updating a veterinary's information according to his email
const updateVeterinary = async (req, res, next) => {
  try {
    var updatedVeterinary = await VeterinaryModel.findByIdAndUpdate(
      { _id: req.query.id },
      req.body
    );
    res.status(200).json({
      message: "The updated veterinary became",
      updatedVeterinary,
    });
  } catch (error) {
    res.status(500).send("can't be updated");
  }
};

module.exports = {
  addVeterian,
  removeVeterinary,
  findVeterinaryById,
  listOfVeterinary,
  updateVeterinary,
};
