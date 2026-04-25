import OrderDetailGrid from "./OrderDetailGrid";
import { Fragment } from "react";
import OrderHeader from "./OrderHeader";
function OrderGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <Fragment key={order.id}>
            <div className="order-container">
              <OrderHeader order={order} />
              <OrderDetailGrid order={order} loadCart={loadCart} />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
export default OrderGrid;
