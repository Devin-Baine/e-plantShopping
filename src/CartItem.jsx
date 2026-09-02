import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Controls the Coming Soon Message Raised by the Checkout Button
  const [showCheckoutNotice, setShowCheckoutNotice] = useState(false);

  // Combined Cost of Every Plant Held in the Cart
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      total += parseFloat(item.cost.substring(1)) * item.quantity;
    });

    return total;
  };

  // Combined Cost of a Single Plant Across the Quantity Selected
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  // Running Count of Individual Plants Sitting in the Cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Returns the Visitor to the Product Listing Page
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Announces That Checkout Has Not Yet Opened
  const handleCheckoutShopping = () => {
    setShowCheckoutNotice(true);
    alert('Coming Soon! Checkout functionality to be added for future reference.');
  };

  // Raises the Quantity of the Selected Plant by One
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Lowers the Quantity by One and Drops the Plant Once Nothing Remains
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Deletes the Selected Plant From the Cart Entirely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Clears the Coming Soon Message a Few Seconds After It Appears
  useEffect(() => {
    if (!showCheckoutNotice) {
      return undefined;
    }

    const timer = setTimeout(() => setShowCheckoutNotice(false), 4500);

    return () => clearTimeout(timer);
  }, [showCheckoutNotice]);

  const totalQuantity = calculateTotalQuantity();
  const totalAmount = calculateTotalAmount();

  return (
    <div className="cart-container">
      {/* Heading Reporting the Size and Value of the Cart */}
      <header className="cart-header">
        <span className="cart-eyebrow">Shopping Cart</span>
        <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
        <p className="cart-subtitle">
          {totalQuantity === 0
            ? 'No plants have been added yet.'
            : `${totalQuantity} ${totalQuantity === 1 ? 'plant' : 'plants'} across ${cart.length} ${
                cart.length === 1 ? 'variety' : 'varieties'
              }.`}
        </p>
      </header>

      {cart.length === 0 ? (
        /* Placeholder Shown While the Cart Remains Empty */
        <div className="cart-empty">
          <span className="cart-empty-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 21c0-6.5 3.5-10.5 8-12-0.5 7-4 11-8 12Z" />
              <path d="M12 21C12 14.5 8.5 10.5 4 9c0.5 7 4 11 8 12Z" />
              <path d="M12 21v-6" />
            </svg>
          </span>
          <h3>Nothing potted up yet</h3>
          <p>Browse the collection and the plants chosen will gather here.</p>
          <button className="continue-shopping-button" onClick={(e) => handleContinueShopping(e)}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Row for Every Plant Type Currently in the Cart */}
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <div className="cart-item-frame">
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <div className="cart-item-heading">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-cost">{item.cost} each</div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="cart-item-quantity">
                      <button
                        className="cart-item-button cart-item-button-dec"
                        onClick={() => handleDecrement(item)}
                        aria-label={`Remove one ${item.name}`}
                      >
                        &minus;
                      </button>
                      <span className="cart-item-quantity-value">{item.quantity}</span>
                      <button
                        className="cart-item-button cart-item-button-inc"
                        onClick={() => handleIncrement(item)}
                        aria-label={`Add one ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-total">
                      Total: ${calculateTotalCost(item).toFixed(2)}
                    </div>

                    <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Panel Carrying the Order Actions */}
          <aside className="cart-summary">
            <h3 className="cart-summary-title">Order Summary</h3>

            <dl className="cart-summary-rows">
              <div className="cart-summary-row">
                <dt>Plants</dt>
                <dd>{totalQuantity}</dd>
              </div>
              <div className="cart-summary-row">
                <dt>Varieties</dt>
                <dd>{cart.length}</dd>
              </div>
              <div className="cart-summary-row">
                <dt>Delivery</dt>
                <dd className="cart-summary-free">Free</dd>
              </div>
            </dl>

            <div className="total_cart_amount cart-summary-total">
              <span>Total</span>
              <strong>${totalAmount.toFixed(2)}</strong>
            </div>

            <div className="continue_shopping_btn">
              <button className="checkout-button" onClick={handleCheckoutShopping}>
                Checkout
              </button>
              <button
                className="continue-shopping-button"
                onClick={(e) => handleContinueShopping(e)}
              >
                Continue Shopping
              </button>
            </div>

            <p className="cart-summary-note">
              Every order leaves the glasshouse wrapped in recycled packaging.
            </p>
          </aside>
        </div>
      )}

      {/* Coming Soon Message Raised by the Checkout Button */}
      {showCheckoutNotice && (
        <div className="checkout-notice" role="status">
          <span className="checkout-notice-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.5V12l3 2" />
            </svg>
          </span>
          <div className="checkout-notice-body">
            <strong>Coming Soon</strong>
            <p>Secure checkout is still being planted. Functionality to be added at a later date.</p>
          </div>
          <button
            className="checkout-notice-close"
            onClick={() => setShowCheckoutNotice(false)}
            aria-label="Dismiss message"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

// Props Contract Expected by the Shopping Cart
CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;
