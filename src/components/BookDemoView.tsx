import React from 'react';
import { PageView } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, Facebook, ExternalLink } from 'lucide-react';

interface BookDemoViewProps {
  setView: (view: PageView) => void;
  demoFacebookUrl: string;
}

export default function BookDemoView({ setView, demoFacebookUrl }: BookDemoViewProps) {
  const handleOpenFacebook = () => {
    window.open(demoFacebookUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#f2f2f2] min-h-screen py-16 px-4 md:px-8 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#b8c8dd_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#14a800]/5 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-100/10 rounded-full blur-[60px]"></div>
 
      <div className="max-w-md w-full relative z-10 text-center">
        {/* Back Button */}
        <div className="flex justify-start mb-8">
          <button
            onClick={() => setView(PageView.HOME)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-[#118a00] transition-colors bg-white rounded-full border border-slate-200/80 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
 
        {/* Card for Facebook Interaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 text-center relative group overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#118a00] to-[#14a800]"></div>
          
          <div className="mx-auto w-16 h-16 bg-emerald-50 text-[#1877F2] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Facebook className="w-9 h-9 fill-[#1877F2] stroke-none" />
          </div>
 
          <h2 className="text-2xl font-extrabold text-[#001e00] mb-6">
            Message Us on Facebook with your requirement
          </h2>
 
          <button
            onClick={handleOpenFacebook}
            className="w-full bg-gradient-to-r from-[#118a00] to-[#14a800] hover:from-[#a00350] hover:to-[#eb3b80] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-[#118a00]/15 active:scale-[0.98] cursor-pointer"
          >
            <span>Go to Facebook Page</span>
            <ExternalLink className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
