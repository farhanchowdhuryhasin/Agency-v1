const fs = require('fs');
const path = require('path');

const replacements = [
  [/text-purple-/g, 'text-green-'],
  [/bg-purple-/g, 'bg-green-'],
  [/border-purple-/g, 'border-green-'],
  [/from-purple-/g, 'from-green-'],
  [/to-purple-/g, 'to-green-'],
  [/text-blue-/g, 'text-emerald-'],
  [/bg-blue-/g, 'bg-emerald-'],
  [/border-blue-/g, 'border-emerald-'],
  [/from-blue-/g, 'from-emerald-'],
  [/to-blue-/g, 'to-emerald-'],
  [/text-pink-/g, 'text-green-'],
  [/bg-pink-/g, 'bg-green-'],
  [/border-pink-/g, 'border-green-'],
  [/from-pink-/g, 'from-green-'],
  [/to-pink-/g, 'to-green-']
];

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
      }
      
      if (content !== original) {
        console.log(`Updated ${fullPath}`);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

walkAndReplace('./src');
console.log("Class replacement complete.");
