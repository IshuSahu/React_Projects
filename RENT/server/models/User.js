const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: [true, "please add the  firstname"],
    },
    lastname: {
      type: String,
      require: [true, "please add the  lastname"],
    },
    email: {
      type: String,
      // type and flag to show message
      require: [true, "please add the user-email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      require: [true, "please add the password"],
    },
    profileImg: {
      type: String,
      default: "",
    },
    triplist: {
      type: Array,
      default: [],
    },
    wishlist: {
      type: Array,
      default: [],
    },
    propertylist: {
      type: Array,
      default: [],
    },
    resevationlist: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema)

module.exports = User