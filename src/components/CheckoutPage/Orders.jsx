// import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import getStandardPrice from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";

export default function Orders({
  cartItem,
  deliveryOptions,
  getCartItemsData,
}) {
  //   const [quantity, setQuantity] = useState(0);

  const deleteProduct = async (event) => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await getCartItemsData();
  };

  const updateProductQuantity = (operation) => {
    return async (event) => {
      if (operation === "minus" && cartItem.quantity > 1) {
        await axios.put(`api/cart-items/${cartItem.productId}`, {
          quantity: cartItem.quantity - 1,
        });
      } else if (operation === "add") {
        await axios.put(`api/cart-items/${cartItem.productId}`, {
          quantity: cartItem.quantity + 1,
        });
      }
      await getCartItemsData();
    };
  };
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return cartItem.deliveryOptionId === deliveryOption.id;
  });
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
              Quantity:
              {cartItem.quantity !== 1 && (
                <button
                  className="place-order-button button-primary"
                  id="subtract-quantity-button"
                  onClick={updateProductQuantity("minus")}
                >
                  -
                </button>
              )}
              <span className={cartItem.quantity === 1 ? "quantity-label" : ""}>
                {cartItem.quantity}
              </span>
              <button
                id="add-quantity-button"
                className="place-order-button button-primary"
                onClick={updateProductQuantity("add")}
              >
                +
              </button>
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
}
