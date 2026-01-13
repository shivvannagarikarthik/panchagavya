'use client';

export default function CategoryFilter({ selectedCategory, onCategoryChange, categories }) {
    return (
        <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            flexWrap: 'wrap',
            marginBottom: 'var(--spacing-xl)',
            justifyContent: 'center'
        }}>
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={selectedCategory === category.id ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{
                        transition: 'all var(--transition-normal)',
                        fontSize: '0.95rem'
                    }}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}
