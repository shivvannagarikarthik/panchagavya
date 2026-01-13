'use client';

import { useState } from 'react';
import { products } from '@/lib/products';
import { usageGuides, benefitsLibrary, faqs } from '@/lib/educational-content';
const educationalContent = { usageGuides, benefits: benefitsLibrary, faqs };
import { migrateData } from '@/lib/migrateData';
import Link from 'next/link';

export default function AdminDashboard() {
    const [migrating, setMigrating] = useState(false);
    const [message, setMessage] = useState('');

    const handleMigrate = async () => {
        if (confirm('This will upload all current local products and articles to your live Firebase database. Continue?')) {
            setMigrating(true);
            setMessage('Migrating data...');
            const result = await migrateData();
            if (result.success) {
                setMessage('✅ Data migrated successfully!');
            } else {
                setMessage('❌ Error: ' + result.error);
            }
            setMigrating(false);
        }
    };

    const stats = [
        { label: 'Total Products', value: products.length, icon: '📦', link: '/admin/products' },
        { label: 'Educational Articles', value: educationalContent.usageGuides.length + educationalContent.benefits.length + educationalContent.faqs.length, icon: '📚', link: '/admin/content' },
        { label: 'Recent Orders', value: 0, icon: '🛒', link: '/admin/orders' },
        { label: 'Active Users', value: 1, icon: '👤', link: '#' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                <h1>Dashboard Overview</h1>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <button
                        onClick={handleMigrate}
                        className="btn btn-outline"
                        disabled={migrating}
                        style={{ borderColor: 'var(--color-green-medium)', color: 'var(--color-green-medium)' }}
                    >
                        {migrating ? 'Migrating...' : '🚀 Connect to Live Data'}
                    </button>
                    <Link href="/" className="btn btn-outline">View Storefront</Link>
                </div>
            </div>

            {message && (
                <div className="card" style={{
                    padding: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-xl)',
                    background: message.includes('✅') ? '#e8f5e9' : '#ffebee',
                    textAlign: 'center',
                    fontWeight: 600
                }}>
                    {message}
                </div>
            )}

            <div className="grid grid-4" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>{stat.icon}</div>
                        <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{stat.value}</h2>
                        <p style={{ color: 'var(--color-text-light)', marginTop: 'var(--spacing-xs)' }}>{stat.label}</p>
                        <Link href={stat.link} style={{ fontSize: '0.85rem', color: 'var(--color-green-medium)', textDecoration: 'none', display: 'block', marginTop: 'var(--spacing-md)' }}>
                            Manage →
                        </Link>
                    </div>
                ))}
            </div>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Activity</h3>
                    <div style={{ color: 'var(--color-text-light)', padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                        No recent activity to show.
                    </div>
                </div>

                <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>System Status</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md) 0', borderBottom: '1px solid #eee' }}>
                            <span>Firebase Auth</span>
                            <span style={{ color: 'var(--color-green-medium)', fontWeight: 600 }}>Connected</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md) 0', borderBottom: '1px solid #eee' }}>
                            <span>Firestore DB</span>
                            <span style={{ color: 'var(--color-green-medium)', fontWeight: 600 }}>Connected</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-md) 0' }}>
                            <span>Hosting</span>
                            <span style={{ color: 'var(--color-green-medium)', fontWeight: 600 }}>Live</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
