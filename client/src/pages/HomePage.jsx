import { useState, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import products, { CATEGORIES } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import TrustStats from '../components/ui/TrustStats';
import { GradientBackground } from '../components/ui/gradient-background';

const ReviewsCarousel = lazy(() => import('../components/ui/ReviewsCarousel'));
const BasketAnimation = lazy(() => import('../components/ui/BasketAnimation'));

const SectionFallback = () => <section className="section container" aria-hidden="true" />;

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.size.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div>
      <GradientBackground
        className="hero hero-modern"
        animationDuration={14}
        overlay
        overlayOpacity={0.32}
      >
        <section>
          <div className="container hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="hero-tag">100% Natural Products</p>
              <h1>Fresh African Essentials, Delivered Fast</h1>
              <p className="hero-copy">
                Premium Palm Oil, Coconut Oil, and Gari in multiple sizes.
                Order in seconds via WhatsApp - no account needed.
              </p>
              <div className="hero-actions">
                <a href="#products" className="btn btn-primary">Shop Now</a>
                <Link to="/cart" className="btn btn-ghost">View Cart</Link>
              </div>
            </motion.div>

            <motion.div
              className="hero-card"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            >
              <h3>Why choose Fresh Basket?</h3>
              <ul className="hero-list">
                <li>Verified quality, no additives</li>
                <li>Multiple sizes for every budget</li>
                <li>Fast delivery across Ghana</li>
                <li>Order via WhatsApp - simple and fast</li>
                <li>Secure packaging, sealed for freshness</li>
              </ul>
            </motion.div>
          </div>
        </section>
      </GradientBackground>

      <Suspense fallback={<SectionFallback />}>
        <BasketAnimation />
      </Suspense>

      <section className="section container" id="products">
        <div className="section-header-modern">
          <div>
            <h2>Our Products</h2>
            <p>{filtered.length} item{filtered.length !== 1 ? 's' : ''} available</p>
          </div>
        </div>

        <div className="search-bar-wrap">
          <input
            className="input search-input"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>

        <div className="filter-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearch('');
                setActiveCategory('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="product-grid">
            <AnimatePresence>
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <TrustStats />

      <Suspense fallback={<SectionFallback />}>
        <ReviewsCarousel />
      </Suspense>

      <section className="section container">
        <div className="whatsapp-cta">
          <div>
            <h2>Need help placing an order?</h2>
            <p>Chat with us directly on WhatsApp - we respond within minutes.</p>
          </div>
          <a
            href="https://wa.me/233530726322"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <a
        href="https://wa.me/233530726322"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat with Fresh Basket on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="floating-whatsapp-icon" aria-hidden="true">WA</span>
      </a>
    </div>
  );
};

export default HomePage;
