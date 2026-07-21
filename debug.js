const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
let idx = content.indexOf('Lady Clara');
console.log(content.substring(idx - 20, idx + 10));
