import { Suspense } from 'react';
import ProductsContent from './ProductsContent';

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="section">
                <div className="container text-center">
                    <p>Loading products...</p>
                </div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
