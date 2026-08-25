import React, { useState } from 'react';
import { StyleCategory, WeddingSuite } from '../types';
import { Sparkles, Check, ArrowRight, Star, Download, Palette, Layers } from 'lucide-react';
import { MotifGraphics } from './MotifGraphics';

interface SuiteCatalogProps {
  suites: WeddingSuite[];
  selectedSuite: WeddingSuite;
  onSelectSuite: (suite: WeddingSuite) => void;
  onOpenCustomizer: (suite: WeddingSuite) => void;
}

const CATEGORIES: { id: StyleCategory; label: string }[] = [
  { id: 'all', label: 'All Collections' },
  { id: 'tuscan', label: 'Tuscan & Linen' },
  { id: 'editorial', label: 'Modern Editorial' },
  { id: 'botanical', label: 'Botanical Greenery' },
  { id: 'romantic', label: 'Romantic Blush' },
  { id: 'art-deco', label: 'Gatsby Art Deco' },
  { id: 'boho', label: 'Boho Terracotta' },
  { id: 'minimalist', label: 'Pure Minimalist' },
  { id: 'regal', label: 'Royal & Celestial' }
];

export const SuiteCatalog: React.FC<SuiteCatalogProps> = ({
  suites,
  selectedSuite,
  onSelectSuite,
  onOpenCustomizer
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StyleCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuites = suites.filter((suite) => {
    const matchesCategory =
      selectedCategory === 'all' || suite.styleCategory === selectedCategory;
    const matchesSearch =
      suite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suite.collectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suite.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalog-section" className="space-y-8">
      {/* Search & Category Filter Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E8DFC9] pb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#3A332C] text-[#FAF5EE] shadow-sm font-medium'
                    : 'bg-white/80 text-[#685D52] hover:bg-[#F2ECE1] border border-[#EBE4D5]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72">
          <input
            id="suite-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by theme, vibe, or style..."
            className="w-full text-xs px-3.5 py-2 bg-white rounded-full border border-[#E2D9CC] focus:outline-none focus:ring-1 focus:ring-[#8A7968] text-[#332A24] placeholder:text-[#A09386]"
          />
        </div>
      </div>

      {/* Grid of Wedding Suites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSuites.map((suite) => {
          const isSelected = selectedSuite.id === suite.id;

          return (
            <div
              key={suite.id}
              id={`suite-card-${suite.id}`}
              className={`group relative bg-white rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
                isSelected
                  ? 'border-[#8A7968] ring-2 ring-[#8A7968]/30'
                  : 'border-[#EDE5D8] hover:border-[#D5C7B3]'
              }`}
            >
              {/* Top Visual Preview Area */}
              <div
                className="relative h-60 w-full p-6 flex flex-col items-center justify-between text-center overflow-hidden transition-colors"
                style={{ backgroundColor: suite.defaultPalette.background }}
              >
                {/* Paper Card Mockup Mini */}
                <div
                  className="relative w-44 aspect-[5/7] bg-white rounded-xs shadow-md p-4 flex flex-col items-center justify-between transition-transform duration-300 group-hover:scale-105"
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
                    <p className="text-[7px] uppercase tracking-[0.2em] opacity-60">Wedding of</p>
                    <h4
                      className="text-xs font-serif font-normal"
                      style={{ color: suite.defaultPalette.text }}
                    >
                      Eleanor & Julian
                    </h4>
                    <p className="text-[6.5px] opacity-60 tracking-widest uppercase">
                      Villa Cetinale
                    </p>
                  </div>

                  <div
                    className="w-full pt-1 border-t text-[6px] uppercase tracking-wider opacity-60"
                    style={{ borderColor: suite.defaultPalette.border }}
                  >
                    October 17, 2026
                  </div>
                </div>

                {/* Badges / Foil Indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {suite.featured && (
                    <span className="px-2 py-0.5 bg-[#FAF5EE]/90 backdrop-blur-xs text-[#524438] text-[10px] font-medium rounded-full border border-[#E0D4C3] flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
                      Bespoke
                    </span>
                  )}
                  {suite.defaultPalette.foil !== 'none' && (
                    <span className="px-1.5 py-0.5 bg-amber-50 text-amber-800 text-[9px] uppercase font-semibold rounded-full border border-amber-200">
                      {suite.defaultPalette.foil} Foil
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 text-[11px] text-[#706355] flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{suite.rating}</span>
                </div>
              </div>

              {/* Suite Description & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-medium text-[#8C7A6B]">
                    {suite.collectionName}
                  </div>
                  <h3 className="text-base font-serif font-semibold text-[#2C241E] group-hover:text-[#6E5A47] transition-colors">
                    {suite.title}
                  </h3>
                  <p className="text-xs text-[#706458] line-clamp-2 leading-relaxed">
                    {suite.description}
                  </p>
                </div>

                {/* Included Stationery Items Tags */}
                <div className="pt-2 border-t border-[#F0E9DD] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#8C7B6C]">
                    <span className="flex items-center gap-1 font-medium">
                      <Layers className="w-3.5 h-3.5" />
                      8-Piece Complete Suite
                    </span>
                    <span className="text-[10px] flex items-center gap-1 text-[#9E8E7E]">
                      <Download className="w-3 h-3" />
                      {suite.downloadCount.toLocaleString()} downloads
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {suite.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#FAF7F2] text-[#6E6053] text-[10px] rounded-sm border border-[#EDE4D5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    id={`customize-btn-${suite.id}`}
                    onClick={() => {
                      onSelectSuite(suite);
                      onOpenCustomizer(suite);
                    }}
                    className="flex-1 py-2.5 px-3 bg-[#3A322B] hover:bg-[#251F1A] text-[#FAF5ED] text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>Personalize Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id={`quick-preview-btn-${suite.id}`}
                    onClick={() => onSelectSuite(suite)}
                    title="Quick Preview"
                    className={`p-2.5 rounded-md border text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#EFE9DD] border-[#8A7968] text-[#332A24]'
                        : 'bg-white border-[#E0D7C8] text-[#6E6053] hover:bg-[#FAF6EF]'
                    }`}
                  >
                    <Palette className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
