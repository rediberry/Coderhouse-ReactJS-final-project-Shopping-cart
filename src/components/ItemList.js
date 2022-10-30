import Item from "./Item";
import styled from 'styled-components'

const ItemList = ({ productsList }) => {
  return (
    <Wrapper>
      <section className="products-container products">
        {productsList.map((product) => {
          return <Item product={product} key={product.id} />;
        })}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
.products-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
}

.products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: auto auto auto auto;
    }
  }
`

export default ItemList;