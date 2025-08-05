import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductList from "../../components/Products/ProductList";

function NewArrivals() {
  return (
    <Row>
      <Col sm={3}>{/* FilterPanel will be included in ProductList component */}</Col>
      <Col sm={9}>
        <ProductList filter="new-arrivals" />
      </Col>
    </Row>
  );
}

export default NewArrivals;
