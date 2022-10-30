import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartContent from "./components/CartContent";
import Checkout from "./components/Checkout";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import CartContextProvider from "./context/CartContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={ <ItemListContainer greeting="Bienvenido a la tienda online de Changas" />}/>
            <Route path="/category/:category" element={<ItemListContainer />} />
            <Route path="/product/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:category/product/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartContent />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </CartContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
