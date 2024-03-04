import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import http from "../../http"
import { DataTable, Loading } from "../../components"
import { confirmAlert } from "react-confirm-alert"
import moment from "moment"

export const List = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('cms/orders')
            .then(({ data }) => setOrders(data))
            .catch(err => { })
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = id => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Sure',
                    onClick: () => {
                        setLoading(true)

                        http.delete(`cms/orders/${id}`)
                            .then(() => http.get('cms/orders'))
                            .then(({ data }) => setOrders(data))
                            .catch(err => { })
                            .finally(() => setLoading(false))
                    }
                },
                {
                    label: 'Abort',
                    onClick: () => { }
                }
            ]
        })
    }

    const handleUpdate = (id, status) => {
        setLoading(true)

        http.patch(`cms/orders/${id}`, { status })
            .then(() => http.get('cms/orders'))
            .then(({ data }) => setOrders(data))
            .catch(err => { })
            .finally(() => setLoading(false))
    }

    return <Container>
        <Row>
            <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                <Row>
                    <Col>
                        <h1>ORDERS</h1>
                    </Col>
                </Row>
                {loading ? <Loading /> : <Row>
                    <Col>
                        <DataTable
                            searchable={["Customer", "Details", "Status", "Created At", "Updated At"]}
                            sortable={["Customer", "Status", "Created At", "Updated At"]}
                            data={orders.map((order) => {
                                return {
                                    "Customer": order.user.name,
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
                                    "Status": <Form.Select value={order.status} onChange={ev => handleUpdate(order._id, ev.target.value)}>
                                        <option value="Processing">Processing</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Shipping">Shipping</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </Form.Select>,
                                    "Created At": moment(order.createdAt).format("llll"),
                                    "Updated At": moment(order.updatedAt).format("llll"),

                                    "Actions": <Button variant="outline-danger" size="sm" onClick={() => handleDelete(order._id)}>
                                        <i className="fa-solid fa-trash me-2"></i>DELETE
                                    </Button>
                                };
                            })}
                        />
                    </Col>
                </Row>}
            </Col>
        </Row>
    </Container>


}