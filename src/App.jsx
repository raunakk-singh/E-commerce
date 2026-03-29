import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/Checkout/CheckoutPage';
import OrdersPage from './pages/orders/OrdersPage';
import { Tracking } from './pages/Tracking';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css'
import { use } from 'react';





function App() {
  const [cart, setCart] = useState([]);

   const loadCart = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    };



  useEffect(() => {
   
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} setCart={setCart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />}></Route>
      <Route path="tracking" element={<Tracking />}></Route>
    </Routes>


  )
}

export default App
