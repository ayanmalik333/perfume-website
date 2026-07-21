const fs = require('fs');
const path = require('path');

const files = ['index.html', 'shop.html', 'collections.html', 'campaigns.html', 'essence.html', 'editorial.html'];

const desktopLink = `                        <a href="contact.html"
                            class="text-[11px] tracking-[0.2em] text-[#a0a0a5] hover:text-lightWarm transition-colors duration-200 font-medium font-sans relative py-2 group">
                            CONTACT
                            <span class="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                        </a>`;

const mobileLink = `                    <a href="contact.html"
                        class="mobile-nav-link block text-[12px] tracking-[0.2em] text-[#a0a0a5] hover:text-lightWarm hover:bg-accent/10 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium">CONTACT</a>`;

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        if (content.includes('href="contact.html"')) return;
        
        const desktopRegex = /(<a href="editorial\.html"[\s\S]*?EDITORIAL[\s\S]*?<\/a>)/;
        if (desktopRegex.test(content)) {
            content = content.replace(desktopRegex, `$1\n${desktopLink}`);
        }
        
        const mobileRegex = /(<a href="editorial\.html"[^>]*>EDITORIAL<\/a>)/g;
        if (content.match(mobileRegex) && content.match(mobileRegex).length > 1) {
            let lastMobile = content.lastIndexOf('<a href="editorial.html"');
            if (lastMobile !== -1) {
               // Let's just use string replacement for the exact mobile chunk
               let before = content.substring(0, lastMobile);
               let after = content.substring(lastMobile);
               after = after.replace(/(<a href="editorial\.html"[^>]*>EDITORIAL<\/a>)/, `$1\n${mobileLink}`);
               content = before + after;
            }
        } else {
             content = content.replace(/(<a href="editorial\.html"[^>]*>EDITORIAL<\/a>)/, `$1\n${mobileLink}`);
        }
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
