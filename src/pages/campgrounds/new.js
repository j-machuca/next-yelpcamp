import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function NewCampground(props) {
    const [formData, setFormData] = useState({ title: "", location: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState();

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
            const response = await axios.post("/api/campgrounds", formData);
            if (response.status === 200) {
                setSuccess(response);
                setFormData({ title: "", location: "" });
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
                <title>New Campground</title>
            </Head>
            <div>
                <h1>Create new campground</h1>
                {success && (
                    <Link href={`/campgrounds/${success.data.id}`}>
                        Go to new Campground
                    </Link>
                )}
                {error && (
                    <p>Error when creating campground ${error.message}</p>
                )}
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
                            Add Campground
                        </button>
                    </div>
                </form>
                <div>
                    <Link href="/campgrounds">All Campgrounds</Link>
                </div>
            </div>
        </>
    );
}
