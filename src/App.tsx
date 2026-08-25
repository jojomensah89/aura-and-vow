import React, { useState, useEffect } from 'react';
import { CoupleDetails, SuiteCustomization, WeddingSuite } from './types';
import { COLOR_PALETTES, DEFAULT_COUPLE_DETAILS, WEDDING_SUITES } from './data/weddingData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SuiteCatalog } from './components/SuiteCatalog';
import { SuiteCustomizer } from './components/SuiteCustomizer';
import { DigitalPhonePreviewModal } from './components/DigitalPhonePreviewModal';
import { PrintGuideModal } from './components/PrintGuideModal';
import { Sparkles, Heart, ArrowRight, Layers, Download, CheckCircle, Smartphone, Printer, Star } from 'lucide-react';
import { WaxSealBadge } from './components/MotifGraphics';

export default function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'customizer'>('catalog');
  const [selectedSuite, setSelectedSuite] = useState<WeddingSuite>(WEDDING_SUITES[0]);
  const [details, setDetails] = useState<CoupleDetails>(() => {
    const saved = localStorage.getItem('aura_vow_details');
    return saved ? JSON.parse(saved) : DEFAULT_COUPLE_DETAILS;
  });

  const [customization, setCustomization] = useState<SuiteCustomization>(() => ({
    palette: WEDDING_SUITES[0].defaultPalette,
    fontPresetId: WEDDING_SUITES[0].defaultFontPreset,
    scriptFont: 'pinyon',
    paperFinish: 'smooth',
    borderStyle: 'single-thin',
    motif: WEDDING_SUITES[0].defaultMotif,
    showBleedAndCrop: false,
    aspectRatioFormat: 'print-standard'
  }));

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isPrintGuideModalOpen, setIsPrintGuideModalOpen] = useState(false);

  // Save changes locally
  useEffect(() => {
    localStorage.setItem('aura_vow_details', JSON.stringify(details));
  }, [details]);

  // When selecting a new suite, adapt defaults
  const handleSelectSuite = (suite: WeddingSuite) => {
    setSelectedSuite(suite);
    setCustomization((prev) => ({
      ...prev,
      palette: suite.defaultPalette,
      fontPresetId: suite.defaultFontPreset,
      motif: suite.defaultMotif
    }));
  };

  const handleOpenCustomizer = (suite: WeddingSuite) => {
    handleSelectSuite(suite);
    setCurrentView('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#FAF8F5] text-[#2C241E] flex flex-col font-sans-clean antialiased selection:bg-[#EAE0D0] selection:text-[#3B3026]">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPrintGuide={() => setIsPrintGuideModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* HERO BANNER (Shown prominently in catalog view) */}
        {currentView === 'catalog' && (
          <section id="hero-banner" className="relative rounded-3xl bg-gradient-to-b from-[#F4EFE6] to-[#FAF8F5] border border-[#E8DFC9] p-8 sm:p-14 text-center overflow-hidden shadow-xs">
            {/* Background subtle watermark flourish */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EFE6D6]/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/80 backdrop-blur-xs text-[#6B5A4B] text-xs font-medium rounded-full border border-[#DED3C1] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>The Digital Wedding Stationery Atelier</span>
              </div>

              <h1 className="font-cormorant text-4xl sm:text-6xl font-normal tracking-tight text-[#2B231D] leading-[1.1]">
                Personalize & Download Your Complete{' '}
                <span className="italic font-normal font-cormorant text-[#685544]">
                  Wedding Suite
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#6E5F52] leading-relaxed max-w-2xl mx-auto">
                Bespoke 8-piece stationery collections: invitations, RSVP reply cards, order of events, dinner menus, and keepsake planners. Customize your names, dates, colors, and download instantly.
              </p>

              {/* Suite Item Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
                {[
                  '💌 Wedding Invitations (5×7")',
                  '✉️ RSVP Cards',
                  '⏳ Day-of Schedule',
                  '🍷 Dinner Menus',
                  '🏷️ Place Cards',
                  '🤍 Thank You Notes'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/70 backdrop-blur-xs text-[#594A3D] text-[11px] rounded-full border border-[#E5DAC8] font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  id="hero-start-btn"
                  onClick={() => handleOpenCustomizer(selectedSuite)}
                  className="px-6 py-3 bg-[#3A322B] hover:bg-[#231E1A] text-[#FAF5ED] text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Customize Selected Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id="hero-guide-btn"
                  onClick={() => setIsPrintGuideModalOpen(true)}
                  className="px-5 py-3 bg-white hover:bg-[#FAF6EF] text-[#4A3E34] text-xs font-medium rounded-full border border-[#D8CDBC] shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#8A7968]" />
                  <span>Paper & Print Guide</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* VIEW: CATALOG OF SUITES */}
        {currentView === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E8DFC9] pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2C241E]">
                  Curated Wedding Suites
                </h2>
                <p className="text-xs text-[#7A6C5F]">
                  Select any design below to customize colors, couples' details, and download print-ready files.
                </p>
              </div>
              <span className="text-xs text-[#8C7A6B] font-medium">
                {WEDDING_SUITES.length} Designer Collections Available
              </span>
            </div>

            <SuiteCatalog
              suites={WEDDING_SUITES}
              selectedSuite={selectedSuite}
              onSelectSuite={handleSelectSuite}
              onOpenCustomizer={handleOpenCustomizer}
            />
          </div>
        )}

        {/* VIEW: LIVE STUDIO CUSTOMIZER */}
        {currentView === 'customizer' && (
          <SuiteCustomizer
            suite={selectedSuite}
            details={details}
            customization={customization}
            onUpdateDetails={setDetails}
            onUpdateCustomization={setCustomization}
            onOpenMobilePreview={() => setIsMobileModalOpen(true)}
            onOpenPrintGuide={() => setIsPrintGuideModalOpen(true)}
            onBackToCatalog={() => {
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Digital Mobile Smartphone Preview Modal */}
      <DigitalPhonePreviewModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        suite={selectedSuite}
        details={details}
        customization={customization}
      />

      {/* Fine Art Paper & Print Guide Modal */}
      <PrintGuideModal
        isOpen={isPrintGuideModalOpen}
        onClose={() => setIsPrintGuideModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenPrintGuide={() => setIsPrintGuideModalOpen(true)}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
