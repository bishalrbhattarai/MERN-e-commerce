import { useState } from "react";
import { useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux"
import { FormInput, SubmitBtn } from "../../components";
import { Form } from "react-bootstrap";
import { inStorage, setInForm } from "../../lib";
import { setUser } from "../../store";
import http from "../../http";



export const Login = () =>{
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [remember, setRemember] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = ev => {
        ev.preventDefault()

        setLoading(true)

        http.post('/auth/login', form)
            .then(({data}) => {
                dispatch(setUser(data.user))
                inStorage('user_token', data.token, remember)
                navigate('/profile')
                
            })
            .catch(err => { })
            .finally(() => setLoading(false))
    }

    return  <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>Login</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit} >
                        <FormInput title="email" label="Email">
                            <Form.Control type="email" name="email" id="email" onChange={(ev) => setInForm(ev, form, setForm)} required />
                        </FormInput>

                        <FormInput title="password" label="Password">
                            <Form.Control type="password" name="password" id="password" onChange={(ev) => setInForm(ev, form, setForm)} required />
                        </FormInput>

                        <div className="mb-3 form-check">
                            <Form.Check.Input id="remember" name="remember" checked={remember} onChange={() => setRemember(!remember)} />
                            <Form.Check.Label htmlFor="remember" >Remember Me</Form.Check.Label>
                        </div>
                        <div className="form-group">
                        <SubmitBtn label="Login" icon="fa-sign-in-alt" loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </main>
</div>
}