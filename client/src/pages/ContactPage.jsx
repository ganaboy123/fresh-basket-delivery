import { useState } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP = '233530726322';
const PHONE = '+233 53 072 6322';
const EMAIL = 'rosetsoekordi@gmail.com';
const LOCATION = 'Kwabenya, Accra';

const HOURS = [
    { day: 'Monday - Sunday', time: '8:00 AM - 6:00 PM' },
];

const buildWhatsApp = (name, msg) => {
    const text = `Hello Fresh Basket! My name is ${name}.\n\n${msg}`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
};

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', message: '' });

    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.message.trim()) return;
        window.open(buildWhatsApp(form.name, form.message), '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="contact-page">
            {/* Header banner */}
            <section className="contact-hero">
                <div className="container">
                    <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
                        <p className="hero-tag">💬 We're here to help</p>
                        <h1>Get in Touch</h1>
                        <p className="hero-copy">
                            Have a question about an order, product, or delivery? Reach us on WhatsApp for the
                            fastest response — we typically reply within minutes.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container contact-grid">
                {/* Left — info cards */}
                <motion.div
                    className="contact-info"
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* WhatsApp CTA */}
                    <div className="contact-card contact-card--whatsapp">
                        <div className="contact-card-icon">💬</div>
                        <div>
                            <h3>Chat on WhatsApp</h3>
                            <p>The quickest way to reach us. Send your order or question directly.</p>
                            <a
                                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello Fresh Basket! I have a question about your products.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp btn-lg"
                            >
                                💬 Chat with us on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Contact details */}
                    <div className="contact-card">
                        <h3>Contact Details</h3>
                        <ul className="contact-detail-list">
                            <li>
                                <span className="contact-detail-icon">📞</span>
                                <div>
                                    <strong>Phone</strong>
                                    <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
                                </div>
                            </li>
                            <li>
                                <span className="contact-detail-icon">✉️</span>
                                <div>
                                    <strong>Email</strong>
                                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                                </div>
                            </li>
                            <li>
                                <span className="contact-detail-icon">📍</span>
                                <div>
                                    <strong>Location</strong>
                                    <span>{LOCATION}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Business hours */}
                    <div className="contact-card">
                        <h3>🕐 Business Hours</h3>
                        <ul className="hours-list">
                            {HOURS.map(({ day, time }) => (
                                <li key={day} className={time === 'Closed' ? 'hours-closed' : ''}>
                                    <span>{day}</span>
                                    <strong>{time}</strong>
                                </li>
                            ))}
                        </ul>
                        <p className="contact-note">
                            Orders placed outside business hours will be processed the next working day.
                        </p>
                    </div>
                </motion.div>

                {/* Right — contact form */}
                <motion.div
                    className="contact-form-wrap"
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="contact-card contact-form-card">
                        <h3>Send us a Message</h3>
                        <p className="muted-text">
                            Fill in the form below and we'll open WhatsApp with your message pre-filled — ready to send.
                        </p>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="field">
                                <label htmlFor="contact-name">Your Name</label>
                                <input
                                    id="contact-name"
                                    className="input"
                                    type="text"
                                    placeholder="e.g. Ama Mensah"
                                    value={form.name}
                                    onChange={set('name')}
                                    required
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="contact-msg">Your Message</label>
                                <textarea
                                    id="contact-msg"
                                    className="input contact-textarea"
                                    placeholder="e.g. I'd like to order 2 bottles of Palm Oil (5L)..."
                                    value={form.message}
                                    onChange={set('message')}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-whatsapp btn-lg"
                                disabled={!form.name.trim() || !form.message.trim()}
                            >
                                💬 Send via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* Friendly note */}
                    <div className="contact-card contact-card--note">
                        <span className="note-emoji">🌿</span>
                        <div>
                            <strong>Fresh, fast, and friendly.</strong>
                            <p>
                                We're a small Accra-based team passionate about delivering quality African kitchen
                                essentials. Every order matters to us — don't hesitate to reach out.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
