import { categories, Category } from "../data";

interface CategoriesProps {
  onCategoryClick?: (category: string) => void;
}

export default function Categories({ onCategoryClick }: CategoriesProps) {
  
  const renderIcon = (type: Category["iconType"]) => {
    switch (type) {
      case "signature":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-[#C5A880]">
            {/* Elegant luxury perfume bottle silhouette */}
            <rect x="7" y="9" width="10" height="11" rx="2" />
            <path d="M10 5h4v4h-4z" />
            <line x1="7" y1="13" x2="17" y2="13" />
            <circle cx="12" cy="15" r="1.5" />
          </svg>
        );
      case "oud":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-[#C5A880]">
            {/* Exotic wood / incense droplets representing Oud */}
            <path d="M12 2C12 2 6 9 6 13C6 16.3 8.7 19 12 19C15.3 19 18 16.3 18 13C18 9 12 2 12 2Z" />
            <path d="M12 7c-2 3.5-3 5-3 7" />
          </svg>
        );
      case "floral":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-[#C5A880]">
            {/* Elegant geometric bloom / floral icon */}
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4-4Z" />
            <path d="M12 22a4 4 0 0 0 4-4 4 4 0 0 0-4 4Z" />
            <path d="M22 12a4 4 0 0 0-4-4 4 4 0 0 0 4 4Z" />
            <path d="M2 12a4 4 0 0 0 4 4 4 4 0 0 0-4-4Z" />
          </svg>
        );
      case "fresh":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-[#C5A880]">
            {/* Sunburst / freshness spray icon */}
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="5" y1="5" x2="6.5" y2="6.5" />
            <line x1="17.5" y1="17.5" x2="19" y2="19" />
          </svg>
        );
      case "limited":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7 text-[#C5A880]">
            {/* Imperial luxury crown / emblem representing limited editions */}
            <path d="M2 4l3 12h14l3-12-5 6-5-6-5 6-5-6z" />
            <path d="M5 20h14" />
            <circle cx="12" cy="15" r="1" />
          </svg>
        );
    }
  };

  const handleItemClick = (catName: string) => {
    if (onCategoryClick) {
      onCategoryClick(catName);
    } else {
      const element = document.getElementById("best-sellers");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section className="bg-[#FAF9F6] border-y border-[#E5D9D3]/40 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 items-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleItemClick(category.name)}
              id={`cat-btn-${category.id}`}
              className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#121212]/5 transition-all duration-300 group text-left focus:outline-none"
            >
              {/* Circular Icon Container */}
              <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-xs border border-[#E5D9D3]/30 flex-shrink-0 transform group-hover:scale-105 group-hover:shadow transition-all duration-300">
                {renderIcon(category.iconType)}
              </div>

              {/* Title & Description */}
              <div className="overflow-hidden">
                <h3 className="text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.15em] text-[#121212] uppercase group-hover:text-[#C5A880] transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-sans text-[#7C7167] truncate mt-0.5">
                  {category.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
