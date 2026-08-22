import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import CheckoutHeader from "./components/CheckoutHeader/CheckoutHeader";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./components/HomePage/HomePage";
import ChechoutPage from "./components/CheckoutPage/CheckoutPage";
import OrdersPage from "./components/OrdersPage/OrdersPage";
import TrackingPage from "./components/TrackingPage/TrackingPage";
import { Routes, Route } from "react-router";
import "./App.css";

// Route is basically a page with a given path in the url from main path to be shown.
//shortcut: instead of path="/" you can write "index" as well
function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCartItemsData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };
    getCartItemsData();
  }, []);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Header cart={cart} setCart={setCart} /> <HomePage />
            </>
          }
        />
        <Route
          path="checkout"
          element={
            <>
              <CheckoutHeader /> <ChechoutPage cart={cart} setCart={setCart} />
            </>
          }
        />
        <Route
          path="orders"
          element={
            <>
              <Header cart={cart} setCart={setCart} /> <OrdersPage />
            </>
          }
        ></Route>
        <Route
          path="tracking/:orderId/:productId"
          element={
            <>
              <Header cart={cart} setCart={setCart} /> <TrackingPage />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header cart={cart} setCart={setCart} /> <NotFoundPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
