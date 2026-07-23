import React from 'react';
import { PageView, ServiceItem } from '../types';
import { motion } from 'motion/react';
import { 
  FileText, 
  LinkIcon, 
  Sparkles, 
  Layers, 
  Globe, 
  Award, 
  Search, 
  ArrowRight,
  TrendingUp,
  Bookmark,
  Server,
  Trash2
} from 'lucide-react';

interface ServicesViewProps {
  setView: (view: PageView) => void;
  services: ServiceItem[];
  onBookDemo: () => void;
  isAdminMode?: boolean;
  deleteService?: (id: string) => void;
}

// Icon mapper for the service icons
const getServiceIcon = (iconName?: string) => {
  switch (iconName?.toLowerCase()) {
    case 'filetext':
    case 'guestposting':
      return <FileText className="w-6 h-6" />;
    case 'link':
    case 'linkicon':
    case 'linkinsertion':
      return <LinkIcon className="w-6 h-6" />;
    case 'sparkles':
    case 'ai':
      return <Sparkles className="w-6 h-6" />;
    case 'server':
    case 'tracking':
      return <Server className="w-6 h-6" />;
    case 'layers':
      return <Layers className="w-6 h-6" />;
    case 'globe':
      return <Globe className="w-6 h-6" />;
    case 'award':
      return <Award className="w-6 h-6" />;
    case 'search':
    case 'audit':
      return <Search className="w-6 h-6" />;
    case 'trendingup':
    case 'traffic':
      return <TrendingUp className="w-6 h-6" />;
    default:
      return <Bookmark className="w-6 h-6" />;
  }
};

export default function ServicesView({ setView, services, onBookDemo, isAdminMode, deleteService }: ServicesViewProps) {
  return (
    <div className="min-h-screen bg-[#f2f2f2] pb-24">
      {/* Header Banner */}
      <section className="bg-[#001e00] text-white pt-24 pb-16 relative overflow-hidden text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#14a800,transparent_50%)] opacity-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#118a00,transparent_50%)] opacity-10"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#14a800]/10 border border-[#14a800]/20 px-3.5 py-1.5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#14a800]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#14a800]">Premium Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Our Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14a800] to-[#ff7eb3]">AI Marketing & Advanced SEO</span> Suite
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Scale your digital authority with AI-driven content campaigns, Server-Side Tracking setups, high-impact Guest Posting, and authoritative Contextual Link Insertions.
          </p>
        </div>
      </section>

      {/* Services Grid Content */}
      <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        {services.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
            <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-bold text-slate-700 mb-2">No custom services available</h3>
            <p className="text-xs text-slate-400 mb-6">Log in to the Admin Portal to add professional services.</p>
            <button
              onClick={() => setView(PageView.PORTAL)}
              className="bg-[#001e00] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#118a00]"
            >
              Go to Portal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full text-left p-6 md:p-8"
              >
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-2xl bg-[#14a800]/10 text-[#118a00] flex items-center justify-center mb-6">
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="text-xl font-extrabold text-[#001e00] mb-3 group-hover:text-[#118a00] transition-colors">
                  {service.name}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>

                {service.price && (
                  <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Starting Price</span>
                    <span className="text-lg font-extrabold text-[#118a00]">{service.price}</span>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={onBookDemo}
                    className="w-full bg-[#001e00] hover:bg-[#118a00] text-white font-bold py-3 px-4 rounded-xl text-center text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 group"
                  >
                    <span>Consult Now on Facebook</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {isAdminMode && deleteService && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete the "${service.name}" service?`)) {
                          deleteService(service.id);
                        }
                      }}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 px-4 rounded-xl text-center text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Service</span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Trust Banner CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-16 text-left">
        <div className="bg-gradient-to-br from-[#001e00] to-[#122b44] p-8 md:p-12 rounded-3xl text-white relative overflow-hidden shadow-xl">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#14a800] rounded-full filter blur-[100px] opacity-15"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h4 className="text-2xl font-extrabold mb-4 text-[#14a800]">Need a custom enterprise strategy?</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              We provide tailored outreach operations, white-label API reporting integrations, high-volume discounts, and dedicated account managers for large agencies.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onBookDemo}
                className="bg-[#118a00] hover:bg-[#14a800] text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Schedule Agency Strategy Session
              </button>
              <button
                onClick={() => setView(PageView.PORTAL)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Explore Active Catalog
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
