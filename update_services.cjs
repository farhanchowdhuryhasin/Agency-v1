const fs = require('fs');

const servicesCode = `const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'AI Digital Marketing',
    description: 'Leverage predictive machine learning and intelligent search sentiment analysis to drive high-conversion organic rankings.',
    price: 'Custom Quote',
    icon: 'ai'
  },
  {
    id: 'srv-2',
    name: 'Google high value content creation',
    description: 'Professional high-value content creation designed specifically to rank on Google and capture organic traffic intent.',
    price: 'Custom Quote',
    icon: 'filetext'
  },
  {
    id: 'srv-3',
    name: 'Server Side Tracking',
    description: 'Establish robust first-party data collection using Server-Side tracking to recover metrics and bypass ad-blockers.',
    price: 'Custom Quote',
    icon: 'server'
  },
  {
    id: 'srv-4',
    name: 'Complete SEO Audit and Setup',
    description: 'In-depth inspection of website performance, backlink placement, and tracking strategies to uncover conversion parameters.',
    price: 'Custom Quote',
    icon: 'search'
  },
  {
    id: 'srv-5',
    name: 'Local SEO Setup',
    description: 'Optimize your Google Business profile and local citations to dominate local search rankings.',
    price: 'Custom Quote',
    icon: 'globe'
  },
  {
    id: 'srv-6',
    name: 'Guest Posting',
    description: 'Manual content outreach, professional copywriting, and placement on highly authoritative publications.',
    price: 'Custom Quote',
    icon: 'guestposting'
  },
  {
    id: 'srv-7',
    name: 'Link Insertion',
    description: 'Placements inside existing, cached, and pre-indexed articles that already hold search authority.',
    price: 'Custom Quote',
    icon: 'linkinsertion'
  },
  {
    id: 'srv-8',
    name: 'Marketing Video Creation',
    description: 'High-quality promotional and explainer videos tailored for social media and digital advertising campaigns.',
    price: 'Custom Quote',
    icon: 'award'
  },
  {
    id: 'srv-9',
    name: 'Website Creation',
    description: 'Custom, high-performance website design and development focusing on conversion rate optimization.',
    price: 'Custom Quote',
    icon: 'layers'
  },
  {
    id: 'srv-10',
    name: 'Facebook Page Setup',
    description: 'Professional setup, branding, and optimization of your business Facebook page for maximum engagement.',
    price: 'Custom Quote',
    icon: 'award'
  },
  {
    id: 'srv-11',
    name: 'Youtube Setup',
    description: 'Complete YouTube channel creation, branding, and optimization to start building your video audience.',
    price: 'Custom Quote',
    icon: 'award'
  },
  {
    id: 'srv-12',
    name: 'Marketing content and image creation',
    description: 'Engaging, branded visual assets and copywriting for all your digital marketing channels.',
    price: 'Custom Quote',
    icon: 'filetext'
  },
  {
    id: 'srv-13',
    name: 'Google analytics setup',
    description: 'Precise implementation of Google Analytics 4 (GA4) with custom event tracking and conversion funnels.',
    price: 'Custom Quote',
    icon: 'search'
  }
];`;

let content = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = content.indexOf('const DEFAULT_SERVICES: ServiceItem[] = [');
const endIdx = content.indexOf('];', startIdx) + 2;

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + servicesCode + content.substring(endIdx);
  
  // also need to invalidate the localstorage for outreach_services so it loads the new ones
  // we can do this by appending _v2 to outreach_services in App.tsx
  content = content.replace(/'outreach_services'/g, "'outreach_services_v2'");
  
  fs.writeFileSync('src/App.tsx', content, 'utf8');
  console.log('Services replaced.');
} else {
  console.log('Could not find DEFAULT_SERVICES');
}
