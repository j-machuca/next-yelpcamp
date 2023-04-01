import { useRouter } from "next/router";
import dbConnect from "@/lib/mongo";
import { docToString } from "../../utils/utils";
import Campground from "@/models/campground";

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    await dbConnect();
    const result = await Campground.findById(id).exec();

    const camp = docToString(result);

    return {
        props: { camp },
    };
}

export default function CampgroundDetail(props) {
    const { _id: id, title, description, price, location } = props.camp;

    return (
        <div>
            <h1>Campground Detail</h1>
            <p>{title}</p>
            <p>{location}</p>
        </div>
    );
}
