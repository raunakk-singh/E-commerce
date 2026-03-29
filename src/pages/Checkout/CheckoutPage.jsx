
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';
import { CheckoutHeader } from './checkout-header';
import { useState, useEffect } from 'react';
import './checkout-header.css'
import './CheckoutPage.css'
import { OrderSummary } from './OrderSummary';

export function CheckoutPage({ cart, setCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchChekouttData=async ()=>{
      let response=await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');

        setDeliveryOptions(response.data);
      response=await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);

    };   
    fetchChekouttData();
  

   
  }, []);
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} setCart={setCart} />
          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}