import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PageHero = ({ title, product }) => {

  return (
    <Wrapper>
      <div className='section-center'>
        <h3>
          <Link to='/'>Home</Link>
          {product && <Link to={`/category/${product}`}>/ {product} </Link>}/ {title}
        </h3>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
    text-transform: capitalize;
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`

export default PageHero