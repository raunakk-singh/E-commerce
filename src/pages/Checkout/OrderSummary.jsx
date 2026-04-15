import { DeliveryOptions } from "./deliveryOptions";
import dayjs from "dayjs";
import axios from "axios";

export function OrderSummary({ cart, deliveryOptions, setCart, loadCart, fetchCheckoutData }) {
  return(
    <>
    <div className="order-summary">

            {deliveryOptions.length>0 && cart.map((cartItem) => {
              const selectedDeliveryOption = deliveryOptions.find((option) => {
                return option.id === cartItem.deliveryOptionId;
              });
              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {selectedDeliveryOption ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D') : 'Loading...'}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={cartItem.product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                       {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        ${(cartItem.product.priceCents/100).toFixed(2)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary" onClick={async () => {
                          const qty = prompt("Enter new quantity:", cartItem.quantity);
                          const parsed = parseInt(qty);
                          if (!isNaN(parsed) && parsed >= 0 && parsed !== cartItem.quantity) {
                            if (parsed === 0) {
                              await axios.delete(`/api/cart-items/${cartItem.productId}`);
                            } else {
                              await axios.put(`/api/cart-items/${cartItem.productId}`, {
                                quantity: parsed,
                                deliveryOptionId: cartItem.deliveryOptionId
                              });
                            }
                            await loadCart();
                            await fetchCheckoutData();
                          }
                        }}>
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary" onClick={async () => {
                          await axios.delete(`/api/cart-items/${cartItem.productId}`);
                          await loadCart();
                          await fetchCheckoutData();
                        }}>
                          Delete
                        </span>
                      </div>
                    </div>
                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} setCart={setCart} loadCart={loadCart} fetchCheckoutData={fetchCheckoutData} />
                  </div>
                </div>
              );
            })}
          </div>
    </>
  );
}
