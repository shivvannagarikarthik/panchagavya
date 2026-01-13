'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, getCartTotal, getTaxAmount, getGrandTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="section">
                <div className="container text-center">
                    <div style={{ fontSize: '5rem', marginBottom: 'var(--spacing-lg)' }}>🛒</div>
                    <h2>Your Cart is Empty</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', marginBottom: 'var(--spacing-xl)' }}>
                        Add some products to get started!
                    </p>
                    <Link href="/products" className="btn btn-primary" style={{ fontSize: '1.1rem' }}>
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container">
                <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Shopping Cart</h1>

                <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
                    {/* Cart Items */}
                    <div>
                        {cart.map(item => (
                            <div key={item.id} className="card" style={{
                                marginBottom: 'var(--spacing-md)',
                                display: 'flex',
                                gap: 'var(--spacing-lg)',
                                alignItems: 'center'
                            }}>
                                {/* Product Image */}
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'var(--color-surface)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    flexShrink: 0
                                }}>
                                    🌿
                                </div>

                                {/* Product Info */}
                                <div style={{ flex: 1 }}>
                                    <Link href={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>{item.name}</h4>
                                    </Link>
                                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)' }}>
                                        {item.category}
                                    </p>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-green-dark)' }}>
                                        ₹{item.price}
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: '0.9rem' }}
                                        >
                                            -
                                        </button>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 600, minWidth: '30px', textAlign: 'center' }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', fontSize: '0.9rem' }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="btn btn-ghost"
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ color: '#d32f2f', fontSize: '0.9rem', padding: 'var(--spacing-xs) var(--spacing-sm)' }}
                                    >
                                        🗑️ Remove
                                    </button>
                                </div>

                                {/* Item Total */}
                                <div style={{ fontWeight: 'bold', fontSize: '1.25rem', minWidth: '100px', textAlign: 'right' }}>
                                    ₹{item.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="card" style={{ position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Order Summary</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                            <span>Subtotal:</span>
                            <span style={{ fontWeight: 600 }}>₹{getCartTotal()}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                            <span>GST (5%):</span>
                            <span style={{ fontWeight: 600 }}>₹{getTaxAmount().toFixed(2)}</span>
                        </div>

                        <div style={{
                            borderTop: '2px solid var(--color-border)',
                            paddingTop: 'var(--spacing-md)',
                            marginTop: 'var(--spacing-md)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '1.25rem',
                            fontWeight: 'bold'
                        }}>
                            <span>Total:</span>
                            <span style={{ color: 'var(--color-green-dark)' }}>₹{getGrandTotal().toFixed(2)}</span>
                        </div>

                        <Link
                            href="/checkout"
                            className="btn btn-primary w-full"
                            style={{
                                marginTop: 'var(--spacing-lg)',
                                fontSize: '1.1rem',
                                padding: 'var(--spacing-md)',
                                justifyContent: 'center'
                            }}
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            href="/products"
                            className="btn btn-outline w-full"
                            style={{
                                marginTop: 'var(--spacing-md)',
                                fontSize: '1rem',
                                padding: 'var(--spacing-sm)',
                                justifyContent: 'center'
                            }}
                        >
                            Continue Shopping
                        </Link>

                        {/* Trust Indicators */}
                        <div style={{
                            marginTop: 'var(--spacing-lg)',
                            padding: 'var(--spacing-md)',
                            background: 'var(--color-surface)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.85rem'
                        }}>
                            <p style={{ marginBottom: 'var(--spacing-sm)' }}>✓ Secure Checkout</p>
                            <p style={{ marginBottom: 'var(--spacing-sm)' }}>✓ Free Shipping above ₹999</p>
                            <p>✓ Easy Returns within 7 days</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
