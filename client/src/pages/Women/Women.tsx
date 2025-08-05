import { Row, Col } from 'react-bootstrap';
import ProductList from "../../components/Products/ProductList";

function Women() {
  return (
    <Row>
      <Col sm={0} lg={3}>
        {/* FilterPanel will be included in ProductList component */}
      </Col>
      <Col sm={12} lg={9}>
        <ProductList filter="Women" />
      </Col>
    </Row>
  );
}

export default Women;
