import { useEffect, useRef, useState, useCallback } from 'react';

const REVIEWS = [
    {
        id: 1,
        name: 'Ama Mensah',
        location: 'Accra, Osu',
        rating: 5,
        text: 'Very fresh palm oil, delivery was super fast. The packaging was sealed and clean. Will definitely order again!',
        avatar: 'AM',
        color: '#16a34a',
    },
    {
        id: 2,
        name: 'Kwame Asante',
        location: 'Tema, Community 5',
        rating: 5,
        text: 'The gari is very clean and well packaged. You can tell it is freshly processed. My family loves it.',
        avatar: 'KA',
        color: '#0891b2',
    },
    {
        id: 3,
        name: 'Abena Osei',
        location: 'Kasoa, Central',
        rating: 5,
        text: 'Coconut oil quality is top-notch. Smells natural and pure — no chemicals at all. Highly recommend!',
        avatar: 'AO',
        color: '#7c3aed',
    },
    {
        id: 4,
        name: 'Kofi Boateng',
        location: 'Accra, Madina',
        rating: 5,
        text: 'Ordered the large gallon of palm oil. Great value for money and arrived the same day. Excellent service!',
        avatar: 'KB',
        color: '#dc2626',
    },
    {
        id: 5,
        name: 'Efua Darko',
        location: 'Accra, East Legon',
        rating: 5,
        text: 'I love how easy it is to order via WhatsApp. The coconut oil is perfect for my skin care routine too.',
        avatar: 'ED',
        color: '#d97706',
    },
    {
        id: 6,
        name: 'Yaw Frimpong',
        location: 'Kumasi, Adum',
        rating: 5,
        text: 'Best gari I have bought online. The yellow gari is perfectly toasted and the 3kg pack is great value.',
        avatar: 'YF',
        color: '#0f766e',
    },
];

const Stars = ({ count = 5 }) => (
    <div className="review-stars" aria-label={`${count} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < count ? 'star star-filled' : 'star star-empty'}>★</span>
        ))}
    </div>
);

const ReviewCard = ({ review }) => (
    <div className="review-card">
        <Stars count={review.rating} />
        <p className="review-text">"{review.text}"</p>
        <div className="review-author">
            <div className="review-avatar" style={{ background: review.color }}>
                {review.avatar}
            </div>
            <div>
                <strong className="review-name">{review.name}</strong>
                <span className="review-location">📍 {review.location}</span>
            </div>
        </div>
    </div>
);

const VISIBLE = { default: 3, tablet: 2, mobile: 1 };

const ReviewsCarousel = () => {
    const [index, setIndex] = useState(0);
    const [perView, setPerView] = useState(VISIBLE.default);
    const [paused, setPaused] = useState(false);
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef(null);
    const timerRef = useRef(null);

    const maxIndex = REVIEWS.length - perView;

    // Responsive perView
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setPerView(w < 640 ? VISIBLE.mobile : w < 960 ? VISIBLE.tablet : VISIBLE.default);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // Clamp index when perView changes
    useEffect(() => {
        setIndex((i) => Math.min(i, REVIEWS.length - perView));
    }, [perView]);

    const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
    const prev = useCallback(() => setIndex((i) => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

    // Auto-slide
    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(next, 4000);
        return () => clearInterval(timerRef.current);
    }, [paused, next]);

    // Touch / drag
    const onDragStart = (e) => {
        dragStart.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        setDragging(true);
        setPaused(true);
    };

    const onDragEnd = (e) => {
        if (!dragging || dragStart.current === null) return;
        const end = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const diff = dragStart.current - end;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        dragStart.current = null;
        setDragging(false);
        setTimeout(() => setPaused(false), 1000);
    };

    const translateX = -(index * (100 / perView));

    return (
        <section className="reviews-section">
            <div className="container">
                <div className="reviews-header">
                    <div>
                        <p className="section-eyebrow">Customer Reviews</p>
                        <h2>What Our Customers Are Saying</h2>
                        <p className="reviews-subtitle">
                            Trusted by hundreds of happy customers across Accra and beyond.
                        </p>
                    </div>
                    <div className="carousel-controls">
                        <button className="carousel-btn" onClick={prev} aria-label="Previous review">‹</button>
                        <button className="carousel-btn" onClick={next} aria-label="Next review">›</button>
                    </div>
                </div>

                {/* Track */}
                <div
                    className="carousel-viewport"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onMouseDown={onDragStart}
                    onMouseUp={onDragEnd}
                    onTouchStart={onDragStart}
                    onTouchEnd={onDragEnd}
                >
                    <div
                        className="carousel-track"
                        style={{
                            transform: `translateX(${translateX}%)`,
                            gridTemplateColumns: `repeat(${REVIEWS.length}, calc(${100 / perView}% - ${(perView - 1) * 16 / perView}px))`,
                        }}
                    >
                        {REVIEWS.map((r) => <ReviewCard key={r.id} review={r} />)}
                    </div>
                </div>

                {/* Dots */}
                <div className="carousel-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            className={`carousel-dot${i === index ? ' active' : ''}`}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsCarousel;
