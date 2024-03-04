import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { FormInput, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import http from "../../http"
import { useNavigate, useParams } from "react-router-dom"
import Switch from "react-switch"


export const Edit = () =>{

    const [form, setFrom] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [category, setCategory] = useState({})

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)

        http.get(`cms/categories/${params.id}`)
            .then(({data}) => setCategory(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
        }, [])
    
    useEffect(() => {
        if(Object.keys(category).length){
            setFrom({
                name: category.name,
                status: category.status
            })
        }
        },[category])


    const handelSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`cms/categories/${params.id}`, form)
            .then(() => navigate('/categories'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }



    return <Container>
        <Row>
            <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                <Row>
                    <Col lg={6} className="mx-auto">
                    <h1>Edit Category</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="mx-auto">
                        { loadingPage ? <loading /> : <Form onSubmit={handelSubmit}>
                            <FormInput title="name" label= "Name">
                            <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.name} required />
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