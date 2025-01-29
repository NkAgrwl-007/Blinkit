import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/blinkit-logo.png"
import banner from "../assets/banner.jpg"
import cartIcon from "../assets/cart.png"
import promo1 from "../assets/3 (1).avif"
import promo2 from "../assets/3 (2).avif"
import promo3 from "../assets/3 (3).avif"
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
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load products. Please try again later.")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id)
    if (existingProduct) {
      setCart(cart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const increaseQuantity = (productId) => {
    setCart(cart.map((item) => (item._id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decreaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
  }

  const removeItem = (productId) => {
    setCart(cart.filter((item) => item._id !== productId))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  return (
    <div className="home-page">
     <header className="header">
  <div className="left-section">
    <Link to="/">
      <img src={logo || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-30%20014847-oJHYLXI7YuDgJdhet6UUtxhnZnr56z.png"} alt="Blinkit Logo" className="logo" />
    </Link>
    <div className="delivery-info">
      <strong>Delivery in 9 minutes</strong>
      <span>Mathura, Uttar Pradesh, India</span>
    </div>
  </div>
  <div className="search-bar">
    <input type="text" placeholder='Search "egg"' />
  </div>
  <div className="header-actions">
    <button className="login-button" onClick={() => navigate("/login")}>
      Login
    </button>
    <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
      <img src={cartIcon || "/placeholder.svg"} alt="Cart" />
      My Cart • ₹{calculateTotal().toFixed(2)}
    </button>
  </div>
</header>
      <main className="main-content">
        <img src={banner || "/placeholder.svg"} alt="Banner" className="banner" />

        <div className="promo-cards">
          <img src={promo1 || "/placeholder.svg"} alt="Pharmacy Delivery" className="promo-card" />
          <img src={promo2 || "/placeholder.svg"} alt="Pet Care Supplies" className="promo-card" />
          <img src={promo3 || "/placeholder.svg"} alt="Baby Care Essentials" className="promo-card" />
        </div>

        <div className="categories">
          <div className="category-list">
            {categories.map((category) => (
              <div key={category._id} className="category-container">
                <div className="category-card">
                  <img src={`data:image/jpeg;base64,${category.image.data}`} className="category-image" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}

        <div className="product-list">
          <h2>Products</h2>
          <div className="product-cards">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
                  <p className="product-name">{product.name}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-actions">
                    <p className="product-price">₹{product.price}</p>
                    <button className="add-button" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </main>

      {isCartOpen && (
        <div className="cart-container open">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <button className="close-cart-button" onClick={() => setIsCartOpen(false)}>
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
                      <button className="quantity-button" onClick={() => decreaseQuantity(item._id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button className="quantity-button" onClick={() => increaseQuantity(item._id)}>
                        +
                      </button>
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
      )}
    </div>
  )
}

export default Home
