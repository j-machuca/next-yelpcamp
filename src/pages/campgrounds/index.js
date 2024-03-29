import Head from "next/head";
import dbConnect from "@/lib/mongo";
import Campground from "@/models/campground";
import Link from "next/link";
import { docToString } from "../../utils/utils";
import { useRouter } from "next/router";

export async function getStaticProps(ctx) {
    await dbConnect();

    const result = await Campground.find({});
    const camps = result.map((doc) => {
        return docToString(doc);
    });

    return {
        props: {
            camps,
        },
    };
}

export default function CampgroundIndex(props) {
    const router = useRouter();

    const msg = router.query.msg ? <p>{router.query.msg}</p> : null;

    return (
        <>
            <Head>
                <title>Campgrounds</title>
            </Head>
            <h1 className="text-2xl bold">All Campgrounds</h1>
            <Link href="/campgrounds/new">Add new campground</Link>
            {msg}
            <ul>
                {props.camps.map((camp) => (
                    <li key={camp._id}>
                        <Link
                            href={`campgrounds/${encodeURIComponent(camp._id)}`}
                        >
                            {camp.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
