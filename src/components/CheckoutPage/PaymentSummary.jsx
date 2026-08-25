import axios from "axios";
import { useNavigate } from "react-router";
import getStandardPrice from "../../utils/money";
import getTotalQuantity from "../../utils/quantityCounter";

export default function PaymentSummary({
  paymentSummary,
  getCartItemsData,
  cart,
}) {
  const totalQuantity = getTotalQuantity(cart);
  const navigateToOrders = useNavigate();

  const createOrder = async (event) => {
    await axios.post(`/api/orders`);
    await getCartItemsData();
    navigateToOrders("/orders"); // navigate to /orders/ url
  };
  return (
    <>
      {paymentSummary && (
        <div className="payment-summary" data-testid="payment-summary">
          <div className="payment-summary-title">Payment Summary</div>

          <div className="payment-summary-row">
            <div>Items ({totalQuantity}):</div>
            <div className="payment-summary-money">
              {getStandardPrice(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {" "}
              {getStandardPrice(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {getStandardPrice(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {getStandardPrice(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {getStandardPrice(paymentSummary.totalCostCents)}
            </div>
          </div>

          {cart.length !== 0 && (
            <button
              className="place-order-button button-primary"
              onClick={createOrder}
            >
              Place your order
            </button>
          )}
        </div>
      )}
    </>
  );
}
