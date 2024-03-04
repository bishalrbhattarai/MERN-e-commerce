import { useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import { FormInput, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import { useDispatch, useSelector } from "react-redux"
import http from "../../http"
import { setUser } from "../../store"

export const Edit = () =>{

    const [form, setFrom] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.value)

    useEffect(() => {
            if(Object.keys(user).length){
                setFrom({
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                })
            }
        }, [user])

    const handelSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/edit-profile', form)
            .then(() => http.get('profile/details'))
            .then(({data}) => dispatch(setUser(data)))
            .catch(err => {})
            .finally(() => setLoading(false))
    }



    return <Container>
        <Row>
            <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                <Row>
                    <Col lg={6} className="mx-auto">
                    <h1>Edit Profile</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="mx-auto">
                        <Form onSubmit={handelSubmit}>
                            <FormInput title="name" label= "Name">
                            <Form.Control type="text" name="name" id="name" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.name} required />
                            </FormInput>
                            <FormInput title="email" label= "Email">
                            <Form.Control type="text" defaultValue={user.email} readOnly plaintext />
                            </FormInput>
                            <FormInput title="phone" label= "Phone">
                            <Form.Control type="text" name="phone" id="phone" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.phone} required />
                            </FormInput>
                            <FormInput title="address" label= "Address">
                            <Form.Control as="textarea" name="address" id="address" onChange={ev => setInForm(ev, form, setFrom)} defaultValue={form.address} required />
                            </FormInput>
                            <div className="mb-3 ">
                                <SubmitBtn  loading={loading}/>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
        
    </Container>
}