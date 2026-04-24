import "./CheckoutPageHeader.css";
import { NavLink } from "react-router-dom";
function CheckoutPageHeader({ cart }) {
  let totalCart = 0;
  if (cart) {
    cart.forEach((cart) => {
      totalCart += cart.quantity;
    });
  }
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <NavLink to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </NavLink>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <NavLink className="return-to-home-link" to="/">
              {totalCart} items
            </NavLink>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckoutPageHeader;
