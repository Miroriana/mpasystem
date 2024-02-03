const { Schema, model } = require("mongoose");
//admin signup
const UserSchema = new Schema(
  {
    fullName: {
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
    profilePicture: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    role: {
      type: String,
      enum: ["admin", "veterinary", "farmer", "mcc"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    nationalId: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // match: [/(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Please provide a valid password']
    },
    confirmPassword: {
      type: String,
      required: true,
      // match: [/(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Please provide a valid password']
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = model("user", UserSchema);
module.exports =  UserModel ;
