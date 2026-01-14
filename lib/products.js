import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const products = [
  // Agriculture Products
  {
    id: 1,
    name: "Liquid Panchagavya",
    category: "Agriculture",
    price: 299,
    image: "https://images.unsplash.com/photo-1615811361523-d2051e5ec0ee?q=80&w=800&auto=format&fit=crop",
    description: "Premium organic growth promoter made from five sacred cow products. Enhances soil fertility, improves plant immunity, and increases crop yield naturally.",
    benefits: [
      "Increases crop yield by 20-30%",
      "Improves soil microflora",
      "Enhances plant immunity against pests",
      "100% organic and chemical-free",
      "Suitable for all crops"
    ],
    usage: "Dilute 30ml (3%) in 1 liter of water. Spray on plants early morning or evening. Use every 15 days for best results.",
    dilutionRatio: "3% (30ml per liter)",
    certifications: ["NPOP", "Jaivik Bharat", "FSSAI"],
    inStock: true
  },
  {
    id: 2,
    name: "Ghana-Panchagavya (Solid Manure)",
    category: "Agriculture",
    price: 499,
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=800&auto=format&fit=crop",
    description: "Rich organic solid manure for soil enrichment. Perfect for preparing beds before planting and maintaining soil health throughout the growing season.",
    benefits: [
      "Enriches soil with essential nutrients",
      "Improves water retention capacity",
      "Enhances beneficial microbial activity",
      "Long-lasting soil conditioning",
      "Eco-friendly alternative to chemical fertilizers"
    ],
    usage: "Mix 2-3 kg per square meter of soil before planting. Can be used as top dressing during growing season.",
    dilutionRatio: "2-3 kg per sq meter",
    certifications: ["NPOP", "Jaivik Bharat"],
    inStock: true
  },
  {
    id: 3,
    name: "Agnihastra Pest Repellent",
    category: "Agriculture",
    price: 399,
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=800&auto=format&fit=crop",
    description: "Natural pest repellent made from cow products and neem. Effective against a wide range of agricultural pests without harming beneficial insects.",
    benefits: [
      "Repels aphids, whiteflies, and mites",
      "Safe for beneficial insects",
      "No chemical residues",
      "Improves plant vigor",
      "Can be used until harvest"
    ],
    usage: "Dilute 50ml in 1 liter of water and spray on affected plants. Repeat every 7-10 days or after rain.",
    dilutionRatio: "5% (50ml per liter)",
    certifications: ["NPOP", "Jaivik Bharat"],
    inStock: true
  },

  // Personal Care Products
  {
    id: 4,
    name: "Panchagavya Herbal Soap",
    category: "Personal Care",
    price: 149,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=800&auto=format&fit=crop",
    description: "Handcrafted natural soap enriched with Panchagavya and Ayurvedic herbs. Gentle on skin, provides deep cleansing while maintaining natural moisture.",
    benefits: [
      "Deep cleansing without dryness",
      "Antibacterial and antifungal properties",
      "Suitable for all skin types",
      "Free from synthetic chemicals",
      "Rich in natural glycerin"
    ],
    usage: "Wet skin, lather soap, massage gently, and rinse thoroughly. Use daily for best results.",
    dilutionRatio: "N/A",
    certifications: ["FSSAI", "AYUSH"],
    inStock: true
  },
  {
    id: 5,
    name: "Gomutra Herbal Shampoo",
    category: "Personal Care",
    price: 249,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=800&auto=format&fit=crop",
    description: "Natural hair cleanser with distilled cow urine (Gomutra) and traditional herbs. Promotes hair growth, reduces dandruff, and strengthens hair roots.",
    benefits: [
      "Reduces hair fall significantly",
      "Controls dandruff naturally",
      "Strengthens hair from roots",
      "Adds natural shine and volume",
      "Chemical-free hair care"
    ],
    usage: "Apply to wet hair, massage scalp gently, leave for 2-3 minutes, rinse thoroughly. Use 2-3 times weekly.",
    dilutionRatio: "N/A",
    certifications: ["FSSAI", "AYUSH"],
    inStock: true
  },
  {
    id: 6,
    name: "Panchagavya Face Pack",
    category: "Personal Care",
    price: 199,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop",
    description: "Rejuvenating face pack with Panchagavya and natural clays. Removes impurities, brightens complexion, and provides natural glow.",
    benefits: [
      "Deep cleanses pores",
      "Brightens skin tone",
      "Reduces blemishes and marks",
      "Anti-aging properties",
      "Suitable for all skin types"
    ],
    usage: "Mix 2 tablespoons with water or rose water to make paste. Apply evenly, leave for 15-20 minutes, rinse with lukewarm water.",
    dilutionRatio: "2 tbsp with water",
    certifications: ["FSSAI", "AYUSH"],
    inStock: true
  },
  {
    id: 7,
    name: "Ayurvedic Tooth Powder",
    category: "Personal Care",
    price: 129,
    image: "https://images.unsplash.com/photo-1559594832-d69956417539?q=80&w=800&auto=format&fit=crop",
    description: "Traditional tooth powder with cow dung ash and medicinal herbs. Strengthens gums, prevents cavities, and provides lasting freshness.",
    benefits: [
      "Strengthens teeth and gums",
      "Prevents tooth decay naturally",
      "Removes plaque effectively",
      "Long-lasting fresh breath",
      "No artificial colors or flavors"
    ],
    usage: "Take small amount on wet toothbrush, brush gently for 2 minutes, rinse thoroughly. Use twice daily.",
    dilutionRatio: "N/A",
    certifications: ["FSSAI", "AYUSH"],
    inStock: true
  },

  // Wellness/Health Products
  {
    id: 8,
    name: "Gomutra Ark (Distilled Cow Urine)",
    category: "Wellness",
    price: 349,
    image: "https://images.unsplash.com/photo-1590822152865-c7f8979ca6f2?q=80&w=800&auto=format&fit=crop",
    description: "Pure distilled cow urine (Gomutra Ark) processed according to Ayurvedic principles. Known for its detoxifying and immunity-boosting properties.",
    benefits: [
      "Boosts immunity naturally",
      "Aids in detoxification",
      "Supports digestive health",
      "Anti-inflammatory properties",
      "Rich in minerals and enzymes"
    ],
    usage: "Take 10-15ml mixed with water on empty stomach. Consult Ayurvedic practitioner for specific health conditions.",
    dilutionRatio: "10-15ml with water",
    certifications: ["FSSAI", "AYUSH"],
    inStock: true
  },
  {
    id: 9,
    name: "Panchagavya Ghrita (Medicated Ghee)",
    category: "Wellness",
    price: 599,
    image: "https://images.unsplash.com/photo-1584362916695-17482613e512?q=80&w=800&auto=format&fit=crop",
    description: "Premium A2 cow ghee processed with Panchagavya and Ayurvedic herbs. Enhances memory, improves digestion, and promotes overall wellness.",
    benefits: [
      "Enhances memory and cognition",
      "Improves digestive fire (Agni)",
      "Boosts immunity",
      "Nourishes all body tissues",
      "Pure A2 cow ghee base"
    ],
    usage: "Take 1 teaspoon with warm milk or water before meals. Can also be used for cooking and traditional preparations.",
    dilutionRatio: "1 tsp daily",
    certifications: ["FSSAI", "AYUSH"],
    inStock: true
  },
  {
    id: 10,
    name: "Ayurvedic Nasal Drops",
    category: "Wellness",
    price: 199,
    image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?q=80&w=800&auto=format&fit=crop",
    description: "Herbal nasal drops with cow ghee base. Provides relief from sinusitis, headaches, and respiratory issues. Clears nasal passages naturally.",
    benefits: [
      "Relieves sinus congestion",
      "Reduces headaches",
      "Improves breathing",
      "Lubricates nasal passages",
      "Enhances mental clarity"
    ],
    usage: "Put 2-3 drops in each nostril while lying down. Use in morning or before sleep. Suitable for daily use.",
    dilutionRatio: "2-3 drops per nostril",
    certifications: ["FSSAI", "AYUSH"],
    inStock: true
  },

  // Home & Spiritual Products
  {
    id: 11,
    name: "Cow Dung Dhoop Sticks",
    category: "Home & Spiritual",
    price: 179,
    image: "https://images.unsplash.com/photo-1602166910043-41a996fbf4ec?q=80&w=800&auto=format&fit=crop",
    description: "Traditional dhoop sticks made from cow dung and natural resins. Purifies air, creates positive atmosphere, and repels insects naturally.",
    benefits: [
      "Purifies indoor air quality",
      "Natural mosquito repellent",
      "Creates calming atmosphere",
      "Removes negative energy",
      "Chemical-free fragrance"
    ],
    usage: "Light the tip, let it burn for few seconds, blow out flame and let it smolder. Place in dhoop holder. Use during morning/evening prayers or as needed.",
    dilutionRatio: "N/A",
    certifications: ["Jaivik Bharat"],
    inStock: true
  },
  {
    id: 12,
    name: "Sambrani Cup (Incense Cups)",
    category: "Home & Spiritual",
    price: 149,
    image: "https://images.unsplash.com/photo-1602166910043-41a996fbf4ec?q=80&w=800&auto=format&fit=crop",
    description: "Natural incense cups with cow dung, resins, and aromatic herbs. Perfect for daily rituals, meditation, and home purification.",
    benefits: [
      "Long-lasting natural fragrance",
      "Reduces stress and anxiety",
      "Air purification",
      "Supports meditation practice",
      "Traditional spiritual preparation"
    ],
    usage: "Place cup in holder, light the edge, and let it burn. Ideal for morning rituals or meditation sessions.",
    dilutionRatio: "N/A",
    certifications: ["Jaivik Bharat"],
    inStock: true
  },
  {
    id: 13,
    name: "Organic Floor Cleaner",
    category: "Home & Spiritual",
    price: 249,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    description: "Eco-friendly floor cleaner made from Panchagavya and natural surfactants. Cleans effectively while being gentle on floors and the environment.",
    benefits: [
      "Deep cleans without chemicals",
      "Safe for children and pets",
      "Pleasant natural fragrance",
      "Biodegradable formula",
      "Suitable for all floor types"
    ],
    usage: "Dilute 50ml in 1 liter of water. Mop floors as usual. No rinsing required. Safe for daily use.",
    dilutionRatio: "50ml per liter",
    certifications: ["Jaivik Bharat", "FSSAI"],
    inStock: true
  }
];

export const categories = [
  {
    id: "all",
    name: "All Products",
    description: "Browse our complete range of Panchagavya-based products"
  },
  {
    id: "Agriculture",
    name: "Agriculture",
    description: "Organic growth promoters and pest repellents for sustainable farming"
  },
  {
    id: "Personal Care",
    name: "Personal Care",
    description: "Natural soaps, shampoos, and skincare products"
  },
  {
    id: "Wellness",
    name: "Wellness",
    description: "Ayurvedic health supplements and wellness products"
  },
  {
    id: "Home & Spiritual",
    name: "Home & Spiritual",
    description: "Eco-friendly home care and spiritual products"
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
};

// Firestore helper functions
export const getProductByIdFirestore = async (id) => {
  try {
    const docRef = doc(db, 'products', id.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching product from Firestore:", error);
    return null;
  }
};

export const getProductsFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
};
