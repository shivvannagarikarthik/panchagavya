'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        // Optional: Show a toast notification
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="card" style={{
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Product Image */}
            <Link href={`/products/${product.id}`}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    marginBottom: 'var(--spacing-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    cursor: 'pointer'
                }}>
                    {/* Placeholder - will be replaced with actual images */}
                    🌿
                    <div style={{
                        position: 'absolute',
                        top: 'var(--spacing-sm)',
                        right: 'var(--spacing-sm)',
                        background: 'var(--color-green-medium)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                    }}>
                        {product.category}
                    </div>
                </div>
            </Link>

            {/* Product Info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h4 style={{
                        fontSize: '1.1rem',
                        marginBottom: 'var(--spacing-xs)',
                        color: 'var(--color-text)',
                        fontFamily: 'Playfair Display, serif'
                    }}>
                        {product.name}
                    </h4>
                </Link>

                <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-light)',
                    marginBottom: 'var(--spacing-md)',
                    flex: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {product.description}
                </p>

                {/* Certifications */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-xs)',
                    marginBottom: 'var(--spacing-md)',
                    flexWrap: 'wrap'
                }}>
                    {product.certifications.map(cert => (
                        <span key={cert} className="badge" style={{ fontSize: '0.7rem' }}>
                            ✓ {cert}
                        </span>
                    ))}
                </div>

                {/* Price and Actions */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--spacing-md)'
                }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-green-dark)' }}>
                        ₹{product.price}
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <Link href={`/products/${product.id}`} className="btn btn-outline" style={{
                            padding: 'var(--spacing-xs) var(--spacing-md)',
                            fontSize: '0.9rem'
                        }}>
                            View
                        </Link>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                            style={{
                                padding: 'var(--spacing-xs) var(--spacing-md)',
                                fontSize: '0.9rem'
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                {product.inStock ? (
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-green-medium)', marginTop: 'var(--spacing-xs)' }}>
                        ✓ In Stock
                    </p>
                ) : (
                    <p style={{ fontSize: '0.8rem', color: '#d32f2f', marginTop: 'var(--spacing-xs)' }}>
                        Out of Stock
                    </p>
                )}
            </div>
        </div>
    );
}
