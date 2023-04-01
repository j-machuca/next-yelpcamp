// const mongoose = require("mongoose");
// const Campground = require("../models/campground.js");
// const SeedData = require("./seedData");
// const { descriptors, places } = require("./seedHelpers");
// const dotenv = require("dotenv").config;

import * as dotenv from "dotenv";

dotenv.config();

import Campground from "../models/campground.js";
import { SeedData } from "./seedData.js";
import mongoose from "mongoose";

import { places, descriptors } from "./seedHelpers.js";

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const setup = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // const camp = new Campground({
        //     title: "Test Script Campground",
        //     description: "Test Script Description",
        // });
        // await camp.save();

        // Delete everything in the current DB
        await Campground.deleteMany({});

        const records = [...Array(50)].map(() => {
            const random1000 = Math.floor(Math.random() * 1000);
            const location = `${SeedData[random1000].city},${SeedData[random1000].state}`;
            const title = `${sample(descriptors)} ${sample(places)}`;

            return {
                location: location,
                title: title,
            };
        });

        const insert = await Campground.insertMany(records);
    } catch (e) {
        return "Database is not ready yet";
    } finally {
        await mongoose.connection.close();
    }
};

try {
    setup();
} catch (e) {
    console.warn("Database is not ready yet. Skipping seeding...");
    console.log(e);
}

// module.exports = { setup };
