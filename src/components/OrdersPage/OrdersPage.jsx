import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router";
import OrdersGrid from "./OrdersGrid";
import favicon from "../../assets/images/orders-favicon.png";
import "./OrdersPage.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      <link rel="icon" href={favicon} />

      <div class="orders-page">
        <div class="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
