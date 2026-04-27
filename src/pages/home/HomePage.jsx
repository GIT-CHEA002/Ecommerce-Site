import "./HomePage.css";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductGrid from "./ProductGrid";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
function HomePage({ cart, loadCart }) {
  // fetch the data from the backend has 2 way : fetch and axios
  // 1. using fetch :
  // * using normal fetch
  // fetch("http://localhost:3000https://ecommerce-site-backend-0gp2.onrender.com/api/products") // get the resource (work with synchronous fetch)
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
  //     const response = await fetch("http://localhost:3000https://ecommerce-site-backend-0gp2.onrender.com/api/products");
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
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  useEffect(() => {
    const getAllCart = async () => {
      try {
        const url = searchText
          ? `https://ecommerce-site-backend-0gp2.onrender.com/api/products?search=${searchText}`
          : `https://ecommerce-site-backend-0gp2.onrender.com/api/products`;
        const response = await axios.get(url);
        setProducts(response.data); // set the data to product state of use state
      } catch (error) {
        console.log(error);
      }
    };
    getAllCart();
  }, [searchText]);

  return (
    <Fragment>
      <title>Ecommerce Site</title>
      <Helmet>
        <link rel="icon" type="image/png" href="/icon/home-favicon.png" />
      </Helmet>
      <Navbar cart={cart} />
      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart} />
      </div>
    </Fragment>
  );
}
export default HomePage;
