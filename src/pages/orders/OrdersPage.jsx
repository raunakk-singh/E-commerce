import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router';
import './OrdersPage.css';
import '../../components/header.css';
import { Header } from '../../components/Header';
const orders = [
  {
    id: '27cba69d-4c3d-4098-b42d-ac7fa62b7664',
    placed: 'August 12',
    total: '$35.06',
    items: [
      {
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        deliveryDate: 'August 15',
        quantity: 1,
        image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      },
      {
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        deliveryDate: 'August 19',
        quantity: 2,
        image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
      },
    ],
  },
  {
    id: 'b6b6c212-d30e-4d4a-805d-90b52ce6b37d',
    placed: 'June 10',
    total: '$41.90',
    items: [
      {
        name: 'Intermediate Size Basketball',
        deliveryDate: 'June 17',
        quantity: 2,
        image: 'images/products/intermediate-composite-basketball.jpg',
      },
    ],
  },
];

export default function OrdersPage({cart}) {
  const [orders,setOrders]=useState([]);

  useEffect(()=>{
    const fetchOrdersData=async ()=>{
      const response=await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);

  return (
    <>
      <Header cart={cart}/>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-container" key={order.id}>
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimesMs).format('MMMM D')}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>${(order.totalCostCents / 100).toFixed(2)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map((orderProduct) => (
                  <div className="order-item-row" key={orderProduct.product.id}>
                    <div className="product-image-container">
                      <img src={orderProduct.product.image} alt={orderProduct.product.name} />
                    </div>

                    <div className="product-details">
                      <div className="product-name">{orderProduct.product.name}</div>
                      <div className="product-delivery-date">
                        Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                      </div>
                      <div className="product-quantity">Quantity: {orderProduct.quantity}</div>
                      <button className="buy-again-button button-primary">
                        <img
                          className="buy-again-icon"
                          src="images/icons/buy-again.png"
                          alt=""
                        />
                        <span className="buy-again-message">Add to Cart</span>
                      </button>
                    </div>

                    <div className="product-actions">
                      <Link
                        className="track-package-button button-secondary"
                        to="/tracking"
                      >
                        Track package
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
