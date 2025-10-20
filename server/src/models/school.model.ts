import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  contactPersonDetails: { type: String, required: true },
  schoolLocation: { type: String, required: true },
  boardOfEducation: { type: String, required: true },
  mailId: { type: String, required: true, unique: true },
  coordinatorName: { type: String, required: true },
  coordinatorContact: { type: String, required: true, unique: true },
  createdAt: { type: String },
});

schoolSchema.pre("save", function (next) {
  this.createdAt = new Date().toDateString();
  next();
});

export const MSchool = mongoose.model("Schools", schoolSchema);
