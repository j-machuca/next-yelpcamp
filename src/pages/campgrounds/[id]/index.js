import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import dbConnect from "@/lib/mongo";
import { docToString } from "@/utils/utils";
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
    const router = useRouter();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.delete("/api/campgrounds", {
            data: { id: id },
        });
        if (response.status === 204) {
            router.push(
                {
                    pathname: "/campgrounds",
                    query: {
                        msg: "Campground deleted successfully",
                    },
                },
                "/campgrounds"
            );
        }
    };

    return (
        <>
            <div>
                <h1>Campground Detail</h1>
                <p>{title}</p>
                <p>{location}</p>
                <Link href={`/campgrounds/${encodeURIComponent(id)}/edit`}>
                    Edit
                </Link>
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <button type="submit">Delete</button>
                </form>
            </div>
            <footer>
                <Link href="/campgrounds">Back to Campground</Link>
            </footer>
        </>
    );
}
