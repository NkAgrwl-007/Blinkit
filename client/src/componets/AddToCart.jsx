import React, { useState } from "react"
import "./AddToCart.css"

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const increaseQuantity = (productId) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const decreaseQuantity = (productId) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    )
  }

  const removeItem = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div>
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-shopping-cart"></i> ({totalItems} items)
      </button>

      {/* Side Cart Drawer */}
      <div className={`cart-container ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <i className="fas fa-shopping-cart"></i>
          <h1>Shopping Cart ({totalItems} items)</h1>
          <button className="close-button" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
            {cartItems.length === 0 && <div className="empty-cart">Your cart is empty</div>}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items ({totalItems}):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddToCart
