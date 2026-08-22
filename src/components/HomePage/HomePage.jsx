import axios from "axios";
import { useEffect, useState } from "react";
// import getStandardPrice from "../../utils/money";
import "./HomePage.css";
import ProductsGrid from "./ProductsGrid";
export default function HomePage({ getCartItemsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  return (
    <>
      <link rel="icon" href="src/assets/images/home-favicon.png" />
      <div className="home-page">
        <ProductsGrid products={products} getCartItemsData={getCartItemsData} />
      </div>
    </>
  );
}
