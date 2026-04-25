import DeliveryOption from "./DeliveryOption";
import CartItemDetail from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";
import axios from "axios";
function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find((delivery) => {
              return delivery.id === cartItem.deliveryOptionId;
            });

            // function to delete cart item
            const deleteCart = async () => {
              await axios.delete(`/api/cart-items/${cartItem.productId}`);
              await loadCart();
            };
            // function to update the cart item
            const updateCart = async (newQuantity) => {
              await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: newQuantity,
                deliveryOptionId: cartItem.deliveryOptionId,
              });
              await loadCart();
            };

            return (
              <div key={cartItem.productId} className="cart-item-container">
                <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />
                <div className="cart-item-details-grid">
                  <CartItemDetail
                    cartItem={cartItem}
                    deleteCart={deleteCart}
                    updateCart={updateCart}
                  />
                  <DeliveryOption
                    deliveryOptions={deliveryOptions}
                    cartItem={cartItem}
                    loadCart={loadCart}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
export default OrderSummary;
