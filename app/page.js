import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function Home() {
  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--color-green-dark) 0%, var(--color-green-medium) 100%)',
        color: 'white',
        padding: 'var(--spacing-3xl) 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              color: 'white',
              fontSize: '3.5rem',
              marginBottom: 'var(--spacing-lg)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              Embrace Nature's Wisdom with Panchagavya
            </h1>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: 'var(--spacing-xl)',
              opacity: 0.95,
              lineHeight: 1.7
            }}>
              Authentic organic products crafted from five sacred cow products.
              For your farm, home, health, and spirit.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/products" className="btn" style={{
                background: 'white',
                color: 'var(--color-green-dark)',
                fontSize: '1.1rem',
                padding: 'var(--spacing-md) var(--spacing-xl)'
              }}>
                Shop Now
              </Link>
              <Link href="/learn" className="btn" style={{
                background: 'transparent',
                border: '2px solid white',
                color: 'white',
                fontSize: '1.1rem',
                padding: 'var(--spacing-md) var(--spacing-xl)'
              }}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div className="grid grid-4">
            <div className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>✓</div>
              <h4>100% Organic</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                Certified by NPOP & Jaivik Bharat
              </p>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>🌿</div>
              <h4>Natural & Safe</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                No chemicals or synthetic additives
              </p>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>📜</div>
              <h4>FSSAI Approved</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                Meets all food safety standards
              </p>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>🚚</div>
              <h4>Pan-India Delivery</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                Fast & eco-friendly packaging
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            Shop by Category
          </h2>
          <div className="grid grid-4">
            <Link href="/products?category=Agriculture" className="card text-center" style={{
              textDecoration: 'none',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🌾</div>
              <h4 style={{ color: 'var(--color-text)' }}>Agriculture</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                Growth promoters & pest repellents
              </p>
            </Link>

            <Link href="/products?category=Personal Care" className="card text-center" style={{
              textDecoration: 'none',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🧴</div>
              <h4 style={{ color: 'var(--color-text)' }}>Personal Care</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                Natural soaps & skincare
              </p>
            </Link>

            <Link href="/products?category=Wellness" className="card text-center" style={{
              textDecoration: 'none',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>💊</div>
              <h4 style={{ color: 'var(--color-text)' }}>Wellness</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                Ayurvedic health products
              </p>
            </Link>

            <Link href="/products?category=Home & Spiritual" className="card text-center" style={{
              textDecoration: 'none',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🕉️</div>
              <h4 style={{ color: 'var(--color-text)' }}>Home & Spiritual</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                Incense & home care
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-xl)'
          }}>
            <h2>Featured Products</h2>
            <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
              Discover our most popular Panchagavya products
            </p>
          </div>
          <div className="grid grid-3">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <Link href="/products" className="btn btn-primary" style={{
              fontSize: '1.1rem',
              padding: 'var(--spacing-md) var(--spacing-xl)'
            }}>
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Educational CTA */}
      <section className="section">
        <div className="container">
          <div className="card-glass" style={{
            padding: 'var(--spacing-3xl)',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.1), rgba(45, 74, 43, 0.1))',
            borderRadius: 'var(--radius-xl)'
          }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
              New to Panchagavya?
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: 'var(--spacing-xl)',
              maxWidth: '700px',
              margin: '0 auto var(--spacing-xl)'
            }}>
              Learn about usage instructions, dilution ratios, and the scientific benefits
              of Panchagavya products through our comprehensive educational resources.
            </p>
            <Link href="/learn" className="btn btn-primary" style={{
              fontSize: '1.1rem',
              padding: 'var(--spacing-md) var(--spacing-xl)'
            }}>
              Explore Learning Center
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            Why Choose Us?
          </h2>
          <div className="grid grid-3">
            <div className="card">
              <h4>🐄 Authentic Sourcing</h4>
              <p>
                All our products are made from A2 cow products sourced from certified
                Gaushalas (cow sanctuaries) that follow traditional practices.
              </p>
            </div>
            <div className="card">
              <h4>🔬 Quality Assured</h4>
              <p>
                Every batch is tested for purity and potency. We maintain strict quality
                control to ensure you get the best products.
              </p>
            </div>
            <div className="card">
              <h4>📚 Expert Guidance</h4>
              <p>
                Access our knowledge base and consult with Gau-Vaidya (cow experts) and
                Ayurvedic practitioners for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
