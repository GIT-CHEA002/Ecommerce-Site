import { useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
// link make the spa switch between pages with no reload pages
// NavLink it work like Link component but it useful for
//  navigation link at the top of the page and it add class "active" to the link
function Navbar({ cart }) {
  let totalCart = 0;
  cart.forEach((cart) => {
    totalCart += cart.quantity;
  });
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            id=""
            name=""
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
                navigate(`/?search=${event.target.value}`);
              console.log(searchText);
            }}
          />

          <button
            className="search-button"
            onClick={() => {
              navigate(`/?search=${searchText}`);
            }}
          >
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/order">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalCart}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
      ;
    </>
  );
}
export default Navbar;
