import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rollNumber: { type: String, unique: true, required: true }, // Unique student identifier
    contact: { type: String, unique: true },
    verified: { type: Boolean, default: false },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // List of interested items
    refreshToken: { type: String }, // Refresh token for authentication
    avatar: {
      type: String, //cloudinary URL
      default: ""
      //required: true,
    },
    coverImage: {
      type: String,
      default: "" //cloudinary URL
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // we are using a mongoose middleware "pre" to store the passwords in hashed format in the database. Pre middleware is used to execute a function just before an event, in this case is "save" event.
  if (this.isModified("password")) {
    // this condition makes sure that the password hashing code only executes when the password field is modified in the database.
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }
  next();
});

//IMP NOTE: In the above code we cannot use arrow function as a callback function, because we don't have any access of "this" in the arrow function. So we have to use normal function configuration only.

userSchema.methods.passwordVerification = async function (password) {
  // similarly like plugins, we can also define methods for our schemas, using this code. In this we are comparing the password entered by the user with that present in the database.
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
