import React, { useState } from 'react';

import './App.css';
import Product from './component/Product';
import ProductCalculator from './component/Product';
import Login from './component/Login';

const App: React.FC = () => {
  const [products, setProducts] = useState<{ name: string; price: number; quantity: number }[]>([]);

  const handleAddProduct = (product: { name: string; price: number; quantity: number }) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="app">
      <ProductCalculator/>
      <Login/>
    </div>
  );
};

export default App;