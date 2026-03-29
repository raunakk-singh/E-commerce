import dayjs from "dayjs";
import axios from "axios";

export function DeliveryOptions({ deliveryOptions, cartItem, setCart }) {
  return(
    
                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((deliveryOption)=>{
                        let priceString='FREE Shipping';
                        if(deliveryOption.priceCents>0){
                          priceString='$'+`${deliveryOption.priceCents/100}`
                        }
                        return(
                           <div key={deliveryOption.id} className="delivery-option">
                        <input type="radio" 
                        checked={deliveryOption.id===cartItem.deliveryOptionId}
                          className="delivery-option-input"
                          name={`delivery-option-${cartItem.productId}`}
                          onChange={() => {
                            axios.put(`/api/cart-items/${cartItem.productId}`, {
                              deliveryOptionId: deliveryOption.id
                            }).then(() => {
                              axios.get('/api/cart-items?expand=product')
                                .then((response) => {
                                  setCart(response.data);
                                });
                            });
                          }} />
                        <div>
                          <div className="delivery-option-date">
                            {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        
                          </div>
                          <div className="delivery-option-price">
                           {priceString}
                          </div>
                        </div>
                      </div>
                        );
                      })}
                    
                    </div>
  )
}