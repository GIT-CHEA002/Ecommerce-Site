import dayjs from "dayjs";
import formatMoney from "../../utils/money";
function DeliveryOption({ deliveryOptions, cartItem }) {
  return (
    <>
      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {deliveryOptions.map((delivery) => {
          return (
            <div key={delivery.id} className="delivery-option">
              <input
                type="radio"
                value={delivery.id}
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
