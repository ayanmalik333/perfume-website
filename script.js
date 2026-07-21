// Product and Category Data
const products = [
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

const categories = [
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

const socialImages = [
  "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=400"
];

// Configuration for Animation
const frameCount = 240;
const ease = 0.08; 
const framePath = (index) => `./frames/${index.toString().padStart(4, '0')}.jpg`;

// State Variables
let animationFrames = new Array(frameCount);
let loadedCount = 0;
let firstFrameLoaded = false;
let currentFrame = 0;
let targetFrame = 0;
let lastRenderedFrame = -1;
let isRendering = false;
let selectedCategory = "ALL";
let cart = [];

// Elements
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const categoryBar = document.getElementById('category-bar');
const productGrid = document.getElementById('product-grid');
const socialGrid = document.getElementById('social-grid');
const cartBadge = document.getElementById('cart-badge');
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const cartPanel = document.getElementById('cart-panel');
const cartDrawerCount = document.getElementById('cart-drawer-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartFooter = document.getElementById('cart-footer');
const cartSubtotal = document.getElementById('cart-subtotal');
const shippingStatusText = document.getElementById('shipping-status-text');
const shippingAmountText = document.getElementById('shipping-amount-text');
const shippingProgressBar = document.getElementById('shipping-progress-bar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOpenIcon = document.getElementById('mobile-menu-open-icon');
const mobileMenuCloseIcon = document.getElementById('mobile-menu-close-icon');

// 1. Image Preloading
function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    
    img.onload = () => {
      loadedCount++;
      if (i === 1 && !firstFrameLoaded) {
        firstFrameLoaded = true;
        onFirstImageLoaded();
      }
    };
    
    img.onerror = () => {
      console.error(`Failed to load frame ${i}: ${img.src}. Check paths or case sensitivity.`);
      loadedCount++;
    };
    
    img.src = framePath(i);
    animationFrames[i - 1] = img;
  }
}

function onFirstImageLoaded() {
  resizeCanvas();
  updateTargetFrame();
  currentFrame = targetFrame;
  if (!isRendering) {
    isRendering = true;
    requestAnimationFrame(renderLoop);
  }
}

// 2. Responsive Canvas Cover Fitting
function drawImageCover(img) {
  if (!img || !img.complete || img.naturalWidth === 0) return;
  const dpr = window.devicePixelRatio || 1;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  
  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  
  let drawWidth, drawHeight, offsetX, offsetY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imgRatio;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

function updateTargetFrame() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = maxScroll <= 0 ? 0 : scrollY / maxScroll;
  targetFrame = scrollFraction * (frameCount - 1);
  
  if (!isRendering) {
    isRendering = true;
    requestAnimationFrame(renderLoop);
  }
}

function renderLoop() {
  currentFrame += (targetFrame - currentFrame) * ease;
  if (currentFrame < 0) currentFrame = 0;
  if (currentFrame > frameCount - 1) currentFrame = frameCount - 1;
  
  const roundedFrame = Math.round(currentFrame);
  
  if (roundedFrame !== lastRenderedFrame) {
    const img = animationFrames[roundedFrame];
    drawImageCover(img);
    lastRenderedFrame = roundedFrame;
  }
  
  if (Math.abs(targetFrame - currentFrame) > 0.01) {
    requestAnimationFrame(renderLoop);
  } else {
    isRendering = false;
  }
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  
  const roundedFrame = Math.round(currentFrame);
  const img = animationFrames[roundedFrame];
  drawImageCover(img);
}

// 3. UI Component Renderers
function renderCategoryBar() {
  categoryBar.innerHTML = categories.map(cat => {
    let iconSvg = '';
    switch (cat.iconType) {
      case "signature":
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><rect x="7" y="9" width="10" height="11" rx="2"></rect><path d="M10 5h4v4h-4z"></path><line x1="7" y1="13" x2="17" y2="13"></line><circle cx="12" cy="15" r="1.5"></circle></svg>`;
        break;
      case "oud":
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><path d="M12 2C12 2 6 9 6 13C6 16.3 8.7 19 12 19C15.3 19 18 16.3 18 13C18 9 12 2 12 2Z"></path><path d="M12 7c-2 3.5-3 5-3 7"></path></svg>`;
        break;
      case "floral":
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><circle cx="12" cy="12" r="3"></circle><path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4-4Z"></path><path d="M12 22a4 4 0 0 0 4-4 4 4 0 0 0-4 4Z"></path><path d="M22 12a4 4 0 0 0-4-4 4 4 0 0 0 4 4Z"></path><path d="M2 12a4 4 0 0 0 4 4 4 4 0 0 0-4-4Z"></path></svg>`;
        break;
      case "fresh":
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="5" y1="5" x2="6.5" y2="6.5"></line><line x1="17.5" y1="17.5" x2="19" y2="19"></line></svg>`;
        break;
      case "limited":
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><path d="M2 4l3 12h14l3-12-5 6-5-6-5 6-5-6z"></path><path d="M5 20h14"></path><circle cx="12" cy="15" r="1"></circle></svg>`;
        break;
    }

    return `
      <button onclick="handleCategorySelect('${cat.name}')" id="cat-btn-${cat.id}" class="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#FAF9F6]/5 transition-all duration-300 group text-left focus:outline-none">
        <div class="bg-darkBg rounded-full w-14 h-14 flex items-center justify-center shadow-md border border-accent/15 flex-shrink-0 transform group-hover:scale-105 group-hover:border-accent transition-all duration-300">
          ${iconSvg}
        </div>
        <div class="overflow-hidden">
          <h3 class="text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.15em] text-[#ECEAE6] uppercase group-hover:text-accent transition-colors duration-200">
            ${cat.name}
          </h3>
          <p class="text-[10px] sm:text-[11px] font-sans text-[#a0a0a5] truncate mt-0.5">
            ${cat.description}
          </p>
        </div>
      </button>
    `;
  }).join('');
}

function renderProducts() {
  const filtered = selectedCategory === "ALL" 
    ? products 
    : products.filter(p => p.category.toUpperCase() === selectedCategory.toUpperCase());

  productGrid.innerHTML = filtered.map(prod => {
    return `
      <div class="group flex flex-col justify-between h-full bg-darkBg/30 p-3 rounded-2xl border border-accent/10 transition-all duration-300 relative animate-fadeIn" id="prod-card-${prod.id}">
        <div class="aspect-[4/5] bg-darkBg/60 rounded-xl overflow-hidden relative border border-accent/5 flex items-center justify-center p-4 group-hover:shadow-md transition-all duration-500">
          <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover rounded-lg transform duration-700 ease-out group-hover:scale-[1.03]">
          <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        <div class="pt-4 flex flex-col justify-between flex-grow">
          <div class="space-y-1.5 text-left">
            <span class="text-[9px] font-sans font-semibold tracking-wider text-accent uppercase">${prod.category}</span>
            <h3 class="text-[13px] sm:text-[14px] font-sans font-medium text-lightWarm leading-tight min-h-[40px] group-hover:text-accent transition-colors duration-200">${prod.name}</h3>
            <div class="flex items-center space-x-1.5">
              <div class="flex items-center text-accent">
                ${`<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" class="w-3 h-3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`.repeat(5)}
              </div>
              <span class="text-[10px] font-sans text-[#a0a0a5]">(${prod.reviewsCount})</span>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 mt-auto">
            <span class="text-[14px] sm:text-[15px] font-sans font-bold text-lightWarm">$${prod.price.toFixed(2)}</span>
            <button onclick="handleAddToCart('${prod.id}')" id="add-to-cart-${prod.id}" class="rounded-full w-9 h-9 flex items-center justify-center border border-accent/15 bg-darkBg text-lightWarm hover:bg-accent hover:border-accent hover:text-darkBg transition-all duration-300 shadow-sm active:scale-90" aria-label="Add ${prod.name} to Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderSocialGrid() {
  socialGrid.innerHTML = socialImages.map((src, index) => {
    return `
      <div class="aspect-square bg-darkBg/60 rounded-xl overflow-hidden border border-accent/15 group relative shadow-sm hover:shadow-md transition-all duration-300">
        <img src="${src}" alt="Social Aesthetic ${index + 1}" class="w-full h-full object-cover transform duration-500 ease-out group-hover:scale-105">
        <div class="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    `;
  }).join('');
}

// 4. Interactive Operations
window.handleCategorySelect = (categoryName) => {
  if (selectedCategory === categoryName) {
    selectedCategory = "ALL";
  } else {
    selectedCategory = categoryName;
  }
  renderProducts();
  document.getElementById("best-sellers").scrollIntoView({ behavior: "smooth", block: "start" });
};

// 5. Stateful Shopping Cart
window.handleAddToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }

  // Animation Feedbacks
  const btn = document.getElementById(`add-to-cart-${productId}`);
  if (btn) {
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    btn.classList.add('bg-accent', 'border-accent', 'text-darkBg');
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`;
      btn.classList.remove('bg-accent', 'border-accent', 'text-darkBg');
    }, 1500);
  }

  updateCartBadge();
  openCartDrawer();
  renderCartDrawer();
};

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalCount > 0) {
    cartBadge.textContent = totalCount;
    cartBadge.classList.remove('hidden');
  } else {
    cartBadge.classList.add('hidden');
  }
}

function openCartDrawer() {
  cartDrawer.classList.remove('hidden');
  document.body.classList.add('no-scroll');
  setTimeout(() => {
    cartBackdrop.classList.add('backdrop-visible');
    cartPanel.classList.remove('translate-x-full');
  }, 10);
}

function closeCartDrawer() {
  cartBackdrop.classList.remove('backdrop-visible');
  cartPanel.classList.add('translate-x-full');
  setTimeout(() => {
    cartDrawer.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }, 300);
}

window.changeQuantity = (productId, delta) => {
  const item = cart.find(i => i.product.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.product.id !== productId);
  }
  updateCartBadge();
  renderCartDrawer();
};

window.removeFromCart = (productId) => {
  cart = cart.filter(i => i.product.id !== productId);
  updateCartBadge();
  renderCartDrawer();
};

function renderCartDrawer() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartDrawerCount.textContent = totalCount;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
        <div class="bg-[#FAF0E6] p-4 rounded-full text-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-8 h-8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        </div>
        <div>
          <h3 class="text-[13px] font-bold tracking-[0.2em] text-[#121212] uppercase">Your Vault is Empty</h3>
          <p class="text-[12px] text-[#7C7167] mt-1 max-w-[240px] mx-auto leading-relaxed">
            Immerse your senses in our hand-crafted, rare botanical extractions.
          </p>
        </div>
        <button onclick="closeCartDrawer()" class="bg-[#121212] hover:bg-accent hover:text-darkBg text-white text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-xs transition-all duration-300 mt-2">
          ACQUIRE ESSENCES
        </button>
      </div>
    `;
    cartFooter.classList.add('hidden');
  } else {
    // Render Items
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="flex items-start space-x-4 pb-4 border-b border-accent/10">
        <div class="w-20 h-24 bg-[#FAF9F6] rounded-lg overflow-hidden flex-shrink-0 border border-accent/5">
          <img src="${item.product.image}" alt="${item.product.name}" class="w-full h-full object-cover">
        </div>
        <div class="flex-1 flex flex-col h-24 justify-between text-left">
          <div>
            <h4 class="text-[12px] font-semibold text-[#121212] leading-tight">${item.product.name}</h4>
            <p class="text-[10px] text-accent font-sans uppercase tracking-wider mt-0.5">${item.product.category}</p>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center border border-[#E5D9D3] rounded-md bg-white">
              <button onclick="changeQuantity('${item.product.id}', -1)" class="px-2 py-1 text-[#5C534C] hover:text-[#121212] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-3 h-3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <span class="px-2 text-[12px] font-semibold text-[#121212] min-w-[20px] text-center">${item.quantity}</span>
              <button onclick="changeQuantity('${item.product.id}', 1)" class="px-2 py-1 text-[#5C534C] hover:text-[#121212] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-3 h-3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <button onclick="removeFromCart('${item.product.id}')" class="text-[#A78A7E] hover:text-red-600 p-1.5 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
        <div class="text-right">
          <span class="text-[13px] font-bold text-[#121212]">$${(item.product.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    `).join('');

    // Update Footer Calculations
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    const limit = 100;
    if (subtotal >= limit) {
      shippingStatusText.textContent = "🎉 Complimentary Shipping unlocked!";
      shippingAmountText.textContent = "FREE";
      shippingProgressBar.style.width = "100%";
    } else {
      shippingStatusText.textContent = "Complementary Shipping";
      shippingAmountText.textContent = `$${(limit - subtotal).toFixed(2)} away`;
      shippingProgressBar.style.width = `${(subtotal / limit) * 100}%`;
    }

    cartFooter.classList.remove('hidden');
  }
}

// 6. Navigation and Form Event Handlers
mobileMenuBtn.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  if (isHidden) {
    mobileMenu.classList.remove('hidden');
    mobileMenuOpenIcon.classList.add('hidden');
    mobileMenuCloseIcon.classList.remove('hidden');
  } else {
    mobileMenu.classList.add('hidden');
    mobileMenuOpenIcon.classList.remove('hidden');
    mobileMenuCloseIcon.classList.add('hidden');
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuOpenIcon.classList.remove('hidden');
    mobileMenuCloseIcon.classList.add('hidden');
  });
});

// Shop now scroll
document.getElementById('hero-shop-now-btn').addEventListener('click', () => {
  document.getElementById('best-sellers').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('.bento-shop-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('best-sellers').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Cart Drawer open/close triggers
document.getElementById('cart-btn').addEventListener('click', openCartDrawer);
document.getElementById('close-cart-btn').addEventListener('click', closeCartDrawer);
cartBackdrop.addEventListener('click', closeCartDrawer);

// Newsletter Success Simulation
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('newsletter-form').classList.add('hidden');
  document.getElementById('newsletter-success').classList.remove('hidden');
});

// Window events
window.addEventListener('scroll', updateTargetFrame, { passive: true });
window.addEventListener('resize', resizeCanvas);

// Kickstart Preload & Rendering
renderCategoryBar();
renderProducts();
renderSocialGrid();
preloadImages();
