import HomePage from "./pages/home/HomePage";
import OrderPage from "./pages/orders/OrderPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
// route = add the page to our website
// route has 2 attribute , path(uri) and element(component or page)
function App() {
  // for loading cart when the add to cart button is trigger
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCarts(response.data); // store cart data in states
  };

  const [cart, setCarts] = useState([]);
  useEffect(() => {
    loadCart();
  }, []);
  // :orderId and :productId is url paramter
  return (
    <Routes>
      {/* // parsing the loadCart to HomePage Component  */}
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="/order" element={<OrderPage cart={cart} />} />
      <Route
        path="/tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
    </Routes>
  );
}
export default App;
