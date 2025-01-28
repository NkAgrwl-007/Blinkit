import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddToCart.css";

const AddToCartPage = ({ products }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, increment) => {
    setCart(
      cart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.description, 0);
  };

  const handleCartRedirect = () => {
    navigate("/cart");
  };

  if (!products || products.length === 0) {
    return <div>Loading products...</div>; // Handle case if no products are passed
  }

  return (
    <div className="add-to-cart-page">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image?.data || "fallback-image-url.jpg"}
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.src = "fallback-image-url.jpg"; // Set fallback image if error
              }}
            />
            <p className="product-name">{product.name}</p>
            <p className="product-price">₹{product.description}</p>
            <button
              className="add-button"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <p>{item.name}</p>
            <div className="quantity-controls">
              <button
                onClick={() => updateQuantity(item._id, -1)}
                className="quantity-button"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, 1)}
                className="quantity-button"
              >
                +
              </button>
            </div>
            <p>₹{(item.quantity * item.description).toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item._id)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2>Total</h2>
      <p>₹{calculateTotal().toFixed(2)}</p>

      <button onClick={handleCartRedirect} className="cart-button">
        Go to Cart
      </button>
    </div>
  );
};

export default AddToCartPage;
