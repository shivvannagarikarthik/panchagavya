export default function AboutPage() {
    return (
        <div className="section">
            <div className="container">
                {/* Hero */}
                <div className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                    <h1>About PanchaGavya Store</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', maxWidth: '800px', margin: '0 auto' }}>
                        Bringing you the ancient wisdom of Panchagavya with modern quality standards
                    </p>
                </div>

                {/* Our Story */}
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', marginBottom: 'var(--spacing-3xl)' }}>
                    <div>
                        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Our Story</h2>
                        <p style={{ lineHeight: 1.8, marginBottom: 'var(--spacing-md)' }}>
                            PanchaGavya Store was founded with a vision to revive the ancient Indian tradition of using cow-based products for agriculture, health, and spiritual well-being. Panchagavya, meaning &quot;five cow products&quot; (milk, curd, ghee, urine, and dung), has been mentioned in our ancient scriptures for thousands of years.
                        </p>
                        <p style={{ lineHeight: 1.8, marginBottom: 'var(--spacing-md)' }}>
                            We work directly with certified Gaushalas (cow sanctuaries) that follow traditional practices and maintain indigenous A2 cow breeds. Our products are made using time-tested Ayurvedic formulations combined with modern quality control standards.
                        </p>
                        <p style={{ lineHeight: 1.8 }}>
                            Every product we offer is certified organic, ensuring that you receive only the purest and most effective Panchagavya products.
                        </p>
                    </div>
                    <div style={{
                        background: 'var(--color-surface)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-2xl)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img
                            src="/images/cow-illustration.png"
                            alt="Sacred Cow - Panchagavya Wellness"
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                height: 'auto',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                    </div>
                </div>

                {/* Our Mission */}
                <div className="card" style={{
                    background: 'linear-gradient(135deg, var(--color-green-medium), var(--color-green-dark))',
                    color: 'white',
                    padding: 'var(--spacing-3xl)',
                    marginBottom: 'var(--spacing-3xl)',
                    textAlign: 'center'
                }}>
                    <h2 style={{ color: 'white', marginBottom: 'var(--spacing-lg)' }}>Our Mission</h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '900px', margin: '0 auto' }}>
                        To promote sustainable living through authentic Panchagavya products, support traditional Gaushalas,
                        educate people about organic farming and natural wellness, and contribute to environmental conservation
                        by reducing chemical dependency in agriculture and daily life.
                    </p>
                </div>

                {/* Certifications */}
                <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
                    <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>Our Certifications</h2>
                    <div className="grid grid-4">
                        <div className="card text-center">
                            <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>✓</div>
                            <h4>FSSAI</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                License No: XXXXXXXXXXXXX
                            </p>
                            <p style={{ fontSize: '0.85rem', marginTop: 'var(--spacing-sm)' }}>
                                All food products comply with Indian food safety standards
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🌿</div>
                            <h4>NPOP Certified</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                National Programme for Organic Production
                            </p>
                            <p style={{ fontSize: '0.85rem', marginTop: 'var(--spacing-sm)' }}>
                                100% organic certification for agricultural products
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🇮🇳</div>
                            <h4>Jaivik Bharat</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                Government of India
                            </p>
                            <p style={{ fontSize: '0.85rem', marginTop: 'var(--spacing-sm)' }}>
                                Organic certification under PGS-India
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>📜</div>
                            <h4>AYUSH License</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                License No: XXXXXXXXXXXXX
                            </p>
                            <p style={{ fontSize: '0.85rem', marginTop: 'var(--spacing-sm)' }}>
                                Authorized to manufacture Ayurvedic products
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Values */}
                <div>
                    <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>Our Core Values</h2>
                    <div className="grid grid-3">
                        <div className="card">
                            <h4>🌍 Sustainability</h4>
                            <p>We are committed to environmental conservation and promoting chemical-free agriculture and lifestyle.</p>
                        </div>

                        <div className="card">
                            <h4>💎 Authenticity</h4>
                            <p>All products are made using traditional methods with certified organic ingredients from indigenous cows.</p>
                        </div>

                        <div className="card">
                            <h4>🔬 Quality</h4>
                            <p>Rigorous quality control ensures every product meets the highest standards of purity and effectiveness.</p>
                        </div>

                        <div className="card">
                            <h4>📚 Education</h4>
                            <p>We empower our customers with knowledge about proper usage and benefits of Panchagavya products.</p>
                        </div>

                        <div className="card">
                            <h4>🤝 Community</h4>
                            <p>Supporting Gaushalas and organic farmers helps preserve traditional practices and rural livelihoods.</p>
                        </div>

                        <div className="card">
                            <h4>💚 Wellness</h4>
                            <p>Promoting holistic health through natural, Ayurvedic products that nourish body, mind, and spirit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
