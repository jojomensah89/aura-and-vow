import React from 'react';
import { Heart, Sparkles, Printer, ShieldCheck, Download, Mail } from 'lucide-react';
import { WaxSealBadge } from './MotifGraphics';

interface FooterProps {
  onNavigate: (view: 'catalog' | 'customizer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#FAF6F0] border-t border-[#EAE0D0] mt-20 pt-16 pb-12 text-[#635548]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Value Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#E8DFC9] text-center md:text-left">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/60 border border-[#ECE2D2]">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E8] border border-[#E0D0BB] flex items-center justify-center text-[#8A7968] shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#2E241E]">High-Resolution Downloads</h4>
              <p className="text-[11px] text-[#7A6C5F]">Export crisp PNG &amp; JPEG image files tailored for standard paper and frame dimensions.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/60 border border-[#ECE2D2]">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E8] border border-[#E0D0BB] flex items-center justify-center text-[#8A7968] shrink-0">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#2E241E]">Animated Luxury eCard GIFs</h4>
              <p className="text-[11px] text-[#7A6C5F]">Export animated shimmering GIFs ready to share via message, WhatsApp, or email.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/60 border border-[#ECE2D2]">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E8] border border-[#E0D0BB] flex items-center justify-center text-[#8A7968] shrink-0">
              <Mail className="w-4 h-4 text-[#8A7968]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#2E241E]">Virtual Envelopes &amp; RSVP</h4>
              <p className="text-[11px] text-[#7A6C5F]">Send interactive wax-sealed digital envelopes with real-time guest response tracking.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <WaxSealBadge initials="I&N" />
            <div>
              <h3 className="font-cormorant text-xl tracking-[0.15em] font-semibold text-[#2C241E]">
                ISLE &amp; NOTE
              </h3>
              <p className="text-[11px] text-[#8C7A6B]">
                Curators of modern minimalist digital invitations and greeting cards.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('catalog')}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              Browse All Cards
            </button>
            <button
              onClick={() => onNavigate('customizer')}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              Card Design Studio
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-[#EAE0D0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#918172]">
          <p>© {new Date().getFullYear()} Isle &amp; Note Atelier. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-[#A84848] fill-[#A84848]" /> for unforgettable celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
};

