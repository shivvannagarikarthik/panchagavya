'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: 'Agriculture',
        price: '',
        image: '',
        description: '',
        benefits: '', // New line separated
        usage: '',
        inStock: true
    });

    const router = useRouter();

    // Check Admin Auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email === 'karthik2942001@gmail.com') {
                setIsAdmin(true);
            } else {
                // Optional: Redirect if not admin, but ProtectedRoute should handle this globally
                // console.log("Not authorized");
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch Products Real-time
    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('id', 'desc'));
        // Note: 'id' here assumes we are keeping the numeric ID system. 
        // If we switch to auto-generated IDs, we might want to order by 'name' or a 'createdAt' timestamp.
        // For now, let's try to maintain the existing structure.

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const sortedProducts = productsData.sort((a, b) => (b.numericId || 0) - (a.numericId || 0)); // Sort by numericId desc
            setProducts(sortedProducts);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!isAdmin) {
            alert("You are not authorized to add products.");
            return;
        }

        try {
            const benefitsArray = formData.benefits.split('\n').filter(line => line.trim() !== '');
            const newNumericId = products.length > 0 ? Math.max(...products.map(p => p.numericId || 0)) + 1 : 1;

            await addDoc(collection(db, 'products'), {
                ...formData,
                price: Number(formData.price),
                benefits: benefitsArray,
                numericId: newNumericId, // Helper for sorting
                createdAt: new Date().toISOString()
            });

            setShowAddModal(false);
            setFormData({
                name: '',
                category: 'Agriculture',
                price: '',
                image: '',
                description: '',
                benefits: '',
                usage: '',
                inStock: true
            });
            alert('Product added successfully!');
        } catch (error) {
            console.error("Error adding product: ", error);
            alert("Error adding product: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!isAdmin) return;
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', id));
            } catch (error) {
                console.error("Error deleting product: ", error);
                alert("Error deleting product: " + error.message);
            }
        }
    };

    const handleSeedDatabase = async () => {
        if (!isAdmin) return;
        if (!confirm('This will populate the database with the initial product list. Continue?')) return;

        setSeeding(true);
        try {
            // Check if products already exist to avoid duplicates (optional, but good practice)
            const snapshot = await getDocs(collection(db, 'products'));
            if (!snapshot.empty) {
                if (!confirm(`Found ${snapshot.size} existing products. Add duplicates anyway?`)) {
                    setSeeding(false);
                    return;
                }
            }

            const batch = writeBatch(db);
            let operationCount = 0;

            for (const product of initialProducts) {
                // Create a ref with the specific ID if we want to preserve IDs, 
                // or just use addDoc (auto-ID) if we don't care. 
                // Using doc() with product.id ensuring distinct IDs is better.
                const docRef = doc(db, 'products', product.id.toString());
                batch.set(docRef, {
                    ...product,
                    price: Number(product.price),
                    createdAt: new Date().toISOString()
                });
                operationCount++;
            }

            await batch.commit();
            alert(`Successfully added ${operationCount} products!`);
        } catch (error) {
            console.error("Seeding failed:", error);
            alert("Seeding failed: " + error.message);
        } finally {
            setSeeding(false);
        }
    };

    if (loading) return <div>Loading products...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                <div>
                    <h1>Product Management</h1>
                    <p style={{ color: 'var(--color-text-light)' }}>View, add, edit or delete products in your catalog</p>
                </div>
                {isAdmin && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className="btn btn-outline"
                            onClick={handleSeedDatabase}
                            disabled={seeding}
                        >
                            {seeding ? 'Seeding...' : '↻ Seed Database'}
                        </button>
                        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Add New Product</button>
                    </div>
                )}
            </div>

            {/* Search Bar */}
            <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-2xl)' }}>
                <input
                    type="text"
                    className="input"
                    placeholder="Search items by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Product List Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--color-surface)', textAlign: 'left' }}>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>Product</th>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>Category</th>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>Price</th>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>Stock</th>
                            <th style={{ padding: 'var(--spacing-md) var(--spacing-xl)', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', background: '#f5f5f5' }}>
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=IMG'; }}
                                            />
                                        </div>
                                        <strong>{product.name}</strong>
                                    </div>
                                </td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                                    <span className="badge" style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
                                        {product.category}
                                    </span>
                                </td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>₹{product.price}</td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                                    {product.inStock ? (
                                        <span style={{ color: 'var(--color-green-medium)', fontWeight: 600 }}>In Stock</span>
                                    ) : (
                                        <span style={{ color: '#d32f2f', fontWeight: 600 }}>Out of Stock</span>
                                    )}
                                </td>
                                <td style={{ padding: 'var(--spacing-md) var(--spacing-xl)', textAlign: 'right' }}>
                                    {isAdmin && (
                                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
                                            <button
                                                className="btn btn-outline"
                                                onClick={() => handleDelete(product.id)}
                                                style={{ padding: '4px 12px', fontSize: '0.85rem', color: '#c62828', borderColor: '#ffcdd2' }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div style={{ padding: 'var(--spacing-3xl)', textAlign: 'center', color: 'var(--color-text-light)' }}>
                        No products found matching your search.
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div className="card" style={{ width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2>Add New Product</h2>
                        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '4px' }}>Name</label>
                                <input name="name" className="input" value={formData.name} onChange={handleInputChange} required />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px' }}>Category</label>
                                    <select name="category" className="input" value={formData.category} onChange={handleInputChange}>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Personal Care">Personal Care</option>
                                        <option value="Wellness">Wellness</option>
                                        <option value="Home & Spiritual">Home & Spiritual</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px' }}>Price (₹)</label>
                                    <input name="price" type="number" className="input" value={formData.price} onChange={handleInputChange} required />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '4px' }}>Image URL</label>
                                <input name="image" className="input" placeholder="/images/products/..." value={formData.image} onChange={handleInputChange} required />
                                <small style={{ color: 'gray' }}>Note: Use a URL or path to an image in public/images</small>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '4px' }}>Description</label>
                                <textarea name="description" className="input" rows="3" value={formData.description} onChange={handleInputChange} required />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '4px' }}>Benefits (One per line)</label>
                                <textarea name="benefits" className="input" rows="4" placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3" value={formData.benefits} onChange={handleInputChange} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '4px' }}>Usage Instructions</label>
                                <textarea name="usage" className="input" rows="2" value={formData.usage} onChange={handleInputChange} />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} id="inStock" />
                                <label htmlFor="inStock">In Stock</label>
                            </div>

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
