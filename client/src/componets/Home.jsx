import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/blinkit-logo.png";
import banner from "../assets/banner.jpg";
import cart from "../assets/cart.png";
import wideAssortment from "../assets/Wide_Assortment.png";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products data from the backend
    fetch("http://localhost:8080/api/products") // Adjust the URL for your API
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data); // Debugging log
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="search-bar">
          <input type="text" placeholder="Search 'groceries'" />
        </div>
        <div className="header-actions">
          <button className="cart-button">
            <img src={cart} alt="Cart" />
            My Cart
          </button>
          <Link to="/add" className="add-product-icon">
            <img
              src={wideAssortment}
              alt="Wide Assortment"
              className="wide-assortment"
            />
          </Link>
        </div>
      </header>

      {/* Banner Section */}
      <main className="main-content">
        <img src={banner} alt="Banner" className="banner" />
      </main>

      {/* Products Section */}
      <div className="product-list">
        <h2>Products</h2>
        <div className="product-cards">
          {products.map((product) => {
            const imageUrl = product.image;
            return (
              <div key={product._id} className="product-card">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <p className="product-name">{product.name}</p>
                <p className="product-price">₹{product.description}</p>
                <button className="add-button">ADD</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
