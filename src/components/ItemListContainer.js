import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../customHooks/useModal";
import { productsCollection } from "../utils/firebase";
import ItemList from "./ItemList";
import Modal from "./Modal";
import styled from 'styled-components'
import Loading from "./Loading";
import PageHero from "./PageHero";

const ItemListContainer = ({ greeting }) => {
  const [productsList, setProductsList] = useState([]);
  const [load, setLoad] = useState(false);
  const [isOpenProdsErr, openModalProdsErr, closeModalProdsErr] = useModal(false);
  const { category } = useParams();

  useEffect(() => {
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
      <Wrapper>
        {(!category)?<PageHero title={greeting} />:<PageHero title={category} />}
        {load ? (
          <div className='section-center products'>
          <ItemList productsList={productsList} />
          </div>
        ) : (
          <Loading/>
        )}

        <Modal isOpen={isOpenProdsErr} closeModal={closeModalProdsErr}>
          <h3>Ocurrió un error al mostrar el listado de productos</h3>
          <p>Por favor intenta nuevamente</p>
        </Modal>
      </Wrapper>
  );
};

const Wrapper = styled.div`
.greeting {
  font-size: 30px;
  text-align: center;
  margin-top: 40px;
}
`

export default ItemListContainer;