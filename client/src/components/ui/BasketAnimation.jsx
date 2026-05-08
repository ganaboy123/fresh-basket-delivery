import { useEffect, useRef, useState } from 'react';

const GARI_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: 15 + Math.random() * 22,
  delay: Math.random() * 1.6,
  duration: 1.3 + Math.random() * 1.2,
  size: 2 + Math.random() * 2.4,
  drift: -12 + Math.random() * 22,
}));

const DUST_PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 4 + Math.random() * 2.5,
  size: 1 + Math.random() * 2,
}));

const BasketAnimation = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`hci-section ${active ? 'hci-active' : ''}`} ref={ref} aria-label="Cinematic basket showcase">
      <div className="hci-bg" aria-hidden="true">
        <div className="hci-vignette" />
        <div className="hci-rays" />
        <div className="hci-platform" />
        <div className="hci-pulse" />
        <div className="hci-sparks">
          {DUST_PARTICLES.map((p) => (
            <span
              key={p.id}
              className="hci-dust"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container hci-inner">
        <div className="hci-visual-wrap">
          <div className="hci-camera">
            <img src="/intro-basket.png" alt="Basket with palm oil, coconut oil and gari" className="hci-image" />

            <div className="hci-oil hci-oil-palm" />
            <div className="hci-oil-highlight hci-oil-palm-hi" />
            <div className="hci-oil hci-oil-coco" />
            <div className="hci-oil-highlight hci-oil-coco-hi" />

            <div className="hci-gari-rain" aria-hidden="true">
              {GARI_PARTICLES.map((p) => (
                <span
                  key={p.id}
                  className="hci-gari-dot"
                  style={{
                    left: `${p.left}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                    '--drift': `${p.drift}px`,
                  }}
                />
              ))}
            </div>

            <div className="hci-rimlight" />
          </div>
        </div>

        <div className="hci-copy">
          <p className="hci-kicker">Welcome to</p>
          <h2 className="hci-title">
            FRESH BASKET <span>DELIVERY</span>
          </h2>
          <p className="hci-sub">Your trusted source for Palm Oil, Coconut Oil &amp; Gari</p>
          <ul className="hci-features">
            <li>100% Natural</li>
            <li>Fast Delivery</li>
            <li>Easy WhatsApp Ordering</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BasketAnimation;
