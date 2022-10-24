import { Button } from "reactstrap";
// import "./style.scss";

const Modal = ({ children, isOpen, closeModal }) => {
  return (
    <div className={`modal ${isOpen && "modal-open"}`}>
      <div className="modal-container">
        {children}
        <Button size="sm" color="dark" onClick={closeModal}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default Modal;