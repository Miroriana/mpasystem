const { Schema, model } = require("mongoose");
const mccSchema = new Schema({
  mccName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // match: [
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   "Please provide a valid email",
    // ],
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  //   match: [
  //     /(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
  //     "Please provide a valid password",
  //   ],
  // },
  province: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: false,
  },
  sector: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    default: "mcc",
    required: false
  }
});
const MccModel = model("mcc", mccSchema);
module.exports = MccModel;
