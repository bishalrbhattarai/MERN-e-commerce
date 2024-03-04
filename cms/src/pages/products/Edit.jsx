import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { FormInput, Loading, SubmitBtn } from "../../components"
import { imgUrl, setInForm } from "../../lib"
import http from "../../http"
import { useNavigate, useParams } from "react-router-dom"
import Switch from "react-switch"
import ReactQuill  from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {confirmAlert} from "react-confirm-alert"



export const Edit = () =>{

    const [form, setFrom] = useState({status: true , featured: false})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [imgSelected, setImgSelected] =useState([])
    const [product, setProduct] = useState({})

    const navigate = useNavigate()
    const params = useParams()
    
    useEffect(() =>{
        setLoadingPage(true)
        http.get('cms/categories')
            .then(({data}) => {
                setCategories(data)

                return http.get('cms/brands')
            })

            .then(({data}) => {
                setBrands(data)

                return http.get(`cms/products/${params.id}`)
            })
            .then(({data}) => setProduct(data) )
            .catch((err) => {})
            .finally(() => setLoadingPage(false))
    },[])

    useEffect(() =>{
        if(Object.keys(product).length){
            setFrom({
                name: product.name,
                summary: product.summary,
                description: product.description,
                price: product.price,
                discounted_price: product.discounted_price,
                category_id: product.category_id,
                brand_id: product.brand_id,
                status: product.status,
                featured: product.featured,
                images: []
            })
        }
    },[product])

    useEffect(() =>{
        if ('images' in form && form.images.length){
            let temp = []

            for(let image of form.images){
                temp.push(<img src={URL.createObjectURL(image)} className="img-fluid  mt-3"/>)
            }
            setImgSelected(temp)
        }
    },[form])

    

    const handelSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        const  fd = new FormData

        for (let key in form){
            if(key == 'images'){
                for (let image of form.images){
                    fd.append('images', image)
                }
            }else{
                fd.append(key, form[key])
            }
        }

        http.patch(`cms/products/${params.id}`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => navigate('/products'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    const handelImgDelete = filename =>{
        confirmAlert({
            title: 'Delete',
            message : "Are you sure you want to delete this item?",
            buttons:[
                {
                    label:'Sure',
                    onClick: () => {
                        setLoadingPage(true)

                        http.delete(`cms/products/${params.id}/image/${filename}`)
                            .then (() => http.get(`cms/products/${params.id}`))
                            .then (({data}) => setProduct(data))
                            .catch(err=> {})
                            .finally(() => setLoadingPage(false))
                    }
                },
                {
                    label:'Abort',
                    onClick: () => {}
                }
            ]
        })
    }

    const modules = {
        toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
        ],
    }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]


    return <Container>
        <Row>
            <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                <Row>
                    <Col lg={8} className="mx-auto">
                    <h1>Edit Product</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} className="mx-auto">
                        {loadingPage ? <Loading /> : <Form onSubmit={handelSubmit}>
                            <FormInput title="name" label= "Name">
                                <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.name} required />
                            </FormInput>
                            <FormInput title="summary" label= "Summary">
                                <ReactQuill theme="snow" modules={modules} formats={formats}  value={form.summary} onChange={data => setFrom({
                                    ...form,
                                    summary: data
                                })} />
                            </FormInput>
                            <FormInput title="description" label= "Description">
                                <ReactQuill theme="snow" modules={modules} formats={formats} value={form.description} onChange={data => setFrom({
                                    ...form,
                                    description: data
                                    })} />
                            </FormInput>
                            <FormInput title="price" label= "Price">
                                <Form.Control type="text" name="price" id="price" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.price} required />
                            </FormInput>
                            <FormInput title="discounted_price" label= "Discounted Price">
                                <Form.Control type="text" name="discounted_price" id="discounted_price" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.discounted_price}  />
                            </FormInput>
                            <FormInput title="images" label= "Images">
                                <Form.Control type="file" name="images" id="images" onChange={ev => setFrom({
                                    ...form,
                                    images: ev.target.files
                                })} accept="image/*"  multiple />
                                {imgSelected.length ? <Row>
                                    {imgSelected.map((preview, i) => <Col key={i} lg={4}>{preview}</Col>)}
                                </Row> : null}
                                <Row>
                                    {product.images ? product.images.map((image, i) => <Col lg={4} key={i} className="mt-3">
                                        <Row>
                                            <Col xs={12}>
                                                <img src={imgUrl(image)} className="img-fluid" />
                                            </Col>
                                            <Col xs={12} className="mt-3 text-center">
                                                <Button variant="danger" size="sm" onClick={() => handelImgDelete(image)}>
                                                    <i className="fa-solid fa-trash me-2"></i>Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>): null}
                                </Row>
                            </FormInput>
                            <FormInput title="category_id" label= "Category">
                            <Form.Select  name="category_id" id="category_id" onChange={ev => setInForm(ev, form, setFrom)} value={form.category_id} required >
                                <option value="">Select a category</option>
                                {categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
                            </Form.Select>
                            </FormInput>
                            <FormInput title="brand_id" label= "Brand">
                            <Form.Select  name="brand_id" id="brand_id" onChange={ev => setInForm(ev, form, setFrom)} value={form.brand_id}  required >
                                <option value="">Select a brand</option>
                                {brands.map(brand => <option key={brand._id} value={brand._id}>{brand.name}</option>)}
                            </Form.Select>
                            </FormInput>
                            <FormInput title="status" label="Status">
                                <br />
                                <Switch checked = {form.status} onChange={() =>{
                                    setFrom({
                                        ...form,
                                        status:!form.status
                                    })
                                }}/>
                            </FormInput>
                            <FormInput title="featured" label="Featured">
                                <br />
                                <Switch checked = {form.featured} onChange={() =>{
                                    setFrom({
                                        ...form,
                                        featured:!form.featured
                                    })
                                }}/>
                            </FormInput>
                            <div className="mb-3 ">
                                <SubmitBtn  loading={loading}/>
                            </div>
                        </Form>}
                    </Col>
                </Row>
            </Col>
        </Row>
        
    </Container>
}