import dayjs from "dayjs";
import axios from "axios";
import getStandardPrice from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";

export default function OrderSummary({
  paymentSummary,
  deliveryOptions,
  getCartItemsData,
  cart,
}) {
  return (
    <div className="order-summary">
      {paymentSummary &&
        deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const deleteProduct = async (event) => {
            await axios.delete(`api/cart-items/${cartItem.productId}`);
            await getCartItemsData();
          };

          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return cartItem.deliveryOptionId === deliveryOption.id;
            },
          );

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {getStandardPrice(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteProduct}
                    >
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  getCartItemsData={getCartItemsData}
                  cartItem={cartItem}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
