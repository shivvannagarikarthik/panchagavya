'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { products as staticProducts, categories, searchProducts } from '@/lib/products';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const effectiveCategory = categoryParam || 'all';

    const [allProducts, setAllProducts] = useState(staticProducts);
    const [displayedProducts, setDisplayedProducts] = useState(staticProducts);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch from Firestore
    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('id', 'asc')); // Try to keep older consistent
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (productsData.length > 0) {
                // Sort by numericId if available
                const sorted = productsData.sort((a, b) => (Number(a.numericId) || 0) - (Number(b.numericId) || 0));
                setAllProducts(sorted);
            }
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching products:", error);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Filter Logic
    useEffect(() => {
        let filtered = [...allProducts];

        if (effectiveCategory !== 'all') {
            filtered = filtered.filter(p => p.category === effectiveCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                (p.description && p.description.toLowerCase().includes(query))
            );
        }

        setDisplayedProducts(filtered);
    }, [effectiveCategory, allProducts, searchQuery]);

    const handleCategoryChange = (category) => {
        setSearchQuery('');
        const params = new URLSearchParams(window.location.search);
        params.set('category', category);
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="section" style={{ paddingTop: 'calc(var(--spacing-3xl) + 2rem)' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h1>Our Products</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', maxWidth: '700px', margin: '0 auto' }}>
                        Browse our complete range of authentic Panchagavya-based organic products
                    </p>
                </div>

                <SearchBar onSearch={handleSearch} placeholder="Search products by name, category, or description..." />

                <CategoryFilter
                    selectedCategory={effectiveCategory}
                    onCategoryChange={handleCategoryChange}
                    categories={categories}
                />

                {isLoading ? (
                    <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>Loading products...</p>
                    </div>
                ) : displayedProducts.length > 0 ? (
                    <div className="grid grid-3">
                        {displayedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                            No products found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
