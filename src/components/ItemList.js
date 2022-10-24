import Item from "./Item";
// import "./style.scss";

const ItemList = ({ productsList }) => {
  return (
    <section className="products-container">
      {productsList.map((product) => {
        return <Item product={product} key={product.id} />;
      })}
    </section>
  );
};

export default ItemList;