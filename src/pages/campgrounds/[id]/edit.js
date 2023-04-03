import dbConnect from "@/lib/mongo";
import { docToString } from "@/utils/utils";
import Campground from "@/models/campground";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    await dbConnect();
    const result = await Campground.findById(id).exec();

    const camp = docToString(result);

    return {
        props: { camp },
    };
}

export default function CampgroundEdit(props) {
    const { _id: id, title, description, price, location } = props.camp;

    const [formData, setFormData] = useState({
        id,
        title,
        description,
        price,
        location,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onInputChangeHandler = ({ target }) => {
        const { name, value } = target;
        setFormData((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(`submitting form with ${{ formData }} `);
        setIsSubmitting(true);

        try {
            const response = await axios.put("/api/campgrounds", formData);
            if (response.status === 202) {
                setSuccess(response);
            } else {
                setError(response.data);
                setIsSubmitting(false);
            }
        } catch (e) {
            console.log(`Error during form submit ${e}`);
        }
    };

    return (
        <>
            <Head>
                <title>Edit Campground</title>
            </Head>
            <div>
                <h1>Edit Campground</h1>
                {success && <p>Campground updated successfully</p>}
                {error && <p>Error updating campground ${error.message}</p>}
            </div>
            <div>
                <form onSubmit={(e) => onSubmitHandler(e)}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Campground Title"
                            value={formData.title}
                            onChange={(e) => onInputChangeHandler(e)}
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="title"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={(e) => onInputChangeHandler(e)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={isSubmitting ? "disabled" : null}
                        >
                            Save
                        </button>
                    </div>
                </form>
                <Link href={`/campgrounds/${id}`}>Back to Campground</Link>
            </div>
        </>
    );
}
