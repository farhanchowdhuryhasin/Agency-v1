import React, { useState } from 'react';
import { PageView } from '../types';
import { motion } from 'motion/react';
// @ts-ignore
import seoAuthorityChart from '../assets/images/seo_authority_chart_1784132384416.jpg';
import {
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Users,
  CheckCircle,
  FileText,
  Bookmark,
  Share2,
  Image as ImageIcon,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Server,
  Link2
} from 'lucide-react';

interface HomeViewProps {
  setView: (view: PageView) => void;
  onBookDemo: () => void;
  introVideoUrl?: string;
}

export default function HomeView({ setView, onBookDemo, introVideoUrl }: HomeViewProps) {
  const [activeAudience, setActiveAudience] = useState<'seos' | 'agencies' | 'marketers'>('seos');

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const embedUrl = getYoutubeEmbedUrl(introVideoUrl);

  const stats = [
    { value: '38k+', label: 'Websites in Inventory', icon: Globe, color: 'text-emerald-600' },
    { value: '1,200+', label: 'Active Publishers', icon: Users, color: 'text-[#14a800]' },
    { value: '50k+', label: 'Tasks Completed', icon: CheckCircle, color: 'text-[#118a00]' }
  ];

  const pillars = [
    {
      title: 'AI-Enhanced Digital Strategy',
      desc: 'We combine advanced natural language tools and machine algorithms to find high-performing marketing opportunities and scale organic rankings.',
      tag: 'Strategic Planning'
    },
    {
      title: 'Server-Side Precision & Analytics',
      desc: 'Unlock 100% of conversion actions. Deploy cookie-less container tracking to ensure pixel precision across iOS platforms and privacy layers.',
      tag: 'Tracking Precision'
    },
    {
      title: 'Authoritative Organic Reach',
      desc: 'Acquire stable contextual links and custom editorial assets hosted on top-tier root domains with real organic search traffic.',
      tag: 'Safe Backlinks'
    }
  ];

  const services = [
    {
      id: 'ai-marketing',
      title: 'AI Digital Marketing & Content SEO',
      desc: 'Harness state-of-the-art machine models to automate digital outreach, research intent-driven search parameters, and optimize your overall growth.',
      icon: Sparkles,
      view: PageView.SERVICES
    },
    {
      id: 'server-tracking',
      title: 'Server-Side Tracking Setup',
      desc: 'Integrate custom cloud-based Server GTM (sGTM) pipelines to recover conversion pixels, bypass standard ad-blockers, and build robust first-party tracking assets.',
      icon: Server,
      view: PageView.SERVICES
    },
    {
      id: 'guest-posting',
      title: 'Premium Guest Posting Services',
      desc: 'Manual webmaster outreach and custom publication on actual niche authority blogs to build search footprint momentum and organic credibility.',
      icon: FileText,
      view: PageView.GUEST_POSTING
    },
    {
      id: 'link-insertion',
      title: 'Contextual Link Insertion & Edits',
      desc: 'Contextual backlinks embedded directly inside highly-authoritative pre-indexed articles that already rank on Google for instant referral juice.',
      icon: Link2,
      view: PageView.LINK_INSERTION
    }
  ];

  const audienceContent = {
    seos: {
      title: 'For SEO Professionals & Freelancers',
      desc: 'Are you a part of an in-house SEO team, or do you work as a freelancer? We can help with your link-building projects while you focus your energy and time on other tasks on your desk.',
      bullets: [
        'Massive inventory across all niches immediately accessible',
        'Detailed metric transparency (DA, DR, organic traffic history)',
        'Guaranteed do-follow links with clean anchor integration'
      ]
    },
    agencies: {
      title: 'For Digital & SEO Agencies',
      desc: 'Is your agency always super busy, and you don\'t have time for link building? If yes, you can count on us! Let\'s handle your backlink projects while you take credit for the work.',
      bullets: [
        'White-label dashboard reports designed to ship straight to clients',
        'Dedicated account managers and custom outreach on demand',
        'Bulk pricing discounts to maximize your agency margins'
      ]
    },
    marketers: {
      title: 'For In-House Growth Marketers',
      desc: 'Backlink building is a vital digital marketing strategy marketers should pay attention to. Let our result-driven backlink experts get you quality backlinks while you concentrate on other aspects of your marketing strategy.',
      bullets: [
        'Safe white-hat placements that withstand core Google updates',
        'Custom niche-matching to align perfectly with product lines',
        'Clear ROI tracking with stable, long-term traffic gains'
      ]
    }
  };

  const caseStudies = [
    {
      title: 'Opertray Division',
      metric: 'Ranks #1-#3 in 4 Months',
      desc: 'This website achieved rapid top-tier search visibility using targeted guest postings.',
      focus: 'Keyword: "Opertray"',
      percent: '250%'
    },
    {
      title: 'Tremely Designs',
      metric: '3.4k Monthly Visitors Added',
      desc: 'Acquired online buyers via high-intent, long-tail search targeting.',
      focus: 'Conversion Strategy',
      percent: '180%'
    },
    {
      title: 'Plainst Technologies',
      metric: '65% Organic Share',
      desc: 'Organic search became the primary growth driver, overtaking paid campaigns.',
      focus: 'Organic Dominance',
      percent: '340%'
    },
    {
      title: 'Maindex Solutions',
      metric: '55% of Total Sales',
      desc: 'Search engine placements became the largest revenue source for this ecommerce store.',
      focus: 'Revenue Inbound',
      percent: '210%'
    }
  ];

  return (
    <div className="w-full bg-[#f2f2f2] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:py-24 overflow-hidden px-4 md:px-8 border-b border-slate-200/40">
        <div className="absolute inset-0 bg-[radial-gradient(#14a800_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]"></div>
        
        {/* Decorative ambient blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#14a800]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-40 w-96 h-96 bg-[#1E5181]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14a800]/10 text-[#118a00] font-bold text-xs uppercase tracking-widest mb-6 border border-[#14a800]/20"
            >
              <Award className="w-4 h-4" />
              AI-POWERED GROWTH & DATA-DRIVEN MARKETING
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#001e00] leading-[1.1] tracking-tight mb-6"
            >
              Scale organic traffic with{' '}
              <span className="text-[#118a00] bg-gradient-to-r from-[#118a00] to-[#14a800] bg-clip-text text-transparent">
                AI marketing & tracking
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed"
            >
              Accelerate conversions. Combine smart AI content optimization, precise Server-Side tracking setups, premium Guest Posting, and contextual Link Insertions to maximize digital authority.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => setView(PageView.PORTAL)}
                className="bg-[#001e00] text-white font-bold px-8 py-4 rounded-full hover:bg-[#118a00] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:-translate-y-0.5"
              >
                Explore 38000+ Websites
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onBookDemo}
                className="bg-white text-[#001e00] font-bold px-8 py-4 rounded-full border-2 border-slate-200 hover:border-[#118a00] hover:text-[#118a00] transition-all duration-300 flex items-center justify-center text-center"
              >
                Book a Demo
              </button>
            </motion.div>
          </div>

          {/* Graphical Side mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-slate-100 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase">campaign monitor v2.6</span>
              </div>

              {/* Graphical illustration matching screenshots */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#14a800]/10 rounded-xl">
                      <TrendingUp className="text-[#14a800] w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Domain Authority Avg</p>
                      <p className="text-lg font-extrabold text-[#001e00]">DA 50+ Guaranteed</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-bold">+120%</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-100 rounded-xl">
                      <Globe className="text-emerald-600 w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Monthly Organic Crawl</p>
                      <p className="text-lg font-extrabold text-[#001e00]">1.2M+ Real Users</p>
                    </div>
                  </div>
                  <span className="bg-[#118a00]/10 text-[#118a00] text-xs px-2.5 py-1 rounded-full font-bold">Verified</span>
                </div>

                {/* Simulated visual graph line */}
                <div className="pt-4 pb-2 px-2 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-[#001e00] mb-3">Client Backlink Impact (Avg 60 days)</p>
                  <div className="flex items-end gap-2 h-20 px-2 justify-between">
                    <div className="w-1/6 bg-slate-200 h-[20%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-slate-200 h-[30%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-slate-300 h-[45%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-[#14a800] h-[65%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-[#118a00] h-[85%] rounded-t-sm"></div>
                    <div className="w-1/6 bg-[#001e00] h-[100%] rounded-t-sm"></div>
                  </div>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-6 flex justify-center text-xs text-slate-400 gap-1 items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                White-hat manual outreached publications only
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Video Section */}
      {embedUrl && (
        <section className="py-16 bg-white px-4 md:px-8 border-b border-slate-200/40 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-sm uppercase font-extrabold tracking-widest text-[#14a800] mb-2">Introduction</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#001e00]">See How It Works</h3>
            </div>
            <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src={embedUrl}
                title="Introductory Video"
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Stats Board Section */}
      <section className="py-12 bg-[#001e00] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="flex items-center gap-6 p-4 bg-slate-800/30 rounded-2xl border border-slate-800/50">
                <div className="p-4 bg-white/5 rounded-xl text-[#14a800]">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight">{st.value}</h3>
                  <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">{st.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Value Pillars Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#118a00] mb-3">OUTREACH & STRATEGY</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#001e00]">Our core link engineering philosophy</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pil, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#14a800] to-[#118a00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div>
                <span className="inline-block text-xs font-bold text-[#118a00] uppercase tracking-wider px-3 py-1 bg-[#14a800]/5 rounded-md mb-6">
                  {pil.tag}
                </span>
                <h4 className="text-xl font-bold text-[#001e00] mb-4 leading-snug group-hover:text-[#118a00] transition-colors">
                  {pil.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {pil.desc}
                </p>
              </div>
              <button 
                onClick={() => setView(PageView.PORTAL)}
                className="text-xs font-bold text-[#001e00] flex items-center gap-1.5 hover:text-[#118a00] transition-colors self-start mt-4"
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Is Link Building Vital Section */}
      <section className="py-20 bg-slate-50 px-4 md:px-8 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#118a00] mb-3">TRUST SIGNALS & ALGORITHMS</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#001e00] mb-6">
              Why is link building so vital for your site’s SEO?
            </h3>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Backlinks are vital to any site’s SEO and are not obsolete! Even Google's John Mueller claims they're a top-ranking signal but admits quality beats quantity. 
            </p>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Consider relevant and quality backlinks from high authority sites as your site's trust signal and social proof. Google takes your site seriously when you are linked to important websites. To them, it indicates that your content is relevant, trustworthy, and deserves the top spot.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-[#14a800] w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700">Passes Page Authority (Link Juice)</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-[#14a800] w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700">Improves Organic Crawl Rates</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-[#14a800] w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700">Establishes Niche Authority</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle className="text-[#14a800] w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700">Drives Referral Visitors</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#14a800] to-[#118a00] opacity-10 blur-xl"></div>
            <img 
              src={seoAuthorityChart} 
              alt="SEO backlink authority visualization" 
              className="rounded-2xl shadow-xl w-full object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Services Grid (Our Services) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#118a00] mb-3">FULL-STACK AI & TRACKING AGENCY</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#001e00]">Our premium marketing & data solutions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((ser, i) => {
            const Icon = ser.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#118a00] group-hover:bg-[#118a00] group-hover:text-white transition-colors duration-300 mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#001e00] mb-3 group-hover:text-[#118a00] transition-colors">
                    {ser.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {ser.desc}
                  </p>
                </div>
                <button
                  onClick={() => setView(ser.view)}
                  className="text-xs font-bold text-slate-700 group-hover:text-[#118a00] flex items-center gap-1 transition-colors self-start"
                >
                  Explore Service <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Segmentation: Is Top AI Digital Marketing, Server Side Tracking, Business Scaling and SEO, AEO, GEO services online For Me? */}
      <section className="py-20 bg-slate-900 text-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#14a800] mb-3">TARGETED SOLUTIONS</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold font-sans leading-tight">Is Top AI Digital Marketing, Server Side Tracking, Business Scaling and SEO, AEO, GEO services online for me?</h3>
          </div>

          <div className="flex justify-center gap-2 mb-12 overflow-x-auto pb-2">
            {(['seos', 'agencies', 'marketers'] as const).map((aud) => (
              <button
                key={aud}
                onClick={() => setActiveAudience(aud)}
                className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeAudience === aud 
                    ? 'bg-[#14a800] text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {aud === 'seos' ? "SEO's" : aud === 'agencies' ? 'Agencies' : 'Marketers'}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-slate-800/40 border border-slate-800 p-5 xs:p-8 md:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-extrabold mb-4 text-[#14a800]">{audienceContent[activeAudience].title}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {audienceContent[activeAudience].desc}
              </p>
            </div>
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
              {audienceContent[activeAudience].bullets.map((b, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies / Recent Outcomes Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#118a00] mb-3">HISTORIC CAMPAIGNS</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#001e00]">Our proven SEO case studies</h3>
          </div>
          <button 
            onClick={() => setView(PageView.PORTAL)}
            className="px-6 py-2.5 rounded-full border border-slate-300 font-bold text-xs uppercase tracking-wider text-[#001e00] hover:border-[#118a00] hover:text-[#118a00] transition-colors"
          >
            Explore Live Marketplace
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {caseStudies.map((cs, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-extrabold text-[#118a00]">{cs.percent}</span>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Organic Growth</span>
                </div>
                <h4 className="text-lg font-bold text-[#001e00] mb-1 group-hover:text-[#118a00] transition-colors">
                  {cs.title}
                </h4>
                <p className="text-xs font-semibold text-[#14a800] mb-3 uppercase tracking-wider">{cs.metric}</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {cs.desc}
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded-md self-start">
                {cs.focus}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Side Scrolling block */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <MessageSquare className="w-10 h-10 text-[#14a800] mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#001e00] mb-12">What our enterprise partners say</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between relative">
              <span className="absolute top-6 right-8 text-6xl font-serif text-slate-100 select-none">“</span>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 italic relative z-10">
                "We've looked at a lot of SEO solutions but these guys were always the clear favorite. They have the right white-hat strategy and they've been awesome to work with."
              </p>
              <div>
                <p className="font-bold text-slate-900 text-sm">Irene Warner</p>
                <p className="text-xs text-slate-400">CEO & Founder, ScaleUp Global</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between relative">
              <span className="absolute top-6 right-8 text-6xl font-serif text-slate-100 select-none">“</span>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 italic relative z-10">
                "I tried several agencies and spent substantial resources on guest posts with poor results until I discovered Top AI Digital Marketing, Server Side Tracking, Business Scaling and SEO, AEO, GEO services online. They have true experts who are willing to get you the actual organic traffic results you seek."
              </p>
              <div>
                <p className="font-bold text-slate-900 text-sm">Paul Barnes</p>
                <p className="text-xs text-slate-400">Founder & Director, Opertray Div</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
