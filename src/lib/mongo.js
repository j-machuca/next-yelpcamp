import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

let cached = global.mongoose;

const opts = {};

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!cached) {
        cached = global.mongoose = { conn: null, promise: null };
    }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
    }
    const uri = process.env.MONGO_URI;
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
        return mongoose;
    });

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
