import "./TrackingPage.css";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
function TrackingPage({ cart }) {
  // trackingData = All Orders with id
  const params = useParams(); // get the paramter of the url
  const orderId = params.orderId;
  const productId = params.productId;
  const [trackingData, setTrackingData] = useState(null);
  useEffect(() => {
    const getTrackingData = async () => {
      const respose = await axios.get(`api/orders/${orderId}?expand=products`);
      setTrackingData(respose.data);
      console.log(respose.data);
    };
    getTrackingData();
  }, [orderId]);
  // get the product with the orderid that match with product id onl
  const product = trackingData?.products.find((p) => p.productId === productId);
  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="icon/orders-favicon.png" />
      <Navbar cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/order">
            View all orders
          </a>

          <div className="delivery-date">Arriving on Monday, June 13</div>

          <div className="product-info"> {product?.product?.name}</div>

          <div className="product-info">Quantity: {product?.quantity}</div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TrackingPage;
