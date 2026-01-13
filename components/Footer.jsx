import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--color-earth-dark)',
            color: 'var(--color-cream)',
            marginTop: 'var(--spacing-3xl)',
            padding: 'var(--spacing-3xl) 0 var(--spacing-lg)'
        }}>
            <div className="container">
                <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    {/* About */}
                    <div>
                        <h4 style={{ color: 'white', marginBottom: 'var(--spacing-md)' }}>PanchaGavya Store</h4>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--color-sand)' }}>
                            Your trusted source for authentic Panchagavya products. We bring you the wisdom of ancient India combined with modern quality standards.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 style={{ color: 'white', marginBottom: 'var(--spacing-md)' }}>Quick Links</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            <Link href="/products" style={{ color: 'var(--color-sand)', fontSize: '0.9rem' }}>Products</Link>
                            <Link href="/learn" style={{ color: 'var(--color-sand)', fontSize: '0.9rem' }}>Learn</Link>
                            <Link href="/about" style={{ color: 'var(--color-sand)', fontSize: '0.9rem' }}>About Us</Link>
                            <Link href="/contact" style={{ color: 'var(--color-sand)', fontSize: '0.9rem' }}>Contact</Link>
                        </div>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h5 style={{ color: 'white', marginBottom: 'var(--spacing-md)' }}>Customer Support</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', fontSize: '0.9rem', color: 'var(--color-sand)' }}>
                            <p>📧 support@panchagavya.com</p>
                            <p>📞 +91 98765 43210</p>
                            <p>⏰ Mon-Sat: 9AM - 6PM</p>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div>
                        <h5 style={{ color: 'white', marginBottom: 'var(--spacing-md)' }}>Certifications</h5>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                            <span className="badge badge-success">FSSAI</span>
                            <span className="badge badge-success">NPOP</span>
                            <span className="badge badge-success">Jaivik Bharat</span>
                            <span className="badge badge-success">AYUSH</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', marginTop: 'var(--spacing-md)', color: 'var(--color-sand)' }}>
                            All products are certified organic and meet Indian food safety standards.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(230, 213, 184, 0.2)',
                    paddingTop: 'var(--spacing-lg)',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: 'var(--color-sand)'
                }}>
                    <p>© 2026 PanchaGavya Store. All rights reserved. | Made with 🌿 for sustainable living</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-md)' }}>
                        <Link href="/privacy" style={{ color: 'var(--color-sand)', fontSize: '0.85rem' }}>Privacy Policy</Link>
                        <Link href="/terms" style={{ color: 'var(--color-sand)', fontSize: '0.85rem' }}>Terms of Service</Link>
                        <Link href="/shipping" style={{ color: 'var(--color-sand)', fontSize: '0.85rem' }}>Shipping Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
