import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductCard from './components/ProductCard';
import Hero from './components/Hero';
import Header from './components/Header';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      alert('Product already in cart.');
    } else {
      setCart([...cart, product]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserLoggedIn(false);
    window.location.href = '/';
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'office', label: 'Office Supplies' },
    { value: 'home', label: 'Home & Living' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Router>
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cart.length}
        onLogout={handleLogout}
        userLoggedIn={userLoggedIn}
      />

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                {/* Category Filter */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Product List */}
                <div className="row">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <div className="col-md-3 mb-4" key={product.id}>
                        <ProductCard product={product} handleAddToCart={handleAddToCart} />
                      </div>
                    ))
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>
              </>
            }
          />

          <Route path="/product/:id" element={<ProductDetail handleAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
