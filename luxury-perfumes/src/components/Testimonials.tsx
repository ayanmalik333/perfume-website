import { socialImages } from "../data";

export default function Testimonials() {
  
  // Custom SVG social icons for uniformity and luxury design
  const renderSocialIcon = (platform: "instagram" | "tiktok" | "youtube" | "pinterest") => {
    switch (platform) {
      case "instagram":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4.5 h-4.5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case "tiktok":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4.5 h-4.5">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          </svg>
        );
      case "youtube":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4.5 h-4.5">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
          </svg>
        );
      case "pinterest":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4.5 h-4.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <path d="M19 12H5" />
            <circle cx="12" cy="12" r="7" />
          </svg>
        );
    }
  };

  return (
    <section id="blog" className="py-16 md:py-20 bg-white border-t border-[#E5D9D3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Block (Sophia M. Testimonial Quote) */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-4 text-left lg:pr-6">
            {/* Elegant Double Quote Mark */}
            <span className="font-serif text-[72px] text-[#C5A880]/25 leading-none h-6 -mb-6">
              “
            </span>
            <blockquote className="font-sans text-[15px] sm:text-[16px] italic text-[#4A443F] leading-relaxed tracking-wide">
              Santal Nobile is liquid poetry. The warm cardamom and velvet cedar linger for twelve hours, unfolding with remarkable depth.
            </blockquote>
            <cite className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.15em] text-[#121212] uppercase not-italic">
              — Lady Clara V., Paris
            </cite>
          </div>

          {/* Center Block (5 Square Images in Row) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
              {socialImages.map((imgSrc, index) => (
                <div
                  key={index}
                  className="aspect-square bg-[#FAF9F6] rounded-xl overflow-hidden border border-[#E5D9D3]/40 group relative shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={imgSrc}
                    alt={`Luxury Perfumes Social Aesthetic Grid Image ${index + 1}`}
                    className="w-full h-full object-cover transform duration-500 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle hover soft gold overlay */}
                  <div className="absolute inset-0 bg-[#C5A880]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Block (Join Customers + Follow Us Button) */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start space-y-5 text-center lg:text-left lg:pl-6">
            <div className="space-y-1">
              <h4 className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.2em] text-[#121212] uppercase">
                JOIN THE ESCAPE
              </h4>
              <p className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-[#C5A880] uppercase">
                50K+ CONNOISSEURS
              </p>
            </div>

            <button
              id="follow-us-btn"
              className="w-full sm:w-auto bg-[#121212] hover:bg-[#C5A880] text-white text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-10 py-3.5 shadow-md hover:shadow-lg transition-all duration-300 active:scale-98"
            >
              FOLLOW THE SCENT
            </button>

            {/* Micro Social Circle Links */}
            <div className="flex items-center space-x-3.5 pt-1">
              {(["instagram", "tiktok", "youtube", "pinterest"] as const).map((platform) => (
                <a
                  key={platform}
                  href={`#follow-${platform}`}
                  className="border border-[#E5D9D3] hover:border-[#C5A880] text-[#7C7167] hover:text-[#C5A880] rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 hover:scale-105"
                  aria-label={`Follow Luxury Perfumes on ${platform}`}
                >
                  {renderSocialIcon(platform)}
                </a>
              ))}
            </div>
          </div>

          {/* End of Section Grid */}
        </div>
      </div>
    </section>
  );
}
