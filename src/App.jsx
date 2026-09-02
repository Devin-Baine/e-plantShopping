import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  // Controls Whether the Landing Page or the Product Listing Occupies the Screen
  const [showProductList, setShowProductList] = useState(false);

  // Reveals the Product Listing Once the Visitor Selects Get Started
  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  // Returns the Visitor to the Landing Page From the Navigation Bar
  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      {/* Paradise Nursery Landing Page */}
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>

        <div className="content">
          <div className="landing_content">
            <span className="landing-eyebrow">Glasshouse Grown Since 2011</span>
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>

            <button className="get-started-button" onClick={handleGetStartedClick}>
              <span>Get Started</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M4 12h15m0 0-6-6m6 6-6 6" />
              </svg>
            </button>

            <ul className="landing-highlights">
              <li>
                <strong>24</strong>
                <span>Varieties</span>
              </li>
              <li>
                <strong>4</strong>
                <span>Collections</span>
              </li>
              <li>
                <strong>30</strong>
                <span>Day Returns</span>
              </li>
            </ul>
          </div>

          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>

      {/* Product Listing and Shopping Cart Surface */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}

export default App;
