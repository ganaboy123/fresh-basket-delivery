import { useEffect, useMemo, useRef, useState } from 'react';

const INTRO_MS = 5200;

const FEATURES = [
  '100% Natural',
  'Fast Delivery',
  'Easy WhatsApp Ordering',
];

const GARI_PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: 15 + Math.random() * 24,
  delay: Math.random() * 1.6,
  duration: 1.4 + Math.random() * 1.3,
  size: 2 + Math.random() * 3,
  drift: -12 + Math.random() * 24,
}));

const DUST_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 2.4,
  duration: 4.5 + Math.random() * 3,
  size: 1 + Math.random() * 2,
}));

function CinematicIntro({ onDone }) {
  const [exit, setExit] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExit(true);
    window.setTimeout(() => {
      onDone();
    }, 700);
  };

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now) => {
      const pct = Math.min(((now - startRef.current) / INTRO_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const featureItems = useMemo(
    () =>
      FEATURES.map((feature, i) => (
        <li
          key={feature}
          className="fsi-feature"
          style={{ animationDelay: `${1.7 + i * 0.28}s` }}
        >
          {feature}
        </li>
      )),
    []
  );

  return (
    <section className={`fsi-overlay ${exit ? 'fsi-overlay-exit' : ''}`} role="dialog" aria-modal="true">
      <button className="fsi-skip" onClick={finish} type="button">
        Skip Intro
      </button>

      <div className="fsi-bg" aria-hidden="true">
        <div className="fsi-vignette" />
        <div className="fsi-rays" />
        <div className="fsi-platform" />
        <div className="fsi-pulse" />
        <div className="fsi-sparks">
          {DUST_PARTICLES.map((p) => (
            <span
              key={p.id}
              className="fsi-dust"
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

      <div className="fsi-scene">
        <div className="fsi-visual-wrap">
          <div className="fsi-camera">
            <img src="/intro-basket.png" alt="Fresh Basket intro visual" className="fsi-image" />

            <div className="fsi-oil fsi-oil-palm" />
            <div className="fsi-oil-highlight fsi-oil-palm-hi" />
            <div className="fsi-oil fsi-oil-coco" />
            <div className="fsi-oil-highlight fsi-oil-coco-hi" />

            <div className="fsi-gari-rain" aria-hidden="true">
              {GARI_PARTICLES.map((p) => (
                <span
                  key={p.id}
                  className="fsi-gari-dot"
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

            <div className="fsi-rimlight" />
          </div>
        </div>

        <div className="fsi-copy">
          <p className="fsi-kicker">Welcome to</p>
          <h1 className="fsi-title">
            FRESH BASKET <span>DELIVERY</span>
          </h1>
          <p className="fsi-sub">Your trusted source for Palm Oil, Coconut Oil &amp; Gari</p>
          <ul className="fsi-features">{featureItems}</ul>
        </div>
      </div>

      <div className="fsi-progress-track" aria-hidden="true">
        <div className="fsi-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}

export default function IntroGate({ children }) {
  const [done, setDone] = useState(false);

  return (
    <>
      {/* Always render children underneath so the app is ready instantly */}
      <div style={{ visibility: done ? 'visible' : 'hidden', pointerEvents: done ? 'auto' : 'none' }}>
        {children}
      </div>
      {!done && <CinematicIntro onDone={() => setDone(true)} />}
    </>
  );
}
