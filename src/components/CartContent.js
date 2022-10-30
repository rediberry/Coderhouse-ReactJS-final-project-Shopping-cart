import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import CartColumns from './CartColumns'
import CartItem from './CartItem'
import CartTotals from './CartTotals'
import PageHero from './PageHero'

const CartContent = () => {
  const { cartList, emptyCart } = useCartContext()
  if (cartList.length < 1) {
    return (
      <>
      <PageHero title='cart'/>
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Tu carrito está vacío</h2>
          <Link to='/' className='btn'>
            Volver al inicio
          </Link>
        </div>
      </Wrapper>
      </>
    )
  }
  return (
    <>
    <PageHero title='cart'/>
    <Wrapper className='section section-center'>
      <CartColumns />
      {cartList.map((item) => {
        return <CartItem key={item.id} {...item} />
      })}
      <hr />
      <div className='link-container'>
        <Link to='/' className='link-btn'>
          continuar comprando
        </Link>
        <button type='button' className='link-btn clear-btn' onClick={emptyCart}>
          vaciar carrito
        </button>
      </div>
      <CartTotals />
    </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`
export default CartContent