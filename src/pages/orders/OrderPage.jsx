import "./OrderPage.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import OrderGrid from "./OrderGrid";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <link rel="icon" type="image/png" href="/icon/orders.png" />
      </Helmet>
      <Navbar cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} />
      </div>
    </>
  );
}
export default OrderPage;
