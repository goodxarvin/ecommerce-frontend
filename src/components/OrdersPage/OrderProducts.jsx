import { Fragment } from "react";
import { Link } from "react-router";
import axios from "axios";
import dayjs from "dayjs";

export default function OrderProducts({ order, getCartItemsData }) {
  return (
    <>
      {order.products.map((orderProduct) => {
        const addToCart = async () => {
          axios.post("/api/cart-items", {
            productId: orderProduct.productId,
            quantity: 1,
          });
          const cartChannel = new BroadcastChannel("cart_channel");
          await cartChannel.postMessage("CART_UPDATED");
          cartChannel.close();
        };
        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name"></div>
              <div className="product-delivery-date">
                Arriving on:{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={addToCart}
              >
                <img
                  className="buy-again-icon"
                  src="src/assets/images/icons/buy-again.png"
                />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}
