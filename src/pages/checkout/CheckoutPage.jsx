// import using file
import "./CheckoutPage.css";
import CheckoutPageHeader from "./CheckoutPageHeader";
// import package
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import { Helmet } from "react-helmet";

function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSunmmary] = useState({});
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      })
      .catch(console.error());
    // get payment summery for cart order products
    axios
      .get("/api/payment-summary")
      .then((response) => {
        setPaymentSunmmary(response.data);
      })
      .catch(console.error());
  }, []);
  return (
    <>
      <title>Checkout</title>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="icon/cart-favicon.png" />
      </Helmet>

      <CheckoutPageHeader cart={cart} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          {/* for total payment and discount */}
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
export default CheckoutPage;
