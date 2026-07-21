import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const footerLinks = {
    help: {
      title: "CONCIERGE",
      items: ["Private Consultations", "Shipping & Care", "Bespoke Exchanges", "Contact Us", "Boutique Locator"]
    },
    about: {
      title: "THE ESSENCE",
      items: ["Our Heritage", "Artisanal Oils", "Eco-Conscious Glass", "Creative Director", "House Editorial"]
    },
    account: {
      title: "MEMBERSHIP",
      items: ["Scent Vault Account", "Orders & Reserves", "Vault Wishlist", "Exclusive Benefits", "Bespoke Gift Cards"]
    }
  };

  return (
    <footer id="about" className="bg-[#121212] text-[#ECEAE6] pt-16 pb-12 font-sans border-t border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-[#FAF9F6]/10 text-left">
          
          {/* Column 1: Newsletter Signup (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#C5A880] uppercase">
              SUBSCRIBE TO THE SCENT
            </h4>
            <p className="text-[12px] text-[#ECEAE6]/80 max-w-sm">
              Receive exclusive invitations to private launches, artisanal campaigns & olfactory narratives.
            </p>

            {subscribed ? (
              <div className="bg-[#C5A880]/10 border border-[#C5A880]/20 p-3 rounded text-[12px] text-[#C5A880] animate-fadeIn">
                ✨ Entrusted. You've entered our inner circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md w-full border border-[#C5A880]/30 rounded-xs overflow-hidden">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1C1C1E] text-[#ECEAE6] px-4 py-3 text-[12px] tracking-wide placeholder-[#7C7167] focus:outline-none flex-grow border-none"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  id="newsletter-subscribe-btn"
                  className="bg-[#C5A880] hover:bg-white hover:text-[#121212] text-[#121212] text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-3 transition-all duration-300 flex-shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

          {/* Columns 2-4: Concierge, The Essence, Membership (Spans 5 columns) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 md:gap-8">
            {Object.values(footerLinks).map((column, colIdx) => (
              <div key={colIdx} className="space-y-4">
                <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#C5A880] uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-2.5 text-[12px] text-[#ECEAE6]/70">
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-white transition-colors duration-150"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 5: Brand Identity (Spans 3 columns) */}
          <div className="lg:col-span-3 flex flex-col justify-between items-start md:items-end lg:items-end space-y-6 md:space-y-0 text-left md:text-right">
            
            {/* Logo */}
            <div className="flex flex-col items-start md:items-end">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.2em] text-white">
                LUXURY
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.4em] text-[#C5A880] font-medium -mt-1 uppercase">
                PERFUMES
              </span>
            </div>

            {/* Copyright */}
            <div className="text-[11px] text-[#ECEAE6]/60">
              <p>© 2026 Luxury Perfumes. All Rights Reserved.</p>
            </div>

          </div>

        </div>

        {/* Bottom Credits / Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#ECEAE6]/50 space-y-2 sm:space-y-0">
          <p>Hand-crafted extractions formulated from elite botanical reserves.</p>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
