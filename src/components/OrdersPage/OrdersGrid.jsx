import { Fragment } from "react";
import { Link } from "react-router";
import getStandardPrice from "../../utils/money";
import dayjs from "dayjs";
import OrderProducts from "./OrderProducts";

export default function OrdersGrid({ orders, getCartItemsData }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div className="order-container" key={order.id}>
            <div className="order-header">
              <div className="order-header-left-section">
                <div className="order-date">
                  <div className="order-header-label">Order Placed:</div>
                  <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                </div>
                <div className="order-total">
                  <div className="order-header-label">Total:</div>
                  <div>{getStandardPrice(order.totalCostCents)}</div>
                </div>
              </div>

              <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
              </div>
            </div>

            <div className="order-details-grid">
              <OrderProducts
                order={order}
                getCartItemsData={getCartItemsData}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
