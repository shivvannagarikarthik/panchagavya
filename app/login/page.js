'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, googleSignIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            router.push('/');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/user-not-found') {
                setError('No account found with this email. Please sign up first.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else {
                setError(err.message || 'Failed to login. Please check your credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            await googleSignIn();
            router.push('/');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Login popup was closed before finishing. Please try again.');
            } else if (err.code === 'auth/unauthorized-domain') {
                setError('This domain is not authorized in Firebase. Please add your domain to the Firebase Console.');
            } else {
                setError(err.message || 'Failed to sign in with Google.');
            }
        }
    };

    return (
        <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '450px' }}>
                <div className="card" style={{ padding: 'var(--spacing-2xl)', boxShadow: 'var(--shadow-lg)' }}>
                    <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <span style={{ fontSize: '3rem' }}>🌿</span>
                        <h1 style={{ marginTop: 'var(--spacing-md)' }}>Login</h1>
                        <p style={{ color: 'var(--color-text-light)' }}>Welcome back to PanchaGavya Store</p>
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

                        <div className="form-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
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

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div style={{ position: 'relative', textAlign: 'center', margin: 'var(--spacing-xl) 0' }}>
                        <hr style={{ border: '0', borderTop: '1px solid var(--color-surface)', margin: '0' }} />
                        <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            background: 'white',
                            padding: '0 var(--spacing-md)',
                            fontSize: '0.8rem',
                            color: 'var(--color-text-light)'
                        }}>
                            OR
                        </span>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-secondary"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--spacing-md)',
                            background: 'white',
                            color: 'var(--color-text)',
                            border: '1px solid var(--color-surface)'
                        }}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                        Sign in with Google
                    </button>

                    <div className="text-center" style={{ marginTop: 'var(--spacing-xl)', fontSize: '0.9rem' }}>
                        Don&apos;t have an account? <Link href="/signup" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
