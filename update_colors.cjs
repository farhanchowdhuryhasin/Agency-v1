const fs = require('fs');
const path = require('path');

const colorMap = {
  '#081828': '#001e00',
  '#fe4a91': '#14a800',
  '#b9045e': '#118a00',
  '#f5faff': '#f2f2f2' // very light gray
};

const directories = ['./src'];

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [oldColor, newColor] of Object.entries(colorMap)) {
        content = content.replace(new RegExp(oldColor, 'gi'), newColor);
      }
      
      if (content !== original) {
        console.log(`Updated ${fullPath}`);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

walkAndReplace(directories[0]);
console.log("Color replacement complete.");
