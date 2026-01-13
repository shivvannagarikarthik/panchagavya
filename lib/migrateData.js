import { db } from './firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';
import { products } from './products.js';
import { usageGuides, benefitsLibrary, faqs } from './educational-content.js';
const educationalContent = { usageGuides, benefits: benefitsLibrary, faqs };

// Helper to perform a Firestore write with a timeout to prevent hanging
const setDocWithRetry = async (docRef, data, timeoutMs = 10000) => {
    // Add a small delay to avoid rate limiting or transient permission issues
    await new Promise(resolve => setTimeout(resolve, 500));

    const timeout = new Promise((resolve) =>
        setTimeout(() => resolve({ status: 'timeout' }), timeoutMs)
    );

    return Promise.race([
        setDoc(docRef, data).then(() => ({ status: 'success' })),
        timeout
    ]);
};

export const migrateData = async () => {
    try {
        // Migrate Products
        console.log(`Migrating ${products.length} products...`);
        for (const product of products) {
            try {
                console.log(`- Migrating product: ${product.name}`);
                const result = await setDocWithRetry(doc(collection(db, 'products'), product.id.toString()), product);

                if (result.status === 'timeout') {
                    console.error(`  ✗ Failed: Firestore write timed out after 10s`);
                } else {
                    console.log(`  ✓ Success`);
                }
            } catch (err) {
                console.error(`  ✗ Failed: ${err.message}`);
            }
        }

        // Migrate Usage Guides
        console.log(`Migrating ${educationalContent.usageGuides.length} usage guides...`);
        for (const guide of educationalContent.usageGuides) {
            try {
                console.log(`- Migrating guide: ${guide.title}`);
                const result = await setDocWithRetry(doc(collection(db, 'usageGuides'), guide.id.toString()), guide);

                if (result.status === 'timeout') {
                    console.error(`  ✗ Failed: Firestore write timed out`);
                } else {
                    console.log(`  ✓ Success`);
                }
            } catch (err) {
                console.error(`  ✗ Failed: ${err.message}`);
            }
        }

        // Migrate Benefits
        console.log('Migrating benefits...');
        for (const benefit of educationalContent.benefits) {
            try {
                const result = await setDocWithRetry(doc(collection(db, 'benefits'), benefit.id.toString()), benefit);
                if (result.status === 'success') console.log(`  ✓ Migrated: ${benefit.title}`);
            } catch (err) {
                console.error(`  ✗ Failed benefit ${benefit.id}: ${err.message}`);
            }
        }

        // Migrate FAQs
        console.log('Migrating FAQs...');
        for (const faq of educationalContent.faqs) {
            try {
                // Generate a unique ID for FAQ if it doesn't have one
                const faqId = faq.id || Math.random().toString(36).substring(7);
                const result = await setDocWithRetry(doc(collection(db, 'faqs'), faqId.toString()), faq);
                if (result.status === 'success') console.log(`  ✓ Migrated FAQ: ${faqId}`);
            } catch (err) {
                console.error(`  ✗ Failed FAQ: ${err.message}`);
            }
        }

        console.log('Migration completed successfully!');
        return { success: true };
    } catch (error) {
        console.error('Migration failed:', error);
        return { success: false, error: error.message };
    }
};
