import { useEffect, useRef, useState } from 'react';

const STATS = [
    { icon: '👥', value: 500, suffix: '+', label: 'Happy Customers' },
    { icon: '📦', value: 1200, suffix: '+', label: 'Orders Delivered' },
    { icon: '⭐', value: 300, suffix: '+', label: '5-Star Reviews' },
    { icon: '🕐', value: 3, suffix: '+', label: 'Years of Service' },
];

const useCountUp = (target, duration = 1800, active = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;
        let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [active, target, duration]);

    return count;
};

const StatItem = ({ icon, value, suffix, label, active }) => {
    const count = useCountUp(value, 1800, active);
    return (
        <div className="trust-stat">
            <span className="trust-stat-icon">{icon}</span>
            <strong className="trust-stat-value">
                {count.toLocaleString()}{suffix}
            </strong>
            <span className="trust-stat-label">{label}</span>
        </div>
    );
};

const TrustStats = () => {
    const ref = useRef(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="trust-section">
            <div className="container">
                <div className="trust-header">
                    <p className="section-eyebrow">Our Track Record</p>
                    <h2>Trusted by Hundreds Across Ghana</h2>
                    <p className="trust-subtitle">
                        Real numbers from real customers who order fresh essentials every week.
                    </p>
                </div>
                <div className="trust-grid" ref={ref}>
                    {STATS.map((s) => (
                        <StatItem key={s.label} {...s} active={active} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustStats;
