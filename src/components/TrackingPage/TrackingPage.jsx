import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { Link, useParams } from "react-router";
import favicon from "../../assets/images/tracking-favicon.png";
import "./TrackingPage.css";
import dayjs from "dayjs";

export default function TrackingPage() {
  const { orderId, productId } = useParams();
  const [trackOrder, setTrackOrder] = useState(null);

  useEffect(() => {
    const getTrackingOrderData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setTrackOrder(response.data);
    };

    getTrackingOrderData();
  }, [orderId]);

  if (!trackOrder) {
    return null;
  }

  const orderProduct = trackOrder.products.find((product) => {
    return product.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - trackOrder.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - trackOrder.orderTimeMs;

  const progressPercentage =
    (timePassedMs / totalDeliveryTimeMs) * 100 > 100
      ? 100
      : timePassedMs / totalDeliveryTimeMs;

  return (
    <>
      <link rel="icon" href={favicon} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on: {dayjs(trackOrder.orderTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={clsx(
                "progress-label",
                progressPercentage < 50 && "current-status",
              )}
              // className={
              //   progressPercentage < 50
              //     ? "progress-label current-status"
              //     : "progress-label"
              // }
            >
              Preparing
            </div>
            <div
              className={clsx(
                "progress-label",
                progressPercentage < 100 &&
                  progressPercentage >= 50 &&
                  "current-status",
              )}
            >
              Shipped
            </div>
            <div
              className={clsx(
                "progress-label",
                progressPercentage >= 100 && "current-status",
              )}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
