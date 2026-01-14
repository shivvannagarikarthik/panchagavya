'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { getProductByIdFirestore } from '@/lib/products';

export default function ProductDetailClient({ product: initialProduct }) {
    const { addToCart } = useCart();
    const [product, setProduct] = useState(initialProduct);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (initialProduct?.id) {
                setIsLoading(true);
                const firestoreProduct = await getProductByIdFirestore(initialProduct.id);
                if (firestoreProduct) {
                    setProduct(firestoreProduct);
                }
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [initialProduct]);

    if (!product) {
        return (
            <div className="section">
                <div className="container text-center">
                    <h1>Product Not Found</h1>
                    <p>The product you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/products" className="btn btn-primary mt-3">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="section">
            <div className="container">
                {/* Breadcrumb */}
                <div style={{ marginBottom: 'var(--spacing-lg)', fontSize: '0.9rem' }}>
                    <Link href="/" style={{ color: 'var(--color-text-light)' }}>Home</Link>
                    {' > '}
                    <Link href="/products" style={{ color: 'var(--color-text-light)' }}>Products</Link>
                    {' > '}
                    <span style={{ color: 'var(--color-text)' }}>{product.name}</span>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)' }}>
                    {/* Product Image */}
                    <div>
                        <div className="card" style={{
                            height: '400px',
                            position: 'relative',
                            overflow: 'hidden',
                            background: 'var(--color-surface)'
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
                                    fontSize: '8rem'
                                }}>🌿</div>
                            )}
                        </div>

                        {/* Certifications */}
                        <div style={{ marginTop: 'var(--spacing-lg)' }}>
                            <h5>Certifications:</h5>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginTop: 'var(--spacing-sm)' }}>
                                {product.certifications.map(cert => (
                                    <span key={cert} className="badge badge-success">
                                        ✓ {cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <span className="badge" style={{ marginBottom: 'var(--spacing-sm)' }}>
                            {product.category}
                        </span>
                        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>{product.name}</h1>

                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: 'var(--color-green-dark)',
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            ₹{product.price}
                            <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--color-text-light)', marginLeft: 'var(--spacing-sm)' }}>
                                (Inclusive of all taxes)
                            </span>
                        </div>

                        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 'var(--spacing-lg)' }}>
                            {product.description}
                        </p>

                        {/* Stock Status */}
                        {product.inStock ? (
                            <p style={{ color: 'var(--color-green-medium)', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>
                                ✓ In Stock - Ships within 2-3 business days
                            </p>
                        ) : (
                            <p style={{ color: '#d32f2f', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>
                                Currently Out of Stock
                            </p>
                        )}

                        {/* Quantity Selector */}
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="label">Quantity:</label>
                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}
                                >
                                    -
                                </button>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600, minWidth: '40px', textAlign: 'center' }}>
                                    {quantity}
                                </span>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ padding: 'var(--spacing-sm) var(--spacing-md)' }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                style={{
                                    flex: 1,
                                    fontSize: '1.1rem',
                                    padding: 'var(--spacing-md) var(--spacing-xl)',
                                    opacity: !product.inStock ? 0.6 : 1
                                }}
                            >
                                {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                            </button>
                            <Link
                                href="/cart"
                                className="btn btn-secondary"
                                style={{
                                    fontSize: '1.1rem',
                                    padding: 'var(--spacing-md) var(--spacing-xl)'
                                }}
                            >
                                View Cart
                            </Link>
                        </div>

                        {/* Benefits */}
                        <div className="card" style={{ background: 'var(--color-surface)', marginBottom: 'var(--spacing-lg)' }}>
                            <h4>Key Benefits:</h4>
                            <ul style={{ marginTop: 'var(--spacing-md)', paddingLeft: 'var(--spacing-lg)' }}>
                                {product.benefits.map((benefit, index) => (
                                    <li key={index} style={{ marginBottom: 'var(--spacing-sm)', lineHeight: 1.6 }}>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Usage Instructions */}
                        <div className="card">
                            <h4>Usage Instructions:</h4>
                            <p style={{ marginTop: 'var(--spacing-md)', lineHeight: 1.7 }}>
                                {product.usage}
                            </p>
                            {product.dilutionRatio !== 'N/A' && (
                                <p style={{
                                    marginTop: 'var(--spacing-md)',
                                    padding: 'var(--spacing-md)',
                                    background: 'var(--color-surface)',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: 600
                                }}>
                                    📊 Dilution Ratio: {product.dilutionRatio}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
