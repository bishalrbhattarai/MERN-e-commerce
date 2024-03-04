import { useEffect, useState } from "react";
import http from "../../http";
import { Loading } from "../../components/Loading";
import { DataTable } from "../../components/DataTable";
import moment from "moment";

export const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        http
            .get("profile/reviews")
            .then(({ data }) => setReviews(data))
            .catch((err) => { })
            .finally(() => setLoading(false));
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <DataTable searchable={["Product", "Comment", "Rating", "Created At", "Updated At"]} sortable={["Product", "Comment", "Rating", "Created At", "Updated At"]} data={reviews.map((review) => {
                return {
                    "Product": review.product.name,
                    "Comment": review.comment,
                    "Rating": <>{review.rating}<i className="fa-solid fa-star ms-2"></i></>,
                    "Created At": moment(review.createdAt).format("llll"),
                    "Updated At": moment(review.updatedAt).format("llll"),
                };
            })}
        />
    );
};
