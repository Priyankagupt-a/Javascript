import React, { useState } from "react";

const ProductCalculator: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateTotal = () => {
    const priceNum = parseFloat(price as string);
    const quantityNum = parseInt(quantity as string);
    if (!isNaN(priceNum) && !isNaN(quantityNum)) {
      setTotalAmount(priceNum * quantityNum);
    } else {
      setTotalAmount(null);
    }
  };

  return (
    <div>
      <h3>Product Calculator</h3>
      <br />

      <div>
        <label>Product Name: </label>
        <input
          type="text"
           id='pname'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
        />
      </div>
      <br />

      <div>
        <label>Price: </label>
        <input
        id='price'
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />
      </div>
      <br />

      <div>
        <label>Quantity: </label>
        <input
         id='quantity'
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
        />
      </div>
      <br />

      <a id="link"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          calculateTotal();
        }}
      >
        Get Total Amount
      </a>
      <br />
      <br />

      {totalAmount !== null && (
        <p>
          Total Amount for {productName || "the product"}: ₹
          {totalAmount.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default ProductCalculator;
