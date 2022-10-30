import { Button } from "reactstrap";
import styled from 'styled-components'

const ItemCount = ({ quantity, setQuantity, stock, onAdd }) => {
  const increase = () => quantity < stock && setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <Wrapper>
      <div className="counter-container">
        <Button color="dark" outline size="sm" onClick={decrease}>
          -
        </Button>
        <p>{quantity}</p>
        <Button color="dark" outline size="sm" onClick={increase}>
          +
        </Button>
        <Button color="dark" outline size="sm" disabled={stock === 0 && "disabled"} onClick={onAdd}>
          Agregar al carrito
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
.counter-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  width: 80%;

  button {
    &:first-of-type {
      margin-left: 0px;
    }
    margin-left: 20px;
    margin-right: 20px;
  }

  p {
    margin: 0px;
  }
}
  /* @media (min-width: 992px) {
  
  } */
`

export default ItemCount;