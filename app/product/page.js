'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductDetail from '@/components/ProductDetail';
import { products as staticProducts } from '@/lib/products';

function ProductViewContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            // setError("No product ID provided");
            // setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                // Try fetching from Firestore first
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    // Fallback to static if not found (e.g. if using static IDs)
                    const staticMatch = staticProducts.find(p => p.id.toString() === id);
                    if (staticMatch) {
                        setProduct(staticMatch);
                    } else {
                        setError("Product not found");
                    }
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                // Fallback to static on error
                const staticMatch = staticProducts.find(p => p.id.toString() === id);
                if (staticMatch) {
                    setProduct(staticMatch);
                } else {
                    setError("Error loading product");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading product details...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>{error}</div>;

    return <ProductDetail product={product} />;
}

export default function ProductViewPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>}>
            <ProductViewContent />
        </Suspense>
    );
}
