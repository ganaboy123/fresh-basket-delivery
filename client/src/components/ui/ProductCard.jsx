import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, items } = useCart();
  const cartItem = items.find((i) => i.id === product.id);
  const inCart = Boolean(cartItem);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="product-card"
    >
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <span className="pill">{product.category}</span>
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="size-tag">{product.size}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-bottom">
          <p className="price">GHS {product.price.toFixed(2)}</p>
          <button
            type="button"
            className={`btn ${inCart ? 'btn-ghost' : 'btn-primary'}`}
            onClick={() => addToCart(product)}
          >
            {inCart ? `Add More (${cartItem.quantity})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
