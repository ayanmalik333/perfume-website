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
