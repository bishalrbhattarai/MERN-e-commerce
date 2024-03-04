import { useEffect, useState } from "react"
import http from "../../http"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import {confirmAlert} from "react-confirm-alert"
import moment from "moment"

export const List = () =>{
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        setLoading(true)

        http.get('cms/brands')
            .then(({data}) => setBrands(data))
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

                        http.delete(`cms/brands/${id}`)
                            .then (() => http.get('cms/brands'))
                            .then (({data}) => setBrands(data))
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
                    <h1>Brands</h1>
                    </Col>
                    <Col xs="auto">
                        <Link to="/brands/create" className="btn btn-dark" >
                            <i className="fa-solid fa-plus me-2"></i> Add Brand
                        </Link>
                    </Col>
                </Row>
                {loading ? <Loading /> : <Row>
                    <Col>
                        <DataTable searchable={['Name', 'Status','CreatedAt','UpdatedAt']} sortable={['Name','Status','CreatedAt','UpdatedAt']} data={brands.map(brand => {
                            return {
                                'Name': brand.name,
                                'Status': brand.status ? 'Active' : 'Inactive',
                                'CreatedAt': moment(brand.createdAt).format('LLL'),
                                'UpdatedAt': moment(brand.updatedAt).format ('LLL'),
                                'Actions':<>
                                <Link to={`/brands/${brand._id}/edit`} className="btn btn-dark btn-sm me-3 ">
                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>
                            <Button variant="outline-danger" size = "sm" onClick={() => handelDelete(brand._id)}>
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