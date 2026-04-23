import "./HomePage.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductGrid from "./ProductGrid";
import { Fragment } from "react";
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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // get all products
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data); // set the data to product state of use state
      })
      .catch(console.error());
  }, []);

  return (
    <Fragment>
      <link rel="icon" type="image/svg+xml" href="icon/home-favicon.png" />
      <Navbar cart={cart} />
      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </Fragment>
  );
}
export default HomePage;
