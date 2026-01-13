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

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [allProducts, setAllProducts] = useState(staticProducts);
    const [displayedProducts, setDisplayedProducts] = useState(staticProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const firestoreProducts = await getProductsFirestore();
            if (firestoreProducts.length > 0) {
                setAllProducts(firestoreProducts);
                setDisplayedProducts(firestoreProducts);
            }
            setIsLoading(false);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
            const filtered = categoryParam === 'all'
                ? allProducts
                : allProducts.filter(p => p.category === categoryParam);
            setDisplayedProducts(filtered);
        }
    }, [categoryParam, allProducts]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchQuery('');
        setDisplayedProducts(getProductsByCategory(category));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setDisplayedProducts(getProductsByCategory(selectedCategory));
        } else {
            const results = searchProducts(query);
            setDisplayedProducts(
                selectedCategory === 'all'
                    ? results
                    : results.filter(p => p.category === selectedCategory)
            );
        }
    };

    return (
        <div className="section">
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
                    selectedCategory={selectedCategory}
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
