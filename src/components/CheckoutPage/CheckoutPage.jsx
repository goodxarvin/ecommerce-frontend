import axios from "axios";
import { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import { Link } from "react-router";
import "./CheckoutPage.css";

export default function ChechoutPage({ cart, setCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });

    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);

  return (
    <>
      <link rel="icon" href="src/assets/images/cart-favicon.png" />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            paymentSummary={paymentSummary}
            deliveryOptions={deliveryOptions}
            cart={cart}
          />

          <PaymentSummary paymentSummary={paymentSummary} cart={cart} />
        </div>
      </div>
    </>
  );
}
