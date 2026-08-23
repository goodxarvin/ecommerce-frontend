import Orders from "./Orders";

export default function OrderSummary({
  paymentSummary,
  deliveryOptions,
  getCartItemsData,
  cart,
}) {
  // const handleChange = (event) => {
  //   const onlyNums = event.target.value.replace(/\D/g, "");
  //   setValue(onlyNums);
  // };
  //   <input
  //   type="text"
  //   id="quantity-input"
  //   inputmode="numeric"
  //   onChange={handleChange}
  //   value={value}
  // />
  return (
    <div className="order-summary">
      {paymentSummary &&
        deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <Orders
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
              getCartItemsData={getCartItemsData}
            />
          );
        })}
    </div>
  );
}
