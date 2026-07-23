import React from 'react';
import { PageView } from '../types';
import { motion } from 'motion/react';
// @ts-ignore
import editorialPlacementDashboard from '../assets/images/editorial_placement_dashboard_1784132743865.jpg';
import {
  FileCode,
  Users2,
  Edit3,
  BadgeCheck,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface LinkInsertionViewProps {
  setView: (view: PageView) => void;
  onBookDemo: () => void;
}

export default function LinkInsertionView({ setView, onBookDemo }: LinkInsertionViewProps) {
  const steps = [
    {
      num: '01',
      title: 'Target Identification & Prospecting',
      desc: 'Using advanced footprinting, we identify aged articles within your niche that have established organic traffic and strong backlink profiles. We prioritize contextual relevance above all else.',
      icon: FileCode,
      bg: 'bg-emerald-50',
      text: 'text-emerald-600'
    },
    {
      num: '02',
      title: 'Webmaster Outreach',
      desc: 'We negotiate directly with editors and webmasters, pitching value-add propositions rather than cold requests to secure safe placement.',
      icon: Users2,
      bg: 'bg-[#14a800]/5',
      text: 'text-[#14a800]'
    },
    {
      num: '03',
      title: 'Content Enhancement',
      desc: 'Our copywriters craft contextual, natural-flowing sentences or paragraphs to house your link, ensuring it reads organically within the existing article.',
      icon: Edit3,
      bg: 'bg-yellow-50',
      text: 'text-yellow-600'
    },
    {
      num: '04',
      title: 'Quality Assurance & Reporting',
      desc: 'Every insertion is verified for DoFollow status, correct anchoring, and indexation. You receive a transparent report detailing the URL, metrics, and live placement.',
      icon: BadgeCheck,
      bg: 'bg-green-50',
      text: 'text-green-600'
    }
  ];

  const standards = [
    {
      title: 'Contextual Continuity',
      desc: 'We never shoehorn links. We rewrite surrounding text if necessary.'
    },
    {
      title: 'Strictly Niche Relevant',
      desc: 'Placements only on sites that share your industry\'s thematic DNA.'
    },
    {
      title: 'Aged, Ranked Content',
      desc: 'We target URLs that already possess page-level authority and traffic.'
    }
  ];

  return (
    <div className="w-full bg-[#f2f2f2] min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-16 pb-20 overflow-hidden px-4 md:px-8 border-b border-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#b8c8dd_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#14a800]/10 text-[#118a00] font-bold text-xs uppercase tracking-widest mb-6 border border-[#14a800]/20">
              Aged Page Juice
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001e00] leading-tight mb-6">
              Strategic Niche Edits & <br />
              <span className="text-[#118a00]">Link Insertions</span>
            </h1>
            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl">
              Secure placements on existing, high-authority content that already ranks. We navigate editorial standards to seamlessly integrate your brand into relevant, established narratives.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setView(PageView.PORTAL)}
                className="bg-[#001e00] hover:bg-[#118a00] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:-translate-y-0.5"
              >
                View Marketplace Pricing
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBookDemo}
                className="bg-white text-[#001e00] font-bold px-8 py-4 rounded-full border-2 border-slate-200 hover:border-[#118a00] transition-colors text-center"
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* Desktop Laptop graphic showing links mapping */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#14a800] opacity-10 blur-xl"></div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl relative z-10">
              <img 
                src={editorialPlacementDashboard} 
                alt="Contextual Editorial Placement laptop dashboard mockup" 
                className="w-full h-auto rounded-xl shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Step Process Flow */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#118a00] mb-3">4-STAGE PIPELINE</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#001e00]">Our secure editorial process</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i} 
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-6 right-8 text-4xl font-extrabold text-slate-100">
                  {st.num}
                </div>
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${st.bg} ${st.text} flex items-center justify-center mb-6`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-[#001e00] mb-3 leading-snug">
                    {st.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Uncompromising Standards */}
      <section className="py-20 bg-white border-t border-slate-100 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-[#14a800]/10 opacity-50 blur-xl"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVl69-7Wu0sz07FJNSSKsh8ReoMeP-mk6GGLDZWQ0vPvCBi1lnqoniXMLI9co3ZvpXHnizr6a7GfbVQZqQMrtxV17szV2gL9oQ1y7SapqnZXCDsEDwYd0C9EHmvIomWDXdRVRbLBSgR-7-96Y1jhDCIshX4zQG-0uLR3_E5eFztlWwgxePS92pR1LfzCsuNm3ZRkmIr8n5wKgeLtywamVStJWYfg192R2YrTj3n8og8oGfa6GegIG60hi3PxuG2wHiRsmtZCVhtZE" 
              alt="Editorial standards writing desk" 
              className="rounded-3xl shadow-xl w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#118a00] mb-3">ZERO FOOTPRINT MENTALITY</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#001e00] mb-6">
              Uncompromising editorial standards
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              A poorly placed link can do more harm than good. We ensure every niche edit looks and feels like it belonged there from day one, fitting flawlessly with the author's voice and intent.
            </p>

            <div className="space-y-6">
              {standards.map((st, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle className="text-[#14a800] w-5 h-5 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-[#001e00] text-base mb-1">{st.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
