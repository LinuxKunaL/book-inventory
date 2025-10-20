import mongoose from "mongoose";

const MOtp = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  otp: { type: Number, required: true },
});

export const MOtpModel = mongoose.model("Otp", MOtp);
