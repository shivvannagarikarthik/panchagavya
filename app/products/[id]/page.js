import { getProductById, products } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default function ProductPage({ params }) {
    const product = getProductById(params.id);
    return <ProductDetailClient product={product} />;
}
