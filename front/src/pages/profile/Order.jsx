import { useEffect, useState } from "react";
import http from "../../http";
import { Loading } from "../../components/Loading";
import { DataTable } from "../../components/DataTable";
import moment from "moment";

export const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        http
            .get("profile/orders")
            .then(({ data }) => setOrders(data))
            .catch((err) => { })
            .finally(() => setLoading(false));
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <DataTable searchable={["Details", "Status", "Created At", "Updated At"]} sortable={["Status", "Created At", "Updated At"]} data={orders.map((order) => {
                return {
                    "Details": (
                        <ul>
                            {order.details.map((detail) => (
                                <li key={detail._id}>
                                    {detail.qty} X {detail.product.name} @ Rs.{detail.price} = Rs.
                                    {detail.total}
                                </li>
                            ))}
                        </ul>
                    ),
                    "Status": order.status,
                    "Created At": moment(order.createdAt).format("llll"),
                    "Updated At": moment(order.updatedAt).format("llll"),
                };
            })}
        />
    );
};
