import dbConnect from "../../lib/mongo";

import Campground from "../../models/campground";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    const { id, title, location } = req.body;

    let camp;

    switch (method) {
        case "GET":
            camp = await Campground.find({});
            res.status(200).json(camp);
            break;

        case "POST":
            camp = new Campground({ title, location });

            const result = await camp.save();

            if (result) {
                res.status(200).json({ title, location, id: result.id });
                break;
            } else {
                res.status(400).json({
                    error: "Unable to save new campground",
                });
                break;
            }

        case "PUT":
            camp = await Campground.findOneAndUpdate(
                { _id: id },
                { title, location }
            );
            res.status(202).json(camp);
            break;

        case "DELETE":
            camp = await Campground.findByIdAndDelete(id);
            if (camp) {
                return res.status(204).send();
            }
            return res.status(400).json({ msg: "Bad request" });

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
