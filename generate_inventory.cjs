const fs = require('fs');

const categories = ['Education', 'Business', 'Law & Politics', 'Tech', 'Finance', 'Health', 'Lifestyle', 'Real Estate', 'Travel', 'News', 'Marketing', 'Crypto'];
const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Global'];
const types = ['Guest Posting', 'Link Insertion', 'Both'];
const languages = ['English', 'English', 'English', 'Spanish', 'German', 'French'];

const generated = [];

for (let i = 15; i <= 120; i++) {
  const da = Math.floor(Math.random() * 60) + 20;
  const dr = da + Math.floor(Math.random() * 15) - 5;
  const traffic = Math.floor(Math.random() * 50000) + 1000;
  const cat = categories[Math.floor(Math.random() * categories.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const language = languages[Math.floor(Math.random() * languages.length)];
  const spamScore = Math.floor(Math.random() * 5);
  const price = (da * 2) + Math.floor(Math.random() * 50);
  
  // Create a realistic-sounding domain
  const words1 = ['tech', 'news', 'daily', 'global', 'pro', 'expert', 'insider', 'hub', 'blog', 'journal', 'digital', 'media', 'trend', 'update'];
  const words2 = ['times', 'post', 'biz', 'finance', 'health', 'style', 'travel', 'home', 'edu', 'law', 'market', 'review', 'guide', 'world'];
  const w1 = words1[Math.floor(Math.random() * words1.length)];
  const w2 = words2[Math.floor(Math.random() * words2.length)];
  const suffix = ['com', 'org', 'net', 'co.uk', 'io'][Math.floor(Math.random() * 5)];
  
  const domain = `${w1}${w2}${Math.random() > 0.7 ? Math.floor(Math.random() * 100) : ''}.${suffix}`;

  generated.push({
    id: i.toString(),
    domain,
    da,
    dr,
    traffic,
    category: cat,
    language,
    spamScore,
    price,
    country,
    type
  });
}

let data = fs.readFileSync('src/data/inventory.ts', 'utf8');
const lines = data.split('\n');

// Find the end of the INVENTORY array
let endIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i] === '];' && lines[i-1].includes('}')) {
    // Check if this is the end of INVENTORY by looking back
    if (data.substring(0, data.indexOf(lines[i])).includes('export const INVENTORY: WebsiteItem[] = [')) {
       endIndex = i;
       break;
    }
  }
}

if (endIndex !== -1) {
    const jsonStr = JSON.stringify(generated, null, 2);
    // Remove the enclosing brackets [ ] from jsonStr
    let innerStr = jsonStr.substring(1, jsonStr.length - 1).trim();
    // Prepend a comma
    innerStr = ',\n' + innerStr;
    
    lines.splice(endIndex, 0, innerStr);
    
    fs.writeFileSync('src/data/inventory.ts', lines.join('\n'));
    console.log("Added 100+ items to inventory.");
} else {
    console.log("Could not find the end of INVENTORY array.");
}

