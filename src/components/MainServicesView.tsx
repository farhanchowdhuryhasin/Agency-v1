import React from 'react';
import { PageView } from '../types';

interface MainServicesViewProps {
  setView: (view: PageView) => void;
}

export default function MainServicesView({ setView }: MainServicesViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14a800]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#001e00] tracking-tight mb-6">
              Main Services
            </h1>
            
            <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
              <p className="text-lg leading-relaxed font-medium">
                We offer a permanent marketing and SEO solution to help your business grow and scale. Our services help you attract customers easily at an affordable cost while supporting the growth of any business. We can help any type of business promote any type of digital or physical product.
              </p>

              <div className="mt-12 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
                <h2 className="text-xl font-bold text-[#001e00] mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#14a800]/10 text-[#14a800] flex items-center justify-center text-sm">✓</span>
                  How it works:
                </h2>
                
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-center justify-center font-bold text-[#001e00] shrink-0">
                      1st
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Month</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">Fixing all types of SEO and website issues.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-center justify-center font-bold text-[#001e00] shrink-0">
                      2nd
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Month</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">Local SEO setup to help you attract customers more easily.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-center justify-center font-bold text-[#001e00] shrink-0">
                      3rd
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Month</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">Ad campaign setup and server-side tracking implementation to help your business grow and scale.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-center justify-center font-bold text-[#001e00] shrink-0">
                      4th
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">Month</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">High-value Google website link insertions and guest posting to help your website rank faster.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
