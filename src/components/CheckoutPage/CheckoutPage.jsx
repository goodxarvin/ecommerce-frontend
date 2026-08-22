import axios from "axios";
import { useState, useEffect } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import { Link } from "react-router";
import "./CheckoutPage.css";

export default function ChechoutPage({ cart, setCart, getCartItemsData }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getDelivaryOptionsData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };

    getDelivaryOptionsData();
  }, []);

  useEffect(() => {
    const getPaymentSummaryData = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    getPaymentSummaryData();
  }, [cart]);

  return (
    <>
      <link rel="icon" href="src/assets/images/cart-favicon.png" />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            paymentSummary={paymentSummary}
            deliveryOptions={deliveryOptions}
            getCartItemsData={getCartItemsData}
            cart={cart}
          />

          <PaymentSummary paymentSummary={paymentSummary} cart={cart} />
        </div>
      </div>
    </>
  );
}
