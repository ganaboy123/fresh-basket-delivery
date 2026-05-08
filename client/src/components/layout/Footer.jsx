import { Link } from 'react-router-dom';

const WHATSAPP = '233530726322';

const Footer = () => (
  <footer className="site-footer" id="contact">
    <div className="container footer-inner">
      <div className="footer-brand">
        <span className="brand-icon">🧺</span>
        <strong>Fresh Basket Delivery</strong>
        <p>Farm-fresh oils and gari delivered to your doorstep across Ghana.</p>
      </div>
      <div className="footer-links">
        <strong>Quick Links</strong>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <div className="footer-contact">
        <strong>Contact Us</strong>
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
        >
          💬 Chat on WhatsApp
        </a>
        <Link to="/contact" style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>Visit Contact Page</Link>
        <p className="muted-text">Monday - Sunday, 8am - 6pm</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Fresh Basket Delivery. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
