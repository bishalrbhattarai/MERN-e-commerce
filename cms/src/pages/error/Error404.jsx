import { Button, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Error404 = () =>{

    const navigate = useNavigate()

    return <Row className="text-center">
        <Col xs={12} className="mt-5">
            <h1 className="display-1 text-secondary" >404</h1>
            <h3 className="display-1 text-secondary" > PAGE NOT FOUND</h3>
        </Col>
        <Col xs={12} className="mt-3">
            <Button variant="secondary" onClick={() => {
                navigate(-1)
                }}>
                <i className="fa-solid fa-chevron-left me-2"></i> Go Back
            </Button>
        </Col>
    </Row>
}