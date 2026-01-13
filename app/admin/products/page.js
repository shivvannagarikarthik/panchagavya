'use client';

import { useState } from 'react';
import { products as initialProducts } from '@/lib/products';
import Link from 'next/link';

export default function ProductManager() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
            // TODO: Implement actual Firestore delete
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                <div>
                    <h1>Product Management</h1>
                    <p style={{ color: 'var(--color-text-light)' }}>View, add, edit or delete products in your catalog</p>
                </div>
                <button className="btn btn-primary">+ Add New Product</button>
            </div>

            <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-2xl)' }}>
                <input
                    type="text"
                    className="input"
                    placeholder="Search items by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--color-surface)', textAlign: 'left' }}>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>Product</th>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>Category</th>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>Price</th>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>Stock</th>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                        <span style={{ fontSize: '1.5rem' }}>🌿</span>
                                        <strong>{product.name}</strong>
                                    </div>
                                </td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                                    <span className="badge" style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
                                        {product.category}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>₹{product.price}</td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                                    {product.inStock ? (
                                        <span style={{ color: 'var(--color-green-medium)', fontWeight: 600 }}>In Stock</span>
                                    ) : (
                                        <span style={{ color: '#d32f2f', fontWeight: 600 }}>Out of Stock</span>
                                    )}
                                </td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
                                        <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>Edit</button>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => handleDelete(product.id)}
                                            style={{ padding: '4px 12px', fontSize: '0.85rem', color: '#c62828', borderColor: '#ffcdd2' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div style={{ padding: 'var(--spacing-3xl)', textAlign: 'center', color: 'var(--color-text-light)' }}>
                        No products found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}
