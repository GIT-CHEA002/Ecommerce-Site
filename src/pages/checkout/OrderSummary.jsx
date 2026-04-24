import DeliveryOption from "./DeliveryOption";
import CartItemDetail from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";
function OrderSummary({ cart, deliveryOptions }) {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find((delivery) => {
              return delivery.id === cartItem.deliveryOptionId;
            });
            return (
              <div key={cartItem.productId} className="cart-item-container">
                <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />
                <div className="cart-item-details-grid">
                  <CartItemDetail cartItem={cartItem} />
                  <DeliveryOption
                    deliveryOptions={deliveryOptions}
                    cartItem={cartItem}
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
