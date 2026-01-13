'use client';

export default function OrderManager() {
    return (
        <div>
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h1>Order Management</h1>
                <p style={{ color: 'var(--color-text-light)' }}>Track and manage customer orders</p>
            </div>

            <div className="card" style={{ padding: 'var(--spacing-3xl)', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>🛒</div>
                <h3>No Orders Yet</h3>
                <p style={{ color: 'var(--color-text-light)', maxWidth: '400px', margin: 'var(--spacing-md) auto' }}>
                    When customers start placing orders, they will appear here. You'll be able to see order details, shipping status, and total amounts.
                </p>
                <button className="btn btn-primary" style={{ marginTop: 'var(--spacing-lg)' }}>Refresh Orders</button>
            </div>

            <div className="card" style={{ marginTop: 'var(--spacing-2xl)', padding: 'var(--spacing-xl)' }}>
                <h4 style={{ marginBottom: 'var(--spacing-lg)' }}>Order Statistics</h4>
                <div className="grid grid-3">
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-md)', borderRight: '1px solid #eee' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>0</span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Today's Orders</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-md)', borderRight: '1px solid #eee' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹0</span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Total Revenue</p>
                    </div>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-md)' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>0%</span>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>Conversion Rate</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
