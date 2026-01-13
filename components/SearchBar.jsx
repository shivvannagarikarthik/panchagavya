'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = "Search products..." }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <input
                type="text"
                className="input"
                placeholder={placeholder}
                value={query}
                onChange={handleSearch}
                style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    display: 'block'
                }}
            />
        </div>
    );
}
