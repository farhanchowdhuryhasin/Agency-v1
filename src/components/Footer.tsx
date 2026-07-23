import React, { useState } from 'react';
import { MapPin, Shield, FileText, Mail, Link2 } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  setView: (view: any) => void;
  onBookDemo?: () => void;
  isAdminMode?: boolean;
  setShowAdminLoginModal?: (show: boolean) => void;
}

export default function Footer({ setView, onBookDemo, isAdminMode, setShowAdminLoginModal }: FooterProps) {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const officeAddress = "100 Pine Street, Suite 1250, San Francisco, CA 94111";
  const contactEmail = "support@aidigitaltrack.com";

  return (
    <footer id="footer-section" className="bg-[#040d16] text-slate-300 border-t border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Office Address */}
        <div className="flex items-center gap-3 text-slate-400">
          <div className="p-2 bg-slate-800/50 rounded-lg shrink-0">
            <MapPin className="w-4 h-4 text-[#14a800]" />
          </div>
          <div className="text-xs text-left">
            <p className="font-semibold text-white uppercase tracking-wider text-[10px] mb-0.5">Office Headquarters</p>
            <p className="leading-relaxed">{officeAddress}</p>
          </div>
        </div>

        {/* Links / Policies */}
        <div className="flex items-center gap-6 text-xs">
          <button 
            id="footer-btn-privacy"
            onClick={() => setActiveModal('privacy')} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-[#14a800]" />
            <span>Privacy Policy</span>
          </button>
          <span className="text-slate-800">|</span>
          <button 
            id="footer-btn-terms"
            onClick={() => setActiveModal('terms')} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#14a800]" />
            <span>Terms and Conditions</span>
          </button>
          <span className="text-slate-800">|</span>
          <button 
            id="footer-btn-portal"
            onClick={() => {
              setView(PageView.PORTAL);
              if (!isAdminMode && setShowAdminLoginModal) {
                setShowAdminLoginModal(true);
              }
            }} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-1.5 cursor-pointer"
          >
            <Link2 className="w-3.5 h-3.5 text-[#14a800]" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Modal Dialog */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              &times;
            </button>
            {activeModal === 'privacy' ? (
              <div>
                <h3 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Shield className="text-[#14a800] w-5 h-5" />
                  Privacy Policy
                </h3>
                <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                  <p><strong>Last Updated: July 19, 2026</strong></p>
                  <p>
                    At Top AI Digital Marketing, Server Side Tracking, Business Scaling and SEO, AEO, GEO services online, we are committed to keeping your data secure and honoring your choices. We prioritize first-party tracking techniques and GDPR-compliant structures.
                  </p>
                  <h4 className="text-white font-bold mt-4">1. Information Collection</h4>
                  <p>
                    We collect minimal personal metadata solely to assist in running campaigns, SEO audits, and custom setup options chosen by our users.
                  </p>
                  <h4 className="text-white font-bold mt-4">2. Cookies and Server-Side Logging</h4>
                  <p>
                    Unlike traditional client-side cookies that compromise customer secrets, our premium Server-Side Tracking setups route performance events through standard first-party namespaces. This minimizes browser profiling and maximizes user data protection.
                  </p>
                  <h4 className="text-white font-bold mt-4">3. Data Sharing</h4>
                  <p>
                    We never trade or sell visitor information to third-party brokers.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                  <FileText className="text-[#14a800] w-5 h-5" />
                  Terms and Conditions
                </h3>
                <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                  <p><strong>Last Updated: July 19, 2026</strong></p>
                  <p>
                    Please read these Terms carefully before utilizing the web solutions offered by our agency.
                  </p>
                  <h4 className="text-white font-bold mt-4">1. Use of Services</h4>
                  <p>
                    Our high-impact SEO, Link Insertion, and Server-Side tracking solutions are meant for legitimate online web properties. We reserve the right to decline campaigns that violate general search guidelines or publish harmful material.
                  </p>
                  <h4 className="text-white font-bold mt-4">2. Placement Guarantees</h4>
                  <p>
                    For guest posting and link insertion options, our placements are guaranteed to remain live, indexed, and visible in search engines. If a link goes offline within 12 months, we will replace it free of charge.
                  </p>
                  <h4 className="text-white font-bold mt-4">3. Limitation of Liability</h4>
                  <p>
                    We provide tools to improve search traffic, but search algorithm updates are subject to publisher shifts. We are not responsible for global changes in external indexing algorithms.
                  </p>
                </div>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
