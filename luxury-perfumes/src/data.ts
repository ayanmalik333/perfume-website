import { Product } from "./types";

export const products: Product[] = [
  {
    id: "perfume-1",
    name: "Santal Nobile Eau de Parfum",
    category: "Signature Collection",
    price: 185.00,
    rating: 4.9,
    reviewsCount: 1420,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    description: "A timeless, creamy masterwork balancing velvety Mysore sandalwood, warm cardamom, and rare Atlas cedar wood."
  },
  {
    id: "perfume-2",
    name: "Oud Imperial Extrait de Parfum",
    category: "Oud Collection",
    price: 245.00,
    rating: 4.9,
    reviewsCount: 897,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
    description: "An opulent, highly-concentrated extract of precious dark Cambodian oud, smoked leather, and pure amber resin."
  },
  {
    id: "perfume-3",
    name: "Rose Extase Eau de Parfum",
    category: "Floral Collection",
    price: 165.00,
    rating: 4.8,
    reviewsCount: 1102,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600",
    description: "An intoxicating symphony of velvety hand-harvested Damask rose, warm crystalline amber, and Madagascar vanilla."
  },
  {
    id: "perfume-4",
    name: "Neroli Marine Eau de Parfum",
    category: "Fresh Collection",
    price: 155.00,
    rating: 4.7,
    reviewsCount: 741,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    description: "A vibrant breeze of sun-drenched coastal neroli blossoms, bright Italian bergamot, and mineral sea salt accord."
  },
  {
    id: "perfume-5",
    name: "Or Noir Limited Edition",
    category: "Limited Edition",
    price: 320.00,
    rating: 5.0,
    reviewsCount: 314,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    description: "A rare nectar blending sacred Frankincense, wild honey, and dark winter truffle, encased in a hand-crafted gilded crystal vessel."
  }
];

export const bestSellers = products;

export interface Category {
  id: string;
  name: string;
  description: string;
  iconType: "signature" | "oud" | "floral" | "fresh" | "limited";
}

export const categories: Category[] = [
  {
    id: "cat-signature",
    name: "Signature Collection",
    description: "Timeless & Iconic",
    iconType: "signature"
  },
  {
    id: "cat-oud",
    name: "Oud Collection",
    description: "Mysterious & Rich",
    iconType: "oud"
  },
  {
    id: "cat-floral",
    name: "Floral Collection",
    description: "Velvety & Intoxicating",
    iconType: "floral"
  },
  {
    id: "cat-fresh",
    name: "Fresh Collection",
    description: "Crisp & Scent-Awakening",
    iconType: "fresh"
  },
  {
    id: "cat-limited",
    name: "Limited Edition",
    description: "Extremely Rare Blends",
    iconType: "limited"
  }
];

// Luxury lifestyle / fragrance atmosphere images for the social feed
export const socialImages = [
  "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=400", // Gold perfume bottle Close-up
  "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=400", // Droplets & elegant scent bottle
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400", // Luxury bottle on stone under warm sun
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400", // Glass fragrance in gold light
  "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=400"  // Elegant mist spray and crystal textures
];
