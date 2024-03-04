import { useEffect, useState } from "react"
import http from "../../http"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import {confirmAlert} from "react-confirm-alert"
import moment from "moment"

export const List = () =>{
    const [staffs, setStaffs] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        setLoading(true)

        http.get('cms/staffs')
            .then(({data}) => setStaffs(data))
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

                        http.delete(`cms/staffs/${id}`)
                            .then (() => http.get('cms/staffs'))
                            .then (({data}) => setStaffs(data))
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
                    <h1>Staffs</h1>
                    </Col>
                    <Col xs="auto">
                        <Link to="/staffs/create" className="btn btn-dark" >
                            <i className="fa-solid fa-plus me-2"></i> Add Staff
                        </Link>
                    </Col>
                </Row>
                {loading ? <Loading /> : <Row>
                    <Col>
                        <DataTable searchable={['Name', 'Email','Phone','Address','Status','CreatedAt','UpdatedAt']} sortable={['Name', 'Email','Phone','Address','Status','CreatedAt','UpdatedAt']} data={staffs.map(staff => {
                            return {
                                'Name': staff.name,
                                'Email': staff.email,
                                'Phone': staff.phone,
                                'Address': staff.address,
                                'Status': staff.status ? 'Active' : 'Inactive',
                                'CreatedAt': moment(staff.createdAt).format('LLL'),
                                'UpdatedAt': moment(staff.updatedAt).format ('LLL'),
                                'Actions':<>
                                <Link to={`/staffs/${staff._id}/edit`} className="btn btn-dark btn-sm me-3 ">
                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>
                            <Button variant="outline-danger" size = "sm" onClick={() => handelDelete(staff._id)}>
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