import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import BestSellers from "./components/BestSellers";
import BentoGrid from "./components/BentoGrid";
import Testimonials from "./components/Testimonials";
import ServiceFeatures from "./components/ServiceFeatures";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { Product, CartItem } from "./types";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleCategoryClick = (categoryName: string) => {
    // If same category is clicked, toggle back to "ALL"
    if (selectedCategory === categoryName) {
      setSelectedCategory("ALL");
    } else {
      setSelectedCategory(categoryName);
    }
    
    // Smooth scroll down to Best Sellers section
    const element = document.getElementById("best-sellers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F6] selection:bg-[#C5A880]/20 selection:text-[#121212] flex flex-col justify-between">
      
      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Categories Bar */}
        <Categories onCategoryClick={handleCategoryClick} />

        {/* Best Sellers Section */}
        <BestSellers
          onAddToCart={handleAddToCart}
          selectedCategory={selectedCategory}
        />

        {/* Bento Promotion Grid */}
        <BentoGrid />

        {/* Testimonials & Social Grid */}
        <Testimonials />

        {/* Service Perks Bar */}
        <ServiceFeatures />
      </main>

      {/* Footer Navigation */}
      <Footer />

      {/* Shopping Cart Drawer slide-over */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

    </div>
  );
}

