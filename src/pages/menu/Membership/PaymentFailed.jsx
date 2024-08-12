import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { BsXCircle } from "react-icons/bs";

const PaymentFailed = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col>
          <Alert variant="danger" className="text-center">
            <BsXCircle size={50} className="mb-3" />
            <h1>Payment Failed</h1>
            <p>Your payment could not be processed at this time.</p>
            <div>Please Check your Card details</div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentFailed;
