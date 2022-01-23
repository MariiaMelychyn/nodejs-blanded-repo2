const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: "John",
      maxLength: [20, "Max mark equal 20 symbols"],
    },
    lastName: {
      type: String,
      default: "Doe",
      trim: true,
      maxLength: [20, "Limit 20"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      min: [1, "Minimum 1 symbol "],
      max: [1000, "Max 1000 symbols"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add зфііцщкв"],
    },

    role: {
      type: String,
      default: "User"
     
    },
    token: {
      type: String,
     
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = model("user", userSchema);
