import React, { useState } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "SHOP", href: "#hero" },
    { label: "COLLECTIONS", href: "#best-sellers" },
    { label: "CAMPAIGNS", href: "#new-arrivals" },
    { label: "OUR ESSENCE", href: "#about" },
    { label: "EDITORIAL", href: "#blog" }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E5D9D3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-1 lg:flex-initial">
            <a href="#" className="flex flex-col items-center group">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#121212] transition-colors duration-300 group-hover:text-[#C5A880]">
                LUXURY
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.4em] text-[#C5A880] font-medium -mt-1 font-sans">
                PERFUMES
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-10 xl:space-x-14">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-[11px] tracking-[0.2em] text-[#4A443F] hover:text-[#121212] transition-colors duration-200 font-medium font-sans relative py-2 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action Icons (Search, Account, Cart, Mobile Menu) */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button 
              className="text-[#4A443F] hover:text-[#121212] p-1.5 transition-colors duration-200 hover:scale-105"
              aria-label="Search"
              id="search-btn"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              className="text-[#4A443F] hover:text-[#121212] p-1.5 transition-colors duration-200 hover:scale-105"
              aria-label="Account"
              id="account-btn"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button 
              onClick={onOpenCart}
              className="text-[#4A443F] hover:text-[#121212] p-1.5 transition-colors duration-200 relative hover:scale-105 group"
              aria-label="Shopping Cart"
              id="cart-btn"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#121212] text-[#C5A880] text-[9px] font-sans font-semibold rounded-full w-4 h-4 flex items-center justify-center border border-[#FAF9F6] animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#4A443F] hover:text-[#121212] p-1.5 transition-colors duration-200"
              aria-label="Toggle Menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#FAF9F6] border-b border-[#E5D9D3]/40 shadow-md transition-all duration-300 ease-in-out">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="block text-[12px] tracking-[0.2em] text-[#4A443F] hover:text-[#121212] hover:bg-[#C5A880]/10 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
