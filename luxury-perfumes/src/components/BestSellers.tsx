import { useState } from "react";
import { Star, ShoppingBag, Check } from "lucide-react";
import { Product } from "../types";
import { bestSellers } from "../data";

interface BestSellersProps {
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
}

export default function BestSellers({ onAddToCart, selectedCategory }: BestSellersProps) {
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  // Filter products by category if clicked from category bar (optional, keeps UI responsive)
  const filteredProducts = selectedCategory === "ALL" 
    ? bestSellers 
    : bestSellers.filter(p => p.category.toUpperCase() === selectedCategory.toUpperCase() || selectedCategory === "ALL");

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : bestSellers;

  return (
    <section id="best-sellers" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-[#E5D9D3]/40">
          <div>
            <h2 className="font-sans text-[20px] sm:text-[24px] font-bold tracking-[0.15em] text-[#121212] uppercase">
              ARTISANAL CREATIONS
            </h2>
          </div>
          <a
            href="#all-products"
            className="text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.18em] text-[#C5A880] hover:text-[#121212] transition-colors duration-200 flex items-center space-x-1 uppercase group"
          >
            <span>VIEW ALL ESSENCES</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>

        {/* 5-Column Responsive Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between h-full bg-white transition-all duration-300 relative animate-fadeIn"
              id={`prod-card-${product.id}`}
            >
              
              {/* Image Container with Soft Background */}
              <div className="aspect-[4/5] bg-[#FAF9F6] rounded-xl overflow-hidden relative border border-[#E5D9D3]/30 flex items-center justify-center p-4 group-hover:shadow-md transition-all duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg transform duration-700 ease-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay with Quick Add Option */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Product Metadata Content */}
              <div className="pt-4 flex flex-col justify-between flex-grow">
                <div className="space-y-1.5 text-left">
                  {/* Category */}
                  <span className="text-[9px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase">
                    {product.category}
                  </span>
                  
                  {/* Product Title */}
                  <h3 className="text-[13px] sm:text-[14px] font-sans font-medium text-[#121212] leading-tight min-h-[40px] group-hover:text-[#C5A880] transition-colors duration-200">
                    {product.name}
                  </h3>
                  
                  {/* Star Rating Row */}
                  <div className="flex items-center space-x-1.5">
                    <div className="flex items-center text-[#C5A880]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-current stroke-[1.5]"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-sans text-[#7C7167]">
                      ({product.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Price and Cart Add Row */}
                <div className="flex items-center justify-between pt-4 mt-auto">
                  <span className="text-[14px] sm:text-[15px] font-sans font-bold text-[#121212]">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    id={`add-to-cart-${product.id}`}
                    className={`rounded-full w-9 h-9 flex items-center justify-center border transition-all duration-300 shadow-xs active:scale-90 ${
                      addedProductId === product.id
                        ? "bg-[#C5A880] border-[#C5A880] text-white"
                        : "bg-[#121212] border-[#121212] text-white hover:bg-[#C5A880] hover:border-[#C5A880]"
                    }`}
                    aria-label={`Add ${product.name} to Cart`}
                  >
                    {addedProductId === product.id ? (
                      <Check className="w-4 h-4 stroke-[2.5] animate-scaleIn" />
                    ) : (
                      <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
