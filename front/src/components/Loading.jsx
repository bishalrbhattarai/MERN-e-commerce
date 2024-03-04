import { Col, Row } from "react-bootstrap"

export const Loading = () =>{
    return <Row>
        <Col className="text-center my-3">
            <h5>
                <i className="fa-solid fa-spinner fa-spin me-2"></i>Loading
            </h5>
        </Col>
    </Row>
}