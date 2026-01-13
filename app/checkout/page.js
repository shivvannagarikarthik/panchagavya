'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, getCartTotal, getTaxAmount, getGrandTotal, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    if (cart.length === 0) {
        return (
            <div className="section">
                <div className="container text-center">
                    <h2>No items in cart</h2>
                    <p>Please add items before checkout.</p>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
        const isValid = requiredFields.every(field => formData[field].trim() !== '');

        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }

        // Mock order placement
        alert(`Order placed successfully! 🎉\n\nTotal: ₹${getGrandTotal().toFixed(2)}\nPayment Method: ${paymentMethod.toUpperCase()}\n\nThank you for your order!`);

        // Clear cart and redirect
        clearCart();
        router.push('/');
    };

    return (
        <div className="section">
            <div className="container">
                <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Checkout</h1>

                <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
                    {/* Checkout Form */}
                    <div>
                        <form onSubmit={handleSubmit}>
                            {/* Shipping Information */}
                            <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Shipping Information</h3>

                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <label className="label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="input"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                    <div>
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
                                    <div>
                                        <label className="label">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="input"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <label className="label">Address *</label>
                                    <textarea
                                        name="address"
                                        className="input textarea"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)' }}>
                                    <div>
                                        <label className="label">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="input"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="label">State *</label>
                                        <input
                                            type="text"
                                            name="state"
                                            className="input"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Pincode *</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            className="input"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Payment Method</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 'var(--spacing-md)',
                                        border: `2px solid ${paymentMethod === 'upi' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-fast)'
                                    }}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="upi"
                                            checked={paymentMethod === 'upi'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            style={{ marginRight: 'var(--spacing-sm)' }}
                                        />
                                        <span style={{ fontWeight: 500 }}>💳 UPI (Google Pay, PhonePe, Paytm)</span>
                                    </label>

                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 'var(--spacing-md)',
                                        border: `2px solid ${paymentMethod === 'card' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-fast)'
                                    }}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            style={{ marginRight: 'var(--spacing-sm)' }}
                                        />
                                        <span style={{ fontWeight: 500 }}>💳 Credit/Debit Card</span>
                                    </label>

                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 'var(--spacing-md)',
                                        border: `2px solid ${paymentMethod === 'cod' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-fast)'
                                    }}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            style={{ marginRight: 'var(--spacing-sm)' }}
                                        />
                                        <span style={{ fontWeight: 500 }}>💵 Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full" style={{
                                fontSize: '1.2rem',
                                padding: 'var(--spacing-md)'
                            }}>
                                Place Order - ₹{getGrandTotal().toFixed(2)}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="card" style={{ position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Order Summary</h3>

                            {/* Items */}
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                {cart.map(item => (
                                    <div key={item.id} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: 'var(--spacing-sm)',
                                        paddingBottom: 'var(--spacing-sm)',
                                        borderBottom: '1px solid var(--color-border)'
                                    }}>
                                        <span style={{ fontSize: '0.9rem' }}>
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
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
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '1.25rem',
                                fontWeight: 'bold'
                            }}>
                                <span>Total:</span>
                                <span style={{ color: 'var(--color-green-dark)' }}>₹{getGrandTotal().toFixed(2)}</span>
                            </div>

                            <div style={{
                                marginTop: 'var(--spacing-lg)',
                                padding: 'var(--spacing-md)',
                                background: 'var(--color-surface)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.85rem'
                            }}>
                                <p style={{ marginBottom: 'var(--spacing-sm)' }}>✓ Secure Payment</p>
                                <p style={{ marginBottom: 'var(--spacing-sm)' }}>✓ Estimated Delivery: 5-7 days</p>
                                <p>✓ 100% Authentic Products</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
