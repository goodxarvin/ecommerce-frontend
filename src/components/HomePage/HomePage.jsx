import axios from "axios";
import { useEffect, useState } from "react";
// import getStandardPrice from "../../utils/money";
import "./HomePage.css";
import ProductsGrid from "./ProductsGrid";
export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <link rel="icon" href="src/assets/images/home-favicon.png" />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
