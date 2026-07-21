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
                { id: "perfume-1", name: "Santal Nobile Eau de Parfum", category: "Signature Collection", price: 185.00, rating: 4.9, reviewsCount: 1420, image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a" },
                { id: "perfume-2", name: "Oud Imperial Extrait de Parfum", category: "Oud Collection", price: 245.00, rating: 4.9, reviewsCount: 897, image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a" },
                { id: "perfume-3", name: "Rose Extase Eau de Parfum", category: "Floral Collection", price: 165.00, rating: 4.8, reviewsCount: 1102, image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a" },
                { id: "perfume-4", name: "Neroli Marine Eau de Parfum", category: "Fresh Collection", price: 155.00, rating: 4.7, reviewsCount: 741, image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a" },
                { id: "perfume-5", name: "Or Noir Limited Edition", category: "Limited Edition", price: 320.00, rating: 5.0, reviewsCount: 314, image: "https://red-glamorous-crane-920.mypinata.cloud/ipfs/bafybeidy5osju66tzukivftm72nfiqlplj6cjx3phqqoj6wtms3bisze2a" }
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
                        <div class="aspect-[4/5] bg-[#000] rounded-lg overflow-hidden relative border border-accent/10 flex items-center justify-center p-2">
                            <img loading="lazy" decoding="async" src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover rounded transform duration-700 ease-out group-hover:scale-105">
                        </div>
                        <div class="pt-4 flex flex-col justify-between flex-grow">
                            <div class="space-y-1.5 text-left">
                                <span class="text-[9px] font-sans font-semibold tracking-wider text-accent uppercase">${prod.category}</span>
                                <h3 class="text-[13px] sm:text-[14px] font-sans font-medium text-lightWarm leading-tight min-h-[40px] group-hover:text-accent transition-colors duration-200">${prod.name}</h3>
                                <div class="flex items-center space-x-1.5">
                                    <div class="flex items-center text-accent">
                                        ${'Ã¢Ëœâ€¦'.repeat(5)}
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
            // 4. GSAP SCROLL-BASED FRAME ANIMATION
            // ==========================================
            const frameCount = 240;
            const ease = 0.08; 
            const framePath = (index) => `./frames/${index.toString().padStart(4, '0')}.jpg`;

            let animationFrames = new Array(frameCount);
            let loadedCount = 0;
            let firstFrameLoaded = false;
            let lastRenderedFrame = -1;
            let frameConfig = { frame: 0 };

            const canvas = document.getElementById("hero-canvas");
            if (canvas) {
                const ctx = canvas.getContext("2d");

                // 1. Image Preloading
                function preloadImages() {
                    for (let i = 1; i <= frameCount; i++) {
                        const img = new Image();
                        
                        img.onload = () => {
                            loadedCount++;
                            if (!firstFrameLoaded) {
                                firstFrameLoaded = true;
                                onFirstImageLoaded();
                            }
                        };
                        
                        img.onerror = () => {
                            console.error(`Failed to load frame ${i}: ${img.src}`);
                            loadedCount++;
                        };
                        
                        img.src = framePath(i);
                        animationFrames[i - 1] = img;
                    }
                }

                function onFirstImageLoaded() {
                    resizeCanvas();
                    const initialFrame = Math.round(frameConfig.frame);
                    if (animationFrames[initialFrame] && animationFrames[initialFrame].complete) {
                        drawImageCover(animationFrames[initialFrame]);
                        lastRenderedFrame = initialFrame;
                    }
                }

                // 2. Responsive Canvas Cover Fitting
                function drawImageCover(img) {
                    if (!img || !img.complete || img.naturalWidth === 0) return;
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

                function resizeCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    
                    const roundedFrame = Math.round(frameConfig.frame);
                    const img = animationFrames[roundedFrame];
                    if (img) drawImageCover(img);
                }

                window.addEventListener("resize", resizeCanvas);

                if (typeof gsap !== 'undefined') {
                    gsap.to(frameConfig, {
                        frame: frameCount - 1,
                        snap: "frame",
                        ease: "none",
                        scrollTrigger: {
                            trigger: "body",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.5
                        },
                        onUpdate: () => {
                            const roundedFrame = Math.round(frameConfig.frame);
                            if (roundedFrame !== lastRenderedFrame && animationFrames[roundedFrame] && animationFrames[roundedFrame].complete) {
                                drawImageCover(animationFrames[roundedFrame]);
                                lastRenderedFrame = roundedFrame;
                            }
                        }
                    });
                }

                preloadImages();
            }

            // Register GSAP ScrollTrigger
            gsap.registerPlugin(ScrollTrigger);

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
                const revealSections = document.querySelectorAll('section:not(#hero), footer');
                
                revealSections.forEach(section => {
                    const grid = section.querySelector('.grid, #product-grid, #category-bar');
                    
                    if (grid && grid.children.length > 1) {
                        gsap.from(section, {
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                                toggleActions: "play none none none"
                            },
                            opacity: 0,
                            y: 30,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                        
                        gsap.from(grid.children, {
                            scrollTrigger: {
                                trigger: grid,
                                start: "top 85%",
                                toggleActions: "play none none none"
                            },
                            opacity: 0,
                            y: 50,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: "power2.out",
                            delay: 0.1
                        });
                    } else {
                        gsap.from(section, {
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                                toggleActions: "play none none none"
                            },
                            opacity: 0,
                            y: 50,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                });
                
                ScrollTrigger.refresh();
            }, 100);

        });




window.addEventListener('load', () => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); });


