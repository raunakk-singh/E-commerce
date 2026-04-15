import { PaymentSummary } from './PaymentSummary';
import { CheckoutHeader } from './checkout-header';
import { useState, useEffect } from 'react';
import './checkout-header.css'
import './CheckoutPage.css'
import { OrderSummary } from './OrderSummary';
import { api } from '../../lib/api';

export function CheckoutPage({ cart, setCart,loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const fetchCheckoutData = async () => {
    let response = await api.get('/api/delivery-options?expand=estimatedDeliveryTime');
    setDeliveryOptions(response.data);
    response = await api.get('/api/payment-summary');
    setPaymentSummary(response.data);
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} setCart={setCart} loadCart={loadCart} fetchCheckoutData={fetchCheckoutData} />
          <PaymentSummary paymentSummary={paymentSummary} setCart={setCart}/>
        </div>
      </div>
    </>
  );
}
