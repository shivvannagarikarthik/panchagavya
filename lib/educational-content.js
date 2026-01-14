import { db } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export const usageGuides = [
    {
        id: 1,
        title: "How to Use Liquid Panchagavya for Plants",
        category: "Agriculture",
        content: `Liquid Panchagavya is a powerful organic growth promoter that can transform your garden or farm. Here's how to use it effectively:

**Dilution Ratios:**
- For foliar spray: 3% solution (30ml per liter of water)
- For soil drench: 5% solution (50ml per liter of water)
- For seed treatment: 3% solution (soak for 30 minutes)

**Application Method:**
1. Prepare solution in clean container
2. Spray early morning (6-8 AM) or evening (4-6 PM)
3. Ensure complete coverage of leaves (both sides)
4. Apply to soil around root zone for soil drench

**Frequency:**
- Vegetable crops: Every 10-15 days
- Fruit trees: Every 20-25 days
- Flowering plants: Weekly during flowering season

**Pro Tips:**
- Add a pinch of turmeric powder to enhance effectiveness
- Combine with cow dung slurry for better soil absorption
- Store in cool, dark place
- Use within 6 months of opening`,
        videoUrl: null
    },
    {
        id: 2,
        title: "Panchagavya Skincare Routine",
        category: "Personal Care",
        content: `Embrace natural beauty with Panchagavya-based skincare products. Follow this daily routine for radiant skin:

**Morning Routine:**
1. Cleanse with Panchagavya Herbal Soap
2. Pat dry gently
3. Apply rose water or plain water

**Weekly Deep Cleansing (2-3 times):**
1. Cleanse face with warm water
2. Apply Panchagavya Face Pack
3. Leave for 15-20 minutes
4. Rinse with lukewarm water
5. Apply natural moisturizer

**Face Pack Preparation:**
- 2 tablespoons face pack powder
- Mix with rose water or plain water
- Add honey for dry skin
- Add lemon juice for oily skin

**Benefits Timeline:**
- Week 1-2: Reduced oiliness, cleaner pores
- Week 3-4: Brighter complexion, reduced blemishes
- Week 5-8: Visible improvement in skin texture

**Tips:**
- Always do patch test before first use
- Store products in cool, dry place
- Use wooden or plastic spoon (avoid metal)`,
        videoUrl: null
    },
    {
        id: 3,
        title: "Gomutra Ark: Dosage and Benefits",
        category: "Wellness",
        content: `Gomutra Ark (distilled cow urine) is a powerful Ayurvedic preparation. Here's your complete guide:

**Standard Dosage:**
- General wellness: 10-15ml daily
- Therapeutic use: 15-20ml daily
- Children (above 5 years): 5-10ml daily

**How to Consume:**
1. Take on empty stomach (morning preferred)
2. Mix with equal quantity of water
3. Wait 30 minutes before eating
4. Start with small dose and gradually increase

**Health Benefits:**
- Detoxification: Flushes out toxins
- Immunity: Strengthens immune system
- Digestion: Improves digestive fire
- Skin health: Clears skin conditions
- Metabolism: Enhances metabolic rate

**Precautions:**
- Consult Ayurvedic doctor for specific conditions
- Not recommended during pregnancy
- Avoid with very hot or very cold water
- Store in glass bottle only

**Duration:**
- General wellness: Continuous use possible
- Specific conditions: 40-90 days course
- Take 1 week break after 90 days`,
        videoUrl: null
    },
    {
        id: 4,
        title: "Creating Sacred Space with Dhoop",
        category: "Home & Spiritual",
        content: `Transform your home into a sacred sanctuary using cow dung dhoop sticks and sambrani cups:

**Daily Ritual:**
1. Clean the space you wish to purify
2. Light dhoop stick or sambrani cup
3. Move clockwise around the room
4. Focus on corners and entry points
5. Let smoke reach all areas

**Best Times:**
- Morning prayers: 5-7 AM
- Evening prayers: 6-8 PM
- Before meditation: anytime
- During festivals: as needed

**Benefits:**
- Air purification
- Mosquito repellent
- Stress reduction
- Positive energy
- Spiritual atmosphere

**Safety Tips:**
- Use proper dhoop holder
- Keep away from flammable materials
- Ensure good ventilation
- Never leave burning unattended
- Keep away from children and pets

**Meditation Enhancement:**
- Light 5-10 minutes before meditation
- Let fragrance settle in room
- Enhances focus and concentration
- Creates calming atmosphere`,
        videoUrl: null
    }
];

export const benefitsLibrary = [
    {
        id: 1,
        title: "Scientific Benefits of Panchagavya in Agriculture",
        category: "Agriculture",
        content: `**What is Panchagavya?**
Panchagavya is a mixture of five products from the cow: milk, curd, ghee, urine, and dung. Modern research has validated its traditional agricultural uses.

**Scientific Research:**
1. **Microbial Activity**: Contains beneficial bacteria (Bacillus, Pseudomonas) that enhance soil health
2. **Nutrient Content**: Rich in NPK, micronutrients, and growth hormones
3. **Plant Growth**: Studies show 20-30% increase in crop yield
4. **Pest Resistance**: Contains natural pest-repelling compounds

**Research Findings:**
- Tamil Nadu Agricultural University found 25% yield increase in paddy
- ICAR studies confirm improved soil microbial diversity
- Reduces chemical fertilizer requirement by 30-40%

**Mechanism of Action:**
- Enhances photosynthesis
- Improves nutrient uptake
- Strengthens plant cell walls
- Boosts natural immunity`,
        scientificBasis: "Published research from Agricultural Universities",
        ayurvedicBasis: "Mentioned in ancient texts like Vrikshayurveda"
    },
    {
        id: 2,
        title: "Ayurvedic Perspective on Cow Products",
        category: "Wellness",
        content: `**Panchagavya in Ayurveda:**
According to Ayurvedic texts, cow products are considered highly sacred and medicinal.

**Classical References:**
- Charaka Samhita: Describes therapeutic properties
- Sushruta Samhita: Details purification methods
- Ashtanga Hridaya: Explains health benefits

**Dosha Balancing:**
- **Vata**: Ghee and milk provide grounding
- **Pitta**: Cow ghee has cooling properties
- **Kapha**: Gomutra aids in detoxification

**Therapeutic Properties (Ayurvedic):**
1. **Gomutra (Urine)**: Detoxifying, antibacterial
2. **Go-dung**: Purifying, antiseptic
3. **Milk**: Nourishing, strength-building
4. **Curd**: Digestive, probiotic
5. **Ghee**: Rejuvenating, brain tonic

**Modern Validation:**
- Antimicrobial properties confirmed by research
- Antioxidant activity demonstrated
- Immunomodulatory effects proven`,
        scientificBasis: "Modern research on traditional formulations",
        ayurvedicBasis: "Classical Ayurvedic texts"
    },
    {
        id: 3,
        title: "Environmental Benefits of Cow-Based Products",
        category: "Home & Spiritual",
        content: `**Ecological Impact:**
Using Panchagavya products is not just good for you—it's good for the planet.

**Environmental Benefits:**
1. **Zero Waste**: Every cow product is utilized
2. **Biodegradable**: 100% natural decomposition
3. **Carbon Negative**: Reduces chemical production
4. **Soil Health**: Improves long-term fertility
5. **Water Conservation**: Reduces chemical runoff

**Comparison with Chemicals:**
- Chemical fertilizers: Deplete soil, pollute water
- Organic alternatives: Build soil, protect ecosystem
- Synthetic pesticides: Harm beneficial insects
- Natural repellents: Selective pest control

**Sustainable Farming:**
- Closes nutrient loop
- Supports cattle rearing
- Promotes biodiversity
- Reduces carbon footprint

**Economic Benefits:**
- Lower input costs for farmers
- Higher market value for organic produce
- Sustainable rural livelihoods
- Reduced healthcare costs`,
        scientificBasis: "Environmental impact studies",
        ayurvedicBasis: "Traditional sustainable practices"
    }
];

export const faqs = [
    {
        question: "Is Panchagavya safe for all crops?",
        answer: "Yes, Panchagavya is safe for all types of crops including vegetables, fruits, flowers, and grains. It's a natural product with no harmful chemicals.",
        category: "Agriculture"
    },
    {
        question: "How long does Liquid Panchagavya last?",
        answer: "When stored in a cool, dark place, Liquid Panchagavya has a shelf life of 12 months from manufacturing date. Once opened, use within 6 months for best results.",
        category: "Agriculture"
    },
    {
        question: "Can I use Panchagavya soap on sensitive skin?",
        answer: "Yes, Panchagavya soap is made with natural ingredients and is generally safe for sensitive skin. However, we recommend doing a patch test first. If you have severe skin conditions, consult a dermatologist.",
        category: "Personal Care"
    },
    {
        question: "Is Gomutra Ark safe to consume?",
        answer: "Yes, Gomutra Ark is safe when consumed in recommended doses. It's distilled and processed according to Ayurvedic standards. However, pregnant women and people with specific health conditions should consult an Ayurvedic practitioner first.",
        category: "Wellness"
    },
    {
        question: "Do you ship across India?",
        answer: "Yes, we ship to all states in India. Delivery typically takes 5-7 business days. We use eco-friendly packaging materials.",
        category: "General"
    },
    {
        question: "What certifications do your products have?",
        answer: "Our products are certified by various authorities depending on the product type: FSSAI for food items, NPOP/Jaivik Bharat for organic certification, and AYUSH license for Ayurvedic products.",
        category: "General"
    },
    {
        question: "Can I return a product if I'm not satisfied?",
        answer: "Due to the nature of organic products, we accept returns only for damaged or defective items within 7 days of delivery. Please contact our customer support for assistance.",
        category: "General"
    },
    {
        question: "How do I know the products are authentic?",
        answer: "All our products come with certification marks and batch numbers. You can verify authenticity on our website or by contacting customer support. We source directly from certified organic farms.",
        category: "General"
    }
];

export const getContentByCategory = (category) => {
    return {
        guides: usageGuides.filter(guide => guide.category === category),
        benefits: benefitsLibrary.filter(benefit => benefit.category === category),
        faqs: faqs.filter(faq => faq.category === category)
    };
};

export const searchContent = (query) => {
    const lowerQuery = query.toLowerCase();
    return {
        guides: usageGuides.filter(guide =>
            guide.title.toLowerCase().includes(lowerQuery) ||
            guide.content.toLowerCase().includes(lowerQuery)
        ),
        benefits: benefitsLibrary.filter(benefit =>
            benefit.title.toLowerCase().includes(lowerQuery) ||
            benefit.content.toLowerCase().includes(lowerQuery)
        ),
        faqs: faqs.filter(faq =>
            faq.question.toLowerCase().includes(lowerQuery) ||
            faq.answer.toLowerCase().includes(lowerQuery)
        )
    };
};

// Firestore helper functions
export const getUsageGuidesFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'usageGuides'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching usage guides:", error);
        return [];
    }
};

export const getBenefitsFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'benefits'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching benefits:", error);
        return [];
    }
};

export const getFAQsFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'faqs'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
};
