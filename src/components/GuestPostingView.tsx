import React from 'react';
import { PageView } from '../types';
import { motion } from 'motion/react';
import {
  FileText,
  ShieldCheck,
  Target,
  BarChart3,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BookmarkCheck
} from 'lucide-react';

interface GuestPostingViewProps {
  setView: (view: PageView) => void;
  onBookDemo: () => void;
}

export default function GuestPostingView({ setView, onBookDemo }: GuestPostingViewProps) {
  return (
    <div className="w-full bg-[#f2f2f2] min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-16 pb-20 overflow-hidden px-4 md:px-8 border-b border-slate-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#b8c8dd_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#14a800]/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/10 rounded-full blur-[60px]"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1e2d3d]/5 text-[#001e00] font-bold text-xs uppercase tracking-widest mb-6 border border-slate-200">
              Premium Placement Engine
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001e00] leading-tight mb-6">
              High Quality <br />
              <span className="bg-gradient-to-r from-[#118a00] to-[#14a800] bg-clip-text text-transparent">
                Guest Posting Services
              </span>
            </h1>
            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-xl">
              Secure powerful editorial backlinks on niche-relevant, real websites. We focus on exceptional, hand-crafted content creation and strict manual outreach strategies to drive permanent organic traffic growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setView(PageView.PORTAL)}
                className="bg-[#118a00] hover:bg-[#14a800] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:-translate-y-0.5"
              >
                Explore Websites Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBookDemo}
                className="bg-white text-[#001e00] border-2 border-slate-200 hover:border-[#118a00] font-bold px-8 py-4 rounded-full transition-colors text-center"
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* Abstract network graphical element as described */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#001e00]/20 to-transparent rounded-2xl blur-xl"></div>
            <div className="relative bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVwEgUefZTe9TvquXwBkyBIKv3nsJ7ti-x5j8pDaR8-IQEzpyYKBdaILMEfutnxPBf0c6llfy5p8RfeS5WXfUb7lvPaZpPIIcoMQ9fNdFmkswxaLtvYUJZuv9fwczTmLI8zfoMMYUvM-OxfEPhvNConjpyhSM5AtXeDSCf0YFr5_ONYNqBku2NuA_otM2S8X6a5ngkBlPEflNhRmvqJR38eTSqabgzPamhHtTbpiHFsPYnMqY2Fbrvxo04_091NmZjRoSCE_DM3FM" 
                alt="Editorial link network illustration" 
                className="w-full h-64 object-cover rounded-2xl mb-6 shadow-inner"
                referrerPolicy="no-referrer"
              />

              {/* Floating metrics inside container */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 text-center">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Avg DR</p>
                  <p className="text-xl font-extrabold text-[#001e00]">50+</p>
                </div>
                <div className="border-x border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Avg Traffic</p>
                  <p className="text-xl font-extrabold text-[#14a800]">10k+</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Live Time</p>
                  <p className="text-xl font-extrabold text-emerald-600">14 Days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#118a00] mb-3">HOW WE ACHIEVE SUCCESS</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#001e00] mb-4">
            Why our guest posts deliver reliable rankings
          </h3>
          <p className="text-slate-600 text-sm">
            We do not cut corners. Every guest post is processed through a meticulous 4-stage pipeline to ensure maximum domain authority transfer.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Large column */}
          <div className="md:col-span-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-8 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#14a800]/5 flex items-center justify-center text-[#14a800] mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-[#001e00] mb-4">
                  Premium Content Creation
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Our in-house team of native English writers crafts comprehensive, engaging articles tailored to the target audience of the publisher site. We don't just insert links; we provide genuine value that editors love to publish.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold bg-slate-100 text-[#001e00] px-3 py-1 rounded-md border border-slate-200">1000+ Words Min</span>
                <span className="text-xs font-semibold bg-slate-100 text-[#001e00] px-3 py-1 rounded-md border border-slate-200">Copyscape Passed</span>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-slate-50 rounded-2xl p-4 flex flex-col justify-center border border-slate-100">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#001e00]">
                  <Sparkles className="w-4 h-4 text-[#14a800]" /> Contextual Relevance
                </div>
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#14a800] w-full"></div>
                </div>
                <p className="text-[11px] text-slate-400">Content matches both publisher and anchor niche flawlessly.</p>
              </div>
            </div>
          </div>

          {/* Card 2: Small column */}
          <div className="md:col-span-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#001e00] mb-4">
                Strict White-Hat
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                No PBNs, no link farms, no footprint-heavy public blogs. We conduct genuine outreach to real webmasters to secure placements that stand the test of time and Google algorithm updates.
              </p>
            </div>
            <span className="text-xs font-bold text-[#118a00] mt-4">100% Risk Free Placements</span>
          </div>

          {/* Card 3: Small column */}
          <div className="md:col-span-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-[#001e00] mb-4">
                Niche Relevance
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Context matters. We identify and pitch websites that are topically aligned with your brand, ensuring the link juice passed is highly relevant to your target search keywords.
              </p>
            </div>
            <span className="text-xs font-bold text-[#001e00] mt-4">Topical Anchors</span>
          </div>

          {/* Card 4: Large column with graph */}
          <div className="md:col-span-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center group">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-2xl bg-[#14a800]/5 flex items-center justify-center text-[#14a800] mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-[#001e00] mb-4">
                Focus on Organic Traffic Growth
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We prioritize metrics that matter. We don't just look at Domain Rating (DR); we analyze the site's actual organic traffic trend via SEMrush/Ahrefs to ensure we're placing your link on a healthy, growing property.
              </p>
            </div>
            <div className="w-full md:w-1/3 shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-4">
              <p className="text-[11px] font-mono font-bold text-slate-400 mb-2 uppercase">Traffic Trend Index</p>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvj-bVT9nQiPwwOQPeIbJRZM9QOaUO7rE1ACkQfxl3Tyd0Z5GEPSIInl-9GDga7XQkpr6q7HWq64M_8mZa_MoDm7tIGR15WgqehAfr8y_5-8pKcTuK9_v4bVfrN_AZr9tavkiHVhVIIBJgMteKTrjY5OJR_oNtPtTu-TZ08At7bnXifwe3JNWyoqxsIZLGwbmKlOmblmP7pBCqsw74c3ccOtIq7AYW1VnOLZYUXC8lWUwEW6DBKo531rVUXEMSCMTL456104JRv9U" 
                alt="Organic Traffic Growth Graph mockup" 
                className="w-full h-24 object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
