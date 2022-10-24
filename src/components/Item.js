import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
// import "./style.scss";

const Item = ({ product }) => {
  return (
    <Card color="dark" style={{ width: "18rem", margin: "1rem", }}>
      <img alt={product.name} src={product.image} className="product-img" />
      <CardBody className="card-product">
        <CardTitle tag="h5">{product.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          ${product.price}
        </CardSubtitle>
        <Button color="dark" outline size="sm">
          <Link className="btn-detail" to={`product/${product.id}`}>
            Ver detalle
          </Link>
        </Button>
      </CardBody>
    </Card>
  );
};

export default Item;