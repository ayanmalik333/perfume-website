document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a, #mobile-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-lightWarm');
            link.classList.remove('text-[#a0a0a5]');
            const span = link.querySelector('span');
            if (span) {
                span.classList.remove('w-0');
                span.classList.add('w-full');
            }
        }
    });

            // Register GSAP ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);

            // ==========================================
            // 1. DATA DEFINITIONS
            // ==========================================
            const categories = [
                { id: "cat-signature", name: "Signature Collection", description: "Timeless & Iconic", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><rect x="7" y="9" width="10" height="11" rx="2" /><path d="M10 5h4v4h-4z" /><line x1="7" y1="13" x2="17" y2="13" /><circle cx="12" cy="15" r="1.5" /></svg>` },
                { id: "cat-oud", name: "Oud Collection", description: "Mysterious & Rich", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><path d="M12 2C12 2 6 9 6 13C6 16.3 8.7 19 12 19C15.3 19 18 16.3 18 13C18 9 12 2 12 2Z" /><path d="M12 7c-2 3.5-3 5-3 7" /></svg>` },
                { id: "cat-floral", name: "Floral Collection", description: "Velvety & Intoxicating", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><circle cx="12" cy="12" r="3" /><path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4-4Z" /><path d="M12 22a4 4 0 0 0 4-4 4 4 0 0 0-4 4Z" /><path d="M22 12a4 4 0 0 0-4-4 4 4 0 0 0 4 4Z" /><path d="M2 12a4 4 0 0 0 4 4 4 4 0 0 0-4-4Z" /></svg>` },
                { id: "cat-fresh", name: "Fresh Collection", description: "Crisp & Scent-Awakening", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /><line x1="5" y1="5" x2="6.5" y2="6.5" /><line x1="17.5" y1="17.5" x2="19" y2="19" /></svg>` },
                { id: "cat-limited", name: "Limited Edition", description: "Extremely Rare Blends", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-7 h-7 text-accent"><path d="M2 4l3 12h14l3-12-5 6-5-6-5 6-5-6z" /><path d="M5 20h14" /><circle cx="12" cy="15" r="1" /></svg>` }
            ];

            const products = [
                { 
                    id: "perfume-1", 
                    name: "Santal Nobile Eau de Parfum", 
                    category: "Signature Collection", 
                    price: 185.00, 
                    rating: 4.9, 
                    reviewsCount: 1420, 
                    image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                    description: "An iconic, timeless fragrance featuring the warmth of sandalwood interlaced with subtle amber and floral undertones. Handcrafted for the modern connoisseur.",
                    features: ["Top: Bergamot, Cardamom", "Heart: Sandalwood, Violet", "Base: Amber, Musk", "Volume: 100ml / 3.4 oz", "Endurance: 12+ hours"],
                    images: [
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a"
                    ]
                },
                { 
                    id: "perfume-2", 
                    name: "Oud Imperial Extrait de Parfum", 
                    category: "Oud Collection", 
                    price: 245.00, 
                    rating: 4.9, 
                    reviewsCount: 897, 
                    image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                    description: "A mysterious and rich composition built around the rarest, most precious agarwood. Designed to leave a lasting, unforgettable trail.",
                    features: ["Top: Saffron, Rose", "Heart: Rare Oud, Leather", "Base: Patchouli, Vanilla", "Volume: 50ml / 1.7 oz", "Endurance: 24+ hours"],
                    images: [
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a"
                    ]
                },
                { 
                    id: "perfume-3", 
                    name: "Rose Extase Eau de Parfum", 
                    category: "Floral Collection", 
                    price: 165.00, 
                    rating: 4.8, 
                    reviewsCount: 1102, 
                    image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                    description: "Velvety and intoxicating, an exquisite blend of pure Bulgarian rose absolute enveloped in soft musk and sweet woods.",
                    features: ["Top: Pink Pepper, Lychee", "Heart: Bulgarian Rose, Peony", "Base: White Musk, Cedarwood", "Volume: 100ml / 3.4 oz", "Endurance: 10+ hours"],
                    images: [
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a"
                    ]
                },
                { 
                    id: "perfume-4", 
                    name: "Neroli Marine Eau de Parfum", 
                    category: "Fresh Collection", 
                    price: 155.00, 
                    rating: 4.7, 
                    reviewsCount: 741, 
                    image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                    description: "Crisp and scent-awakening. A burst of Mediterranean citrus and marine accords for the perfect summer escape.",
                    features: ["Top: Lemon, Mandarin, Sea Salt", "Heart: Neroli, Orange Blossom", "Base: Vetiver, Ambergris", "Volume: 100ml / 3.4 oz", "Endurance: 8+ hours"],
                    images: [
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a"
                    ]
                },
                { 
                    id: "perfume-5", 
                    name: "Or Noir Limited Edition", 
                    category: "Limited Edition", 
                    price: 320.00, 
                    rating: 5.0, 
                    reviewsCount: 314, 
                    image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                    description: "Extremely rare and exclusive blends. Bottled in hand-polished obsidian glass with gold leaf details.",
                    features: ["Top: Black Truffle, Ylang-Ylang", "Heart: Black Orchid, Rum", "Base: Incense, Dark Chocolate", "Volume: 50ml / 1.7 oz", "Endurance: 24+ hours"],
                    images: [
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a"
                    ]
                }
            ];

            const socialImages = [
                "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a"
            ];

            let cart = [];

            // ==========================================
            // 2. DOM RENDERERS
            // ==========================================
            const categoryBar = document.getElementById('category-bar');
            if (categoryBar) {
                categoryBar.innerHTML = categories.map(cat => `
                    <button class="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group text-left focus:outline-none">
                        <div class="bg-[#1c1c1e] rounded-full w-14 h-14 flex items-center justify-center shadow-xs border border-accent/20 flex-shrink-0 transform group-hover:scale-105 transition-all duration-300">
                            ${cat.icon}
                        </div>
                        <div class="overflow-hidden">
                            <h3 class="text-[11px] sm:text-[12px] font-sans font-bold tracking-[0.15em] text-lightWarm uppercase group-hover:text-accent transition-colors duration-200">${cat.name}</h3>
                            <p class="text-[10px] sm:text-[11px] font-sans text-[#a0a0a5] truncate mt-0.5">${cat.description}</p>
                        </div>
                    </button>
                `).join('');
            }

            const productGrid = document.getElementById('product-grid');
            if (productGrid) {
                productGrid.innerHTML = products.map(prod => `
                    <div class="group flex flex-col justify-between h-full bg-[#121214] rounded-xl p-4 border border-accent/15 hover:border-accent/40 transition-all duration-300">
                        <a href="product-detail.html?id=${prod.id}" class="block relative">
                            <div class="aspect-[4/5] bg-[#000] rounded-lg overflow-hidden relative border border-accent/10 flex items-center justify-center p-2">
                                <img loading="lazy" decoding="async" src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover rounded transform duration-700 ease-out group-hover:scale-105">
                            </div>
                        </a>
                        <div class="pt-4 flex flex-col justify-between flex-grow">
                            <div class="space-y-1.5 text-left">
                                <span class="text-[9px] font-sans font-semibold tracking-wider text-accent uppercase">${prod.category}</span>
                                <a href="product-detail.html?id=${prod.id}" class="block">
                                    <h3 class="text-[13px] sm:text-[14px] font-sans font-medium text-lightWarm leading-tight min-h-[40px] hover:text-accent transition-colors duration-200">${prod.name}</h3>
                                </a>
                                <div class="flex items-center space-x-1.5">
                                    <div class="flex items-center text-accent">
                                        ${'&#9733;'.repeat(5)}
                                    </div>
                                    <span class="text-[10px] font-sans text-[#a0a0a5]">(${prod.reviewsCount})</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-between pt-4 mt-auto">
                                <span class="text-[14px] sm:text-[15px] font-sans font-bold text-lightWarm">$${prod.price.toFixed(2)}</span>
                                <button onclick="addToCart('${prod.id}')" class="rounded-full w-9 h-9 flex items-center justify-center bg-accent text-darkBg hover:bg-white transition-all duration-300 shadow-sm active:scale-90" aria-label="Add to cart">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            const socialGrid = document.getElementById('social-grid');
            if (socialGrid) {
                socialGrid.innerHTML = socialImages.map((src, index) => `
                    <div class="aspect-square bg-[#121214] rounded-xl overflow-hidden border border-accent/20 group relative">
                        <img loading="lazy" decoding="async" src="${src}" alt="Social Aesthetic ${index + 1}" class="w-full h-full object-cover transform duration-500 ease-out group-hover:scale-105">
                        <div class="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                `).join('');
            }



            // ==========================================
            // 3. CART SYSTEM FUNCTIONS
            // ==========================================
            window.addToCart = (id) => {
                const prod = products.find(p => p.id === id);
                if (!prod) return;
                const existing = cart.find(item => item.product.id === id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({ product: prod, quantity: 1 });
                }
                updateCartUI();
                openCart();
            };

            window.changeQty = (id, delta) => {
                const item = cart.find(i => i.product.id === id);
                if (!item) return;
                item.quantity += delta;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.product.id !== id);
                }
                updateCartUI();
            };

            function updateCartUI() {
                const count = cart.reduce((sum, item) => sum + item.quantity, 0);
                const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

                const cartBadge = document.getElementById('cart-badge');
                if (cartBadge) {
                    cartBadge.innerText = count;
                    cartBadge.classList.toggle('hidden', count === 0);
                }

                const cartDrawerCount = document.getElementById('cart-drawer-count');
                if (cartDrawerCount) cartDrawerCount.innerText = count;

                const cartItemsContainer = document.getElementById('cart-items-container');
                const cartFooter = document.getElementById('cart-footer');

                if (cartItemsContainer) {
                    if (cart.length === 0) {
                        cartItemsContainer.innerHTML = `
                            <div class="flex flex-col items-center justify-center h-64 text-center space-y-4">
                                <div class="bg-[#FAF9F6] p-4 rounded-full border border-accent/20 text-[#a0a0a5]">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-8 h-8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line></svg>
                                </div>
                                <p class="text-[13px] font-sans text-[#5C534C] font-medium tracking-wide">Your Scent Vault is empty.</p>
                            </div>
                        `;
                        if (cartFooter) cartFooter.classList.add('hidden');
                    } else {
                        cartItemsContainer.innerHTML = cart.map(item => `
                            <div class="flex items-center space-x-4 py-3 border-b border-accent/10">
                                <img loading="lazy" decoding="async" src="${item.product.image}" class="w-16 h-20 object-cover rounded border border-accent/15">
                                <div class="flex-grow">
                                    <h4 class="text-[12px] font-bold text-darkBg leading-tight">${item.product.name}</h4>
                                    <p class="text-[10px] text-[#7C7167] mt-0.5">$${item.product.price.toFixed(2)}</p>
                                    <div class="flex items-center space-x-2 mt-2">
                                        <button onclick="changeQty('${item.product.id}', -1)" class="w-5 h-5 rounded bg-accent/20 flex items-center justify-center text-xs font-bold text-darkBg hover:bg-accent/40">-</button>
                                        <span class="text-xs font-bold px-1">${item.quantity}</span>
                                        <button onclick="changeQty('${item.product.id}', 1)" class="w-5 h-5 rounded bg-accent/20 flex items-center justify-center text-xs font-bold text-darkBg hover:bg-accent/40">+</button>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <span class="text-[12px] font-bold text-darkBg">$${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        `).join('');

                        if (cartFooter) {
                            cartFooter.classList.remove('hidden');
                            document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
                            const progress = Math.min((subtotal / 300) * 100, 100);
                            document.getElementById('shipping-progress-bar').style.width = `${progress}%`;
                            const remaining = 300 - subtotal;
                            document.getElementById('shipping-amount-text').innerText = remaining > 0 ? `$${remaining.toFixed(2)} away` : 'UNLOCKED';
                        }
                    }
                }
            }

            const cartBtn = document.getElementById('cart-btn');
            const closeCartBtn = document.getElementById('close-cart-btn');
            const cartDrawer = document.getElementById('cart-drawer');
            const cartBackdrop = document.getElementById('cart-backdrop');
            const cartPanel = document.getElementById('cart-panel');

            function openCart() {
                if (!cartDrawer) return;
                cartDrawer.classList.remove('hidden');
                setTimeout(() => {
                    cartBackdrop.classList.remove('opacity-0');
                    cartPanel.classList.remove('translate-x-full');
                }, 10);
            }

            function closeCart() {
                if (!cartDrawer) return;
                cartBackdrop.classList.add('opacity-0');
                cartPanel.classList.add('translate-x-full');
                setTimeout(() => {
                    cartDrawer.classList.add('hidden');
                }, 300);
            }

            if (cartBtn) cartBtn.addEventListener('click', openCart);
            if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
            if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

            // Newsletter submission
            const newsletterForm = document.getElementById('newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    newsletterForm.classList.add('hidden');
                    document.getElementById('newsletter-success').classList.remove('hidden');
                });
            }

            // Mobile menu toggle
            const mobileBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const openIcon = document.getElementById('mobile-menu-open-icon');
            const closeIcon = document.getElementById('mobile-menu-close-icon');

            if (mobileBtn && mobileMenu) {
                mobileBtn.addEventListener('click', () => {
                    const isHidden = mobileMenu.classList.contains('hidden');
                    mobileMenu.classList.toggle('hidden', !isHidden);
                    openIcon.classList.toggle('hidden', isHidden);
                    closeIcon.classList.toggle('hidden', !isHidden);
                });
            }

            // Smooth scroll for hero button
            const heroBtn = document.getElementById('hero-shop-now-btn');
            if (heroBtn) {
                heroBtn.addEventListener('click', () => {
                    document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
                });
            }

            // ==========================================
            // 4. GSAP SCROLL-BASED FRAME ANIMATION (OPTIMIZED)
            // ==========================================
            const isMobile = window.innerWidth < 768;
            const frameStep = isMobile ? 2 : 1; // Skip frames on mobile to save RAM
            const totalFrames = 240;
            const frameCount = Math.floor(totalFrames / frameStep);
            
            // Allow fallback to WebP/AVIF if needed
            const framePath = (index) => `./frames/${(index * frameStep || 1).toString().padStart(4, '0')}.jpg`;

            let animationFrames = new Array(frameCount);
            let loadedCount = 0;
            let firstFrameLoaded = false;
            let lastRenderedFrame = -1;
            let frameConfig = { frame: 0 };
            let renderPending = false;
            let useFallback = false;

            const canvas = document.getElementById("hero-canvas");
            const canvasContainer = document.getElementById("canvas-container");
            
            if (canvas) {
                const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency

                // 1. Lightweight Image Preloader with Network Fallback
                function preloadImages() {
                    let loadingStartTime = Date.now();
                    
                    for (let i = 0; i < frameCount; i++) {
                        const img = new Image();
                        img.decoding = "async"; // Non-blocking decode
                        
                        img.onload = () => {
                            loadedCount++;
                            if (!firstFrameLoaded) {
                                firstFrameLoaded = true;
                                onFirstImageLoaded();
                            }
                            
                            // Dynamic Fallback: if first 10 frames take more than 2.5s, assume slow network
                            if (loadedCount === 10 && (Date.now() - loadingStartTime > 2500)) {
                                enableFallback();
                            }
                        };
                        
                        img.onerror = () => {
                            console.warn(`Failed to load frame ${i}, enabling fallback.`);
                            if (loadedCount === 0) enableFallback();
                            loadedCount++;
                        };
                        
                        img.src = framePath(i);
                        animationFrames[i] = img;
                    }
                }

                function enableFallback() {
                    if (useFallback) return;
                    useFallback = true;
                    console.log("Slow network detected: Using smooth CSS fallback for hero animation.");
                    if (canvasContainer) {
                        canvas.style.transition = 'opacity 1s ease';
                        canvas.style.opacity = '0';
                        canvasContainer.style.background = `url(./frames/0001.jpg) center/cover no-repeat`;
                        canvasContainer.style.transition = 'background-position 10s ease-in-out';
                        setTimeout(() => { canvasContainer.style.backgroundPosition = 'bottom'; }, 100);
                    }
                }

                function onFirstImageLoaded() {
                    if (useFallback) return;
                    resizeCanvas();
                    const initialFrame = Math.round(frameConfig.frame);
                    if (animationFrames[initialFrame] && animationFrames[initialFrame].complete) {
                        drawImageCover(animationFrames[initialFrame]);
                        lastRenderedFrame = initialFrame;
                    }
                }

                // 2. Responsive Canvas Cover Fitting (Optimized render loop)
                function drawImageCover(img) {
                    if (useFallback || !img || !img.complete || img.naturalWidth === 0) return;
                    
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

                    // Directly draw image over previous without clearRect (alpha: false handles this)
                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }

                // 3. requestAnimationFrame loop for 60fps buttery smooth playback
                function renderLoop() {
                    if (renderPending && !useFallback) {
                        const roundedFrame = Math.round(frameConfig.frame);
                        if (roundedFrame !== lastRenderedFrame && animationFrames[roundedFrame] && animationFrames[roundedFrame].complete) {
                            drawImageCover(animationFrames[roundedFrame]);
                            lastRenderedFrame = roundedFrame;
                        }
                        renderPending = false;
                    }
                    requestAnimationFrame(renderLoop);
                }
                requestAnimationFrame(renderLoop);

                function resizeCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    const roundedFrame = Math.round(frameConfig.frame);
                    const img = animationFrames[roundedFrame];
                    if (img) drawImageCover(img);
                }

                let resizeTimeout;
                window.addEventListener("resize", () => {
                    if (resizeTimeout) clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        resizeCanvas();
                        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                    }, 150);
                });

                if (typeof gsap !== 'undefined') {
                    // GSAP ScrollTrigger Scrub Tweaks (Full Page Scroll Sync)
                    gsap.to(frameConfig, {
                        frame: frameCount - 1,
                        snap: "frame",
                        ease: "none",
                        scrollTrigger: {
                            trigger: "body",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 1 // 1 second smoothing
                        },
                        onUpdate: () => {
                            renderPending = true; // Flag for requestAnimationFrame
                        }
                    });
                }

                setTimeout(preloadImages, 50); // Initialize preloading asynchronously
            }

            // Register GSAP ScrollTrigger
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
            }

            // ----------------------------------------------------
            // 7. Transparent Header Scroll & GSAP Scroll Reveals
            // ----------------------------------------------------
            
            // Header Scroll Toggle
            const mainHeader = document.getElementById('main-header');
            if (mainHeader) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        mainHeader.classList.remove('bg-transparent', 'border-transparent');
                        mainHeader.classList.add('bg-darkBg/80', 'backdrop-blur-md', 'border-accent/15');
                    } else {
                        mainHeader.classList.add('bg-transparent', 'border-transparent');
                        mainHeader.classList.remove('bg-darkBg/80', 'backdrop-blur-md', 'border-accent/15');
                    }
                });
            }

            // Global Scroll Reveal Animations (Bottom to Top)
            setTimeout(() => {
                if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
                
                const revealSections = document.querySelectorAll('section:not(#hero), footer');
                
                revealSections.forEach(section => {
                    const grid = section.querySelector('.grid, #product-grid, #category-bar');
                    
                    if (grid && grid.children.length > 1) {
                        gsap.fromTo(section, {
                            opacity: 0,
                            y: 30
                        }, {
                            scrollTrigger: {
                                trigger: section,
                                start: "top 90%",
                                toggleActions: "play none none none"
                            },
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out",
                            clearProps: "all"
                        });
                        
                        gsap.fromTo(grid.children, {
                            opacity: 0,
                            y: 50
                        }, {
                            scrollTrigger: {
                                trigger: grid,
                                start: "top 90%",
                                toggleActions: "play none none none"
                            },
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: "power2.out",
                            delay: 0.1,
                            clearProps: "all"
                        });
                    } else {
                        gsap.fromTo(section, {
                            opacity: 0,
                            y: 50
                        }, {
                            scrollTrigger: {
                                trigger: section,
                                start: "top 90%",
                                toggleActions: "play none none none"
                            },
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                });
                
                ScrollTrigger.refresh();
            }, 100);

            // ----------------------------------------------------
            // 8. Product Detail Page (PDP) Dynamic Rendering
            // ----------------------------------------------------
            if (document.getElementById('product-detail-page')) {
                const params = new URLSearchParams(window.location.search);
                const productId = params.get('id');
                let product = products.find(p => p.id === productId);

                // Fallback rendering
                if (!product) {
                    product = {
                        id: "fallback-perfume",
                        name: "L'Éternité Eau de Parfum",
                        category: "Exclusive Collection",
                        price: 295.00,
                        rating: 4.8,
                        reviewsCount: 312,
                        image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                        description: "A masterful composition of rare botanicals and deep woods. Exudes elegance, depth, and a timeless aura. Hand-crafted in limited batches.",
                        features: ["Top: White Bergamot, Iris", "Heart: Vetiver, Rose", "Base: Oud, Ambergris", "Volume: 100ml / 3.4 oz", "Endurance: 14+ hours"],
                        images: [
                            "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                            "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a",
                            "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a"
                        ]
                    };
                }

                // Inject product details
                document.getElementById('pd-name').textContent = product.name;
                document.getElementById('pd-category').textContent = product.category;
                document.getElementById('pd-price').textContent = `$${product.price.toFixed(2)}`;
                document.getElementById('pd-description').textContent = product.description;
                document.getElementById('pd-reviews-count').textContent = `(${product.reviewsCount} REVIEWS)`;
                
                const mainImage = document.getElementById('pd-main-image');
                if (mainImage) mainImage.src = product.image;
                
                const starsContainer = document.getElementById('pd-stars');
                if (starsContainer) {
                    starsContainer.innerHTML = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
                }

                const featuresList = document.getElementById('pd-features');
                if (featuresList) {
                    featuresList.innerHTML = product.features.map(f => `<li><span class="text-accent">•</span> ${f}</li>`).join('');
                }

                const thumbnailsContainer = document.getElementById('pd-thumbnails');
                if (thumbnailsContainer && product.images) {
                    thumbnailsContainer.innerHTML = product.images.map((img, idx) => `
                        <div class="aspect-square bg-[#121214] rounded-lg overflow-hidden border ${idx === 0 ? 'border-accent' : 'border-accent/15'} cursor-pointer hover:border-accent/60 transition-colors pd-thumb-btn">
                            <img src="${img}" class="w-full h-full object-cover">
                        </div>
                    `).join('');
                    
                    document.querySelectorAll('.pd-thumb-btn').forEach((btn, idx) => {
                        btn.addEventListener('click', () => {
                            mainImage.src = product.images[idx];
                            document.querySelectorAll('.pd-thumb-btn').forEach(b => {
                                b.classList.remove('border-accent');
                                b.classList.add('border-accent/15');
                            });
                            btn.classList.add('border-accent');
                            btn.classList.remove('border-accent/15');
                        });
                    });
                }

                // Add to Cart Handlers
                const addToCartBtn = document.getElementById('pd-add-to-cart');
                const buyNowBtn = document.getElementById('pd-buy-now');
                if (addToCartBtn) addToCartBtn.onclick = () => window.addToCart(product.id);
                if (buyNowBtn) buyNowBtn.onclick = () => {
                    window.addToCart(product.id);
                    window.openCart();
                };

                // Handle Review Loading and Submission
                const supabaseUrl = 'https://ohgtcppbhmkqjkheuskv.supabase.co';
                const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZ3RjcHBiaG1rcWpraGV1c2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MzIzMTgsImV4cCI6MjEwMDIwODMxOH0.uNkoYcfpTbHZjq5yAo-1jtSwoTu3jYQVAkEGx8f3CHQ';
                const reviewsEndpoint = `${supabaseUrl}/rest/v1/product_reviews`;

                const reviewForm = document.getElementById('review-form');
                const reviewList = document.getElementById('pd-reviews-list');
                
                const fetchReviews = async () => {
                    if (!reviewList) return;
                    try {
                        const response = await fetch(`${reviewsEndpoint}?product_id=eq.${product.id}&select=*&order=created_at.desc`, {
                            headers: {
                                'apikey': supabaseKey,
                                'Authorization': `Bearer ${supabaseKey}`
                            }
                        });
                        const data = await response.json();
                        if (data && data.length > 0) {
                            reviewList.innerHTML = data.map(r => {
                                const date = new Date(r.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                                return `
                                <div class="bg-darkBg p-6 border border-accent/15 rounded-xl reveal-up is-visible mt-6">
                                    <div class="flex justify-between items-start mb-4">
                                        <div>
                                            <h5 class="text-[13px] font-bold text-lightWarm tracking-wider">${r.name}</h5>
                                            <div class="flex items-center space-x-2 mt-1">
                                                <span class="text-accent text-[10px]">VERIFIED BUYER</span>
                                                <span class="text-[#a0a0a5] text-[10px]">&bull; ${date}</span>
                                            </div>
                                        </div>
                                        <div class="text-accent text-sm">
                                            ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
                                        </div>
                                    </div>
                                    <h6 class="text-[12px] font-bold text-lightWarm mb-2 uppercase tracking-wide">${r.title}</h6>
                                    <p class="text-[12px] text-[#ECEAE6]/70 leading-relaxed font-sans">${r.comment}</p>
                                </div>
                                `;
                            }).join('');
                        } else {
                            reviewList.innerHTML = '<p class="text-[12px] text-[#a0a0a5] text-center mt-6">Be the first to review this product.</p>';
                        }
                    } catch (error) {
                        console.error('Error fetching reviews:', error);
                    }
                };

                fetchReviews();

                if (reviewForm && reviewList) {
                    reviewForm.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const submitBtn = reviewForm.querySelector('button[type="submit"]');
                        const originalBtnText = submitBtn.innerText;
                        submitBtn.innerText = "SUBMITTING...";
                        submitBtn.disabled = true;

                        const name = document.getElementById('review-name').value;
                        const rating = parseInt(document.getElementById('review-rating').value);
                        const title = document.getElementById('review-title').value;
                        const comment = document.getElementById('review-text').value;

                        try {
                            const response = await fetch(reviewsEndpoint, {
                                method: 'POST',
                                headers: {
                                    'apikey': supabaseKey,
                                    'Authorization': `Bearer ${supabaseKey}`,
                                    'Content-Type': 'application/json',
                                    'Prefer': 'return=representation'
                                },
                                body: JSON.stringify({
                                    product_id: product.id,
                                    name,
                                    rating,
                                    title,
                                    comment
                                })
                            });

                            if (!response.ok) {
                                const errorText = await response.text();
                                throw new Error(`Supabase Error (${response.status}): ${errorText}`);
                            }
                            
                            reviewForm.reset();
                            await fetchReviews();
                        } catch (error) {
                            console.error('Error submitting review:', error);
                            alert(`Failed to submit your review.\n\nDetails: ${error.message}`);
                        } finally {
                            submitBtn.innerText = originalBtnText;
                            submitBtn.disabled = false;
                        }
                    });
                }
            }

        });









window.addEventListener('load', () => { 
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// Safety fallback: Ensure no sections remain permanently hidden if ScrollTrigger fails or network is slow
setTimeout(() => {
    const hiddenElements = document.querySelectorAll('section, footer, .grid > div, #product-grid > div');
    hiddenElements.forEach(el => {
        // Only force reveal if the element is currently invisible
        if (window.getComputedStyle(el).opacity === '0') {
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'none';
        }
    });
    
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 1500);

