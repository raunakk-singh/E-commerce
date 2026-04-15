import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { ProductGrid } from './ProductsGrid';
import { Header } from '../../components/Header';
import { api } from '../../lib/api';
import './HomePage.css';

export function HomePage({ cart ,loadCart}) {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getHomeData=async ()=>{
      const response=await api.get('/api/products');
      setProducts(response.data);
    };
    getHomeData();
  }, []);

  const searchText = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('search')?.trim() ?? '';
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    if (!searchText) {
      return products;
    }

    const searchTerms = searchText
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return products.filter((product) => {
      const searchableText = [product.name, ...(product.keywords ?? [])]
        .join(' ')
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [products, searchText]);

  return (
    <>
      <title>E-commerce</title>

      <Header cart={cart} />
      <div className="home-page">
        {searchText && filteredProducts.length === 0 ? (
          <div className="search-empty-state">
            No products found for &quot;{searchText}&quot;.
          </div>
        ) : null}

        <ProductGrid products={filteredProducts} loadCart={loadCart} />
      </div>
    </>
  );
}
