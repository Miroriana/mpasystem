const { Schema, model } = require("mongoose");
//admin model: veterian registration

const VeterinarySchema = new Schema({
  fullName: {
    type: String,
    required: true,
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
  nationalId: {
    type: Number,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: false,
    unique: false,
  },
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: "veterinary",
  },
});
const VeterinaryModel = model("vet", VeterinarySchema);
module.exports = VeterinaryModel;
