import { useEffect, useState } from "react"
import http from "../../http"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import {confirmAlert} from "react-confirm-alert"
import moment from "moment"

export const List = () =>{
    const [customer, setCustomer] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        setLoading(true)

        http.get('cms/customers')
            .then(({data}) => setCustomer(data))
            .catch(err=> {})
            .finally(() => setLoading(false))

    }, [])

    const handelDelete = id => {
        confirmAlert({
            title: 'Delete',
            message : "Are you sure you want to delete this item?",
            buttons:[
                {
                    label:'Sure',
                    onClick: () => {
                        setLoading(true)

                        http.delete(`cms/customers/${id}`)
                            .then (() => http.get('cms/customers'))
                            .then (({data}) => setCustomer(data))
                            .catch(err=> {})
                            .finally(() => setLoading(false))
                    }
                },
                {
                    label:'Abort',
                    onClick: () => {}
                }
            ]
        })
    }

    return <Container>
        <Row>
            <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                <Row>
                    <Col >
                    <h1>Customer</h1>
                    </Col>
                    <Col xs="auto">
                        <Link to="/customers/create" className="btn btn-dark" >
                            <i className="fa-solid fa-plus me-2"></i> Add Customer
                        </Link>
                    </Col>
                </Row>
                {loading ? <Loading /> : <Row>
                    <Col>
                        <DataTable searchable={['Name', 'Email','Phone','Address','Status','CreatedAt','UpdatedAt']} sortable={['Name', 'Email','Phone','Address','Status','CreatedAt','UpdatedAt']} data={customer.map(customer => {
                            return {
                                'Name': customer.name,
                                'Email': customer.email,
                                'Phone': customer.phone,
                                'Address': customer.address,
                                'Status': customer.status ? 'Active' : 'Inactive',
                                'CreatedAt': moment(customer.createdAt).format('LLL'),
                                'UpdatedAt': moment(customer.updatedAt).format ('LLL'),
                                'Actions':<>
                                <Link to={`/customers/${customer._id}/edit`} className="btn btn-dark btn-sm me-3 ">
                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>
                            <Button variant="outline-danger" size = "sm" onClick={() => handelDelete(customer._id)}>
                                    <i className="fa-solid fa-trash me-2"  ></i>Delete

                                </Button>
                                </>
                            }
                        })} />
                    </Col>
                </Row>}
            </Col>
        </Row>
    </Container>
}