'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                    <h1>Contact Us</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', maxWidth: '700px', margin: '0 auto' }}>
                        Have questions about our products? Need expert advice? We're here to help!
                    </p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)' }}>
                    {/* Contact Form */}
                    <div>
                        <div className="card">
                            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Send us a message</h3>

                            {submitted ? (
                                <div style={{
                                    padding: 'var(--spacing-xl)',
                                    background: 'var(--color-green-light)',
                                    color: 'white',
                                    borderRadius: 'var(--radius-md)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>✓</div>
                                    <h4 style={{ color: 'white' }}>Thank you!</h4>
                                    <p>Your message has been sent. We'll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <label className="label">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="input"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <label className="label">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="input"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <label className="label">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="input"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <label className="label">Subject *</label>
                                        <select
                                            name="subject"
                                            className="input"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="product">Product Inquiry</option>
                                            <option value="usage">Usage Guidance</option>
                                            <option value="order">Order Support</option>
                                            <option value="expert">Consult Expert (Gau-Vaidya)</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <label className="label">Message *</label>
                                        <textarea
                                            name="message"
                                            className="input textarea"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            style={{ minHeight: '150px' }}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        {/* Contact Details */}
                        <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Get in Touch</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                <div>
                                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>📧</div>
                                    <h5>Email</h5>
                                    <p style={{ color: 'var(--color-text-light)' }}>support@panchagavya.com</p>
                                    <p style={{ color: 'var(--color-text-light)' }}>orders@panchagavya.com</p>
                                </div>

                                <div>
                                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>📞</div>
                                    <h5>Phone</h5>
                                    <p style={{ color: 'var(--color-text-light)' }}>+91 98765 43210</p>
                                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                                        Mon-Sat: 9:00 AM - 6:00 PM IST
                                    </p>
                                </div>

                                <div>
                                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>📍</div>
                                    <h5>Address</h5>
                                    <p style={{ color: 'var(--color-text-light)' }}>
                                        PanchaGavya Products Pvt. Ltd.<br />
                                        123, Organic Way, Green Valley<br />
                                        Bangalore, Karnataka - 560001<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Expert Consultation */}
                        <div className="card" style={{
                            background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.1), rgba(45, 74, 43, 0.1))'
                        }}>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>🧑‍⚕️ Consult Our Experts</h4>
                            <p style={{ marginBottom: 'var(--spacing-md)', lineHeight: 1.7 }}>
                                Need personalized advice on using Panchagavya products? Our Gau-Vaidya (cow experts) and
                                Ayurvedic practitioners are available for consultation.
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                Select "Consult Expert" in the form subject to schedule a consultation.
                            </p>
                        </div>

                        {/* Business Hours */}
                        <div className="card" style={{ marginTop: 'var(--spacing-lg)' }}>
                            <h5 style={{ marginBottom: 'var(--spacing-md)' }}>⏰ Business Hours</h5>
                            <div style={{ fontSize: '0.9rem', lineHeight: 2 }}>
                                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                                <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM</p>
                                <p><strong>Sunday:</strong> Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
