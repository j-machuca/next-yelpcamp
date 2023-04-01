import dbConnect from "@/lib/mongo";

import Campground from "@/models/campground";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            const camp = await Campground.find({});
            res.status(200).json(camp);
            break;

        default:
            res.status(200).json({ name: "John Doe" });
            break;
    }
}
