import axios from "axios";
import dayjs from "dayjs";
import { Fragment } from "react";
function OrderDetailGrid({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        const addToCart = async () => {
          await axios.post(
            "https://ecommerce-site-backend-0gp2.onrender.com/api/cart-items",
            {
              productId: orderProduct.productId,
              quantity: orderProduct.quantity,
            },
          );
          await loadCart();
        };
        return (
          <Fragment key={orderProduct.productId}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">{orderProduct.product.name}</div>
              <div className="product-delivery-date">
                Arriving on:
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format(" MMMM D")}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img
                  className="buy-again-icon"
                  src="images/icons/buy-again.png"
                />
                <span className="buy-again-message" onClick={addToCart}>
                  Add to Cart
                </span>
              </button>
            </div>

            <div className="product-actions">
              <a href={`/tracking/${order.id}/${orderProduct.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
export default OrderDetailGrid;
