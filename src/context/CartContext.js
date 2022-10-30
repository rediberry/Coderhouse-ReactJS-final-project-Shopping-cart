import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

const { Provider } = CartContext;

const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const isInCart = (id) => {
    return cartList.some((prod) => prod.id === id);
  };

  const addToCart = (item, quantity) => {
    const newItem = { ...item, quantity };

    if (isInCart(newItem.id)) {
      const findItem = cartList.find((prod) => prod.id === newItem.id);
      const itemIndex = cartList.indexOf(findItem);
      const newCartList = [...cartList];
      newCartList[itemIndex].quantity += quantity;
      setCartList(newCartList);
    } else {
      setCartList([...cartList, newItem]);
    }
  };

  const removeFromCart = (id) => {
    return setCartList(cartList.filter((prod) => prod.id !== id));
  };

  const totalPrice = () => {
    return cartList.reduce(
      (acc, prod) => (acc += prod.price * prod.quantity),
      0
    );
  };

  const totalQuantity = () => {
    return cartList.reduce((acc, prod) => (acc += prod.quantity), 0);
  };

  const emptyCart = () => setCartList([]);

  return (
    <Provider value={{ cartList, isInCart, addToCart, removeFromCart, emptyCart, totalPrice, totalQuantity, }}>
      {children}
    </Provider>
  );
};

export default CartContextProvider;