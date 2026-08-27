import React, { useState } from 'react';
import { OccasionCategory, StyleCategory, CardFormat, WeddingSuite } from '../types';
import { Sparkles, ArrowRight, Star, Download, Palette, Layers, Image, Mail, Search } from 'lucide-react';
import { MotifGraphics } from './MotifGraphics';

interface SuiteCatalogProps {
  suites: WeddingSuite[];
  selectedSuite: WeddingSuite;
  onSelectSuite: (suite: WeddingSuite) => void;
  onOpenCustomizer: (suite: WeddingSuite) => void;
  onOpenEnvelopePreview?: (suite: WeddingSuite) => void;
}

const OCCASION_CATEGORIES: { id: OccasionCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Designs', icon: '✨' },
  { id: 'weddings', label: 'Weddings & Suites', icon: '💍' },
  { id: 'birthdays', label: 'Birthdays & Milestones', icon: '🎂' },
  { id: 'baby', label: 'Baby Shower & Birth', icon: '🍼' },
  { id: 'holidays', label: 'Holidays & Christmas', icon: '🌲' },
  { id: 'social', label: 'Dinner & Cocktail Soirées', icon: '🍸' },
  { id: 'greeting-cards', label: 'Folded Greeting Cards', icon: '💌' }
];

const FORMAT_OPTIONS: { id: CardFormat | 'photo' | 'all'; label: string }[] = [
  { id: 'all', label: 'All Formats' },
  { id: 'flat-5x7', label: 'Flat 5"×7"' },
  { id: 'folded-card', label: 'Folded Cards' },
  { id: 'flat-4x6', label: 'Flat 4"×6"' },
  { id: 'photo', label: 'Photo Cards' }
];

export const SuiteCatalog: React.FC<SuiteCatalogProps> = ({
  suites,
  selectedSuite,
  onSelectSuite,
  onOpenCustomizer,
  onOpenEnvelopePreview
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionCategory | 'all'>('all');
  const [selectedFormat, setSelectedFormat] = useState<CardFormat | 'photo' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuites = suites.filter((suite) => {
    const matchesOccasion =
      selectedOccasion === 'all' ||
      suite.category === selectedOccasion ||
      (selectedOccasion === 'weddings' && (!suite.category || suite.category === 'weddings')) ||
      (selectedOccasion === 'greeting-cards' && (suite.format === 'folded-card' || suite.category === 'greeting-cards'));

    const matchesFormat =
      selectedFormat === 'all' ||
      (selectedFormat === 'photo' && suite.hasPhotoSlot) ||
      suite.format === selectedFormat;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      suite.title.toLowerCase().includes(q) ||
      suite.collectionName.toLowerCase().includes(q) ||
      suite.description.toLowerCase().includes(q) ||
      suite.tags?.some((t) => t.toLowerCase().includes(q));

    return matchesOccasion && matchesFormat && matchesSearch;
  });

  return (
    <section id="catalog-section" className="space-y-8">
      {/* Top Banner / Philosophy */}
      <div className="text-center max-w-2xl mx-auto space-y-2 pt-2 pb-1">
        <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#8C7A6B] font-medium block">
          CURATED ONLINE STATIONERY &amp; INVITATION ATELIER
        </span>
        <h2 className="text-2xl sm:text-3xl font-cormorant font-normal text-[#2C241E] tracking-tight">
          Modern Minimalist Invitations &amp; Greetings
        </h2>
        <p className="text-xs text-[#6E6053] leading-relaxed">
          Personalize and download high-resolution PNG &amp; JPEG cards, animated luxury eCard GIFs, or send interactive digital envelopes with real-time RSVP.
        </p>
      </div>

      {/* Occasion Category Pills Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E8DFC9]">
          {OCCASION_CATEGORIES.map((cat) => {
            const isActive = selectedOccasion === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-occasion-${cat.id}`}
                onClick={() => setSelectedOccasion(cat.id)}
                className={`px-4 py-2 rounded-full text-xs tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#3A332C] text-[#FAF5EE] shadow-sm font-semibold'
                    : 'bg-white/80 text-[#685D52] hover:bg-[#F2ECE1] border border-[#EBE4D5]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Format Filter + Search Input */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Format pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {FORMAT_OPTIONS.map((fmt) => {
              const isActive = selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`px-3 py-1 text-[11px] rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#8A7968] text-white font-medium'
                      : 'bg-white/60 text-[#6E6053] hover:bg-[#FAF6EF] border border-[#E8DFC9]'
                  }`}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E8E7E]" />
            <input
              id="suite-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by occasion, theme, font..."
              className="w-full text-xs pl-9 pr-3.5 py-2 bg-white rounded-full border border-[#E2D9CC] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968] text-[#332A24] placeholder:text-[#A09386]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Templates & Suites */}
      {filteredSuites.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#E8DFC9] text-center space-y-3">
          <p className="text-sm font-medium text-[#4A3E34]">
            No stationery templates found matching your filter criteria.
          </p>
          <button
            onClick={() => {
              setSelectedOccasion('all');
              setSelectedFormat('all');
              setSearchQuery('');
            }}
            className="px-4 py-1.5 bg-[#FAF6EF] hover:bg-[#F2ECE1] text-xs font-medium text-[#6B5A4B] rounded-full border border-[#DED3C1]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSuites.map((suite) => {
            const isSelected = selectedSuite.id === suite.id;

            // Format badge label
            const formatBadge =
              suite.format === 'folded-card'
                ? 'Folded Card'
                : suite.hasPhotoSlot
                ? 'Photo Card'
                : suite.includedItems?.length >= 5
                ? '8-Piece Suite'
                : suite.format === 'flat-4x6'
                ? 'Flat 4x6'
                : 'Flat 5x7';

            return (
              <div
                key={suite.id}
                id={`suite-card-${suite.id}`}
                className={`group relative bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 ${
                  isSelected
                    ? 'border-[#8A7968] ring-2 ring-[#8A7968]/30'
                    : 'border-[#EDE5D8] hover:border-[#D5C7B3]'
                }`}
              >
                {/* Top Visual Preview Area */}
                <div
                  className="relative h-64 w-full p-6 flex flex-col items-center justify-center text-center overflow-hidden transition-colors cursor-pointer"
                  style={{ backgroundColor: suite.defaultPalette.background }}
                  onClick={() => {
                    onSelectSuite(suite);
                    onOpenCustomizer(suite);
                  }}
                >
                  {/* Paper Card Mockup Mini */}
                  <div
                    className={`relative ${
                      suite.format === 'flat-4x6'
                        ? 'w-48 aspect-[6/4]'
                        : suite.format === 'square'
                        ? 'w-40 aspect-square'
                        : 'w-40 aspect-[5/7]'
                    } bg-white rounded-xs shadow-md p-4 flex flex-col items-center justify-between transition-transform duration-300 group-hover:scale-105`}
                    style={{
                      backgroundColor: suite.defaultPalette.cardBg,
                      border: `1px solid ${suite.defaultPalette.border}`
                    }}
                  >
                    <MotifGraphics
                      type={suite.defaultMotif}
                      color={suite.defaultPalette.accent}
                      foil={suite.defaultPalette.foil}
                      size={24}
                    />

                    <div className="space-y-0.5 my-auto">
                      <p className="text-[7px] uppercase tracking-[0.2em] opacity-60">
                        {suite.category === 'birthdays'
                          ? 'Celebrating'
                          : suite.category === 'baby'
                          ? 'Baby Shower'
                          : suite.category === 'holidays'
                          ? 'Greetings'
                          : 'Invitation'}
                      </p>
                      <h4
                        className="text-xs font-cormorant font-normal line-clamp-1"
                        style={{ color: suite.defaultPalette.text }}
                      >
                        {suite.title}
                      </h4>
                      <p className="text-[6.5px] opacity-60 tracking-widest uppercase">
                        {suite.category === 'birthdays'
                          ? 'Saturday Evening'
                          : suite.category === 'holidays'
                          ? 'Winter & New Year'
                          : 'Eleanor & Julian'}
                      </p>
                    </div>

                    <div
                      className="w-full pt-1 border-t text-[6px] uppercase tracking-wider opacity-60"
                      style={{ borderColor: suite.defaultPalette.border }}
                    >
                      ISLE & NOTE
                    </div>
                  </div>

                  {/* Badges / Indicators */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <span className="px-2 py-0.5 bg-[#FAF5EE]/95 backdrop-blur-xs text-[#524438] text-[9.5px] font-semibold rounded-full border border-[#E0D4C3] flex items-center gap-1 shadow-2xs">
                      {suite.hasPhotoSlot && <Image className="w-2.5 h-2.5 text-[#A68048]" />}
                      {suite.format === 'folded-card' && <Mail className="w-2.5 h-2.5 text-[#A68048]" />}
                      {formatBadge}
                    </span>

                    {suite.defaultPalette.foil !== 'none' && (
                      <span className="px-2 py-0.5 bg-amber-50/90 text-amber-800 text-[8.5px] uppercase font-bold rounded-full border border-amber-200">
                        {suite.defaultPalette.foil} Foil
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 text-[11px] text-[#706355] flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-full shadow-2xs">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{suite.rating}</span>
                  </div>
                </div>

                {/* Suite Description & Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#8C7A6B]">
                      {suite.collectionName}
                    </div>
                    <h3 className="text-base font-cormorant font-semibold text-[#2C241E] group-hover:text-[#6E5A47] transition-colors leading-snug">
                      {suite.title}
                    </h3>
                    <p className="text-xs text-[#706458] line-clamp-2 leading-relaxed">
                      {suite.description}
                    </p>
                  </div>

                  {/* Included Items & Tags */}
                  <div className="pt-2 border-t border-[#F0E9DD] space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#8C7B6C]">
                      <span className="flex items-center gap-1 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-[#A68048]" />
                        <span>High-Res PNG • JPEG • GIF</span>
                      </span>
                      <span className="text-[10px] flex items-center gap-1 text-[#9E8E7E]">
                        <Download className="w-3 h-3" />
                        {suite.downloadCount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {suite.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#FAF7F2] text-[#6E6053] text-[9.5px] rounded-sm border border-[#EDE4D5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      id={`customize-btn-${suite.id}`}
                      onClick={() => {
                        onSelectSuite(suite);
                        onOpenCustomizer(suite);
                      }}
                      className="flex-1 py-2.5 px-3 bg-[#3A322B] hover:bg-[#251F1A] text-[#FAF5ED] text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>Personalize</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {onOpenEnvelopePreview && (
                      <button
                        onClick={() => onOpenEnvelopePreview(suite)}
                        title="Preview Digital Envelope & eCard"
                        className="p-2.5 rounded-lg border border-[#E0D7C8] text-[#6E6053] hover:bg-[#FAF6EF] transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-[#A68048]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

