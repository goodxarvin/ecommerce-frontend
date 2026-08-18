// import { useState } from "react";

import HomePage from "./components/HomePage";
import ChechoutPage from "./components/CheckoutPage";
import OrdersPage from "./components/OrdersPage";
import TrackingPage from "./components/TrackingPage";
import { Routes, Route } from "react-router";
import "./App.css";

// Route is basically a page with a given path in the url from main path to be shown.
//shortcut: instead of path="/" you can write "index" as well
function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<ChechoutPage />} />
        <Route path="orders" element={<OrdersPage />}></Route>
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default App;
