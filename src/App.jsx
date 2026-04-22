import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import TrackingPage from "./pages/TrackingPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
// route = add the page to our website
// route has 2 attribute , path(uri) and element(component or page)
function App() {
  const [cart, setCarts] = useState([]);
  useEffect(() => {
    // get all cart
    axios
      .get("/api/cart-items")
      .then((response) => {
        setCarts(response.data); // store cart data in states
      })
      .catch(console.error());
  });
  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}
export default App;
