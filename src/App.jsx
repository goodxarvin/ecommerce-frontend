// import { useState } from "react";

import HomePage from "./components/HomePage";
import ChechoutPage from "./components/CheckoutPage";
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
      </Routes>
    </>
  );
}

export default App;
