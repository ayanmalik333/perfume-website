const fs = require('fs');
const path = require('path');

function replaceCorrupt(content) {
    let newContent = content;
    // Fix GSAP opacity stagger bug first
    newContent = newContent.replace(/opacity: 0,\s*y: 30,\s*duration: 0.6,\s*stagger: 0.08,\s*ease: "power2\.out"/g, 'opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", clearProps: "all"');
    newContent = newContent.replace(/gsap\.from\("#category-bar > button", \{/g, 'gsap.fromTo("#category-bar > button", { opacity: 0, y: 30 }, {');

    newContent = newContent.replace(/opacity: 0,\s*y: 50,\s*duration: 0.6,\s*stagger: 0.08,\s*ease: "power2\.out",\s*delay: 0.1/g, 'opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.1, clearProps: "all"');
    newContent = newContent.replace(/gsap\.from\("#product-grid > div", \{/g, 'gsap.fromTo("#product-grid > div", { opacity: 0, y: 50 }, {');
    
    // Fix garbage characters
    // The exact garbage in script.js for the stars:
    newContent = newContent.replace(/&#9733;/g, '&#9733;');
    newContent = newContent.replace(/AEo\?/g, '&#9733;');
    
    // The garbage in index.html for quote
    newContent = newContent.replace(/&ldquo;/g, '&ldquo;');
    
    // The garbage in index.html for dash
    newContent = newContent.replace(/A,\?\?/g, '&mdash;');
    
    // The garbage in footer for copyright
    newContent = newContent.replace(/&copy;/g, '&copy;');
    
    // The garbage for checkmark/Entrusted
    newContent = newContent.replace(/&#10003;/g, '&#10003;');
    
    return newContent;
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (let file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') processDir(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const newContent = replaceCorrupt(content);
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log("Updated: " + fullPath);
            }
        }
    }
}

processDir('.');
