import React, { useState, useRef, useEffect } from 'react';
import { PageView } from '../types';
import { Link2, Menu, X, User, ChevronDown, FileText, Link as LinkIcon, ExternalLink, Sparkles } from 'lucide-react';

interface TopNavBarProps {
  currentView: PageView;
  setView: (view: PageView) => void;
  cartCount: number;
  onBookDemo: () => void;
}

export default function TopNavBar({ currentView, setView, cartCount, onBookDemo }: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (view: PageView) => {
    setView(view);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const isServiceActive = currentView === PageView.GUEST_POSTING || currentView === PageView.LINK_INSERTION || currentView === PageView.SERVICES;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto min-h-[80px] py-3 md:py-0">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick(PageView.HOME)}
          className="text-base min-[350px]:text-lg xs:text-xl md:text-2xl font-bold text-[#001e00] flex items-center gap-1.5 xs:gap-2 hover:opacity-90 transition-opacity text-left"
        >
          <span className="p-1.5 xs:p-2 bg-[#14a800]/10 rounded-lg flex items-center justify-center shrink-0">
            <Link2 className="text-[#14a800] w-4.5 h-4.5 xs:w-5 xs:h-5 md:w-6 md:h-6" />
          </span>
          <span className="tracking-tight font-extrabold text-[10px] xs:text-xs sm:text-sm md:text-base leading-tight">
            Top AI Digital Marketing, Server Side Tracking, Business Scaling and SEO, AEO, GEO services online
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => handleNavClick(PageView.HOME)}
            className={`font-medium text-sm transition-all duration-300 relative py-1 ${
              currentView === PageView.HOME
                ? 'text-[#118a00] font-bold'
                : 'text-slate-600 hover:text-[#118a00]'
            }`}
          >
            Home
            {currentView === PageView.HOME && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#118a00] rounded-full" />
            )}
          </button>

          {/* Main Services link */}
          <button
            onClick={() => handleNavClick(PageView.MAIN_SERVICES)}
            className={`font-medium text-sm transition-all duration-300 relative py-1 ${
              currentView === PageView.MAIN_SERVICES
                ? 'text-[#118a00] font-bold'
                : 'text-slate-600 hover:text-[#118a00]'
            }`}
          >
            Main Services
            {currentView === PageView.MAIN_SERVICES && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#118a00] rounded-full" />
            )}
          </button>

          {/* All Services Overview link */}
          <button
            onClick={() => handleNavClick(PageView.SERVICES)}
            className={`font-medium text-sm transition-all duration-300 relative py-1 ${
              currentView === PageView.SERVICES
                ? 'text-[#118a00] font-bold'
                : 'text-slate-600 hover:text-[#118a00]'
            }`}
          >
            All Services Overview
            {currentView === PageView.SERVICES && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#118a00] rounded-full" />
            )}
          </button>

          <button
            onClick={onBookDemo}
            className="font-semibold text-sm text-slate-600 hover:text-[#118a00] transition-all duration-300 flex items-center gap-1 py-1"
          >
            Book a Demo
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick(PageView.PORTAL)}
            className={`font-medium text-sm px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-sm ${
              currentView === PageView.PORTAL
                ? 'bg-[#118a00] text-white'
                : 'bg-[#001e00] text-white hover:bg-[#118a00]'
            }`}
          >
            Marketplace
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => handleNavClick(PageView.PORTAL)}
            className="p-2 text-slate-600 relative"
            aria-label="Marketplace"
          >
            <Link2 className="w-6 h-6" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#001e00] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute top-20 left-0 w-full px-6 py-6 flex flex-col gap-4 animate-fadeIn max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => handleNavClick(PageView.HOME)}
            className={`text-left py-2 font-semibold text-lg transition-colors ${
              currentView === PageView.HOME ? 'text-[#118a00]' : 'text-slate-700'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick(PageView.MAIN_SERVICES)}
            className={`text-left py-2 font-semibold text-lg transition-colors ${
              currentView === PageView.MAIN_SERVICES ? 'text-[#118a00]' : 'text-slate-700'
            }`}
          >
            Main Services
          </button>

          <button
            onClick={() => handleNavClick(PageView.SERVICES)}
            className={`text-left py-2 font-semibold text-lg border-b border-slate-100 pb-2 transition-colors ${
              currentView === PageView.SERVICES ? 'text-[#118a00]' : 'text-slate-700'
            }`}
          >
            All Services Overview
          </button>

          <button
            onClick={() => {
              onBookDemo();
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 font-semibold text-lg text-slate-700 hover:text-[#118a00] flex items-center gap-1"
          >
            Book a Demo
            <ExternalLink className="w-4 h-4 opacity-60" />
          </button>

          <div className="h-[1px] bg-slate-100 my-2" />
          <button
            onClick={() => handleNavClick(PageView.PORTAL)}
            className="w-full text-center bg-[#001e00] text-white py-3 rounded-xl font-bold hover:bg-[#118a00] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            Go to Marketplace
          </button>
        </div>
      )}
    </header>
  );
}
