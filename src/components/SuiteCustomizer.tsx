import React, { useState } from 'react';
import {
  CardGeneralDetails,
  CoupleDetails,
  SuiteCustomization,
  WeddingSuite,
  CardItemType,
  PaperFinish,
  FoilType
} from '../types';
import { COLOR_PALETTES, FONT_PRESETS } from '../data/greetingsData';
import { StationeryCard } from './StationeryCard';
import {
  downloadCardAsImage,
  downloadCardAsGif,
  CARD_DIMENSIONS_INCHES
} from '../utils/exportUtils';
import {
  Download,
  Image as ImageIcon,
  Check,
  Smartphone,
  Mail,
  Type,
  Palette,
  Sparkles,
  RefreshCw,
  Sliders,
  Share2,
  Calendar,
  MapPin,
  FileText
} from 'lucide-react';

interface SuiteCustomizerProps {
  suite: WeddingSuite;
  details: CoupleDetails;
  customization: SuiteCustomization;
  onUpdateDetails: (details: CoupleDetails) => void;
  onUpdateCustomization: (customization: SuiteCustomization) => void;
  onOpenMobilePreview: () => void;
  onOpenPrintGuide?: () => void;
  onOpenVirtualEnvelope?: () => void;
  onBackToCatalog: () => void;
}

type ControlTab = 'details' | 'colors' | 'typography' | 'photo';

export const SuiteCustomizer: React.FC<SuiteCustomizerProps> = ({
  suite,
  details,
  customization,
  onUpdateDetails,
  onUpdateCustomization,
  onOpenMobilePreview,
  onOpenVirtualEnvelope,
  onBackToCatalog
}) => {
  // Each template corresponds to a single focused card type
  const cardType: CardItemType =
    (suite.includedItems && suite.includedItems[0]) ||
    (suite.category === 'birthdays'
      ? 'birthday_card'
      : suite.category === 'baby' || suite.category === 'baby-shower'
      ? 'baby_card'
      : suite.category === 'holidays'
      ? 'holiday_card'
      : suite.category === 'social' || suite.category === 'party-dinner'
      ? 'party_card'
      : suite.format === 'folded-card' || suite.category === 'greeting-cards'
      ? 'greeting_card'
      : 'invitation');

  const [activeControlTab, setActiveControlTab] = useState<ControlTab>('details');
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isExportingJpeg, setIsExportingJpeg] = useState(false);
  const [isExportingGif, setIsExportingGif] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);

  const activePalette = customization.palette || suite.defaultPalette;
  const isFoldedCard = suite.format === 'folded-card' || cardType === 'greeting_card';
  const hasPhotoSlot = Boolean(suite.hasPhotoSlot);

  // Field change helpers
  const handleDetailChange = (field: keyof CardGeneralDetails, value: string) => {
    onUpdateDetails({
      ...details,
      [field]: value
    });
  };

  const handlePaletteSelect = (pal: typeof COLOR_PALETTES[0]) => {
    onUpdateCustomization({
      ...customization,
      palette: pal
    });
  };

  const handlePaperSelect = (finish: PaperFinish) => {
    onUpdateCustomization({
      ...customization,
      paperFinish: finish
    });
  };

  const handleFoilSelect = (foil: FoilType) => {
    onUpdateCustomization({
      ...customization,
      palette: {
        ...customization.palette,
        foil
      }
    });
  };

  const handleFontPresetSelect = (presetId: string) => {
    onUpdateCustomization({
      ...customization,
      fontPresetId: presetId
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const url = uploadEvent.target?.result as string;
        onUpdateDetails({
          ...details,
          customPhotoUrl: url
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Image & GIF Export Handlers
  const cardFilename = `${(details.honoreeOrCouple || `${details.partner1FirstName || 'Celebration'}-${details.partner2FirstName || ''}`).replace(/\s+/g, '-')}-${suite.title.replace(/\s+/g, '-')}`;

  const handleDownloadImage = async (format: 'png' | 'jpeg') => {
    if (format === 'png') setIsExportingPng(true);
    else setIsExportingJpeg(true);

    try {
      const success = await downloadCardAsImage('live-customizer-card-wrapper', cardFilename, format);
      if (success) {
        setExportSuccessMsg(`Successfully exported high-resolution ${format.toUpperCase()} image!`);
        setTimeout(() => setExportSuccessMsg(null), 4000);
      }
    } finally {
      setIsExportingPng(false);
      setIsExportingJpeg(false);
    }
  };

  const handleDownloadGif = async () => {
    setIsExportingGif(true);
    try {
      const success = await downloadCardAsGif('live-customizer-card-wrapper', cardFilename);
      if (success) {
        setExportSuccessMsg('Successfully created and exported animated luxury eCard GIF!');
        setTimeout(() => setExportSuccessMsg(null), 4500);
      }
    } finally {
      setIsExportingGif(false);
    }
  };

  const cardDim = CARD_DIMENSIONS_INCHES[cardType] || { width: 5, height: 7, mmLabel: '127 × 178 mm' };

  return (
    <div id="customizer-container" className="space-y-6">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E8DFC9] pb-4">
        <div className="flex items-center gap-2 text-xs">
          <button
            id="back-to-collections-btn"
            onClick={onBackToCatalog}
            className="text-[#8A7968] hover:text-[#3A322B] transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            ← All Designs
          </button>
          <span className="text-[#C4B7A6]">/</span>
          <span className="text-[#3A322B] font-semibold">{suite.title}</span>
          <span className="px-2 py-0.5 bg-[#EFE8DC] text-[#6E5F52] text-[10.5px] rounded-full">
            {cardDim.width}&quot; × {cardDim.height}&quot; ({cardDim.mmLabel})
          </span>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {onOpenVirtualEnvelope && (
            <button
              id="virtual-envelope-btn"
              onClick={onOpenVirtualEnvelope}
              className="px-3.5 py-2 bg-white hover:bg-[#FAF6EF] text-[#4A3E34] text-xs font-semibold rounded-lg border border-[#DED4C5] flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#A68048]" />
              <span>Digital Envelope &amp; RSVP</span>
            </button>
          )}

          <button
            id="mobile-preview-btn"
            onClick={onOpenMobilePreview}
            className="px-3 py-2 bg-white hover:bg-[#FAF6EF] text-[#4A3E34] text-xs font-medium rounded-lg border border-[#DED4C5] flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#8A7968]" />
            <span>Mobile Invite</span>
          </button>

          {/* Download PNG (High Res) */}
          <button
            id="download-png-btn"
            disabled={isExportingPng}
            onClick={() => handleDownloadImage('png')}
            className="px-3.5 py-2 bg-[#3A322B] hover:bg-[#231E1A] disabled:bg-[#8A8177] text-[#FAF5ED] text-xs font-medium rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            {isExportingPng ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting PNG...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG (High-Res)</span>
              </>
            )}
          </button>

          {/* Download JPEG */}
          <button
            id="download-jpeg-btn"
            disabled={isExportingJpeg}
            onClick={() => handleDownloadImage('jpeg')}
            className="px-3 py-2 bg-white hover:bg-[#FAF6EF] disabled:opacity-50 text-[#3A322B] text-xs font-medium rounded-lg border border-[#DED4C5] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isExportingJpeg ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8A7968]" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-[#8A7968]" />
            )}
            <span>JPEG</span>
          </button>

          {/* Download Animated GIF */}
          <button
            id="download-gif-btn"
            disabled={isExportingGif}
            onClick={handleDownloadGif}
            className="px-3 py-2 bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border border-amber-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isExportingGif ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-700" />
                <span>Creating GIF...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Download Animated GIF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {exportSuccessMsg && (
        <div className="p-3 bg-[#EAF2E8] border border-[#C5DDC0] rounded-xl text-emerald-900 text-xs font-medium flex items-center justify-between animate-fade-in shadow-xs">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            {exportSuccessMsg}
          </span>
          <button
            onClick={() => setExportSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2-Column Responsive Layout: Studio Preview + Focused Personalization Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT / CENTER: Live Card Preview Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Folded Card Page Switcher (if folded card) */}
          {isFoldedCard && (
            <div className="mb-4 inline-flex items-center gap-1 p-1 bg-white rounded-full border border-[#E2D8C7] shadow-2xs">
              {(['front', 'inside-left', 'inside-right'] as const).map((pg) => {
                const isActive = (customization.activeFoldPage || 'front') === pg;
                const label =
                  pg === 'front'
                    ? 'Front Cover'
                    : pg === 'inside-left'
                    ? 'Inside Left (Photo/Quote)'
                    : 'Inside Right (Personal Note)';
                return (
                  <button
                    key={pg}
                    onClick={() =>
                      onUpdateCustomization({ ...customization, activeFoldPage: pg })
                    }
                    className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#3A322B] text-white font-medium shadow-2xs'
                        : 'text-[#685C50] hover:bg-[#FAF6EF]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Interactive Card Container */}
          <div
            id="live-customizer-card-wrapper"
            className="relative w-full max-w-md transition-all duration-300 p-2 sm:p-4 rounded-2xl flex justify-center items-center"
            style={{
              backgroundColor: activePalette.background
            }}
          >
            <StationeryCard
              suite={suite}
              cardType={cardType}
              details={details}
              customization={customization}
              domId="active-customizer-card-dom"
            />
          </div>

          {/* Minimalist Card Metadata */}
          <div className="mt-4 text-center space-y-1">
            <p className="text-[11px] text-[#7A6B5D] font-medium tracking-wide">
              {suite.title} — {suite.collectionName}
            </p>
            <p className="text-[10.5px] text-[#A39486]">
              Paper: <span className="capitalize">{customization.paperFinish || 'Smooth'}</span> • Foil: <span className="capitalize">{activePalette.foil || 'None'}</span> • Art: Curated Botanical Motif
            </p>
          </div>
        </div>

        {/* RIGHT: Focused Personalization Controls (Low Cognitive Load) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8DFC9] shadow-sm p-6 space-y-6">
          {/* Navigation Control Tabs */}
          <div className="flex items-center gap-1 border-b border-[#EDE4D5] pb-3">
            {[
              { id: 'details', label: 'Wording & Details', icon: FileText },
              { id: 'colors', label: 'Palette & Finish', icon: Palette },
              { id: 'typography', label: 'Typography', icon: Type },
              ...(hasPhotoSlot ? [{ id: 'photo', label: 'Photo', icon: ImageIcon }] : [])
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeControlTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveControlTab(tab.id as ControlTab)}
                  className={`flex-1 py-2 px-2 text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#FAF5ED] text-[#2C241E] font-semibold border border-[#DCD0BE] shadow-2xs'
                      : 'text-[#7A6B5C] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: WORDING & DETAILS */}
          {activeControlTab === 'details' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3D332A]">
                  Personalize Card Details
                </h3>
                <p className="text-[11px] text-[#7A6C5F]">
                  Update text and wording in real-time. Changes render instantly on the card.
                </p>
              </div>

              {/* Names / Honorees */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#4A3E34]">
                  {cardType === 'birthday_card' || cardType === 'baby_card'
                    ? 'Honoree / Name'
                    : 'Couple / Honoree Names'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={details.partner1FirstName || ''}
                    onChange={(e) => handleDetailChange('partner1FirstName', e.target.value)}
                    placeholder="First Name / Person"
                    className="w-full text-xs px-3 py-2 bg-[#FAF8F5] rounded-lg border border-[#E2D8C7] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#2C241E]"
                  />
                  <input
                    type="text"
                    value={details.partner2FirstName || ''}
                    onChange={(e) => handleDetailChange('partner2FirstName', e.target.value)}
                    placeholder="Partner / Second Name"
                    className="w-full text-xs px-3 py-2 bg-[#FAF8F5] rounded-lg border border-[#E2D8C7] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#2C241E]"
                  />
                </div>
              </div>

              {/* Headline / Invitation Line */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#4A3E34]">
                  Headline / Intro Line
                </label>
                <input
                  type="text"
                  value={details.invitationHeadline || ''}
                  onChange={(e) => handleDetailChange('invitationHeadline', e.target.value)}
                  placeholder="TOGETHER WITH THEIR FAMILIES..."
                  className="w-full text-xs px-3 py-2 bg-[#FAF8F5] rounded-lg border border-[#E2D8C7] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#2C241E]"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#4A3E34]">
                    Event Date
                  </label>
                  <input
                    type="text"
                    value={details.weddingDate || details.eventDate || ''}
                    onChange={(e) => {
                      handleDetailChange('weddingDate', e.target.value);
                      handleDetailChange('eventDate', e.target.value);
                    }}
                    placeholder="Saturday, October 24, 2026"
                    className="w-full text-xs px-3 py-2 bg-[#FAF8F5] rounded-lg border border-[#E2D8C7] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#2C241E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#4A3E34]">
                    Time
                  </label>
                  <input
                    type="text"
                    value={details.eventTime || 'Four o’clock in the afternoon'}
                    onChange={(e) => handleDetailChange('eventTime', e.target.value)}
                    placeholder="5:00 PM in the evening"
                    className="w-full text-xs px-3 py-2 bg-[#FAF8F5] rounded-lg border border-[#E2D8C7] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#2C241E]"
                  />
                </div>
              </div>

              {/* Venue & Location */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#4A3E34]">
                  Venue / Location
                </label>
                <input
                  type="text"
                  value={details.venueName || ''}
                  onChange={(e) => handleDetailChange('venueName', e.target.value)}
                  placeholder="The Grand Glasshouse & Gardens"
                  className="w-full text-xs px-3 py-2 bg-[#FAF8F5] rounded-lg border border-[#E2D8C7] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#2C241E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#4A3E34]">
                  City / State / Address
                </label>
                <input
                  type="text"
                  value={details.cityState || ''}
                  onChange={(e) => handleDetailChange('cityState', e.target.value)}
                  placeholder="Cotswolds, Gloucestershire"
                  className="w-full text-xs px-3 py-2 bg-[#FAF8F5] rounded-lg border border-[#E2D8C7] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#2C241E]"
                />
              </div>

              {/* Subtext / RSVP Note / Inside Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#4A3E34]">
                  {isFoldedCard ? 'Inside Personal Greeting' : 'Subtext / RSVP & Reception Line'}
                </label>
                <textarea
                  rows={3}
                  value={
                    isFoldedCard
                      ? details.insideRightPersonalMessage || details.receptionDetails || ''
                      : details.receptionDetails || details.rsvpWebsite || ''
                  }
                  onChange={(e) => {
                    if (isFoldedCard) {
                      handleDetailChange('insideRightPersonalMessage', e.target.value);
                    } else {
                      handleDetailChange('receptionDetails', e.target.value);
                    }
                  }}
                  placeholder={
                    isFoldedCard
                      ? 'Wishing you the happiest celebration filled with love...'
                      : 'DINNER & DANCING TO FOLLOW • RSVP BY SEPTEMBER 15TH'
                  }
                  className="w-full text-xs px-3 py-2 bg-[#FAF8F5] rounded-lg border border-[#E2D8C7] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#2C241E] resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PALETTE & FINISH */}
          {activeControlTab === 'colors' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Curated Color Palettes */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3D332A]">
                  Curated Color Palette
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PALETTES.slice(0, 8).map((pal) => {
                    const isSelected = activePalette.id === pal.id;
                    return (
                      <button
                        key={pal.id}
                        onClick={() => handlePaletteSelect(pal)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#3A322B] bg-[#FAF6F0] ring-1 ring-[#3A322B]'
                            : 'border-[#EAE1D1] hover:border-[#D5C7B3] bg-white'
                        }`}
                      >
                        <div className="flex -space-x-1 shrink-0">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: pal.cardBg }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: pal.accent }}
                          />
                        </div>
                        <div className="truncate">
                          <p className="text-[11px] font-medium text-[#2C241E] truncate">
                            {pal.name.split('&')[0]}
                          </p>
                          <p className="text-[9.5px] text-[#8C7B6C] capitalize">
                            {pal.tag}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Paper Finish Texture */}
              <div className="space-y-2 pt-2 border-t border-[#EDE4D5]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3D332A]">
                  Paper Finish Texture
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'smooth', label: 'Smooth Vellum' },
                    { id: 'deckled', label: 'Deckled Edge' },
                    { id: 'linen', label: 'Matte Linen' }
                  ].map((p) => {
                    const isSelected = (customization.paperFinish || 'smooth') === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handlePaperSelect(p.id as PaperFinish)}
                        className={`py-2 px-2 rounded-lg text-xs text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#3A322B] text-white font-medium border-[#3A322B]'
                            : 'bg-[#FAF8F5] text-[#5C4F42] border-[#E2D8C7] hover:bg-white'
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Metallic Foil Accent */}
              <div className="space-y-2 pt-2 border-t border-[#EDE4D5]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3D332A]">
                  Metallic Foil Accent
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'gold', label: 'Gold Foil', color: '#D4AF37' },
                    { id: 'rose-gold', label: 'Rose Gold', color: '#B76E79' },
                    { id: 'silver', label: 'Silver', color: '#A0A5AA' },
                    { id: 'none', label: 'No Foil', color: '#6E6053' }
                  ].map((f) => {
                    const isSelected = (activePalette.foil || 'none') === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => handleFoilSelect(f.id as FoilType)}
                        className={`py-2 px-1 text-center rounded-lg text-[11px] border transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          isSelected
                            ? 'bg-[#FAF5ED] border-[#3A322B] font-semibold text-[#2C241E]'
                            : 'bg-[#FAF8F5] text-[#6E6053] border-[#E2D8C7] hover:bg-white'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: f.color }}
                        />
                        <span className="truncate">{f.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TYPOGRAPHY */}
          {activeControlTab === 'typography' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3D332A]">
                  Typography Pairing
                </h3>
                <p className="text-[11px] text-[#7A6C5F]">
                  Curated luxury font styles paired with display serifs and modern scripts.
                </p>
              </div>

              <div className="space-y-2">
                {FONT_PRESETS.map((font) => {
                  const isSelected = customization.fontPresetId === font.id;
                  return (
                    <button
                      key={font.id}
                      onClick={() => handleFontPresetSelect(font.id)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#3A322B] bg-[#FAF6F0] ring-1 ring-[#3A322B]'
                          : 'border-[#EAE1D1] hover:border-[#D5C7B3] bg-white'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#2C241E]">
                          {font.name}
                        </p>
                        <p className="text-[10.5px] text-[#7A6B5D]">
                          {font.description}
                        </p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#3A322B]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PHOTO (IF SUPPORTED) */}
          {activeControlTab === 'photo' && hasPhotoSlot && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#3D332A]">
                  Card Photograph
                </h3>
                <p className="text-[11px] text-[#7A6C5F]">
                  Upload a personal engagement, milestone, or family portrait for your card.
                </p>
              </div>

              <div className="p-4 border-2 border-dashed border-[#DACFBE] rounded-xl text-center space-y-2 bg-[#FAF8F5]">
                <ImageIcon className="w-6 h-6 text-[#8A7968] mx-auto" />
                <p className="text-xs text-[#524438] font-medium">
                  Upload portrait or family photo
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="text-xs text-[#7A6B5D] file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#3A322B] file:text-white hover:file:bg-[#231E1A] cursor-pointer"
                />
              </div>

              {details.customPhotoUrl && (
                <div className="text-center">
                  <button
                    onClick={() => handleDetailChange('customPhotoUrl', '')}
                    className="text-xs text-rose-700 hover:underline cursor-pointer"
                  >
                    Remove custom photo (restore sample)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
