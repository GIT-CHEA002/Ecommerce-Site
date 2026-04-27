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

function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSunmmary] = useState({});
  useEffect(() => {
    // delivery option and the payment summary reload once the cart is changed
    const getDeliveryData = async () => {
      try {
        const getDelivery = await axios.get(
          "https://ecommerce-site-backend-0gp2.onrender.com/api/delivery-options?expand=estimatedDeliveryTime",
        );
        setDeliveryOptions(getDelivery.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDeliveryData();
    // use [cart] = mean that when the cart change the useEffect will re-run again to match
    // the paymentSummary
  }, []);
  // for payment summary
  useEffect(() => {
    const getPaymentData = async () => {
      try {
        const getPaymentSummary = await axios.get(
          "https://ecommerce-site-backend-0gp2.onrender.com/api/payment-summary",
        );
        setPaymentSunmmary(getPaymentSummary.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentData();
  }, [cart]);
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
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />
          {/* for total payment and discount */}
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
export default CheckoutPage;
