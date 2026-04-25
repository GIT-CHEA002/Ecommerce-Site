import { useState } from "react";
import formatMoney from "../../utils/money";
function CartItemDetail({ cartItem, deleteCart, updateCart }) {
  // handle the quantity update
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [isEditing, setIsEditing] = useState(false);
  // handle when first click to change the quantity
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value) || 1;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  // second click the quantity will update
  const handleQuantityUpdateClick = () => {
    if (isEditing && quantity != cartItem.quantity) {
      updateCart(quantity);
      setIsEditing(false);
    } else {
      setIsEditing(!isEditing);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isEditing ? (
              <select value={quantity} onChange={handleQuantityChange}>
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
            ) : (
              <span className="quantity-label">{` ${cartItem.quantity}`}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={handleQuantityUpdateClick}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCart}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
export default CartItemDetail;
