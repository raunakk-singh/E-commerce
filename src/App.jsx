import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import { Tracking } from './pages/Tracking';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css'
import { use } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      });

  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path="orders" element={<OrdersPage />}></Route>
      <Route path="tracking" element={<Tracking />}></Route>
    </Routes>


  )
}

export default App
