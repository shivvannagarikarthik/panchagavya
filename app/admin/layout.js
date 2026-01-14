'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const normalizedPath = pathname.replace(/\/$/, '');

    useEffect(() => {
        if (!loading && !user && normalizedPath !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [user, loading, normalizedPath, router]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/admin/login');
        } catch (err) {
            console.error('Failed to log out', err);
        }
    };

    if (loading) {
        return (
            <div className="section">
                <div className="container text-center">
                    <p>Loading Admin Portal...</p>
                </div>
            </div>
        );
    }

    // If we're on the login page, just show the login page content
    if (normalizedPath === '/admin/login') {
        return <>{children}</>;
    }

    if (!user && pathname !== '/admin/login') {
        return null;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: 'var(--color-green-dark)',
                color: 'white',
                padding: 'var(--spacing-xl)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh'
            }}>
                <div style={{ marginBottom: 'var(--spacing-3xl)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 'var(--spacing-lg)' }}>
                    <h3 style={{ color: 'white', margin: 0 }}>Admin Portal</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: 'var(--spacing-xs)' }}>PanchaGavya Store</p>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <Link href="/admin" style={{
                                display: 'block',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                textDecoration: 'none',
                                background: pathname === '/admin' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                fontWeight: pathname === '/admin' ? '600' : '400'
                            }}>
                                📊 Dashboard
                            </Link>
                        </li>
                        <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <Link href="/admin/products" style={{
                                display: 'block',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                textDecoration: 'none',
                                background: pathname.includes('/admin/products') ? 'rgba(255,255,255,0.1)' : 'transparent',
                                fontWeight: pathname.includes('/admin/products') ? '600' : '400'
                            }}>
                                📦 Products
                            </Link>
                        </li>
                        <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <Link href="/admin/content" style={{
                                display: 'block',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                textDecoration: 'none',
                                background: pathname.includes('/admin/content') ? 'rgba(255,255,255,0.1)' : 'transparent',
                                fontWeight: pathname.includes('/admin/content') ? '600' : '400'
                            }}>
                                📚 Educational Content
                            </Link>
                        </li>
                        <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <Link href="/admin/orders" style={{
                                display: 'block',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                textDecoration: 'none',
                                background: pathname.includes('/admin/orders') ? 'rgba(255,255,255,0.1)' : 'transparent',
                                fontWeight: pathname.includes('/admin/orders') ? '600' : '400'
                            }}>
                                🛒 Orders
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--spacing-lg)' }}>
                    <div style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.85rem', opacity: 0.8 }}>
                        Logged in as: <br />
                        <strong>{user?.email || 'Setup Mode'}</strong>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline"
                        style={{ width: '100%', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: '260px', padding: 'var(--spacing-3xl)' }}>
                {children}
            </main>
        </div>
    );
}
