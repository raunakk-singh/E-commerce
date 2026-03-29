import { Link } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductGrid } from './ProductsGrid';
import { Header } from '../../components/Header';
import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData=async ()=>{
      const response=await axios.get("/api/products");
      setProducts(response.data);
    };
   getHomeData();

  }, []);

  return (
    <>
      <title>E-commerce</title>

      <Header cart={cart} />
      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
