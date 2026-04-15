import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import './header.css';

export function Header({cart = []}) {
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  let totalQuantity=0;
  cart.forEach((cartItem) => {
    totalQuantity+=cartItem.quantity;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchText(searchParams.get('search') ?? '');
  }, [location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = searchText.trim();
    const destination = trimmedSearch
      ? `/?search=${encodeURIComponent(trimmedSearch)}`
      : '/';

    navigate(destination);
  };

  return (
    <>
      <div className="header">
        <div className="left-section" aria-hidden="true"></div>

        <form className="middle-section" onSubmit={handleSearchSubmit} role="search">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <button className="search-button" type="submit">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </form>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  )
}
