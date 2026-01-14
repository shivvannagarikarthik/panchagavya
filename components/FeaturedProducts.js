'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { products as staticProducts } from '@/lib/products';

export default function FeaturedProducts() {
    const [products, setProducts] = useState(staticProducts.slice(0, 6)); // Initial static fallback
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                // Fetch up to 6 products
                const q = query(collection(db, 'products'), limit(6));
                // Note: Real "Featured" logic might need an 'isFeatured' flag in DB.
                // For now, just taking the first 6 documents.

                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    const productsData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setProducts(productsData);
                }
            } catch (error) {
                console.error("Error fetching featured products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading featured products...</div>;

    return (
        <div className="grid grid-3">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
