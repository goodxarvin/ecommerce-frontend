// import { useState } from "react";

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
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Header /> <HomePage />
            </>
          }
        />
        <Route
          path="checkout"
          element={
            <>
              <CheckoutHeader /> <ChechoutPage />
            </>
          }
        />
        <Route
          path="orders"
          element={
            <>
              <Header /> <OrdersPage />
            </>
          }
        ></Route>
        <Route
          path="tracking"
          element={
            <>
              <Header /> <TrackingPage />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header /> <NotFoundPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
