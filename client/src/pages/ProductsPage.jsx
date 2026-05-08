import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import products, { CATEGORIES } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Sync category from URL query param (e.g. from homepage links)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.includes(cat)) setActiveCategory(cat);
  }, []);

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
  }, [activeCategory, search]);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setSearchParams(cat !== 'All' ? { category: cat } : {});
  };

  return (
    <section className="section container">
      <div className="section-header-modern">
        <div>
          <h2>All Products</h2>
          <p>{filtered.length} item{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      {/* Search */}
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

      {/* Category filters */}
      <div className="filter-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-tab${activeCategory === cat ? ' active' : ''}`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try a different search or category.</p>
          <button className="btn btn-primary" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

export default ProductsPage;
