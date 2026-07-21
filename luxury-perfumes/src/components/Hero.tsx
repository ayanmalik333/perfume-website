import React from "react";
import { Sparkles, GlassWater, Flame } from "lucide-react";

export default function Hero() {
  const handleShopNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("best-sellers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 md:py-28 lg:py-36 bg-[#FAF9F6]">
      {/* Soft atmospheric background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A880]/10 blur-3xl rounded-full z-0 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center space-y-8">
          
          <div className="space-y-4">
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.3em] text-[#C5A880] uppercase block animate-fadeIn">
              EXQUISITE BLENDS
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#121212] leading-[1.12] tracking-tight animate-fadeIn max-w-3xl mx-auto">
              The Art of Liquid Architecture.
            </h1>
          </div>

          <p className="font-sans text-[16px] sm:text-[18px] text-[#4A443F] leading-relaxed max-w-2xl mx-auto animate-fadeIn font-light">
            Bespoke artisanal essences. Rare global botanicals. <br className="hidden sm:block" />
            Captured memory in timeless crystalline vessels.
          </p>

          <div className="pt-4">
            <button
              onClick={handleShopNow}
              id="hero-shop-now-btn"
              className="inline-flex items-center justify-center bg-[#121212] hover:bg-[#C5A880] text-white text-[11px] font-sans font-semibold tracking-[0.2em] uppercase px-10 py-4.5 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98"
            >
              EXPLORE SCENTS <span className="ml-2 font-sans">→</span>
            </button>
          </div>

          {/* Quality Seals Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-12 sm:pt-16 border-t border-[#E5D9D3]/60 w-full max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-[#FAF0E6] p-2.5 rounded-full text-[#C5A880] flex-shrink-0">
                <Sparkles className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#121212] uppercase">
                  100% PURE
                </h4>
                <p className="text-[10px] font-sans text-[#7C7167] tracking-normal mt-0.5 leading-normal">
                  RAW ESSENTIAL OILS
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-[#FAF0E6] p-2.5 rounded-full text-[#C5A880] flex-shrink-0">
                <GlassWater className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#121212] uppercase">
                  ARTISANAL
                </h4>
                <p className="text-[10px] font-sans text-[#7C7167] tracking-normal mt-0.5 leading-normal">
                  HAND POURED BATCHES
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-[#FAF0E6] p-2.5 rounded-full text-[#C5A880] flex-shrink-0">
                <Flame className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="text-[11px] font-sans font-bold tracking-[0.15em] text-[#121212] uppercase">
                  LONG SILAGE
                </h4>
                <p className="text-[10px] font-sans text-[#7C7167] tracking-normal mt-0.5 leading-normal">
                  12HR+ EXTRACTS
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

