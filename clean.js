const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace anything like Ã... before Entrusted
    content = content.replace(/[ÃÂ,A"a-zA-Z0-9©]+ Entrusted/g, '&#10003; Entrusted');
    
    // Replace anything like Ã... before 2026 Luxury
    content = content.replace(/[ÃÂ,A"a-zA-Z0-9©]+ 2026 Luxury/g, '&copy; 2026 Luxury');
    
    // Replace anything like Ã... before Lady Clara
    content = content.replace(/[ÃÂ,A"a-zA-Z0-9©]+ Lady Clara/g, '&mdash; Lady Clara');
    
    // Replace quote mark
    content = content.replace(/[ÃÂ,A"a-zA-Z0-9©]+"<\/span>/g, '&ldquo;</span>');
    
    // Cleanup any lingering weird strings like Ã¢Â€Â™
    content = content.replace(/Ã¢Â€Â™/g, '&rsquo;');
    content = content.replace(/Ã¢Â€Â/g, '');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Cleaned: " + filePath);
    }
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (let file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && file !== 'node_modules' && file !== '.git') {
            processDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            cleanFile(fullPath);
        }
    }
}

processDir('.');
