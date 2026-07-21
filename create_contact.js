const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract head and top wrapper
const topContentMatch = indexHtml.match(/([\s\S]*?)<main class="flex-grow">/);
let topContent = topContentMatch ? topContentMatch[1] : '';

// Update title
topContent = topContent.replace('<title>LUXURY PERFUMES | The Art of Liquid Architecture</title>', '<title>Contact Us | LUXURY PERFUMES</title>');

// Extract footer and bottom wrapper
const bottomContentMatch = indexHtml.match(/(<footer class="bg-darkBg pt-16 pb-8 border-t border-accent\/20 relative z-10">[\s\S]*?)<\/body>/);
let bottomContent = bottomContentMatch ? bottomContentMatch[1] : '';

const mainContent = `
        <main class="flex-grow relative z-10 pt-32 pb-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <!-- Page Title -->
                <div class="text-center mb-16">
                    <h1 class="text-3xl sm:text-4xl md:text-5xl font-serif text-lightWarm tracking-widest uppercase mb-4">Contact Us</h1>
                    <p class="text-[12px] sm:text-[13px] font-sans text-[#a0a0a5] tracking-[0.2em] uppercase">Connect with our Fragrance Concierge</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    
                    <!-- Contact Info -->
                    <div class="space-y-12">
                        <div>
                            <h2 class="text-[11px] tracking-[0.3em] font-bold text-accent uppercase mb-6">Concierge Services</h2>
                            <p class="text-[13px] text-[#a0a0a5] leading-relaxed mb-6">
                                Our dedicated team of fragrance experts is available to assist you with bespoke orders, private consultations, and general inquiries. Experience the pinnacle of liquid architecture with personalized guidance.
                            </p>
                        </div>
                        
                        <div class="space-y-8">
                            <div class="flex items-start space-x-4">
                                <div class="bg-[#1c1c1e] p-3 rounded-full text-accent flex-shrink-0 border border-accent/20">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <div>
                                    <h3 class="text-[10px] uppercase tracking-[0.2em] font-bold text-lightWarm mb-1">Email Us</h3>
                                    <a href="mailto:concierge@luxuryperfumes.com" class="text-[13px] text-[#a0a0a5] hover:text-accent transition-colors">concierge@luxuryperfumes.com</a>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="bg-[#1c1c1e] p-3 rounded-full text-accent flex-shrink-0 border border-accent/20">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                                <div>
                                    <h3 class="text-[10px] uppercase tracking-[0.2em] font-bold text-lightWarm mb-1">Maison Address</h3>
                                    <p class="text-[13px] text-[#a0a0a5] leading-relaxed">
                                        125 Avenue des Champs-Élysées<br>
                                        75008 Paris, France
                                    </p>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-4">
                                <div class="bg-[#1c1c1e] p-3 rounded-full text-accent flex-shrink-0 border border-accent/20">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </div>
                                <div>
                                    <h3 class="text-[10px] uppercase tracking-[0.2em] font-bold text-lightWarm mb-1">Operating Hours</h3>
                                    <p class="text-[13px] text-[#a0a0a5] leading-relaxed">
                                        Monday - Friday: 10:00 AM - 7:00 PM (CET)<br>
                                        Saturday: 11:00 AM - 5:00 PM (CET)
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <!-- Contact Form -->
                    <div class="bg-[#121214] p-8 sm:p-10 rounded-2xl border border-accent/20 shadow-2xl relative overflow-hidden">
                        
                        <!-- Toast Notification Container -->
                        <div id="form-toast" class="absolute top-0 left-0 w-full bg-accent text-darkBg text-center py-3 px-4 transform -translate-y-full transition-transform duration-500 flex flex-col items-center z-10">
                            <span class="text-[11px] font-bold tracking-[0.2em] uppercase mb-1">Message Sent</span>
                            <span class="text-[12px] font-medium">Thank you for reaching out to Luxury Perfumes. Our team will contact you shortly.</span>
                        </div>
                        
                        <!-- Error Notification -->
                        <div id="form-error" class="absolute top-0 left-0 w-full bg-red-900/90 text-white text-center py-3 px-4 transform -translate-y-full transition-transform duration-500 flex flex-col items-center z-10">
                            <span class="text-[11px] font-bold tracking-[0.2em] uppercase mb-1">Submission Failed</span>
                            <span id="form-error-msg" class="text-[12px] font-medium">Please check your connection and try again.</span>
                        </div>

                        <form id="contactForm" class="space-y-6 relative z-0">
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-[10px] font-sans font-bold tracking-[0.2em] text-[#a0a0a5] uppercase block">Full Name *</label>
                                    <input type="text" id="full_name" required class="w-full bg-[#1c1c1e] border border-accent/20 rounded-lg px-4 py-3 text-[13px] text-lightWarm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="Your Name">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-sans font-bold tracking-[0.2em] text-[#a0a0a5] uppercase block">Email Address *</label>
                                    <input type="email" id="email" required class="w-full bg-[#1c1c1e] border border-accent/20 rounded-lg px-4 py-3 text-[13px] text-lightWarm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="your@email.com">
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-[10px] font-sans font-bold tracking-[0.2em] text-[#a0a0a5] uppercase block">Phone Number</label>
                                    <input type="tel" id="phone" class="w-full bg-[#1c1c1e] border border-accent/20 rounded-lg px-4 py-3 text-[13px] text-lightWarm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="+1 (555) 000-0000">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-sans font-bold tracking-[0.2em] text-[#a0a0a5] uppercase block">Inquiry Type *</label>
                                    <select id="inquiry_type" required class="w-full bg-[#1c1c1e] border border-accent/20 rounded-lg px-4 py-3 text-[13px] text-lightWarm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none">
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Custom Fragrance / B2B">Custom Fragrance / B2B</option>
                                        <option value="Wholesale & Distribution">Wholesale & Distribution</option>
                                        <option value="Order Tracking">Order Tracking</option>
                                        <option value="Press & Media">Press & Media</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="space-y-3 pt-2">
                                <label class="text-[10px] font-sans font-bold tracking-[0.2em] text-[#a0a0a5] uppercase block">Preferred Fragrance Notes</label>
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <label class="flex items-center space-x-2 cursor-pointer group">
                                        <input type="checkbox" value="Oud" class="note-cb w-4 h-4 rounded border-accent/30 bg-[#1c1c1e] text-accent focus:ring-accent/50 focus:ring-offset-0 focus:ring-1">
                                        <span class="text-[12px] text-[#a0a0a5] group-hover:text-lightWarm transition-colors">Oud</span>
                                    </label>
                                    <label class="flex items-center space-x-2 cursor-pointer group">
                                        <input type="checkbox" value="Floral" class="note-cb w-4 h-4 rounded border-accent/30 bg-[#1c1c1e] text-accent focus:ring-accent/50 focus:ring-offset-0 focus:ring-1">
                                        <span class="text-[12px] text-[#a0a0a5] group-hover:text-lightWarm transition-colors">Floral</span>
                                    </label>
                                    <label class="flex items-center space-x-2 cursor-pointer group">
                                        <input type="checkbox" value="Fresh" class="note-cb w-4 h-4 rounded border-accent/30 bg-[#1c1c1e] text-accent focus:ring-accent/50 focus:ring-offset-0 focus:ring-1">
                                        <span class="text-[12px] text-[#a0a0a5] group-hover:text-lightWarm transition-colors">Fresh</span>
                                    </label>
                                    <label class="flex items-center space-x-2 cursor-pointer group">
                                        <input type="checkbox" value="Amber / Woody" class="note-cb w-4 h-4 rounded border-accent/30 bg-[#1c1c1e] text-accent focus:ring-accent/50 focus:ring-offset-0 focus:ring-1">
                                        <span class="text-[12px] text-[#a0a0a5] group-hover:text-lightWarm transition-colors">Amber</span>
                                    </label>
                                </div>
                            </div>

                            <div class="space-y-2 pt-2">
                                <label class="text-[10px] font-sans font-bold tracking-[0.2em] text-[#a0a0a5] uppercase block">Message / Details *</label>
                                <textarea id="message" required rows="4" class="w-full bg-[#1c1c1e] border border-accent/20 rounded-lg px-4 py-3 text-[13px] text-lightWarm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none" placeholder="How may we assist you?"></textarea>
                            </div>

                            <div class="pt-4">
                                <button type="submit" id="submitBtn" class="w-full inline-flex items-center justify-center bg-accent hover:bg-white text-darkBg text-[11px] font-sans font-bold tracking-[0.2em] uppercase py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span id="btnText">SEND INQUIRY</span>
                                    <span id="btnLoader" class="hidden ml-3 w-4 h-4 border-2 border-darkBg border-t-transparent rounded-full animate-spin"></span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </main>
`;

const scripts = `
    <!-- Supabase JS -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    
    <script>
        // Supabase configuration - User should replace these with their actual keys
        const supabaseUrl = 'YOUR_SUPABASE_URL';
        const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
        
        let supabase;
        try {
            supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        } catch (e) {
            console.error("Supabase client initialization failed. Please add your actual keys.", e);
        }

        document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnLoader = document.getElementById('btnLoader');
            const toast = document.getElementById('form-toast');
            const errorToast = document.getElementById('form-error');
            const errorMsg = document.getElementById('form-error-msg');
            
            // Collect selected notes
            const notesElements = document.querySelectorAll('.note-cb:checked');
            const preferred_notes = Array.from(notesElements).map(el => el.value);

            // Payload
            const formData = {
                full_name: document.getElementById('full_name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || null,
                inquiry_type: document.getElementById('inquiry_type').value,
                preferred_notes: preferred_notes.join(', ') || null,
                message: document.getElementById('message').value
            };

            // Loading state
            btn.disabled = true;
            btnText.innerText = 'SENDING...';
            btnLoader.classList.remove('hidden');
            
            // Hide previous toasts
            toast.classList.add('-translate-y-full');
            errorToast.classList.add('-translate-y-full');

            try {
                if(supabaseUrl === 'YOUR_SUPABASE_URL') {
                     throw new Error('Supabase configuration is missing. Please add your API keys to contact.html');
                }
                
                const { data, error } = await supabase
                    .from('contact_inquiries')
                    .insert([formData]);

                if (error) throw error;

                // Success
                toast.classList.remove('-translate-y-full');
                document.getElementById('contactForm').reset();
                
                setTimeout(() => {
                    toast.classList.add('-translate-y-full');
                }, 5000);

            } catch (err) {
                console.error('Submission Error:', err);
                errorMsg.innerText = err.message || 'Please check your connection and try again.';
                errorToast.classList.remove('-translate-y-full');
                
                setTimeout(() => {
                    errorToast.classList.add('-translate-y-full');
                }, 5000);
            } finally {
                // Reset button state
                btn.disabled = false;
                btnText.innerText = 'SEND INQUIRY';
                btnLoader.classList.add('hidden');
            }
        });
    </script>
</body>
</html>
`;

const finalHtml = topContent + mainContent + bottomContent + scripts;
fs.writeFileSync('contact.html', finalHtml, 'utf8');
console.log("Created contact.html");
