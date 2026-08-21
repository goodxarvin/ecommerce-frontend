import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Link } from "react-router";
import favicon from "../../assets/images/orders-favicon.png";
import "./OrdersPage.css";
import getStandardPrice from "../../utils/money";

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

        <div class="orders-grid">
          {orders.map((order) => {
            return (
              <div class="order-container" key={order.id}>
                <div class="order-header">
                  <div class="order-header-left-section">
                    <div class="order-date">
                      <div class="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div class="order-total">
                      <div class="order-header-label">Total:</div>
                      <div>{getStandardPrice(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div class="order-details-grid">
                  {order.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.product.id}>
                        <div class="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>

                        <div class="product-details">
                          <div class="product-name"></div>
                          <div class="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                              "MMMM D",
                            )}
                          </div>
                          <div class="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button class="buy-again-button button-primary">
                            <img
                              class="buy-again-icon"
                              src="src/assets/images/icons/buy-again.png"
                            />
                            <span class="buy-again-message">Add to Cart</span>
                          </button>
                        </div>

                        <div class="product-actions">
                          <Link to="/tracking">
                            <button class="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
