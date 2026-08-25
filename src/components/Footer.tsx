import React from 'react';
import { Heart, Sparkles, Printer, ShieldCheck, Download, Mail } from 'lucide-react';
import { WaxSealBadge } from './MotifGraphics';

interface FooterProps {
  onOpenPrintGuide: () => void;
  onNavigate: (view: 'catalog' | 'customizer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrintGuide, onNavigate }) => {
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
              <h4 className="text-xs font-semibold text-[#2E241E]">Instant 300-DPI Downloads</h4>
              <p className="text-[11px] text-[#7A6C5F]">Export high-resolution PNGs and complete matching .ZIP suites in seconds.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/60 border border-[#ECE2D2]">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E8] border border-[#E0D0BB] flex items-center justify-center text-[#8A7968] shrink-0">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#2E241E]">Complete 8-Piece Coordinated Suites</h4>
              <p className="text-[11px] text-[#7A6C5F]">Invitations, RSVPs, Day-of Schedules, Menus, Place Cards & Keepsake Planners.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/60 border border-[#ECE2D2]">
            <div className="w-10 h-10 rounded-full bg-[#FAF3E8] border border-[#E0D0BB] flex items-center justify-center text-[#8A7968] shrink-0">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#2E241E]">Print-Ready with Bleed & Sizing</h4>
              <p className="text-[11px] text-[#7A6C5F]">Designed for standard luxury envelope sizes (A7, A1, A6) & fine art cardstocks.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <WaxSealBadge initials="A&V" />
            <div>
              <h3 className="font-cinzel text-lg tracking-[0.15em] font-semibold text-[#2C241E]">
                AURA & VOW
              </h3>
              <p className="text-[11px] text-[#8C7A6B]">
                Curators of timeless digital wedding stationery & stationery suites.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('catalog')}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              All Wedding Suites
            </button>
            <button
              onClick={() => onNavigate('customizer')}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              Stationery Customizer
            </button>
            <button
              onClick={onOpenPrintGuide}
              className="hover:text-[#2C241E] transition-colors cursor-pointer"
            >
              Paper & Envelope Guide
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-[#EAE0D0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#918172]">
          <p>© {new Date().getFullYear()} Aura & Vow Stationery Atelier. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-[#A84848] fill-[#A84848]" /> for unforgettable celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
};
