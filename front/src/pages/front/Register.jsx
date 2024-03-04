import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../../components";
import { Form } from "react-bootstrap";
import { setInForm } from "../../lib";
import http from "../../http";



export const Register = () =>{
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()

        setLoading(true)

        http.post('/auth/register', form)
            .then(() => navigate('/login'))
            .catch(err => { })
            .finally(() => setLoading(false))
    }

    return  <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>Register</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit} >
                        <FormInput title="name" label="Name">
                            <Form.Control type="text" name="name" id="name" onChange={(ev) => setInForm(ev, form, setForm)} required />
                        </FormInput>
                        
                        <FormInput title="email" label="Email">
                            <Form.Control type="email" name="email" id="email" onChange={(ev) => setInForm(ev, form, setForm)} required />
                        </FormInput>

                        <FormInput title="password" label="Password">
                            <Form.Control type="password" name="password" id="password" onChange={(ev) => setInForm(ev, form, setForm)} required />
                        </FormInput>

                        <FormInput title="confirm_password" label="Confirm Password">
                            <Form.Control type="password" name="confirm_password" id="confirm_password" onChange={(ev) => setInForm(ev, form, setForm)} required />
                        </FormInput>

                        <FormInput title="phone" label="Phone">
                            <Form.Control type="text" name="phone" id="phone" onChange={(ev) => setInForm(ev, form, setForm)} required />
                        </FormInput>

                        <FormInput title="address" label="Address">
                            <Form.Control as="textarea" name="address" id="address" onChange={(ev) => setInForm(ev, form, setForm)} required />
                        </FormInput>
                        <div className="mb-3">
                            <div className="form-check">
                                <input type="checkbox" id="agree" className="form-check-input" required />
                                <label htmlFor="agree" className="form-check-label ml-2" >I agree to Terms and Conditions</label>
                            </div>
                        </div>
                        <div className="form-group">
                        <SubmitBtn label="Register" icon="fa-user-plus" loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </main>
</div>
}