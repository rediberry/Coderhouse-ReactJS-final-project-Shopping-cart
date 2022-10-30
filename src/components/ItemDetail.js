import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useCartContext } from "../context/CartContext";
import ItemCount from "./ItemCount";
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers';
import Stars from './Stars';

const ItemDetail = ({ selectedProduct }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { isInCart, addToCart } = useCartContext();

  const onAdd = () => {
    setIsAdded(true);
    isInCart(selectedProduct.id);
    addToCart(selectedProduct, quantity);
  };
  const stars = 5;
  const reviews = 100;

  return (
    <Wrapper>
<div className='section section-center page'>
  <Link to='/' className='btn'>
          Volver a productos
      </Link>
        <div className=' product-center'>
        <img src={selectedProduct.image} alt={selectedProduct.name} className="main"/>
          <section className='content'>
            <h2>{selectedProduct.name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'> {formatPrice(selectedProduct.price)}</h5>
            <p className='desc'> {selectedProduct.description}</p>
            <p className='info'>
              <span>Disponibilidad : </span>
              {selectedProduct.stock > 0 ? 'En stock' : 'sin stock'}
            </p>
            <p className='info'>
              <span>Código : </span>
              {selectedProduct.id}
            </p>
            <p className='info'>
              <span>Categría : </span>
              {selectedProduct.category}
            </p>
            <hr />
            {isAdded ? (
              <Link to="/cart">
                <Button color="dark" outline size="sm">
                  Ir al carrito
                </Button>
              </Link>
            ) : (
              <ItemCount quantity={quantity} setQuantity={setQuantity} stock={selectedProduct.stock} onAdd={onAdd}/> )}
            <Link to="/">
            </Link>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit:cover;
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
    .main {
      height: 500px;
    }
  }
`

export default ItemDetail;