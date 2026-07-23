import React, { useState, useEffect } from 'react';
import { WebsiteItem, CartItem, Order, ServiceItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  Search,
  Filter,
  ShoppingCart,
  CheckCircle,
  HelpCircle,
  Briefcase,
  Layers,
  FileSpreadsheet,
  Trash2,
  ListFilter,
  Check,
  Sparkles,
  Link as LinkIcon,
  BookOpen,
  DollarSign,
  Plus,
  Edit,
  Lock,
  Unlock,
  Settings,
  ShieldAlert,
  Globe,
  ExternalLink,
  X
} from 'lucide-react';

interface PortalViewProps {
  cart: CartItem[];
  addToCart: (item: WebsiteItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItem: (cartItemId: string, targetUrl: string, anchorText: string, notes: string) => void;
  clearCart: () => void;
  inventory: WebsiteItem[];
  addWebsite: (item: Omit<WebsiteItem, 'id'>) => void;
  updateWebsite: (item: WebsiteItem) => void;
  deleteWebsite: (id: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  showAdminLoginModal: boolean;
  setShowAdminLoginModal: (show: boolean) => void;
  demoFacebookUrl: string;
  updateDemoFacebookUrl: (url: string) => void;
  introVideoUrl: string;
  updateIntroVideoUrl: (url: string) => void;
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  onBookDemo: () => void;
}

export default function PortalView({
  cart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  inventory,
  addWebsite,
  updateWebsite,
  deleteWebsite,
  isAdminMode,
  setIsAdminMode,
  showAdminLoginModal,
  setShowAdminLoginModal,
  demoFacebookUrl,
  updateDemoFacebookUrl,
  introVideoUrl,
  updateIntroVideoUrl,
  services,
  addService,
  updateService,
  deleteService,
  onBookDemo
}: PortalViewProps) {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'cart' | 'history' | 'ai_assistant'>('marketplace');
  const [showCartModal, setShowCartModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [minDR, setMinDR] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(400);

  // Admin Panel states
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<WebsiteItem | null>(null);

  // Admin Service Panel states
  const [adminTab, setAdminTab] = useState<'websites' | 'services' | 'analytics'>('websites');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  
  // Analytics State
  const [trafficData, setTrafficData] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isAdminMode && adminTab === 'analytics') {
      const fetchTraffic = async () => {
        try {
          const docSnap = await getDoc(doc(db, 'analytics', 'traffic'));
          if (docSnap.exists()) {
            setTrafficData(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching traffic data", error);
        }
      };
      fetchTraffic();
    }
  }, [isAdminMode, adminTab]);
  
  const resetTrafficData = async () => {
    if (confirm("Are you sure you want to reset all traffic data? This action cannot be undone.")) {
      try {
        await setDoc(doc(db, 'analytics', 'traffic'), {});
        setTrafficData({});
      } catch (error) {
        console.error("Error resetting traffic data", error);
        alert("Failed to reset traffic data.");
      }
    }
  };
  
  // Local link states for admin panel
  const [adminFbUrl, setAdminFbUrl] = useState(demoFacebookUrl);
  const [adminVideoUrl, setAdminVideoUrl] = useState(introVideoUrl);
  const [showSaveToast, setShowSaveToast] = useState(false);
  
  useEffect(() => {
    setAdminFbUrl(demoFacebookUrl);
    setAdminVideoUrl(introVideoUrl);
  }, [demoFacebookUrl, introVideoUrl]);

  const handleSaveLinks = () => {
    updateDemoFacebookUrl(adminFbUrl);
    updateIntroVideoUrl(adminVideoUrl);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  // Form states for Add/Edit service
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceIcon, setServiceIcon] = useState('guestposting');

  // Form states for Add/Edit website
  const [formDomain, setFormDomain] = useState('');
  const [formCategory, setFormCategory] = useState('Tech');
  const [formType, setFormType] = useState<'Guest Posting' | 'Link Insertion' | 'Both'>('Both');
  const [formDA, setFormDA] = useState<number>(30);
  const [formDR, setFormDR] = useState<number>(45);
  const [formTraffic, setFormTraffic] = useState<number>(5000);
  const [formSpamScore, setFormSpamScore] = useState<number>(1);
  const [formPrice, setFormPrice] = useState<number>(99);
  const [formCountry, setFormCountry] = useState('United States');
  const [formLanguage, setFormLanguage] = useState('English');

  // Orders history simulation loaded safely from dynamic inventory
  const [orders, setOrders] = useState<Order[]>(() => {
    const fallbackSite1 = inventory[3] || inventory[0] || { id: 'fallback', domain: 'ajs.org', da: 55, dr: 59, traffic: 3440, category: 'Law & Politics', language: 'English', spamScore: 1, price: 125, country: 'United States', type: 'Both' as const };
    const fallbackSite2 = inventory[0] || { id: 'fallback', domain: 'edtechrce.org', da: 20, dr: 53, traffic: 3760, category: 'Education', language: 'English', spamScore: 1, price: 62.5, country: 'United States', type: 'Guest Posting' as const };
    const fallbackSite3 = inventory[5] || inventory[0] || { id: 'fallback', domain: 'itsamerica.org', da: 27, dr: 49, traffic: 5200, category: 'Tech & Transport', language: 'English', spamScore: 1, price: 50, country: 'United States', type: 'Both' as const };

    return [
      {
        id: 'ORD-98421',
        date: 'June 18, 2026',
        totalPrice: 125.0,
        status: 'Completed' as const,
        items: [
          {
            id: 'mock1',
            website: fallbackSite1,
            targetUrl: 'https://legalscale.io/blog/court-advocacy',
            anchorText: 'advocacy network legal guides',
            notes: 'Place in upper paragraph if possible.'
          }
        ]
      },
      {
        id: 'ORD-10452',
        date: 'July 10, 2026',
        totalPrice: 112.5,
        status: 'In Progress' as const,
        items: [
          {
            id: 'mock2',
            website: fallbackSite2,
            targetUrl: 'https://learnonline.edu/cyber-safety',
            anchorText: 'safety guidelines for kids',
            notes: 'Standard Guest post.'
          },
          {
            id: 'mock3',
            website: fallbackSite3,
            targetUrl: 'https://greenroutes.org/clean-transit',
            anchorText: 'transport metrics database',
            notes: 'Link insertion on existing route post.'
          }
        ]
      }
    ];
  });

  // AI Assistant generator state
  const [aiNiche, setAiNiche] = useState('Tech');
  const [aiProduct, setAiProduct] = useState('');
  const [generatedPitch, setGeneratedPitch] = useState<{
    subject: string;
    body: string;
    suggestedTitles: string[];
    suggestedAnchors: string[];
  } | null>(null);
  const [generatingPitch, setGeneratingPitch] = useState(false);

  // Filter categories derived from dynamic inventory list
  const categories = ['All', ...Array.from(new Set(inventory.map((item) => item.category)))];

  // Filtering Logic
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || 
                        (selectedType === 'Guest Posting' && (item.type === 'Guest Posting' || item.type === 'Both')) ||
                        (selectedType === 'Link Insertion' && (item.type === 'Link Insertion' || item.type === 'Both'));
    const matchesDR = item.dr >= minDR;
    const matchesPrice = item.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesType && matchesDR && matchesPrice;
  });

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Check validation of inputs
    const isInvalid = cart.some((item) => !item.targetUrl || !item.anchorText);
    if (isInvalid) {
      alert('Please fill in both the Target Destination URL and the Anchor Text for all cart items.');
      return;
    }

    const total = cart.reduce((acc, curr) => acc + curr.website.price, 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Today',
      totalPrice: total,
      status: 'Pending',
      items: [...cart]
    };

    setOrders([newOrder, ...orders]);
    setCheckoutSuccess(true);
  };

  const handleGeneratePitch = () => {
    if (!aiProduct) {
      alert('Please type in your Business / Product focus so the AI can craft a custom pitch.');
      return;
    }
    setGeneratingPitch(true);
    setTimeout(() => {
      // Customized rules matching industry-leading pitches
      const subject = `Collaborative Content Proposal for your ${aiNiche} readers`;
      const body = `Hi Editor,\n\nI was reading through some of your recent articles on search and index performance and absolutely loved your insights.\n\nI'm reaching out because I've drafted a highly comprehensive 1,200-word piece focusing on the future of "${aiProduct}". It breaks down recent market shifts and provides actionable take-aways for your audience.\n\nI was hoping we could collaborate on publishing this guide. Naturally, I will fully handle formatting and ensure it passes Copyscape perfectly. To fit your editorial standards, I can integrate contextually relevant outbound resources.\n\nLet me know if you would like me to send over the initial draft outline!\n\nBest regards,\nOutreach Specialist`;
      
      const suggestedTitles = [
        `How to Modernize ${aiProduct} in 2026`,
        `The Ultimate Blueprint for scaling ${aiProduct}`,
        `Top 7 ${aiNiche} mistakes to avoid (and how ${aiProduct} solves them)`
      ];

      const suggestedAnchors = [
        `advanced ${aiProduct.toLowerCase()} systems`,
        `reliable ${aiNiche.toLowerCase()} growth engine`,
        `best-in-class ${aiProduct.toLowerCase()} integration`
      ];

      setGeneratedPitch({ subject, body, suggestedTitles, suggestedAnchors });
      setGeneratingPitch(false);
    }, 1200);
  };

  const openAddModal = () => {
    setFormDomain('');
    setFormCategory('Tech');
    setFormType('Both');
    setFormDA(35);
    setFormDR(45);
    setFormTraffic(8500);
    setFormSpamScore(1);
    setFormPrice(120);
    setFormCountry('United States');
    setFormLanguage('English');
    setShowAddModal(true);
  };

  const openEditModal = (site: WebsiteItem) => {
    setEditingWebsite(site);
    setFormDomain(site.domain);
    setFormCategory(site.category);
    setFormType(site.type);
    setFormDA(site.da);
    setFormDR(site.dr);
    setFormTraffic(site.traffic);
    setFormSpamScore(site.spamScore);
    setFormPrice(site.price);
    setFormCountry(site.country);
    setFormLanguage(site.language);
  };

  const handleSaveWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDomain) {
      alert('Please enter a website domain.');
      return;
    }

    const data = {
      domain: formDomain,
      category: formCategory,
      type: formType,
      da: Number(formDA),
      dr: Number(formDR),
      traffic: Number(formTraffic),
      spamScore: Number(formSpamScore),
      price: Number(formPrice),
      country: formCountry,
      language: formLanguage
    };

    if (editingWebsite) {
      updateWebsite({
        ...data,
        id: editingWebsite.id
      });
      setEditingWebsite(null);
    } else {
      addWebsite(data);
      setShowAddModal(false);
    }
  };

  const openAddServiceModal = () => {
    setEditingService(null);
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setServiceIcon('guestposting');
    setShowServiceModal(true);
  };

  const openEditServiceModal = (service: ServiceItem) => {
    setEditingService(service);
    setServiceName(service.name);
    setServiceDescription(service.description);
    setServicePrice(service.price || '');
    setServiceIcon(service.icon || 'guestposting');
    setShowServiceModal(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !serviceDescription) {
      alert('Please fill in both service name and description.');
      return;
    }

    const data = {
      name: serviceName,
      description: serviceDescription,
      price: servicePrice,
      icon: serviceIcon
    };

    if (editingService) {
      updateService({
        ...data,
        id: editingService.id
      });
      setEditingService(null);
    } else {
      addService(data);
    }
    setShowServiceModal(false);
  };

  return (
    <div className="w-full bg-[#f2f2f2] min-h-screen pb-16">
      {/* Marketplace Banner */}
      <section className="bg-gradient-to-r from-[#001e00] to-[#122b46] text-white py-16 px-4 md:px-8 text-left border-b border-[#14a800]/20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#14a800]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-extrabold text-[#14a800] uppercase tracking-widest bg-[#14a800]/10 border border-[#14a800]/25 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Verified Backlink Placements
              </span>
              {isAdminMode && (
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Admin Active
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              Publisher Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Inventory</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed font-medium">
              Browse, filter, and buy verified white-hat do-follow backlinks directly from our database of 38,000+ niche-relevant publisher web properties. Ensure maximum SERP movement.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Pane */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        {activeTab === 'marketplace' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Panel (Left) */}
            <div className="col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-left flex flex-col gap-6 self-start">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-[#001e00] text-sm uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#14a800]" /> Search Filters
                </h3>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedType('All');
                    setMinDR(0);
                    setMaxPrice(400);
                  }}
                  className="text-xs text-slate-400 hover:text-[#118a00] font-semibold"
                >
                  Reset All
                </button>
              </div>

              {/* Text Search */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">Search Domain</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. edtechrce.org"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold outline-none focus:border-[#118a00]"
                  />
                </div>
              </div>

              {/* Category Niche */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">Niche / Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold outline-none focus:border-[#118a00] cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Placement Type */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">Placement Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold outline-none focus:border-[#118a00] cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Guest Posting">Guest Posting</option>
                  <option value="Link Insertion">Link Insertion / Niche Edit</option>
                </select>
              </div>

              {/* Minimum Domain Rating slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">Min Domain Rating (DR)</label>
                  <span className="text-xs font-bold text-[#118a00]">DR {minDR}+</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={minDR}
                  onChange={(e) => setMinDR(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#118a00]"
                />
              </div>

              {/* Max Price Filter */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">Max Price</label>
                  <span className="text-xs font-bold text-[#118a00]">${maxPrice} max</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="400"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#118a00]"
                />
              </div>
            </div>

            {/* Marketplace List Rows (Right) */}
            <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 text-left">
              {/* Admin Mode Sub-tab switcher & Configuration */}
              {isAdminMode && (
                <div className="flex flex-col gap-4 mb-4 bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50 w-full sm:w-auto">
                      <button
                        onClick={() => setAdminTab('websites')}
                        className={`px-4 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                          adminTab === 'websites' ? 'bg-[#001e00] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Manage Websites
                      </button>
                      <button
                        onClick={() => setAdminTab('services')}
                        className={`px-4 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          adminTab === 'services' ? 'bg-[#001e00] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Manage Services
                      </button>
                      <button
                        onClick={() => setAdminTab('analytics')}
                        className={`px-4 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          adminTab === 'analytics' ? 'bg-[#001e00] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Analytics
                      </button>
                    </div>

                    <button
                      onClick={() => setIsAdminMode(false)}
                      className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer self-stretch sm:self-auto justify-center"
                    >
                      <Lock className="w-3.5 h-3.5" /> Log Out Admin Mode
                    </button>
                  </div>

                  <div className="h-[1px] bg-slate-100" />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-grow w-full">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3 h-3 text-[#14a800]" /> Demo FB Page URL
                      </label>
                      <input
                        type="url"
                        value={adminFbUrl}
                        onChange={(e) => setAdminFbUrl(e.target.value)}
                        placeholder="https://facebook.com/..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#118a00] focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 max-w-xs leading-normal sm:mt-5">
                      This Facebook URL launches when users click "Message Us on Facebook" to book demos or place placements.
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                    <div className="flex-grow w-full">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3 h-3 text-[#14a800]" /> Intro Video URL
                      </label>
                      <input
                        type="url"
                        value={adminVideoUrl}
                        onChange={(e) => setAdminVideoUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-[#118a00] focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 max-w-xs leading-normal sm:mt-5">
                      This YouTube Video URL will be displayed in the Home Page.
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                    <button
                      onClick={handleSaveLinks}
                      className="bg-[#14a800] hover:bg-[#118a00] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      Save Configuration
                    </button>
                    {showSaveToast && (
                      <span className="text-xs font-bold text-green-600 animate-fadeIn">
                        ✓ Saved successfully!
                      </span>
                    )}
                  </div>
                </div>
              )}

              {isAdminMode && adminTab === 'services' ? (
                <>
                  {/* Services Admin Privileged Header Controller */}
                  <div className="bg-gradient-to-r from-green-50 to-green-50 border border-green-100 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm animate-fadeIn">
                    <div className="text-left flex items-start gap-3">
                      <div className="p-3 bg-green-600 text-white rounded-2xl shrink-0">
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#001e00] text-sm">Services Catalog Manager</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Create fresh visual service offerings, update pricing details, or purge redundant catalog slots.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={openAddServiceModal}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add New Service
                    </button>
                  </div>

                  {/* Render services list */}
                  {services.map((srv) => (
                    <div key={srv.id} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-left relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="flex-1 flex gap-5 items-start pl-2">
                        <div className="p-4 bg-green-50 text-green-600 rounded-2xl shrink-0 shadow-inner">
                          {/* Dynamically match icon */}
                          {srv.icon === 'guestposting' && <FileSpreadsheet className="w-6 h-6" />}
                          {srv.icon === 'linkinsertion' && <LinkIcon className="w-6 h-6" />}
                          {srv.icon === 'layers' && <Layers className="w-6 h-6" />}
                          {srv.icon === 'search' && <Search className="w-6 h-6" />}
                          {srv.icon === 'globe' && <Globe className="w-6 h-6" />}
                          {srv.icon === 'award' && <Sparkles className="w-6 h-6 text-green-600" />}
                          {!['guestposting', 'linkinsertion', 'layers', 'search', 'globe', 'award'].includes(srv.icon || '') && (
                            <Briefcase className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-extrabold text-[#001e00] text-lg">{srv.name}</h4>
                            {srv.price && (
                              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-lg">
                                {srv.price}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-xl font-medium">
                            {srv.description}
                          </p>
                        </div>
                      </div>

                      {/* Admin edit/delete buttons */}
                      <div className="flex gap-2 self-stretch sm:self-center justify-end border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                        <button
                          onClick={() => openEditServiceModal(srv)}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 text-slate-600 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete the "${srv.name}" service?`)) {
                              deleteService(srv.id);
                            }
                          }}
                          className="px-4 py-2.5 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-slate-600 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {services.length === 0 && (
                    <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                      <Sparkles className="w-12 h-12 text-green-200 mx-auto mb-3" />
                      <h4 className="font-bold text-slate-700 mb-1">No services exist</h4>
                      <p className="text-xs text-slate-400">Add a custom outreach service block to showcase on your front services page.</p>
                    </div>
                  )}
                </>
              ) : isAdminMode && adminTab === 'analytics' ? (
                <>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-sm animate-fadeIn">
                    <div className="text-left flex items-start gap-3">
                      <div className="p-3 bg-blue-600 text-white rounded-2xl shrink-0">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#001e00] text-sm">Traffic Analytics</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Monitor website traffic by country.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-slate-100 pb-4 gap-4">
                        <h3 className="text-lg font-bold text-slate-800">Visits by Country</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
                            Total Visits: {trafficData.total || 0}
                          </span>
                          <button
                            onClick={resetTrafficData}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-red-100 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Reset
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(trafficData)
                          .filter(([country]) => country !== 'total')
                          .sort(([, a], [, b]) => b - a)
                          .map(([country, count]) => (
                            <div key={country} className="flex flex-col gap-2 bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:border-emerald-200 transition-all shadow-xs">
                              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Country Name</span>
                                <span className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                                  <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                  {country}
                                </span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Visitors</span>
                                <span className="font-bold text-[#118a00] bg-[#14a800]/10 px-3 py-1 rounded-lg text-xs">
                                  {count} {count === 1 ? 'Visit' : 'Visits'}
                                </span>
                              </div>
                            </div>
                        ))}
                        {Object.keys(trafficData).filter(c => c !== 'total').length === 0 && (
                          <div className="col-span-full text-center text-slate-400 py-8">
                            No traffic data available yet.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Admin Privileged Header Controller */}
                  {isAdminMode && (
                    <div className="bg-gradient-to-r from-emerald-50 to-indigo-50/50 border border-emerald-100 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm animate-fadeIn">
                      <div className="text-left flex items-start gap-3">
                        <div className="p-3 bg-emerald-600 text-white rounded-2xl shrink-0">
                          <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-[#001e00] text-sm">Publisher Database Controller</h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            You have root privileges. Register fresh high-quality domains, modify pricing, or purge outdated catalog records instantly.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={openAddModal}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add Web Property
                      </button>
                    </div>
                  )}

                  {filteredInventory.map((item) => {
                    const isInCart = cart.some((c) => c.website.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row justify-between items-stretch gap-6 relative overflow-hidden"
                      >
                        {/* Accent border on hover */}
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#14a800] to-[#118a00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Left block info */}
                        <div className="flex-1 flex flex-col justify-between pl-2">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="text-[10px] font-extrabold bg-emerald-50/80 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100/50 uppercase tracking-widest">
                                {item.category}
                              </span>
                              <span className="text-[10px] font-extrabold bg-[#14a800]/10 text-[#118a00] px-3 py-1.5 rounded-lg border border-[#14a800]/20 uppercase tracking-widest">
                                {item.type}
                              </span>
                            </div>
                            <h3 className="text-xl font-extrabold text-[#001e00] mb-5 flex items-center gap-2">
                              {item.domain}
                            </h3>

                            {/* Metrics Table */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gradient-to-br from-slate-50 to-slate-100/50 p-5 rounded-2xl border border-slate-200/60 shadow-inner">
                              <div className="flex flex-col gap-1">
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Domain Authority</p>
                                <p className="text-lg font-extrabold text-[#001e00]">DA {item.da}</p>
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Domain Rating</p>
                                <p className="text-lg font-extrabold text-[#118a00]">DR {item.dr}</p>
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Organic Traffic</p>
                                <p className="text-lg font-extrabold text-[#001e00]">{item.traffic.toLocaleString()}<span className="text-xs text-slate-500 font-bold ml-1">/mo</span></p>
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Spam score</p>
                                <p className="text-lg font-extrabold text-slate-600">{item.spamScore}%</p>
                              </div>
                            </div>
                          </div>

                          {/* Info footer */}
                          <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-5 font-bold uppercase tracking-wider bg-slate-50 self-start px-3 py-1.5 rounded-lg border border-slate-100">
                            <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> {item.language}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span>{item.country}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-emerald-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Dofollow</span>
                          </div>
                        </div>

                        {/* Right block checkout action */}
                        <div className="w-full md:w-56 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6 flex flex-col justify-center items-center md:items-end text-center md:text-right">
                          <div className="mb-4">
                            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mb-1">Single Placement</p>
                            <p className="text-3xl font-extrabold text-[#001e00]">${item.price.toFixed(2)}</p>
                          </div>

                          <button
                            onClick={onBookDemo}
                            className="w-full bg-[#001e00] hover:bg-[#118a00] text-white font-bold py-3 px-4 rounded-xl text-center text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
                          >
                            Consult Now on Facebook
                          </button>

                          {/* Admin CRUD Option buttons */}
                          {isAdminMode && (
                            <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-dashed border-slate-200">
                              <button
                                onClick={() => openEditModal(item)}
                                className="py-2.5 px-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                                title="Edit metrics"
                              >
                                <Edit className="w-3.5 h-3.5" /> Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Purge ${item.domain} permanently from outreach live inventory?`)) {
                                    deleteWebsite(item.id);
                                  }
                                }}
                                className="py-2.5 px-2 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                                title="Purge record"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {filteredInventory.length === 0 && (
                    <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
                      <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <h4 className="font-bold text-slate-700 mb-2">No matching publishers found</h4>
                      <p className="text-xs text-slate-400">Modify your Search Keyword, DR range, or Category parameters above.</p>
                    </div>
                  )}

                  {filteredInventory.length > 0 && (
                    <div className="bg-gradient-to-r from-[#001e00] to-[#122b44] rounded-3xl p-8 mt-4 border border-[#14a800]/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                      <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#14a800] rounded-full filter blur-[100px] opacity-15"></div>
                      <div className="relative z-10 text-center md:text-left">
                        <h4 className="text-xl font-extrabold text-white mb-2">Want to see more sites?</h4>
                        <p className="text-sm text-slate-300">We have thousands of premium publishers in our private inventory.</p>
                      </div>
                      <a
                        href={demoFacebookUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 bg-[#118a00] hover:bg-[#14a800] text-white px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap"
                      >
                        Contact us on Facebook
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}


      </div>

      {/* Dynamic Pop-up Modal for Add/Edit Website */}
      <AnimatePresence>
        {(showAddModal || editingWebsite) && (
          <div className="fixed inset-0 bg-[#001e00]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#001e00] text-white p-6 flex justify-between items-center text-left">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#14a800]" />
                  <h3 className="text-lg font-bold">
                    {editingWebsite ? 'Modify Web Property' : 'Register New Publisher'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingWebsite(null);
                  }}
                  className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveWebsite} className="p-6 flex flex-col gap-4 text-left max-h-[75vh] overflow-y-auto">
                {/* Domain Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">
                    Website Domain *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. technewsjournal.com"
                    value={formDomain}
                    onChange={(e) => setFormDomain(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-[#118a00] outline-none transition-all"
                  />
                </div>

                {/* Grid items */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">
                      Niche Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 focus:border-[#118a00] outline-none cursor-pointer"
                    >
                      <option value="Tech">Tech</option>
                      <option value="Education">Education</option>
                      <option value="Business">Business</option>
                      <option value="Law & Politics">Law & Politics</option>
                      <option value="Politics">Politics</option>
                      <option value="Finance">Finance</option>
                      <option value="Health">Health</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Travel">Travel</option>
                      <option value="Entertainment">Entertainment</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">
                      Placement Type
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 focus:border-[#118a00] outline-none cursor-pointer"
                    >
                      <option value="Guest Posting">Guest Posting</option>
                      <option value="Link Insertion">Link Insertion</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Domain Authority (DA)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      required
                      value={formDA}
                      onChange={(e) => setFormDA(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#118a00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Domain Rating (DR)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      required
                      value={formDR}
                      onChange={(e) => setFormDR(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#118a00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Spam Score (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      required
                      value={formSpamScore}
                      onChange={(e) => setFormSpamScore(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#118a00]"
                    />
                  </div>
                </div>

                {/* Traffic, Price, Country */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">
                      Organic Traffic / mo
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formTraffic}
                      onChange={(e) => setFormTraffic(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#118a00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">
                      Price ($ USD)
                    </label>
                    <input
                      type="number"
                      min="5"
                      step="0.1"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#118a00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">
                      Country Origin
                    </label>
                    <input
                      type="text"
                      required
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#118a00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#001e00] uppercase tracking-wider">
                      Primary Language
                    </label>
                    <input
                      type="text"
                      required
                      value={formLanguage}
                      onChange={(e) => setFormLanguage(e.target.value)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#118a00]"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingWebsite(null);
                    }}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    {editingWebsite ? 'Save Changes' : 'Register Publisher'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Admin Add/Edit Service Modal */}
        {showServiceModal && (
          <div className="fixed inset-0 bg-[#001e00]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col animate-fadeIn"
            >
              {/* Header */}
              <div className="bg-[#001e00] text-white p-6 flex justify-between items-center text-left">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                  <h3 className="text-lg font-bold">
                    {editingService ? 'Edit Specialized Service' : 'Add Specialized Service'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowServiceModal(false);
                    setEditingService(null);
                  }}
                  className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form content */}
              <form onSubmit={handleSaveService} className="p-6 flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Service Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Multilingual Guest Placement"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-green-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Service Price (Display Text)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $79 / link, $149 / audit, or Contact us"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-green-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Representative Icon Accent
                  </label>
                  <select
                    value={serviceIcon}
                    onChange={(e) => setServiceIcon(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-green-600 cursor-pointer"
                  >
                    <option value="guestposting">Guest Posting (Spreadsheet/Article)</option>
                    <option value="linkinsertion">Link Insertion (Anchor Link)</option>
                    <option value="layers">Niche Edits (Stacked Layers)</option>
                    <option value="search">Competitor Analysis (Search Magnifier)</option>
                    <option value="globe">Multilingual Placement (International Globe)</option>
                    <option value="award">High DA Boost (Badge Award)</option>
                    <option value="custom">Generic Case (Business Briefcase)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Service Description / Utility Info
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detail exactly what this service delivers, placement terms, editorial guarantees, etc."
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-green-600 resize-none"
                  />
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowServiceModal(false);
                      setEditingService(null);
                    }}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                  >
                    {editingService ? 'Save Service' : 'Add Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Admin Login Modal */}
        {showAdminLoginModal && (
          <div className="fixed inset-0 bg-[#001e00]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col animate-fadeIn"
            >
              {/* Header */}
              <div className="bg-[#001e00] text-white p-6 flex justify-between items-center text-left">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#14a800]" />
                  <h3 className="text-lg font-bold">Admin Portal Access</h3>
                </div>
                <button
                  onClick={() => setShowAdminLoginModal(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminUsername === 'admin123' && adminPassword === 'admin456') {
                    setIsAdminMode(true);
                    setShowAdminLoginModal(false);
                    setLoginError('');
                  } else {
                    setLoginError('Invalid admin credentials. Please try again.');
                  }
                }} 
                className="p-6 flex flex-col gap-4 text-left"
              >
                <p className="text-xs text-slate-500 leading-relaxed mb-1">
                  Access publisher database controls to insert, edit, or delete live inventory.
                </p>

                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Username</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter admin username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-[#118a00] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-[#118a00] outline-none"
                  />
                </div>



                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-[#118a00] hover:bg-[#14a800] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors shadow-md cursor-pointer"
                >
                  Log In as Admin
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
