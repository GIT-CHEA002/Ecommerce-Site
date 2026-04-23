import "./OrderPage.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import dayjs from "dayjs";
import formatMoney from "../../utils/money";
import OrderDetail from "./OrderDetail";
function OrderPage({ cart }) {
  const [orders, setOrders] = useState([]);
  // fetch orders
  useEffect(() => {
    axios
      .get("/api/orders?expand=products")
      .then((response) => {
        setOrders(response.data);
      })
      .catch(console.error());
  }, []);
  return (
    <>
      <title>Order</title>
      <link rel="icon" type="image/svg+xml" href="icon/orders-favicon.png" />
      <Navbar cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <Fragment key={order.id}>
                <div className="order-container">
                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{formatMoney(order.totalCostCents)}</div>
                      </div>
                    </div>
                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{order.id}</div>
                    </div>
                  </div>
                  <OrderDetail order={order} />
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default OrderPage;
