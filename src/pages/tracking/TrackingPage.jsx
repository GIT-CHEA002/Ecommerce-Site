import "./TrackingPage.css";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";
function TrackingPage({ cart }) {
  // trackingData = All Orders with id
  const params = useParams(); // get the paramter of the url
  const orderId = params.orderId;
  const productId = params.productId;
  const [trackingData, setTrackingData] = useState(null);
  useEffect(() => {
    const getTrackingData = async () => {
      try {
        const respose = await axios.get(
          `api/orders/${orderId}?expand=products`,
        );
        setTrackingData(respose.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTrackingData();
  }, [orderId]);
  const orderProduct = trackingData?.products.find(
    (p) => p.productId === productId,
  );
  let totalDeliverytimeMs =
    orderProduct?.estimatedDeliveryTimeMs - trackingData?.orderTimeMs;
  let timePassedMs = dayjs().valueOf() - trackingData?.orderTimeMs;
  let deliveryPercent = 0;
  deliveryPercent = Math.max(deliveryPercent, 100);
  if (totalDeliverytimeMs && totalDeliverytimeMs > 0) {
    deliveryPercent = (timePassedMs / totalDeliverytimeMs) * 100;
    deliveryPercent = Math.max(deliveryPercent, 100);
  }
  return (
    <>
      <title>Tracking</title>
      <Helmet>
        <link rel="icon" type="image/png" href="/icon/cart-favicon.png" />
      </Helmet>
      <Navbar cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/order">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on Monday,{" "}
            {dayjs(orderProduct?.estimatedDeliveryTimeMs).format("MMMM D")}
          </div>

          <div className="product-info"> {orderProduct?.product?.name}</div>

          <div className="product-info">Quantity: {orderProduct?.quantity}</div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered {deliveryPercent}</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TrackingPage;
