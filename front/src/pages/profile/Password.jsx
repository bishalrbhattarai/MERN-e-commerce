import { useState } from "react"
import { useDispatch } from "react-redux"
import http from "../../http"
import { setUser } from "../../store"
import { Col, Form, Row } from "react-bootstrap"
import { setInForm } from "../../lib"
import { FormInput } from "../../components/FormInput"
import { SubmitBtn } from "../../components/SubmitBtn"

export const Password = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)
        console.log(ev.target)

        http.patch('profile/change-password', form)
            .then(() => {
                ev.target.reset()

                return http.get('profile/details')
            })
            .then(({ data }) => dispatch(setUser(data)))
            .catch(err => { })
            .finally(() => setLoading(false))
    }

    return <Row>
        <Col lg={6} className="mx-auto">
            <Form onSubmit={handleSubmit}>
                <FormInput title="old_password" label="OLD PASSWORD">
                    <Form.Control type="password" name="old_password" id="old_password" onChange={ev => setInForm(ev, form, setForm)} required />
                </FormInput>
                <FormInput title="new_password" label="NEW PASSWORD">
                    <Form.Control type="password" name="new_password" id="new_password" onChange={ev => setInForm(ev, form, setForm)} autoComplete="off" required />
                </FormInput>
                <FormInput title="confirm_password" label="CONFIRM PASSWORD">
                    <Form.Control type="password" name="confirm_password" id="confirm_password" onChange={ev => setInForm(ev, form, setForm)} required />
                </FormInput>
                <div className="mb-3">
                    <SubmitBtn loading={loading} />
                </div>
            </Form>
        </Col>
    </Row>

}