'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }

        // Basic admin check - in a real app, this would check a 'role' field in Firestore
        if (!loading && adminOnly && user && user.email !== 'karthik2942001@gmail.com') {
            router.push('/');
        }
    }, [user, loading, router, adminOnly]);

    if (loading || (!user && !loading)) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div className="loader"></div>
                <p>Verifying authentication...</p>
            </div>
        );
    }

    return (user ? children : null);
};

export default ProtectedRoute;
