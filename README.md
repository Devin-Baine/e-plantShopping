# Paradise Nursery Shopping Application

**Repository:** `e-plantShopping`

Paradise Nursery is a single page shopping cart application for an online plant shop. Visitors arrive on a landing page introducing the company before moving through a catalogue of twenty four houseplants grouped into four themed collections. Selections gathered along the way are managed on a dedicated shopping cart page. Global cart state runs through Redux Toolkit so that quantities and totals stay synchronised across every component.

---

## Overview

Paradise Nursery was built with React function components and the Redux Toolkit store pattern. Component level state governs which surface is visible, while the cart itself lives in a single Redux slice consumed by both the product listing and the cart page.

Application highlights:

- Landing page presenting the company name over a full bleed glasshouse photograph
- Company profile describing how the plants are propagated and packed
- Catalogue of twenty four unique houseplants split across four collections
- Navigation bar shared by the product listing and the shopping cart
- Cart icon reporting the live number of plants held in the cart
- Shopping cart supporting quantity changes alongside per plant subtotals and deletion

---

## Collections

| Collection | Plants |
| --- | --- |
| Air Purifying Plants | Snake Plant, Spider Plant, Peace Lily, Boston Fern, Rubber Plant, Golden Pothos |
| Aromatic Fragrant Plants | Lavender, Jasmine, Rosemary, Mint, Lemon Balm, Hyacinth |
| Insect Repellent Plants | Marigold, Catnip, Basil, Oregano, Chamomile, Calendula |
| Low Maintenance Plants | ZZ Plant, Cast Iron Plant, Succulent Garden, Chinese Evergreen, Aloe Vera, Scented Geranium |

---

## Features

### Landing page

- Background photograph applied through `App.css` with a layered tint for legibility
- Company name and tagline set in a display serif
- **Get Started** button revealing the product listing
- Company profile rendered by `AboutUs.jsx`

### Product listing page

- Six unique houseplants in each of the four collections
- Thumbnail, name, description and price on every plant card
- **Add to Cart** button that dispatches the plant to the Redux store
- Button becomes disabled and reads **Added to Cart** once the plant is in the cart
- Navigation bar carrying links to Home, Plants and Cart
- Cart icon badge counting every plant currently held

### Shopping cart page

- Total cart amount covering every plant in the cart
- Subtotal calculated for each plant type
- Thumbnail, name and unit price shown on every row
- Increase and decrease controls that update all totals immediately
- Delete control removing a plant type outright
- **Checkout** button raising a Coming Soon message
- **Continue Shopping** button returning to the product listing

---

## Technology

| Layer | Choice |
| --- | --- |
| Framework | React 18 |
| State management | Redux Toolkit with React Redux |
| Build tooling | Vite 5 |
| Styling | Hand written CSS driven by custom properties |
| Deployment | GitHub Pages through `gh-pages` |

---

## Project structure

```
e-plantShopping/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── leaf.svg
└── src/
    ├── AboutUs.css
    ├── AboutUs.jsx
    ├── App.css
    ├── App.jsx
    ├── CartItem.css
    ├── CartItem.jsx
    ├── CartSlice.jsx
    ├── ProductList.css
    ├── ProductList.jsx
    ├── index.css
    ├── main.jsx
    └── store.js
```

---

## Redux design

`CartSlice.jsx` owns the entire cart. Three reducers cover every interaction the interface needs.

| Reducer | Responsibility |
| --- | --- |
| `addItem` | Pushes a new plant into the cart or raises the quantity of an existing entry |
| `removeItem` | Filters a plant out of the cart by name |
| `updateQuantity` | Overwrites the quantity recorded against a named plant |

`store.js` registers the reducer under the `cart` key and `main.jsx` wraps the application in the React Redux `Provider` so every component can read from the same source.

---

## Running the application

Clone the repository and install the dependencies.

```bash
git clone https://github.com/Devin-Baine/e-plantShopping.git
```

```bash
cd e-plantShopping
```

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Produce a preview build served on port 4173.

```bash
npm run preview
```

---

## Deployment

Deployment runs through GitHub Pages. Running the deploy script builds the project and publishes the `dist` folder to the `gh-pages` branch.

```bash
npm run deploy
```

`vite.config.js` sets `base` to `/e-plantShopping` so that every asset resolves correctly once the site is served from the repository sub path.

---

## Available scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Produces the production bundle in `dist` |
| `npm run preview` | Builds the project and serves the output locally |
| `npm run lint` | Runs ESLint across the project |
| `npm run deploy` | Publishes the build to GitHub Pages |

---

## License

Released under the Apache License 2.0. Full terms are recorded in [LICENSE](LICENSE).
