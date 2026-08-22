import dayjs from "dayjs";
import axios from "axios";
import getStandardPrice from "../../utils/money";

export default function DeliveryOptions({
  deliveryOptions,
  getCartItemsData,
  cartItem,
}) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        const updateDelivery = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id,
          });
          await getCartItemsData();
        };
        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateDelivery}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price">
                {deliveryOption.priceCents
                  ? `${getStandardPrice(deliveryOption.priceCents)} - Shipping`
                  : "FREE Shipping"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
