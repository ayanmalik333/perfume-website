import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shippingLimit = 100;
  const isFreeShipping = subtotal >= shippingLimit;
  const remainingForFreeShipping = shippingLimit - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col h-full border-l border-[#E5D9D3]/40 animate-slideLeft">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5D9D3]/30 flex items-center justify-between bg-white">
            <h2 className="text-[13px] font-bold tracking-[0.2em] text-[#121212] uppercase flex items-center">
              <ShoppingBag className="w-4 h-4 mr-2 text-[#C5A880]" />
              SCENT VAULT ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button
              onClick={onClose}
              className="text-[#4A443F] hover:text-[#121212] p-1.5 rounded-full hover:bg-[#C5A880]/10 transition-colors"
              aria-label="Close Cart"
              id="close-cart-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-[#FAF0E6] p-4 rounded-full text-[#C5A880]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold tracking-[0.2em] text-[#121212] uppercase">
                    Your Vault is Empty
                  </h3>
                  <p className="text-[12px] text-[#7C7167] mt-1 max-w-[240px] mx-auto leading-relaxed">
                    Immerse your senses in our hand-crafted, rare botanical extractions.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-[#121212] hover:bg-[#C5A880] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-xs shadow-xs transition-all duration-300 mt-2"
                >
                  ACQUIRE ESSENCES
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-start space-x-4 pb-4 border-b border-[#E5D9D3]/30"
                  id={`cart-item-${item.product.id}`}
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#FAF9F6] rounded-lg overflow-hidden flex-shrink-0 border border-[#E5D9D3]/20">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col h-24 justify-between text-left">
                    <div>
                      <h4 className="text-[12px] font-semibold text-[#121212] leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-[#C5A880] font-sans uppercase tracking-wider mt-0.5">
                        {item.product.category}
                      </p>
                    </div>

                    {/* Quantity Selector & Trash Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#E5D9D3] rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-[#5C534C] hover:text-[#121212] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-[12px] font-semibold text-[#121212] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-[#5C534C] hover:text-[#121212] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#A78A7E] hover:text-red-600 p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-[13px] font-bold text-[#121212]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-[#E5D9D3]/40 bg-white p-6 space-y-4">
              {/* Shipping progress indicator */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-sans tracking-wide">
                  <span className="text-[#5C534C]">
                    {isFreeShipping ? "🎉 Complimented Shipping unlocked!" : "Complementary Shipping"}
                  </span>
                  <span className="font-bold text-[#121212]">
                    {isFreeShipping ? "FREE" : `$${remainingForFreeShipping.toFixed(2)} away`}
                  </span>
                </div>
                <div className="w-full bg-[#FAF9F6] h-1.5 rounded-full overflow-hidden border border-[#E5D9D3]/20">
                  <div
                    className="bg-[#C5A880] h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min((subtotal / shippingLimit) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-[11px] tracking-[0.15em] text-[#5C534C] uppercase font-semibold">
                  RESERVED TOTAL
                </span>
                <span className="text-[18px] font-serif font-bold text-[#121212]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <p className="text-[10px] text-[#7C7167] text-left leading-normal">
                Taxes & bespoke delivery courier calculations final at checkout.
              </p>

              {/* Checkout Button */}
              <div className="pt-2">
                <button
                  id="checkout-btn"
                  className="w-full bg-[#121212] hover:bg-[#C5A880] text-white text-[11px] font-sans font-bold tracking-[0.2em] uppercase py-4 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98"
                >
                  PROCEED TO PURCHASE
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
