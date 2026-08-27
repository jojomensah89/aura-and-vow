import React from 'react';
import { Sparkles, Heart, Printer, Layers } from 'lucide-react';
import { WaxSealBadge } from './MotifGraphics';

interface HeaderProps {
  currentView: 'catalog' | 'customizer';
  onNavigate: (view: 'catalog' | 'customizer') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE1D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Title */}
          <div
            id="brand-logo"
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <WaxSealBadge initials="I&N" color="#8A7258" className="group-hover:rotate-6 transition-transform" />
            <div className="flex flex-col">
              <span className="font-cormorant text-2xl sm:text-3xl tracking-[0.15em] font-medium text-[#2C241E]">
                ISLE &amp; NOTE
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-[#8C7A6B] -mt-1 font-medium">
                Modern Invitations &amp; Greeting Cards
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#6B5D50]">
            <button
              id="nav-link-suites"
              onClick={() => onNavigate('catalog')}
              className={`hover:text-[#2C241E] transition-colors cursor-pointer py-1 ${
                currentView === 'catalog'
                  ? 'text-[#2C241E] font-semibold border-b-2 border-[#8A7968]'
                  : ''
              }`}
            >
              Browse Cards &amp; Invitations
            </button>

            <button
              id="nav-link-customizer"
              onClick={() => onNavigate('customizer')}
              className={`hover:text-[#2C241E] transition-colors cursor-pointer py-1 ${
                currentView === 'customizer'
                  ? 'text-[#2C241E] font-semibold border-b-2 border-[#8A7968]'
                  : ''
              }`}
            >
              Card Design Studio
            </button>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <button
              id="header-cta-btn"
              onClick={() => onNavigate(currentView === 'catalog' ? 'customizer' : 'catalog')}
              className="px-4 py-2 bg-[#3A322B] hover:bg-[#231E1A] text-[#FAF5ED] text-xs font-medium rounded-full transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              {currentView === 'catalog' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
                  <span>Personalize Design</span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Explore All Designs</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

