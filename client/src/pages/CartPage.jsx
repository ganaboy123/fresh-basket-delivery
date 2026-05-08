import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '233530726322';

const buildWhatsAppMessage = (items, total) => {
  const lines = items.map(
    (i) => `• ${i.name} (${i.size}) x${i.quantity} — GHS ${(i.price * i.quantity).toFixed(2)}`
  );
  const msg = [
    'Hello Fresh Basket! I would like to place an order:',
    '',
    ...lines,
    '',
    `Total: GHS ${total.toFixed(2)}`,
    '',
    'My delivery location is: ______',
  ].join('\n');
  return encodeURIComponent(msg);
};

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(items, totalPrice)}`;

  if (!items.length) {
    return (
      <section className="section container narrow">
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add some products to get started.</p>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section container">
      <h2>Your Cart</h2>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="muted-text">{item.size}</p>
                <p>GHS {item.price.toFixed(2)} each</p>
              </div>
              <div className="cart-item-qty">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >−</button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >+</button>
              </div>
              <p className="price">GHS {(item.price * item.quantity).toFixed(2)}</p>
              <button
                type="button"
                className="btn btn-ghost remove-btn"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
              >✕</button>
            </article>
          ))}
        </div>

        <aside className="summary-card">
          <h3>Order Summary</h3>
          <div className="summary-lines">
            {items.map((i) => (
              <div key={i.id} className="summary-line">
                <span>{i.name} ({i.size}) ×{i.quantity}</span>
                <span>GHS {(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-total">
            <strong>Total</strong>
            <strong>GHS {totalPrice.toFixed(2)}</strong>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp checkout-btn"
          >
            💬 Checkout via WhatsApp
          </a>
          <Link to="/products" className="btn btn-ghost" style={{ marginTop: '0.5rem', display: 'block', textAlign: 'center' }}>
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
