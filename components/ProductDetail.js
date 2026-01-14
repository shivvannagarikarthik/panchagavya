'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetail({ product }) {
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState('description');
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        alert(`${quantity} ${product.name} added to cart!`);
    };

    return (
        <div className="section" style={{ paddingTop: 'calc(var(--spacing-3xl) + 2rem)' }}>
            <div className="container">
                {/* Back Button */}
                <Link href="/" className="btn btn-outline" style={{ marginBottom: 'var(--spacing-xl)', display: 'inline-block' }}>
                    ← Back to Products
                </Link>

                <div className="grid grid-2" style={{ gap: 'var(--spacing-3xl)' }}>
                    {/* Product Image */}
                    <div style={{
                        position: 'relative',
                        aspectRatio: '1',
                        background: 'var(--color-surface)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        ) : (
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10rem'
                            }}>🌿</div>
                        )}
                        {product.category && (
                            <span className="badge" style={{
                                position: 'absolute',
                                top: 'var(--spacing-md)',
                                left: 'var(--spacing-md)',
                                fontSize: '1rem',
                                padding: 'var(--spacing-sm) var(--spacing-md)'
                            }}>
                                {product.category}
                            </span>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>{product.name}</h1>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: 'var(--color-green-dark)',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            ₹{product.price}
                        </div>

                        {/* Stock Status */}
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            {product.inStock ? (
                                <span style={{ color: 'var(--color-green-medium)', fontWeight: 600 }}>✓ In Stock</span>
                            ) : (
                                <span style={{ color: '#d32f2f', fontWeight: 600 }}>Out of Stock</span>
                            )}
                        </div>

                        {/* Add to Cart */}
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 'var(--radius-md)' }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ padding: 'var(--spacing-sm) var(--spacing-md)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                >−</button>
                                <span style={{ padding: '0 var(--spacing-md)', fontWeight: 'bold' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ padding: 'var(--spacing-sm) var(--spacing-md)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                >+</button>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                style={{ flex: 1, fontSize: '1.1rem' }}
                            >
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>

                        {/* Tabs */}
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: 'var(--spacing-lg)' }}>
                                {['description', 'benefits', 'usage'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        style={{
                                            padding: 'var(--spacing-md) var(--spacing-xl)',
                                            background: 'none',
                                            border: 'none',
                                            borderBottom: activeTab === tab ? '2px solid var(--color-green-dark)' : '2px solid transparent',
                                            color: activeTab === tab ? 'var(--color-green-dark)' : 'var(--color-text-light)',
                                            fontWeight: activeTab === tab ? 600 : 400,
                                            cursor: 'pointer',
                                            textTransform: 'capitalize',
                                            marginBottom: '-2px'
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div style={{ lineHeight: 1.6 }}>
                                {activeTab === 'description' && (
                                    <p>{product.description}</p>
                                )}
                                {activeTab === 'benefits' && (
                                    <ul style={{ paddingLeft: '20px' }}>
                                        {product.benefits && product.benefits.map((benefit, index) => (
                                            <li key={index} style={{ marginBottom: '8px' }}>{benefit}</li>
                                        ))}
                                    </ul>
                                )}
                                {activeTab === 'usage' && (
                                    <div style={{ whiteSpace: 'pre-line' }}>
                                        {product.usage || "No specific usage instructions available."}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Certifications */}
                        {product.certifications && product.certifications.length > 0 && (
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Certifications</h4>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                                    {product.certifications.map(cert => (
                                        <span key={cert} className="badge">✓ {cert}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
