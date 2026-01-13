'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/admin');
        } catch (err) {
            console.error(err);
            setError('Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section" style={{ background: 'var(--color-surface)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '450px' }}>
                <div className="card" style={{ padding: 'var(--spacing-3xl)', boxShadow: 'var(--shadow-lg)' }}>
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <span style={{ fontSize: '3rem' }}>🌿</span>
                        <h2 style={{ marginTop: 'var(--spacing-md)' }}>Admin Portal</h2>
                        <p style={{ color: 'var(--color-text-light)' }}>Sign in to manage your store</p>
                    </div>

                    {error && (
                        <div style={{
                            background: '#ffebee',
                            color: '#c62828',
                            padding: 'var(--spacing-md)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: 'var(--spacing-lg)',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="label">Email Address</label>
                            <input
                                type="email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="text-center" style={{ marginTop: 'var(--spacing-lg)' }}>
                        <Link href="/" style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                            ← Return to Storefront
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
