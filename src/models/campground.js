import mongoose, { Schema } from "mongoose";

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
});

const Campground =
    mongoose.models.Campground ||
    mongoose.model("Campground", CampgroundSchema);

export default Campground;
