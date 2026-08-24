// import { useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import getTotalQuantity from "../../utils/quantityCounter";
import "./Header.css";

export default function Header({ cart, setCart, products, setProducts }) {
  const totalQuantity = getTotalQuantity(cart);
  const [searchValue, setSearchValue] = useState("");
  const searchNavigate = useNavigate();

  const setInputValue = (event) => {
    setSearchValue(String(event.target.value));
  };

  const startSearch = async () => {
    // const search = searchParams.get("search");
    searchNavigate(`/?search=${searchValue}`);
    if (searchValue) {
      const searchResponse = await axios.get(
        `/api/products?search=${searchValue}`,
      );
      if (searchResponse.data.length) {
        setProducts(searchResponse.data);
      } else {
        setProducts([]);
      }
    } else {
      searchNavigate("/");
      const allProducts = await axios.get(`/api/products`);
      setProducts(allProducts.data);
    }
  };

  const startSearchEnter = (event) => {
    if (event.key === "Enter") {
      startSearch();
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src="src/assets/images/logo-white.png" />
          <img
            className="mobile-logo"
            src="src/assets/images/mobile-logo-white.png"
          />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={setInputValue}
          onKeyDown={startSearchEnter}
        />

        <button className="search-button" onClick={startSearch}>
          <img
            className="search-icon"
            src="src/assets/images/icons/search-icon.png"
          />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img
            className="cart-icon"
            src="src/assets/images/icons/cart-icon.png"
          />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
