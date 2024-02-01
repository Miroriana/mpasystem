const { Schema, model } = require("mongoose");
// farmer model
const farmerSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  nationalId: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    // match: [
    //   /(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    //   "Please provide a valid password",
    // ],
  },
  verified: {
    type: String,
    default: false,
  },
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    required: false,
  },
  role: {
    type: String,
    default: "farmer",
  },
});
const FarmerModel = model("farmer", farmerSchema);
module.exports = FarmerModel;
