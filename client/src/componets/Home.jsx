import React, { useEffect, useState } from "react";
import "./Home.css";
import logo from "../assets/blinkit-logo.png";
import banner from "../assets/banner.jpg";
import cart from "../assets/cart.png";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Replace the URL with your API endpoint
    fetch("http://localhost:5174/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="search-bar">
          <input type="text" placeholder="Search 'groceries'" />
        </div>
        <button className="cart-button">
          <img src={cart} alt="Cart" />
          My Cart
        </button>
      </header>

      {/* Banner Section */}
      <main className="main-content">
        <img src={banner} alt="Banner" className="banner" />
        <h1>Welcome to Blinkit</h1>
        <p>Your one-stop shop for fresh groceries and essentials.</p>
      </main>

      {/* Categories Section */}
      <div className="categories">
        <h2>Shop by Category</h2>
        <div className="category-list">
          {categories.map((category, index) => (
            <div className="category-card" key={index}>
              <img
                src={`./assets/${category.image}`}
                alt={category.name}
                className="category-image"
              />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
