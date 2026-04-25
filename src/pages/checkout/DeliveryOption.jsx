import dayjs from "dayjs";
import formatMoney from "../../utils/money";
import axios from "axios";
function DeliveryOption({ deliveryOptions, cartItem, loadCart }) {
  return (
    <>
      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {deliveryOptions.map((delivery) => {
          // update the delivery
          const updateDeliveryOption = async () => {
            await axios.put(`api/cart-items/${cartItem.productId}`, {
              quantity: 1,
              deliveryOptionId: delivery.id,
            });
            await loadCart();
          };

          return (
            <div
              key={delivery.id}
              className="delivery-option"
              onClick={updateDeliveryOption}
            >
              <input
                type="radio"
                value={delivery.id}
                onChange={() => {}}
                checked={delivery.id === cartItem.deliveryOptionId}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
              />
              <div>
                <div className="delivery-option-date">
                  {dayjs(delivery.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D",
                  )}
                </div>
                <div className="delivery-option-price">
                  {formatMoney(delivery.priceCents) == "$0.00"
                    ? "FREE Shipping"
                    : formatMoney(delivery.priceCents)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default DeliveryOption;
