import styled from 'styled-components'

const Modal = ({ children, isOpen, closeModal }) => {
  return (
    <ModalContainer>
      <div className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-container">
          {children}
        </div>
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.nav`
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: none;
  justify-content: center;
  align-items: center;

  .modal-container {
    position: relative;
    background-color: #fff;
    padding: 2rem;
    border-radius: 1%;

    h3 {
      margin-bottom: 1rem;
    }

    p {
      &:first-of-type {
        margin-bottom: 0.5rem;
      }
      &:last-of-type {
        margin-bottom: 2rem;
      }
    }

    p,
    h3 {
      color: black !important;
      background-color: white;
    }
  }
}

.modal.modal-open {
  display: flex;
}
  /* @media (min-width: 992px) {

  } */
`

export default Modal;