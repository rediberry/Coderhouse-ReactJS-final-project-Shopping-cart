import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useModal } from "../customHooks/useModal";
import { productsCollection } from "../utils/firebase";
import ItemList from "./ItemList";
import Modal from "./Modal";
// import "./style.scss";

const ItemListContainer = ({ greeting }) => {
  const [productsList, setProductsList] = useState([]);
  const [load, setLoad] = useState(false);
  const [isOpenProdsErr, openModalProdsErr, closeModalProdsErr] = useModal(false);
  const { category } = useParams();

  useEffect(() => {
    // getDocs(productsCollection)
    // .then((data)=>{
    //   console.log(data);
    // })

    const getProducts = (param) => {
      getDocs(param)
        .then((snapshot) => {
          const products = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setProductsList(products);
          setLoad(true);
        })
        .catch((err) => {
          openModalProdsErr();
        });
    };

    if (!category) {
      getProducts(productsCollection);
    } else {
      const filter = query(
        productsCollection,
        where("category", "==", category)
      );
      getProducts(filter);
      setLoad(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <>
      <h1 className="greeting">{greeting}</h1>
      {load ? (
        <ItemList productsList={productsList} />
      ) : (
        <div className="spinner">
          <Spinner color="light"></Spinner>
        </div>
      )}

      <Modal isOpen={isOpenProdsErr} closeModal={closeModalProdsErr}>
        <h3>Ocurrió un error al mostrar el listado de productos</h3>
        <p>Por favor intenta nuevamente</p>
      </Modal>
    </>
  );
};

export default ItemListContainer;