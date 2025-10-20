import mongoose from "mongoose";
import config from "../config/app.config";

export default async function mongooseLoader() {
    const url = config.db.url;
    mongoose.connect(url as string).then(()=> {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });
}