import getStandardPrice from "../../utils/money";

export default function PaymentSummary({ paymentSummary, cart }) {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <>
      {paymentSummary && (
        <div className="payment-summary">
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

          <button className="place-order-button button-primary">
            Place your order
          </button>
        </div>
      )}
    </>
  );
}
