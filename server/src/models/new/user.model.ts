import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../../config/app.config";

interface IUser extends Document {
  generateToken(): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  const payload = {
    proprietorId: this._id,
    username: this.username,
  };

  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  return token;
};

export const MUser = mongoose.model("User", userSchema);
