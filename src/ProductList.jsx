import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  // Switches the Surface Between the Product Listing and the Shopping Cart
  const [showCart, setShowCart] = useState(false);

  // Records Which Plants Have Already Been Placed in the Cart
  const [addedToCart, setAddedToCart] = useState({});

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const shopRef = useRef(null);

  // Catalogue of Plants Grouped Into Four Themed Collections
  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      caption: 'Foliage proven to lift airborne toxins out of an enclosed room.',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
          description: 'Releases oxygen through the night and lifts the air quality of a bedroom.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
          description: 'Filters formaldehyde and xylene while sending out effortless offshoots.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
          description: 'Absorbs mould spores and answers a missed watering with a dramatic droop.',
          cost: '$18',
        },
        {
          name: 'Boston Fern',
          image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg',
          description: 'Restores humidity to dry rooms and quietly strips airborne toxins.',
          cost: '$20',
        },
        {
          name: 'Rubber Plant',
          image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg',
          description: 'Broad lacquered leaves scrub the surrounding air with almost no attention.',
          cost: '$17',
        },
        {
          name: 'Golden Pothos',
          image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg',
          description: 'Trails happily from a high shelf and clears benzene from stale interiors.',
          cost: '$10',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      caption: 'Leaves and blossom grown purely for the scent they release indoors.',
      plants: [
        {
          name: 'Lavender',
          image:
            'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1080&auto=format&fit=crop',
          description: 'Steadying perfume long relied upon to settle a room before sleep.',
          cost: '$20',
        },
        {
          name: 'Jasmine',
          image:
            'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1080&auto=format&fit=crop',
          description: 'Opens sweetly scented blooms after dusk and perfumes an entire hallway.',
          cost: '$18',
        },
        {
          name: 'Rosemary',
          image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg',
          description: 'Resinous evergreen fragrance that doubles as a dependable kitchen staple.',
          cost: '$15',
        },
        {
          name: 'Mint',
          image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg',
          description: 'Cool bright aroma released by the lightest brush of a fingertip.',
          cost: '$12',
        },
        {
          name: 'Lemon Balm',
          image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg',
          description: 'Citrus scented leaves steeped into tea to unwind at the close of a day.',
          cost: '$14',
        },
        {
          name: 'Hyacinth',
          image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg',
          description: 'Dense flowering spikes carrying the richest perfume of early spring.',
          cost: '$22',
        },
      ],
    },
    {
      category: 'Insect Repellent Plants',
      caption: 'Companion planting favourites that keep unwanted visitors at bay.',
      plants: [
        {
          name: 'Marigold',
          image: 'https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg',
          description: 'Pungent golden blooms that keep aphids clear of neighbouring pots.',
          cost: '$8',
        },
        {
          name: 'Catnip',
          image: 'https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg',
          description: 'Carries nepetalactone, a compound mosquitoes avoid and cats adore.',
          cost: '$13',
        },
        {
          name: 'Basil',
          image: 'https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg',
          description: 'Warm peppery foliage that discourages flies from settling near a doorway.',
          cost: '$9',
        },
        {
          name: 'Oregano',
          image: 'https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg',
          description: 'Aromatic oils held in the leaves deter several stubborn garden pests.',
          cost: '$10',
        },
        {
          name: 'Chamomile',
          image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg',
          description: 'Daisy heads that shelter beneficial insects and repel troublesome ones.',
          cost: '$15',
        },
        {
          name: 'Calendula',
          image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg',
          description: 'Classic companion planting choice drawing pests away from nearby crops.',
          cost: '$12',
        },
      ],
    },
    {
      category: 'Low Maintenance Plants',
      caption: 'Resilient growers for anyone who travels often or simply forgets.',
      plants: [
        {
          name: 'ZZ Plant',
          image:
            'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1080&auto=format&fit=crop',
          description: 'Thrives in a dim corner and forgives several weeks between waterings.',
          cost: '$25',
        },
        {
          name: 'Cast Iron Plant',
          image: 'https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg',
          description: 'Earns its name by shrugging off deep shade and prolonged neglect.',
          cost: '$20',
        },
        {
          name: 'Succulent Garden',
          image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg',
          description: 'Assorted drought tolerant rosettes arranged inside one shallow bowl.',
          cost: '$18',
        },
        {
          name: 'Chinese Evergreen',
          image: 'https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg',
          description: 'Patterned foliage that holds its colour under weak indoor light.',
          cost: '$22',
        },
        {
          name: 'Aloe Vera',
          image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg',
          description: 'Sculptural succulent storing soothing gel inside every thickened leaf.',
          cost: '$14',
        },
        {
          name: 'Scented Geranium',
          image: 'https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg',
          description: 'Hardy cushion of leaves that perfumes a windowsill with very little care.',
          cost: '$20',
        },
      ],
    },
  ];

  // Total Number of Plants Held in the Cart, Displayed on the Navigation Icon
  const calculateTotalQuantity = () => {
    return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const totalQuantity = calculateTotalQuantity();

  // Keeps the Add to Cart Buttons Aligned With the Live Contents of the Cart
  useEffect(() => {
    const plantsInCart = {};

    cartItems.forEach((item) => {
      plantsInCart[item.name] = true;
    });

    setAddedToCart(plantsInCart);
  }, [cartItems]);

  // Returns the Surface to the Top Whenever the Visitor Switches Page
  useEffect(() => {
    const surface = shopRef.current?.parentElement;

    if (surface) {
      surface.scrollTo(0, 0);
    }
  }, [showCart]);

  // Sends the Selected Plant to the Redux Cart and Marks the Button as Used
  const handleAddToCart = (product) => {
    dispatch(addItem(product));

    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  // Returns the Visitor to the Landing Page
  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  // Opens the Shopping Cart Page
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  // Opens the Product Listing Page
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // Returns From the Shopping Cart Back to the Product Listing
  const handleContinueShopping = (e) => {
    if (e) {
      e.preventDefault();
    }

    setShowCart(false);
  };

  return (
    <div className="shop" ref={shopRef}>
      {/* Navigation Bar Shared by the Product Listing and the Shopping Cart */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="brand" onClick={handleHomeClick}>
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 21c0-6.5 3.5-10.5 8-12-0.5 7-4 11-8 12Z" />
                <path d="M12 21C12 14.5 8.5 10.5 4 9c0.5 7 4 11 8 12Z" />
                <path d="M12 21v-6" />
              </svg>
            </span>
            <span className="brand-text">
              <span className="brand-name">Paradise Nursery</span>
              <i className="brand-tagline">Where Green Meets Serenity</i>
            </span>
          </a>

          <ul className="nav-links">
            <li>
              <a href="/" className="nav-link" onClick={handleHomeClick}>
                Home
              </a>
            </li>
            <li>
              <a
                href="#plants"
                className={`nav-link ${!showCart ? 'is-active' : ''}`}
                onClick={handlePlantsClick}
              >
                Plants
              </a>
            </li>
            <li>
              <a
                href="#cart"
                className={`nav-link nav-cart ${showCart ? 'is-active' : ''}`}
                onClick={handleCartClick}
                aria-label={`Cart holding ${totalQuantity} plants`}
              >
                <svg className="cart" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.55L21 8H6" />
                  <circle cx="10" cy="20" r="1.4" />
                  <circle cx="18" cy="20" r="1.4" />
                </svg>
                <span className="cart-count" key={totalQuantity}>
                  {totalQuantity}
                </span>
                <span className="nav-cart-label">Cart</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {!showCart ? (
        <main className="shop-page">
          {/* Introduction Heading the Product Listing */}
          <header className="shop-hero">
            <span className="shop-eyebrow">The Collection</span>
            <h1>Plants for every corner of the home</h1>
            <p>
              Twenty four varieties raised on our own benches and grouped by the work each one does
              best. Every price covers a nursery pot and a printed care card.
            </p>
          </header>

          {/* Plant Catalogue Rendered From the Plants Array */}
          <div className="product-grid">
            {plantsArray.map((category, index) => (
              <section className="product-category" key={category.category}>
                <header className="category-header">
                  <span className="category-index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="category-heading">
                    <h2>{category.category}</h2>
                    <p className="category-caption">{category.caption}</p>
                  </div>
                  <span className="category-count">{category.plants.length} plants</span>
                </header>

                <div className="product-list">
                  {category.plants.map((plant, plantIndex) => (
                    <article
                      className="product-card"
                      key={plant.name}
                      style={{ '--card-index': plantIndex }}
                    >
                      <div className="product-frame">
                        <img
                          className="product-image"
                          src={plant.image}
                          alt={plant.name}
                          loading="lazy"
                        />
                      </div>

                      <div className="product-body">
                        <div className="product-title">{plant.name}</div>
                        <div className="product-description">{plant.description}</div>

                        <div className="product-footer">
                          <div className="product-price">
                            <div className="product-cost">{plant.cost}</div>
                            <span className="product-cost-note">per plant</span>
                          </div>

                          <button
                            className={`product-button ${addedToCart[plant.name] ? 'added' : ''}`}
                            onClick={() => handleAddToCart(plant)}
                            disabled={addedToCart[plant.name]}
                          >
                            {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Closing Note Beneath the Catalogue */}
          <footer className="shop-footer">
            <span className="shop-footer-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 21c0-6.5 3.5-10.5 8-12-0.5 7-4 11-8 12Z" />
                <path d="M12 21C12 14.5 8.5 10.5 4 9c0.5 7 4 11 8 12Z" />
                <path d="M12 21v-6" />
              </svg>
            </span>
            <p>Paradise Nursery &middot; Where Green Meets Serenity</p>
          </footer>
        </main>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

// Props Contract Expected by the Product Listing
ProductList.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
};

export default ProductList;
