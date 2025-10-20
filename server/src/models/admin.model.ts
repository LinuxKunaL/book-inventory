import jwt from "jsonwebtoken";
import config from "../config/app.config";
import { Model, Schema, model } from "mongoose";
import { TAdminLogin } from "../api/auth/auth.validator";

interface IAdmin extends Document, TAdminLogin {
  generateToken(): Promise<string>;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true },
  gmail: { type: String, required: true },
  password: { type: String, required: true },
});

AdminSchema.methods.generateToken = function () {
  const payload = {
    adminId: this._id,
    username: this.username,
  };

  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  return token;
};

export const MAdmin: Model<IAdmin> = model<IAdmin>("Admin", AdminSchema);
