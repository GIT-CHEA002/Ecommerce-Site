import "./HomePage.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import formatMoney from "../utils/money";
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
    <>
      <link rel="icon" type="image/svg+xml" href="icon/home-favicon.png" />
      <Navbar cart={cart} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={`${product.image}`} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                  />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">{formatMoney(product.priceCents) }</div>

                <div className="product-quantity-container">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default HomePage;
