'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { usageGuides, benefitsLibrary, faqs, searchContent } from '@/lib/educational-content';

export default function LearnPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedContent, setDisplayedContent] = useState({
        guides: usageGuides,
        benefits: benefitsLibrary,
        faqs: faqs
    });
    const [activeTab, setActiveTab] = useState('guides');

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setDisplayedContent({
                guides: usageGuides,
                benefits: benefitsLibrary,
                faqs: faqs
            });
        } else {
            setDisplayedContent(searchContent(query));
        }
    };

    return (
        <div className="section">
            <div className="container">
                {/* Header */}
                <div className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h1>Learning Center</h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-light)', maxWidth: '800px', margin: '0 auto' }}>
                        Discover how to use Panchagavya products effectively. Learn about benefits, usage instructions, and scientific research.
                    </p>
                </div>

                {/* Search */}
                <SearchBar onSearch={handleSearch} placeholder="Search guides, benefits, or FAQs..." />

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-xl)',
                    borderBottom: '2px solid var(--color-border)',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={() => setActiveTab('guides')}
                        className={activeTab === 'guides' ? 'btn btn-primary' : 'btn btn-ghost'}
                        style={{
                            borderRadius: '0',
                            borderBottom: activeTab === 'guides' ? '3px solid var(--color-primary)' : 'none',
                            marginBottom: '-2px'
                        }}
                    >
                        Usage Guides ({displayedContent.guides.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('benefits')}
                        className={activeTab === 'benefits' ? 'btn btn-primary' : 'btn btn-ghost'}
                        style={{
                            borderRadius: '0',
                            borderBottom: activeTab === 'benefits' ? '3px solid var(--color-primary)' : 'none',
                            marginBottom: '-2px'
                        }}
                    >
                        Benefits Library ({displayedContent.benefits.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('faqs')}
                        className={activeTab === 'faqs' ? 'btn btn-primary' : 'btn btn-ghost'}
                        style={{
                            borderRadius: '0',
                            borderBottom: activeTab === 'faqs' ? '3px solid var(--color-primary)' : 'none',
                            marginBottom: '-2px'
                        }}
                    >
                        FAQs ({displayedContent.faqs.length})
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'guides' && (
                    <div className="grid grid-2">
                        {displayedContent.guides.map(guide => (
                            <div key={guide.id} className="card">
                                <span className="badge" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    {guide.category}
                                </span>
                                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{guide.title}</h3>
                                <div style={{
                                    whiteSpace: 'pre-line',
                                    lineHeight: 1.7,
                                    color: 'var(--color-text)'
                                }}>
                                    {guide.content}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'benefits' && (
                    <div className="grid grid-2">
                        {displayedContent.benefits.map(benefit => (
                            <div key={benefit.id} className="card">
                                <span className="badge badge-success" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    {benefit.category}
                                </span>
                                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{benefit.title}</h3>
                                <div style={{
                                    whiteSpace: 'pre-line',
                                    lineHeight: 1.7,
                                    marginBottom: 'var(--spacing-lg)',
                                    color: 'var(--color-text)'
                                }}>
                                    {benefit.content}
                                </div>
                                {benefit.scientificBasis && (
                                    <div style={{
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--color-surface)',
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: 'var(--spacing-sm)',
                                        fontSize: '0.9rem'
                                    }}>
                                        <strong>🔬 Scientific Basis:</strong> {benefit.scientificBasis}
                                    </div>
                                )}
                                {benefit.ayurvedicBasis && (
                                    <div style={{
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--color-surface)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.9rem'
                                    }}>
                                        <strong>📖 Ayurvedic Basis:</strong> {benefit.ayurvedicBasis}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'faqs' && (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {displayedContent.faqs.map((faq, index) => (
                            <div key={index} className="card" style={{ marginBottom: 'var(--spacing-md)' }}>
                                <span className="badge" style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    {faq.category}
                                </span>
                                <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-green-dark)' }}>
                                    Q: {faq.question}
                                </h4>
                                <p style={{ lineHeight: 1.7 }}>
                                    A: {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {activeTab === 'guides' && displayedContent.guides.length === 0 && (
                    <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                            No guides found matching your search.
                        </p>
                    </div>
                )}
                {activeTab === 'benefits' && displayedContent.benefits.length === 0 && (
                    <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                            No benefits found matching your search.
                        </p>
                    </div>
                )}
                {activeTab === 'faqs' && displayedContent.faqs.length === 0 && (
                    <div className="text-center" style={{ padding: 'var(--spacing-3xl)' }}>
                        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                            No FAQs found matching your search.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
