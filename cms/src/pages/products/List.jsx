import { useEffect, useState } from "react"
import http from "../../http"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { DataTable, Loading } from "../../components"
import {confirmAlert} from "react-confirm-alert"
import moment from "moment"
import { imgUrl } from "../../lib"

export const List = () =>{
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        setLoading(true)

        http.get('cms/products')
            .then(({data}) => setProducts(data))
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

                        http.delete(`cms/products/${id}`)
                            .then (() => http.get('cms/products'))
                            .then (({data}) => setProducts(data))
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
                    <h1>Product</h1>
                    </Col>
                    <Col xs="auto">
                        <Link to="/products/create" className="btn btn-dark" >
                            <i className="fa-solid fa-plus me-2"></i> Add Product
                        </Link>
                    </Col>
                </Row>
                {loading ? <Loading /> : <Row>
                    <Col>
                        <DataTable searchable={['Name', 'Brand','Price','Category','Disc.Price','Featured' ,'Status','CreatedAt','UpdatedAt']} sortable={['Name','Brand','Price','Category','Disc.Price','Featured' ,'Status','CreatedAt','UpdatedAt']} data={products.map(product => {
                            return {
                                'Name': product.name,
                                'Image':<a href={imgUrl(product.images[0])} target="_blank">
                                    <img src= {imgUrl(product.images[0])}  className="img-sm"/>
                                </a>,
                                'Category': product.category.name,
                                'Brand': product.brand.name,
                                'Price': product.price,
                                'Disc.Price': parseFloat(product.discounted_price) || 0,
                                'Status': product.status ? 'Active' : 'Inactive',
                                'Featured': product.featured ? 'Yes' : 'No',
                                'CreatedAt': moment(product.createdAt).format('LLL'),
                                'UpdatedAt': moment(product.updatedAt).format ('LLL'),
                                'Actions':<>
                                <Link to={`/products/${product._id}/edit`} className="btn btn-dark btn-sm me-3 ">
                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>
                            <Button variant="outline-danger" size = "sm" onClick={() => handelDelete(product._id)}>
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