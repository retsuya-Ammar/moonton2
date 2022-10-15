import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Create({ auth, movie }) {
    const { data, setData, processing, errors } = useForm({
        ...movie
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }

        Inertia.post(route("admin.dashboard.movie.update", movie.id), {
            _method: "PUT",
            ...data
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Create Movie" />
            <h1 className="text-xl">Update Movie: {movie.name}</h1>
            <hr className="mb-4" />
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>
                <Label forInput={"name"} value={"Name"} />
                <Input
                    type="text"
                    name="name"
                    defaultValue={movie.name}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter the name of the movie"
                    isError={errors.name}
                />
                <Label forInput={"category"} value={"Category"} className="mt-4" />
                <Input
                    type="text"
                    name="category"
                    defaultValue={movie.category}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter the category of the movie"
                    isError={errors.category}
                />
                <Label forInput={"video_url"} value={"Video URL"} className="mt-4" />
                <Input
                    type="text"
                    name="video_url"
                    defaultValue={movie.video_url}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter the video url of the movie"
                    isError={errors.video_url}
                />
                <Label forInput={"thumbnail"} value={"Thumbnail"} className="mt-4" />
                <img src={`/storage/${movie.thumbnail}`} alt={movie.name} className="w-40" />
                <Input
                    type="file"
                    name="thumbnail"
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter the thumbnail of the movie"
                    isError={errors.thumbnail}
                />
                <Label forInput={"rating"} value={"Rating"} className="mt-4" />
                <Input
                    type="number"
                    name="rating"
                    defaultValue={movie.rating}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter the rating of the movie"
                    isError={errors.rating}
                />
                <div className="flex flex-row mt-4 items-center">
                    <Label forInput={"is_featured"} value="Is Featured" className="mr-3 mt-1" />
                    <Checkbox
                        name="is_featured"
                        handleChange={(e) => SetData("is_featured", e.target.checked)}
                        checked={movie.is_featured}
                    />
                </div>
                <Button
                    type="submit"
                    className="mt-4"
                    variant="primary"
                    processing={processing}
                >
                    Save
                </Button>
            </form>
        </Authenticated>
    );
}
