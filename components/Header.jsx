'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getCartItemCount } = useCart();
    const cartCount = getCartItemCount();

    return (
        <header style={{
            background: 'linear-gradient(135deg, var(--color-green-dark), var(--color-green-medium))',
            color: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: 'var(--shadow-lg)'
        }}>
            <div className="container" style={{ padding: 'var(--spacing-md) var(--spacing-lg)' }}>
                <nav className="flex-between">
                    {/* Logo */}
                    <Link href="/" style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'white',
                        fontFamily: 'Playfair Display, serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)'
                    }}>
                        <span style={{ fontSize: '2rem' }}>🌿</span>
                        PanchaGavya Store
                    </Link>

                    {/* Desktop Navigation */}
                    <div style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }} className="desktop-nav">
                        <Link href="/" style={{ color: 'white', fontWeight: 500, transition: 'opacity var(--transition-fast)' }}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}>
                            Home
                        </Link>
                        <Link href="/products" style={{ color: 'white', fontWeight: 500, transition: 'opacity var(--transition-fast)' }}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}>
                            Products
                        </Link>
                        <Link href="/learn" style={{ color: 'white', fontWeight: 500, transition: 'opacity var(--transition-fast)' }}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}>
                            Learn
                        </Link>
                        <Link href="/about" style={{ color: 'white', fontWeight: 500, transition: 'opacity var(--transition-fast)' }}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}>
                            About
                        </Link>
                        <Link href="/contact" style={{ color: 'white', fontWeight: 500, transition: 'opacity var(--transition-fast)' }}
                            onMouseOver={(e) => e.target.style.opacity = '0.8'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}>
                            Contact
                        </Link>

                        {/* Cart Icon */}
                        <Link href="/cart" style={{
                            position: 'relative',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-xs)',
                            transition: 'all var(--transition-fast)'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}>
                            🛒 Cart
                            {cartCount > 0 && (
                                <span style={{
                                    background: 'var(--color-accent)',
                                    color: 'white',
                                    borderRadius: 'var(--radius-full)',
                                    padding: '2px 8px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            display: 'none',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="mobile-nav" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-md)',
                        marginTop: 'var(--spacing-lg)',
                        paddingTop: 'var(--spacing-lg)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <Link href="/" style={{ color: 'white', fontWeight: 500 }} onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link href="/products" style={{ color: 'white', fontWeight: 500 }} onClick={() => setMobileMenuOpen(false)}>Products</Link>
                        <Link href="/learn" style={{ color: 'white', fontWeight: 500 }} onClick={() => setMobileMenuOpen(false)}>Learn</Link>
                        <Link href="/about" style={{ color: 'white', fontWeight: 500 }} onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link href="/contact" style={{ color: 'white', fontWeight: 500 }} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                    </div>
                )}
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
        </header>
    );
}
