import React, { useState } from "react";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { useCartContext } from "../context/CartContext";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useModal } from "../customHooks/useModal";
import { Button } from "reactstrap";
import PageHero from "./PageHero";

const Checkout = () => {
  const { cartList, totalPrice, emptyCart } = useCartContext();
  const [purchase, setPurchase] = useState("");
  const [inputValues, setInputValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    adress: "",
    flat: "",
  });
  const navigate = useNavigate();
  const [isOpenSuccess, openModalSuccess, closeModalSuccess] = useModal(false);
  const [isOpenError, openModalError, closeModalError] = useModal(false);
  const total = totalPrice();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const finalSale = (e) => {
    e.preventDefault();
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, {
      items: cartList,
      date: serverTimestamp(),
      total,
      buyer:{ ...inputValues },
    }).then((res) => {
      // emptyCart();
      setPurchase(res.id);
      openModalSuccess();
    });
  };
  if (cartList.length === 0) {
    setTimeout(() => {
      navigate("/");
    }, 3000);

    return (
      <div className="empty-cart">
        <p>No hay productos en tu carrito</p>
        <p>Serás redirigido al inicio en 3 segundos...</p>
      </div>
    );
  }

  return (
    <>
      <PageHero title='checkout'/>
      <FormContainer>
        <h2 className="message">Usted debera abonar: $ {totalPrice()} </h2>
        <form onSubmit={finalSale}>
          <input
            name="name"
            type="name"
            placeholder="Nombre"
            onChange={handleOnChange}
            required
          />
          <input
            name="surname"
            type="family-name"
            placeholder="Apellido"
            onChange={handleOnChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleOnChange}
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Telefono"
            onChange={handleOnChange}
            required
          />
          <input
            name="adress"
            type="street-address"
            placeholder="Direccion"
            onChange={handleOnChange}
            required
          />
          <input
            name="flat"
            type="text"
            placeholder="Departamento"
            onChange={handleOnChange}
            required
          />
          <button className="btn">Finalizar Compra</button>
          <Modal isOpen={isOpenSuccess} closeModal={closeModalSuccess}>
            <h3> Tu compra se procesó correctamente :)</h3>
            <p>Recibirás un mail de confirmación dentro de los próximos 15 minutos.</p>
            <p> Número de orden: {purchase}</p>
            <Button size="sm" color="dark" onClick={emptyCart} style={{ marginRight: "1rem", }}>
              <Link to="/" style={{ textDecoration: "none", backgroundColor: "transparent", }}>
                Volver al inicio
              </Link>
            </Button>
          </Modal>
          <Modal isOpen={isOpenError} closeModal={closeModalError}>
            <h3>Ocurrió un error al procesar tu compra</h3>
            <p>Por favor intenta nuevamente</p>
          </Modal>
        </form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  .message{
    font-weight: 400;
    font-size: 2rem;
    padding-top: 1rem;
  }

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 2rem;
  }

  input {
    height: 30px;
    width: 300px;
    border-radius: 2.5px;
    border: none;
    background-color: var(--clr-primary-10);
    display: block;
    margin: .3rem; 
    line-height: 1;
  }
`;

export default Checkout;