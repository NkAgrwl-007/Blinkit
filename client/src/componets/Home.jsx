import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/blinkit-logo.png"
import banner from "../assets/banner.jpg"
import cartIcon from "../assets/cart.png"
import wideAssortment from "../assets/Wide_Assortment.png"
import "./Home.css"

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    // Fetch products data from the backend
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        setError("Failed to load products. Please try again later.")
        setLoading(false)
      })
  }, [])

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id)
    if (existingProduct) {
      setCart(cart.map((item) => 
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const increaseQuantity = (productId) => {
    setCart(cart.map(item => 
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const decreaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item._id === productId && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } : item
    ))
  }

  const removeItem = (productId) => {
    setCart(cart.filter(item => item._id !== productId))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const handleCartClick = () => {
    setIsCartOpen(true) // Open the cart side panel when the cart button is clicked
  }

  const handleCloseCart = () => {
    setIsCartOpen(false) // Close the cart side panel
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <Link to="/">
          <img src={logo || "/placeholder.svg"} alt="Logo" className="logo" />
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search 'groceries'" />
        </div>
        <div className="header-actions">
          <button className="cart-button" onClick={handleCartClick}>
            <img src={cartIcon || "/placeholder.svg"} alt="Cart" />
            My Cart ({cart.length})
            <div className="cart-total">₹{calculateTotal().toFixed(2)}</div>
          </button>
          <Link to="/add" className="add-product-icon">
            <img src={wideAssortment || "/placeholder.svg"} alt="Wide Assortment" className="wide-assortment" />
          </Link>
        </div>
      </header>

      {/* Banner Section */}
      <main className="main-content">
        <img src={banner || "/placeholder.svg"} alt="Banner" className="banner" />
      </main>

      {/* Loading & Error Handling */}
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {/* Product List Section */}
      <div className="product-list">
        <h2>Products</h2>
        <div className="product-cards">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => e.target.src = "/placeholder.svg"}
                  />
                </div>
                <div className="product-details">
                  <p className="product-name">{product.name}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    <p className="product-price">₹{product.price}</p>
                    <button className="add-button" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      {/* Cart Side Panel */}
      <div className={`cart-container ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button className="close-cart-button" onClick={handleCloseCart}>
            &times;
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">₹{item.price}</p>
                  <div className="quantity-controls">
                    <button className="quantity-button" onClick={() => decreaseQuantity(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="quantity-button" onClick={() => increaseQuantity(item._id)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => removeItem(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <p>Total: ₹{calculateTotal().toFixed(2)}</p>
          <button className="checkout-button" onClick={() => navigate("/cart")}>
            Go to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
