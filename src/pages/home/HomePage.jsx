import "./HomePage.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductGrid from "./ProductGrid";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
function HomePage({ cart }) {
  // fetch the data from the backend has 2 way : fetch and axios
  // 1. using fetch :
  // * using normal fetch
  // fetch("http://localhost:3000/api/products") // get the resource (work with synchronous fetch)
  //   .then((Response) => Response.json()) // return the resource
  //   .then((data) => {
  //     console.log(data); // get the data of the resource
  //   })
  //   .catch((error) => {
  //     // catch the error
  //     console.log(error);
  //   });
  // * using async function
  // async function getProducts() {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/products");
  //     const data = response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // getProducts();
  // 2. using npm package call axios
  // useEffect = let us control when some code run
  // use [] = run only onces
  // use inteval
  //

  // asyn and await = let us write async code like a normal code
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data); // set the data to product state of use state
    };
    getHomeData();
  }, []);

  return (
    <Fragment>
      <title>Ecommerce Site</title>
      <Helmet>
        <link rel="icon" type="image/png" href="/icon/home-favicon.png" />
      </Helmet>
      <Navbar cart={cart} />
      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </Fragment>
  );
}
export default HomePage;
