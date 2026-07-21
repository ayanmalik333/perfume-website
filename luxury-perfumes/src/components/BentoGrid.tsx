export default function BentoGrid() {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="new-arrivals" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Block 1 (Left): THE OUD COLLECTION */}
          <div className="relative group overflow-hidden rounded-2xl h-[420px] md:h-[460px] flex flex-col justify-end p-8 text-left border border-[#E5D9D3]/30 shadow-xs hover:shadow-md transition-shadow duration-300">
            {/* Background Image with Dark overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800"
                alt="Dark Oud extract perfume bottle with smoke and gold"
                className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#121212]/40 mix-blend-multiply transition-colors duration-300 group-hover:bg-[#121212]/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-[0.05em] leading-tight">
                  THE OUD <br />COLLECTION
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#FAF9F6]/90 font-sans tracking-wide">
                  Smoked resins. Noble leather. Pure depth.
                </p>
              </div>
              <button
                onClick={() => scrollToSection("best-sellers")}
                id="shop-oud-btn"
                className="bg-[#C5A880] hover:bg-white text-[#121212] text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-xs shadow-xs transition-all duration-300"
              >
                DISCOVER OUD
              </button>
            </div>
          </div>

          {/* Block 2 (Center): SIGNATURE ESSENCE */}
          <div className="relative group overflow-hidden rounded-2xl h-[420px] md:h-[460px] flex flex-col justify-end p-8 text-left border border-[#E5D9D3]/40 bg-[#FAF9F6] shadow-xs hover:shadow-md transition-shadow duration-300">
            {/* Elegant Perfume Flask in Background */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
                alt="Elegant glass signature fragrance flask"
                className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/95 via-[#FAF9F6]/25 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#121212] tracking-[0.05em] leading-tight">
                  SIGNATURE <br />ESSENCE
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#4A443F] font-sans tracking-wide">
                  Rare botanicals custom blended for iconic silage.
                </p>
              </div>
              <button
                onClick={() => scrollToSection("best-sellers")}
                id="shop-signature-btn"
                className="bg-[#121212] hover:bg-[#C5A880] text-white text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-xs shadow-xs transition-all duration-300"
              >
                EXPLORE SIGNATURES
              </button>
            </div>
          </div>

          {/* Block 3 (Right): LIMITED EDITIONS */}
          <div className="relative group overflow-hidden rounded-2xl h-[420px] md:h-[460px] flex flex-col justify-end p-8 text-left border border-[#E5D9D3]/30 shadow-xs hover:shadow-md transition-shadow duration-300">
            {/* Background Image of Golden Flask */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800"
                alt="Golden limited edition luxury bottle casing"
                className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#121212]/50 mix-blend-multiply transition-colors duration-300 group-hover:bg-[#121212]/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/35 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-[0.05em] leading-tight">
                  LIMITED <br />EDITIONS
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#FAF9F6]/90 font-sans tracking-wide">
                  Hand-crafted gilded crystal. Extremely rare extractions.
                </p>
              </div>
              <button
                onClick={() => scrollToSection("best-sellers")}
                id="shop-limited-btn"
                className="bg-[#C5A880] hover:bg-white text-[#121212] text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-xs shadow-xs transition-all duration-300"
              >
                VIEW RARE BOTTLINGS
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
