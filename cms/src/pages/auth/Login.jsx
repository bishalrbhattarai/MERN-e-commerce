import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { inStorage, setInForm } from "../../lib"
import { FormInput, SubmitBtn } from "../../components"
import http from "../../http"
import { useDispatch } from "react-redux"
import { setUser } from "../../store"
import { useNavigate } from "react-router-dom"


export const Login = () => {

    const [form, setFrom] = useState({})
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handelSubmit = ev => {
        ev.preventDefault()
        setLoading(true) 

        http.post('auth/login',form)
            .then(({data}) => {
                dispatch(setUser(data.user))
                inStorage('user_token', data.token, remember)
                navigate('/')
            })
            .catch(err => {})

            .finally(() => setLoading(false))
    }

    return <Container>
        <Row>
            <Col  lg={4} md = {5} sm={6} className="bg-white my-5 mx-auto py-3 rounded-2 shadow-sm">
                <Row>
                    <Col><h1 className="text-center">Login</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={handelSubmit}>
                            <FormInput title="email" label= "Email">
                            <Form.Control type="email" name="email" id="email" onChange={ev => setInForm(ev, form, setFrom)} required />
                            </FormInput>
                            <FormInput title="password" label="Password">
                            <Form.Control type="password" name="password" id="password" onChange={ev => setInForm(ev, form, setFrom)} required />
                            </FormInput>
                            <div className="mb-3 form-check">
                                <Form.Check.Input name="remember" id="remember" defaultChecked={remember} onClick={ev => setRemember(!remember)} />
                                <Form.Check.Label htmlFor="remember">Remember me</Form.Check.Label>
                            </div>
                            <div className="mb-3 d-grid">
                                <SubmitBtn label="Log In" icon="fa-sign-in-alt" loading={loading}/>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Col>  
        </Row>
    </Container>
}