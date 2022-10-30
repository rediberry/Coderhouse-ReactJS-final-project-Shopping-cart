import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useModal } from "../customHooks/useModal";
import { productsCollection } from "../utils/firebase";
import ItemDetail from "./ItemDetail";
import Modal from "./Modal";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import PageHero from "./PageHero";

const ItemDetailContainer = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [load, setLoad] = useState(false);
  const [isOpenProdErr, openModalProdErr, closeModalProdErr] = useModal(false);
  const { id } = useParams();

  useEffect(() => {
    const reference = doc(productsCollection, id);

    getDoc(reference)
      .then((res) => {
        setSelectedProduct({
          ...res.data(),
          id: res.id,
        });
        setLoad(true);
      })
      .catch((err) => {
        openModalProdErr();
        return <ErrorPage />
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <PageHero title={selectedProduct.name} product={selectedProduct.category}/>
      {load ? (
        <ItemDetail selectedProduct={selectedProduct} />
      ) : (
          <Loading/>
      )}

      <Modal isOpen={isOpenProdErr} closeModal={closeModalProdErr}>
        <h3>Ocurrió un error al mostrar el detalle del producto</h3>
        <p>Por favor intenta nuevamente</p>
        <Button size="sm" color="dark" style={{ marginRight: "1rem", }}>
          <Link to="/" style={{textDecoration: "none", backgroundColor: "transparent", }}>
            Volver al inicio
          </Link>
        </Button>
      </Modal>
    </>
  );
};

export default ItemDetailContainer;