import { Row, Col } from 'react-bootstrap';
import ProductList from "../../components/Products/ProductList";

function All() {
  return (
    <Row>
      <Col sm={0} lg={3}>
        {/* FilterPanel will be included in ProductList component */}
      </Col>
      <Col sm={12} lg={9}>
        <ProductList filter="All" />
      </Col>
    </Row>
  );
}

export default All;
