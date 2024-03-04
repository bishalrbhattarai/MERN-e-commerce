import { useState } from "react"
import { useDispatch } from "react-redux"
import { FormInput, SubmitBtn } from "../../components"
import { Col, Container, Form, Row } from "react-bootstrap"
import { setInForm } from "../../lib"
import http from "../../http"
import { setUser } from "../../store"

export const Password = () =>{

    const [form, setFrom] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handelSubmit = ev => {
        ev.preventDefault()
        setLoading(true)
        console.log(ev.target)

        http.patch('profile/change-password', form)
            .then(() => {
                ev.target.reset()
                return http.get('profile/details')
            })
            .then(({data}) => dispatch(setUser(data)))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <Container>
        <Row>
            <Col xs={12} className="bg-white my-3 py-3 rounded-2 shadow-sm">
                <Row>
                    <Col lg={6} className="mx-auto">
                    <h1>Change Password</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="mx-auto">
                        <Form onSubmit={handelSubmit}>
                            <FormInput title="old_password" label= "Old_Password">
                            <Form.Control type="password" name="old_password" id="old_password" onChange={ev => setInForm(ev, form, setFrom)}  required />
                            </FormInput>
                            <FormInput title="new_password" label= "New_Password">
                            <Form.Control type="password" name="new_password" id="new_password" onChange={ev => setInForm(ev, form, setFrom)}  required />
                            </FormInput>
                            <FormInput title="confirm_password" label= "Confirm_Password">
                            <Form.Control type="password" name="confirm_password" id="confirm_password" onChange={ev => setInForm(ev, form, setFrom)}  required />
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