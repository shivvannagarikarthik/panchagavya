'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getCartItemCount } = useCart();
    const { user, logout } = useAuth();
    const cartCount = getCartItemCount();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

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

                        {/* User Section */}
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-xs)',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9rem'
                                }}>
                                    <span>👤</span>
                                    <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {user.displayName || user.email.split('@')[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid rgba(255, 255, 255, 0.4)',
                                        color: 'white',
                                        padding: 'var(--spacing-sm) var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        transition: 'all var(--transition-fast)'
                                    }}
                                    onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                                    onMouseOut={(e) => e.target.style.background = 'transparent'}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" style={{
                                color: 'white',
                                fontWeight: 600,
                                background: 'var(--color-accent)',
                                padding: 'var(--spacing-sm) var(--spacing-xl)',
                                borderRadius: 'var(--radius-md)',
                                transition: 'transform var(--transition-fast)'
                            }}
                                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
                                Login
                            </Link>
                        )}
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

                        <div style={{ marginTop: 'var(--spacing-sm)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            {user ? (
                                <>
                                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)' }}>
                                        Logged in as {user.email}
                                    </div>
                                    <button
                                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                        style={{ background: 'none', border: 'none', color: 'white', fontWeight: 600, textAlign: 'left', padding: 0 }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" style={{ color: 'white', fontWeight: 600 }} onClick={() => setMobileMenuOpen(false)}>Login</Link>
                            )}
                        </div>
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
