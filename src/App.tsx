import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from './lib/firebase';
import { PageView, CartItem, WebsiteItem, ServiceItem } from './types';
import { INVENTORY } from './data/inventory';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MainServicesView from './components/MainServicesView';
import GuestPostingView from './components/GuestPostingView';
import LinkInsertionView from './components/LinkInsertionView';
import PortalView from './components/PortalView';
import BookDemoView from './components/BookDemoView';
import ServicesView from './components/ServicesView';

const DEFAULT_SERVICES: ServiceItem[] = [
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
  },
  {
    id: 'srv-14',
    name: 'Youtube video promotion',
    description: 'Targeted YouTube advertising and promotion to rapidly grow views and subscriber base.',
    price: 'Custom Quote',
    icon: 'award'
  },
  {
    id: 'srv-15',
    name: 'Facebook post boost',
    description: 'Strategic boosting of Facebook posts to maximize reach, engagement, and conversion rates.',
    price: 'Custom Quote',
    icon: 'trendingup'
  },
  {
    id: 'srv-16',
    name: 'Youtube Monitization',
    description: 'Comprehensive strategies to fulfill YouTube partner program requirements and optimize ad revenue.',
    price: 'Custom Quote',
    icon: 'award'
  },
  {
    id: 'srv-17',
    name: 'Facebook Monitization',
    description: 'Setup and qualification for Facebook in-stream ads and fan subscriptions.',
    price: 'Custom Quote',
    icon: 'trendingup'
  }
];

export default function App() {
  const [currentView, setView] = useState<PageView>(PageView.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [inventory, setInventory] = useState<WebsiteItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  // Settings state
  const [demoFacebookUrl, setDemoFacebookUrl] = useState('https://facebook.com');
  const [introVideoUrl, setIntroVideoUrl] = useState('');

  // Fetch settings from Firestore
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.demoFacebookUrl) setDemoFacebookUrl(data.demoFacebookUrl);
          if (data.introVideoUrl) setIntroVideoUrl(data.introVideoUrl);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Traffic Tracking
  useEffect(() => {
    const trackTraffic = async () => {
      if (sessionStorage.getItem('tracked_visit')) return;
      try {
        let countryName = 'Unknown';
        try {
          // Provider 1: geojs.io
          const res1 = await fetch('https://get.geojs.io/v1/ip/geo.json');
          if (res1.ok) {
            const data = await res1.json();
            if (data && data.country) countryName = data.country;
          }
          if (countryName === 'Unknown') {
            // Provider 2: ipwho.is
            const res2 = await fetch('https://ipwho.is/');
            if (res2.ok) {
              const data = await res2.json();
              if (data && data.country) countryName = data.country;
            }
          }
        } catch (fetchError) {
          console.warn('Could not fetch IP location, defaulting to Unknown:', fetchError);
        }

        await setDoc(doc(db, 'analytics', 'traffic'), {
          [countryName]: increment(1),
          total: increment(1)
        }, { merge: true });
        
        sessionStorage.setItem('tracked_visit', 'true');
      } catch (error) {
        console.error('Failed to track traffic in Firestore', error);
      }
    };
    trackTraffic();
  }, []);

  const updateDemoFacebookUrl = async (url: string) => {
    setDemoFacebookUrl(url);
    try {
      await setDoc(doc(db, 'settings', 'global'), { demoFacebookUrl: url }, { merge: true });
    } catch (error) {
      console.error("Error saving facebook URL:", error);
    }
  };

  const updateIntroVideoUrl = async (url: string) => {
    setIntroVideoUrl(url);
    try {
      await setDoc(doc(db, 'settings', 'global'), { introVideoUrl: url }, { merge: true });
    } catch (error) {
      console.error("Error saving intro video URL:", error);
    }
  };

  // Lifted Admin states to connect Footer with Portal
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  // Smooth scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Sync cart from/to localStorage if needed
  useEffect(() => {
    const savedCart = localStorage.getItem('outreach_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart');
      }
    }
  }, []);

  // Sync inventory from/to localStorage
  useEffect(() => {
    const savedInventory = localStorage.getItem('outreach_inventory_v2');
    if (savedInventory) {
      try {
        setInventory(JSON.parse(savedInventory));
      } catch (e) {
        console.error('Failed to parse saved inventory');
        setInventory(INVENTORY);
      }
    } else {
      setInventory(INVENTORY);
    }
  }, []);

  // Sync services from/to localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem('outreach_services_v3');
    if (savedServices) {
      try {
        setServices(JSON.parse(savedServices));
      } catch (e) {
        console.error('Failed to parse saved services');
        setServices(DEFAULT_SERVICES);
      }
    } else {
      setServices(DEFAULT_SERVICES);
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('outreach_cart', JSON.stringify(newCart));
  };

  const saveInventory = (newInventory: WebsiteItem[]) => {
    setInventory(newInventory);
    localStorage.setItem('outreach_inventory_v2', JSON.stringify(newInventory));
  };

  const saveServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
    localStorage.setItem('outreach_services_v3', JSON.stringify(newServices));
  };

  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: `srv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    saveServices([...services, newService]);
  };

  const updateService = (updatedService: ServiceItem) => {
    const updated = services.map((item) =>
      item.id === updatedService.id ? updatedService : item
    );
    saveServices(updated);
  };

  const deleteService = (serviceId: string) => {
    const updated = services.filter((item) => item.id !== serviceId);
    saveServices(updated);
  };

  const addToCart = (website: WebsiteItem) => {
    const isAlreadyInCart = cart.some((item) => item.website.id === website.id);
    if (isAlreadyInCart) return;

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      website,
      targetUrl: '',
      anchorText: '',
      notes: ''
    };

    saveCart([...cart, newItem]);
  };

  const removeFromCart = (cartItemId: string) => {
    const updated = cart.filter((item) => item.id !== cartItemId);
    saveCart(updated);
  };

  const updateCartItem = (cartItemId: string, targetUrl: string, anchorText: string, notes: string) => {
    const updated = cart.map((item) => {
      if (item.id === cartItemId) {
        return { ...item, targetUrl, anchorText, notes };
      }
      return item;
    });
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Inventory CRUD handlers for Admin User
  const addWebsite = (websiteData: Omit<WebsiteItem, 'id'>) => {
    const newWebsite: WebsiteItem = {
      ...websiteData,
      id: `site-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    saveInventory([...inventory, newWebsite]);
  };

  const updateWebsite = (updatedWebsite: WebsiteItem) => {
    const updated = inventory.map((item) =>
      item.id === updatedWebsite.id ? updatedWebsite : item
    );
    saveInventory(updated);

    // Sync updated details in the shopping cart
    const updatedCart = cart.map((item) => {
      if (item.website.id === updatedWebsite.id) {
        return { ...item, website: updatedWebsite };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const deleteWebsite = (websiteId: string) => {
    const updated = inventory.filter((item) => item.id !== websiteId);
    saveInventory(updated);

    // Sync deletion by removing it from the shopping cart
    const updatedCart = cart.filter((item) => item.website.id !== websiteId);
    saveCart(updatedCart);
  };

  const handleBookDemo = () => {
    setView(PageView.BOOK_DEMO);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f2f2] text-[#161c21] font-sans antialiased selection:bg-[#14a800]/30 select-none">
      {/* Top Header */}
      <TopNavBar
        currentView={currentView}
        setView={setView}
        cartCount={cart.length}
        onBookDemo={handleBookDemo}
      />

      {/* Main View Container */}
      <main className="flex-grow w-full relative">
        {currentView === PageView.HOME && (
          <HomeView 
            setView={setView} 
            onBookDemo={handleBookDemo} 
            introVideoUrl={introVideoUrl}
          />
        )}
        {currentView === PageView.SERVICES && (
          <ServicesView 
            setView={setView} 
            services={services} 
            onBookDemo={handleBookDemo} 
            isAdminMode={isAdminMode}
            deleteService={deleteService}
          />
        )}
        {currentView === PageView.MAIN_SERVICES && (
          <MainServicesView 
            setView={setView}
          />
        )}
        {currentView === PageView.GUEST_POSTING && (
          <GuestPostingView 
            setView={setView} 
            onBookDemo={handleBookDemo} 
          />
        )}
        {currentView === PageView.LINK_INSERTION && (
          <LinkInsertionView 
            setView={setView} 
            onBookDemo={handleBookDemo} 
          />
        )}
        {currentView === PageView.BOOK_DEMO && (
          <BookDemoView
            setView={setView}
            demoFacebookUrl={demoFacebookUrl}
          />
        )}
        {currentView === PageView.PORTAL && (
          <PortalView
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateCartItem={updateCartItem}
            clearCart={clearCart}
            inventory={inventory}
            addWebsite={addWebsite}
            updateWebsite={updateWebsite}
            deleteWebsite={deleteWebsite}
            isAdminMode={isAdminMode}
            setIsAdminMode={setIsAdminMode}
            showAdminLoginModal={showAdminLoginModal}
            setShowAdminLoginModal={setShowAdminLoginModal}
            demoFacebookUrl={demoFacebookUrl}
            updateDemoFacebookUrl={updateDemoFacebookUrl}
            introVideoUrl={introVideoUrl}
            updateIntroVideoUrl={updateIntroVideoUrl}
            services={services}
            addService={addService}
            updateService={updateService}
            deleteService={deleteService}
            onBookDemo={handleBookDemo}
          />
        )}
      </main>

      <Footer 
        setView={setView} 
        onBookDemo={() => setView(PageView.BOOK_DEMO)}
        isAdminMode={isAdminMode}
        setShowAdminLoginModal={setShowAdminLoginModal}
      />
    </div>
  );
}

