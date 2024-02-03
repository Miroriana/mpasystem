//registering the mcc
// const { UserSigninSchema } = require("../utils/validation");
const MccModel = require("../models/veterian.model");
const UserModel = require("../models/user.model");
// const MccModel = require("../models/veterian.model");
const { errorHandler } = require("../utility/errorHandlerClass");
const { catchAsyncError } = require("../utility/catchSync");
const { generateRandomPassword } = require("../utility/generateRandomPassword");
const sendEmail = require("../utils/email");

const addMcc = catchAsyncError(async (req, res, next) => {
  const requestingUser = req.user;

  if (requestingUser.role !== "veterinary") {
    console.log("User role:", requestingUser.role);  // Log the user role
    return next(
      new errorHandler(`Access Denied. You are not authorized.`, 400));
  }

  const { email, ...rest } = req.body;
    // Check if Mcc with the provided email already exists
    var mccExists = await MccModel.findOne({ email: req.body.email });

    if (mccExists) {
      return res
      .status(200)
      .json({ message: "Mcc with this email already exists" });
    }
     else{
           // Generate default password and hash it
    let defaultPassword = generateRandomPassword(12);
    let hashedPwd = bcryptjs.hashSync(defaultPassword, 10);

    console.log("Default Password:", defaultPassword);

    // Update request body with hashed password and role
    req.body.password = hashedPwd;
    req.body.role = "mcc";

    // Create new MccModel instance
    const addedMcc = await MccModel.create(req.body);

    // Send email with sign-up information
    const senderEmail = addedMcc.email;
    const subject = "Finished signing up your account";
    const signUpLink = `<p> <h3>Hello MCC! </h3>Welcome to our Team!! Here are your credentials<br> User email: ${addedMcc.email} <br> Password: ${defaultPassword}  <br>  <br>   </p> <a href="http://localhost:4000/api/UH/v1/user/auth/signup">Sign in to continue</a>`;
    sendEmail(senderEmail, subject, signUpLink);

    // Respond with success message and information
    res.status(201).json({
      message: "MCC is recorded successfully, email is sent to the MCC",
      mcc: addedMcc,
      defaultPassword,
    });
     }
});


//removing an MCC
const removeMcc = async (req, res, next) => {
  const { email, ...rest } = req.body;
  try {
    var deletedMcc = await MccModel.findByIdAndDelete(req.query.id);
    console.log(deletedMcc);
    if (deletedMcc) {
      res.status(200).json({
        message: "Mcc is Deleted",
      });
    } else {
      res.status(404).send("Mcc not found!");
    }
  } catch (error) {
    next(new errorHandler(500, error.message));
  }
};
const updateMcc = async (req, res, next) => {
  try {
    var updateMcc = await MccModel.findByIdAndUpdate(
      { _id: req.query.id },
      req.body
    );
    res.status(200).json({
      message: "The updated Mcc became",
      updateMcc,
    });
  } catch (error) {
    res.status(500).send("can't be deleted");
  }
};
const findMcc = async (req, res, next) => {
  var mcc = await MccModel.findById(req.query.id);
  try {
    if (mcc === null) {
      return next(new errorHandler(400, "Mcc with given ID"));
    }
    res.json({
      message: "mcc is found",
      mcc,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
const listMcc = async (req, res, next) => {
  var mccList = await MccModel.find();
  try {
    if (mccList === null) {
      return next(new errorHandler(400, "No mcc with given ID"));
    }
    res.json({
      message: "this is the mcc list",
      mccList,
    });
  } catch (error) {
    res.status(500).send("you don't have any mcc in the list");
  }
};
module.exports = { addMcc, removeMcc, updateMcc, findMcc, listMcc };
