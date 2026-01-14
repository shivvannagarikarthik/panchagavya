'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { products as staticProducts, categories, getProductsByCategory, searchProducts, getProductsFirestore } from '@/lib/products';

export default function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const effectiveCategory = categoryParam || 'all';

    const [allProducts, setAllProducts] = useState(staticProducts);
    const [displayedProducts, setDisplayedProducts] = useState(staticProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setAllProducts(staticProducts);
            setIsLoading(false);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = effectiveCategory === 'all'
            ? allProducts
            : allProducts.filter(p => p.category === effectiveCategory);
        setDisplayedProducts(filtered);
    }, [effectiveCategory, allProducts]);

    const handleCategoryChange = (category) => {
        setSearchQuery('');
        // Update URL instead of just local state
        const params = new URLSearchParams(window.location.search);
        params.set('category', category);
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        const filtered = category === 'all'
            ? allProducts
            : allProducts.filter(p => p.category === category);
        setDisplayedProducts(filtered);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            const filtered = effectiveCategory === 'all'
                ? allProducts
                : allProducts.filter(p => p.category === effectiveCategory);
            setDisplayedProducts(filtered);
        } else {
            const results = searchProducts(query);
            setDisplayedProducts(
                effectiveCategory === 'all'
                    ? results
                    : results.filter(p => p.category === effectiveCategory)
            );
        }
    };

    return (
        <div className="section" style={{ paddingTop: 'calc(var(--spacing-3xl) + 2rem)' }}>
            <div className="container">
                {/* Header */}
                <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h1>Our Products</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', maxWidth: '700px', margin: '0 auto' }}>
                        Browse our complete range of authentic Panchagavya-based organic products
                    </p>
                </div>

                {/* Search */}
                <SearchBar onSearch={handleSearch} placeholder="Search products by name, category, or description..." />

                {/* Category Filter */}
                <CategoryFilter
                    selectedCategory={effectiveCategory}
                    onCategoryChange={handleCategoryChange}
                    categories={categories}
                />

                {/* Products Grid */}
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
