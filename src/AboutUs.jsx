import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <span className="about-us-eyebrow">About The Company</span>
      <h2 className="about-us-heading">Paradise Nursery</h2>

      <p className="about-us-description">
        Welcome to Paradise Nursery, where green meets serenity.
      </p>

      <p className="about-us-content">
        Paradise Nursery began beneath a single valley glasshouse and now cultivates more than two
        hundred varieties of houseplant across four heated benches.
      </p>

      <p className="about-us-content">
        Growers on our team propagate every plant by hand and pack it alongside a care card
        explaining exactly how much light and water it expects.
      </p>

      <p className="about-us-content">
        Sustainable practice shapes each decision made here. Peat-free compost fills every pot and
        harvested rainwater irrigates the whole collection.
      </p>

      <div className="about-us-signature">
        <span className="about-us-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M12 21c0-6.5 3.5-10.5 8-12-0.5 7-4 11-8 12Z" />
            <path d="M12 21C12 14.5 8.5 10.5 4 9c0.5 7 4 11 8 12Z" />
            <path d="M12 21v-6" />
          </svg>
        </span>
        <p className="about-us-tagline">Cultivated with patience in every pot</p>
      </div>
    </div>
  );
}

export default AboutUs;
