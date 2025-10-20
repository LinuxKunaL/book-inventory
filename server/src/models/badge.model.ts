import mongoose from "mongoose";

const badgesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});

export const MBadges = mongoose.model("Badges", badgesSchema);