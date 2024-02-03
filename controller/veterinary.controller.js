//registering the mcc
// const { UserSigninSchema } = require("../utils/validation");
const MccModel = require("../models/veterian.model");
const UserModel = require("../models/user.model");
// const MccModel = require("../models/veterian.model");
const { errorHandler } = require("../utility/errorHandlerClass");
const { catchAsyncError } = require("../utility/catchSync");

const addMcc = catchAsyncError(async (req, res, next) => {
  const requestingUser = req.user;


  if (requestingUser.role !== "veterinary") {
    return next(
      new errorHandler(`Access Denied. You are not authorized.`, 400),
      console.log(requestingUser.role),
    ); 
  }
  const { email, ...rest } = req.body;
  // var a = UserSigninSchema.validateAsync({email:req.body.email, password: req.body.password, nationalId: req.body.nationalId});
  var mccExists = await MccModel.findOne({
    email: req.body.email,
  });
  if (mccExists) {
    return res
      .status(200)
      .json({ message: "mcc with this email already exists" });
  } else {
    let defaultPassword = generateRandomPassword(12);
    let hashedPwd = bcryptjs.hashSync(defaultPassword, 10);

    console.log("defaultPassword---", defaultPassword);

    req.body.password = hashedPwd;
    req.body.role = "mcc";

    var addedMcc = await MccModel.create(req.body);
    var senderEmail = addedMcc.email;
    var subject = "Finished signing up your account";
    signUpLink = `<p> <h3>Hello mcc! </h3>Welcome to our Team!! Here are your credentials<br> User email: ${addedMcc.email} <br> Password: ${defaultPassword}  <br>  <br>   </p> <a href="http://localhost:4000/api/UH/v1/user/auth/signup">Sign in to continue</a>`;
    sendEmail(senderEmail, subject, signUpLink);

    res.status(201).json({
      message:
        "Mcc is recorded successfully, email is sent to the mcc",
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
