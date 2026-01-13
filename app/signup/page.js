'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        try {
            await signup(email, password);
            router.push('/');
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '450px' }}>
                <div className="card" style={{ padding: 'var(--spacing-2xl)', boxShadow: 'var(--shadow-lg)' }}>
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <span style={{ fontSize: '3rem' }}>🌱</span>
                        <h1 style={{ marginTop: 'var(--spacing-md)' }}>Create Account</h1>
                        <p style={{ color: 'var(--color-text-light)' }}>Join the PanchaGavya community</p>
                    </div>

                    {error && (
                        <div style={{
                            padding: 'var(--spacing-md)',
                            background: '#ffebee',
                            color: '#c62828',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: 'var(--spacing-lg)',
                            fontSize: '0.9rem',
                            borderLeft: '4px solid #c62828'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="label">Email Address</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <label className="label">Confirm Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="text-center" style={{ marginTop: 'var(--spacing-xl)', fontSize: '0.9rem' }}>
                        Already have an account? <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
