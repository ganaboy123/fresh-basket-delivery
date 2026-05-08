import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { itemCount } = useCart();
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-wrapper">
        <Link to="/" className="brand" aria-label="Fresh Basket home">
          <span className="brand-energy" aria-hidden="true" />
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-orbit" />
            <span className="brand-basket">
              <span className="brand-basket-handle" />
              <span className="brand-basket-body" />
              <span className="brand-basket-glow" />
            </span>
            <span className="brand-spark brand-spark-1" />
            <span className="brand-spark brand-spark-2" />
          </span>
          <span className="brand-name-wrap">
            <span className="brand-name">Fresh Basket</span>
            <span className="brand-name-glow" aria-hidden="true" />
          </span>
        </Link>

        <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? 'Light' : 'Dark'}
          </button>
          <Link className="cart-chip" to="/cart" aria-label={`Cart, ${itemCount} items`}>
            Cart <span>{itemCount}</span>
          </Link>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
