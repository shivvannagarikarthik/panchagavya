'use client';

import { useState } from 'react';
import { usageGuides, benefitsLibrary, faqs } from '@/lib/educational-content';
const educationalContent = { usageGuides, benefits: benefitsLibrary, faqs };

export default function ContentManager() {
    const [activeTab, setActiveTab] = useState('guides');

    const guides = educationalContent.usageGuides;
    const benefits = educationalContent.benefits;
    const faqs = educationalContent.faqs;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                <div>
                    <h1>Content Management</h1>
                    <p style={{ color: 'var(--color-text-light)' }}>Manage usage guides, benefits library, and FAQs</p>
                </div>
                <button className="btn btn-primary">+ Add New Item</button>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                <button
                    onClick={() => setActiveTab('guides')}
                    className={activeTab === 'guides' ? 'btn btn-primary' : 'btn btn-outline'}
                >
                    Usage Guides ({guides.length})
                </button>
                <button
                    onClick={() => setActiveTab('benefits')}
                    className={activeTab === 'benefits' ? 'btn btn-primary' : 'btn btn-outline'}
                >
                    Benefits Library ({benefits.length})
                </button>
                <button
                    onClick={() => setActiveTab('faqs')}
                    className={activeTab === 'faqs' ? 'btn btn-primary' : 'btn btn-outline'}
                >
                    FAQs ({faqs.length})
                </button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: 'var(--spacing-xl)', borderBottom: '1px solid #eee', background: 'var(--color-surface)' }}>
                    <h3 style={{ textTransform: 'capitalize' }}>{activeTab.replace(/([A-Z])/g, ' $1')}</h3>
                </div>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {activeTab === 'guides' && guides.map(item => (
                        <li key={item.id} style={{ padding: 'var(--spacing-lg) var(--spacing-xl)', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong style={{ display: 'block' }}>{item.title}</strong>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{item.category} • {item.product}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>Edit</button>
                                <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.85rem', color: '#c62828', borderColor: '#ffcdd2' }}>Delete</button>
                            </div>
                        </li>
                    ))}

                    {activeTab === 'benefits' && benefits.map(item => (
                        <li key={item.id} style={{ padding: 'var(--spacing-lg) var(--spacing-xl)', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong style={{ display: 'block' }}>{item.title}</strong>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{item.category}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>Edit</button>
                                <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.85rem', color: '#c62828', borderColor: '#ffcdd2' }}>Delete</button>
                            </div>
                        </li>
                    ))}

                    {activeTab === 'faqs' && faqs.map(item => (
                        <li key={item.id} style={{ padding: 'var(--spacing-lg) var(--spacing-xl)', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <strong style={{ display: 'block' }}>{item.question}</strong>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>{item.category}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>Edit</button>
                                <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.85rem', color: '#c62828', borderColor: '#ffcdd2' }}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
