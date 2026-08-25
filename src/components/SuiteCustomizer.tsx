import React, { useState, useEffect } from 'react';
import {
  CardItemType,
  CoupleDetails,
  FoilType,
  PaperFinish,
  BorderStyle,
  MotifType,
  FloralStyle,
  SuiteCustomization,
  WeddingSuite,
  CeremonyPart,
  BridalPartyDetails
} from '../types';
import { COLOR_PALETTES, FONT_PRESETS, SAMPLE_COUPLES, WORDING_PRESETS } from '../data/weddingData';
import { FLORAL_BORDER_ASSETS } from '../data/floralAssets';
import { StationeryCard } from './StationeryCard';
import {
  downloadCardAsImage,
  downloadCardAsPdf,
  exportFullSuitePdf,
  exportFullSuiteZip
} from '../utils/exportUtils';
import {
  Download,
  Palette,
  Type,
  Calendar,
  Sparkles,
  Layers,
  FileText,
  Clock,
  Utensils,
  Plus,
  Trash2,
  Check,
  Smartphone,
  Eye,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Printer,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Flower2,
  Shuffle,
  Dices,
  Play,
  Pause,
  Wand2,
  FileDown
} from 'lucide-react';

interface SuiteCustomizerProps {
  suite: WeddingSuite;
  details: CoupleDetails;
  customization: SuiteCustomization;
  onUpdateDetails: (details: CoupleDetails) => void;
  onUpdateCustomization: (customization: SuiteCustomization) => void;
  onOpenMobilePreview: () => void;
  onOpenPrintGuide: () => void;
  onBackToCatalog: () => void;
}

const CARD_TABS: { id: CardItemType; label: string; icon: string; sizeLabel: string }[] = [
  { id: 'invitation', label: 'Wedding Invitation', icon: '💌', sizeLabel: '5" × 7"' },
  { id: 'rsvp', label: 'RSVP Reply Card', icon: '✉️', sizeLabel: '3.5" × 5"' },
  { id: 'schedule', label: 'Day-of Schedule', icon: '⏳', sizeLabel: '4" × 9"' },
  { id: 'menu', label: 'Dinner Menu', icon: '🍷', sizeLabel: '4" × 9"' },
  { id: 'thankyou', label: 'Thank You Card', icon: '🤍', sizeLabel: '4" × 6"' },
  { id: 'placecard', label: 'Table Place Card', icon: '🏷️', sizeLabel: '3.5" × 2"' },
  { id: 'details', label: 'Travel & Details', icon: '🏛️', sizeLabel: '4" × 6"' },
  { id: 'planner', label: 'Keepsake Planner', icon: '📋', sizeLabel: '8.5" × 11"' }
];

type ControlTab = 'details' | 'florals' | 'colors' | 'typography' | 'schedule' | 'menu' | 'wording';

export const SuiteCustomizer: React.FC<SuiteCustomizerProps> = ({
  suite,
  details,
  customization,
  onUpdateDetails,
  onUpdateCustomization,
  onOpenMobilePreview,
  onOpenPrintGuide,
  onBackToCatalog
}) => {
  const [activeCardType, setActiveCardType] = useState<CardItemType>('invitation');
  const [activeControlTab, setActiveControlTab] = useState<ControlTab>('details');
  const [floralCategoryFilter, setFloralCategoryFilter] = useState<string>('all');
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [isExportingSingle, setIsExportingSingle] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingSinglePdf, setIsExportingSinglePdf] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState<string | null>(null);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(false);
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState<boolean>(false);
  const [hoveredFontPresetId, setHoveredFontPresetId] = useState<string | null>(null);
  const [fontViewMode, setFontViewMode] = useState<'dropdown' | 'gallery'>('dropdown');

  // Randomize / cycle floral motif pairings
  const handleRandomizeMotifs = (notify = true) => {
    const currentAssetId = customization.floralAssetId;
    const availableAssets = FLORAL_BORDER_ASSETS.filter((a) => a.id !== currentAssetId);
    const chosenAsset =
      availableAssets[Math.floor(Math.random() * availableAssets.length)] || FLORAL_BORDER_ASSETS[0];

    onUpdateCustomization({
      ...customization,
      floralOverlayEnabled: true,
      floralAssetId: chosenAsset.id,
      floralStyle: chosenAsset.id as FloralStyle,
      borderStyle:
        chosenAsset.recommendedBorder && customization.borderStyle === 'none'
          ? (chosenAsset.recommendedBorder as BorderStyle)
          : customization.borderStyle
    });

    if (notify) {
      setExportSuccessMsg(`Aesthetic Pairing: ${chosenAsset.name} • ${chosenAsset.mood}`);
      setTimeout(() => setExportSuccessMsg(null), 3500);
    }
  };

  // Auto-cycle slideshow effect
  useEffect(() => {
    let interval: any = null;
    if (isAutoCycling) {
      interval = setInterval(() => {
        const currentIdx = FLORAL_BORDER_ASSETS.findIndex(
          (a) => a.id === customization.floralAssetId
        );
        const nextIdx = (currentIdx + 1) % FLORAL_BORDER_ASSETS.length;
        const nextAsset = FLORAL_BORDER_ASSETS[nextIdx];

        onUpdateCustomization({
          ...customization,
          floralOverlayEnabled: true,
          floralAssetId: nextAsset.id,
          floralStyle: nextAsset.id as FloralStyle
        });
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoCycling, customization.floralAssetId, customization]);

  // Dynamic card tabs
  const isOrderOfServiceMode =
    customization.scheduleDisplayMode === 'order_of_service' ||
    suite.defaultScheduleMode === 'order_of_service';

  const cardTabsList = [
    { id: 'invitation' as CardItemType, label: 'Wedding Invitation', icon: '💌', sizeLabel: '5" × 7"' },
    { id: 'rsvp' as CardItemType, label: 'RSVP Reply Card', icon: '✉️', sizeLabel: '3.5" × 5"' },
    {
      id: 'schedule' as CardItemType,
      label: isOrderOfServiceMode ? 'Order of Service' : 'Day-of Schedule',
      icon: isOrderOfServiceMode ? '⛪' : '⏳',
      sizeLabel: isOrderOfServiceMode ? 'A4 / 5" × 7"' : '4" × 9"'
    },
    { id: 'menu' as CardItemType, label: 'Dinner Menu', icon: '🍷', sizeLabel: '4" × 9"' },
    { id: 'thankyou' as CardItemType, label: 'Thank You Card', icon: '🤍', sizeLabel: '4" × 6"' },
    { id: 'placecard' as CardItemType, label: 'Table Place Card', icon: '🏷️', sizeLabel: '3.5" × 2"' },
    { id: 'details' as CardItemType, label: 'Travel & Details', icon: '🏛️', sizeLabel: '4" × 6"' },
    { id: 'planner' as CardItemType, label: 'Keepsake Planner', icon: '📋', sizeLabel: '8.5" × 11"' }
  ];

  // Field change helpers
  const handleDetailChange = (field: keyof CoupleDetails, value: any) => {
    onUpdateDetails({
      ...details,
      [field]: value
    });
  };

  const handleCustomizationChange = (field: keyof SuiteCustomization, value: any) => {
    if (field === 'floralBackgroundOpacity' || field === 'motifOpacity') {
      onUpdateCustomization({
        ...customization,
        floralBackgroundOpacity: value,
        motifOpacity: value
      });
    } else {
      onUpdateCustomization({
        ...customization,
        [field]: value
      });
    }
  };

  // Quick load sample couple
  const handleLoadSampleCouple = (index: number) => {
    const sample = SAMPLE_COUPLES[index];
    if (!sample) return;
    onUpdateDetails({
      ...details,
      partner1FirstName: sample.p1First,
      partner1LastName: sample.p1Last,
      partner2FirstName: sample.p2First,
      partner2LastName: sample.p2Last,
      weddingDate: sample.date,
      venueName: sample.venue,
      cityState: sample.city,
      monogramText: sample.monogram
    });
  };

  // Order of Service ceremony handlers
  const handleAddCeremonyPart = () => {
    const newPart: CeremonyPart = {
      id: `cp-${Date.now()}`,
      sectionTitle: 'INTERCESSIONS & PRAYERS',
      pieceOrText: 'The Nuptial Blessing and Prayers of the Faithful',
      performerOrReader: 'Led by the Officiant'
    };
    onUpdateDetails({
      ...details,
      ceremonyParts: [...(details.ceremonyParts || []), newPart]
    });
  };

  const handleRemoveCeremonyPart = (id: string) => {
    onUpdateDetails({
      ...details,
      ceremonyParts: (details.ceremonyParts || []).filter((p) => p.id !== id)
    });
  };

  const handleUpdateCeremonyPart = (id: string, field: keyof CeremonyPart, val: string) => {
    onUpdateDetails({
      ...details,
      ceremonyParts: (details.ceremonyParts || []).map((p) =>
        p.id === id ? { ...p, [field]: val } : p
      )
    });
  };

  const handleUpdateBridalParty = (field: keyof BridalPartyDetails, val: string) => {
    onUpdateDetails({
      ...details,
      bridalParty: {
        ...(details.bridalParty || {
          officiant: '',
          maidOfHonour: '',
          bestMan: '',
          bridesmaids: '',
          ushers: '',
          readers: ''
        }),
        [field]: val
      }
    });
  };

  // Schedule event operations
  const handleAddScheduleEvent = () => {
    const newEvent = {
      id: `sch-${Date.now()}`,
      time: '7:00 PM',
      title: 'Toast & Celebration',
      subtitle: 'Main Terrace',
      iconName: 'Sparkles'
    };
    onUpdateDetails({
      ...details,
      scheduleEvents: [...details.scheduleEvents, newEvent]
    });
  };

  const handleRemoveScheduleEvent = (id: string) => {
    onUpdateDetails({
      ...details,
      scheduleEvents: details.scheduleEvents.filter((e) => e.id !== id)
    });
  };

  const handleUpdateScheduleEvent = (id: string, field: string, val: string) => {
    onUpdateDetails({
      ...details,
      scheduleEvents: details.scheduleEvents.map((e) =>
        e.id === id ? { ...e, [field]: val } : e
      )
    });
  };

  // Menu course operations
  const handleAddMenuCourse = () => {
    const newCourse = {
      id: `course-${Date.now()}`,
      course: 'INTERMEZZO',
      dish: 'Artisan Sorbetto al Limone',
      description: 'Infused with garden rosemary and sparkling prosecco'
    };
    onUpdateDetails({
      ...details,
      menuCourses: [...details.menuCourses, newCourse]
    });
  };

  const handleRemoveMenuCourse = (id: string) => {
    onUpdateDetails({
      ...details,
      menuCourses: details.menuCourses.filter((c) => c.id !== id)
    });
  };

  const handleUpdateMenuCourse = (id: string, field: string, val: string) => {
    onUpdateDetails({
      ...details,
      menuCourses: details.menuCourses.map((c) =>
        c.id === id ? { ...c, [field]: val } : c
      )
    });
  };

  // Export handlers
  const handleDownloadSingle = async () => {
    setIsExportingSingle(true);
    const activeLabel = cardTabsList.find((t) => t.id === activeCardType)?.label || 'Wedding-Card';
    const filename = `${details.partner1FirstName}-${details.partner2FirstName}-${activeLabel.replace(/\s+/g, '-')}`;
    const success = await downloadCardAsImage('live-preview-card', filename, 'png');
    setIsExportingSingle(false);
    if (success) {
      setExportSuccessMsg(`${activeLabel} downloaded in high-resolution!`);
      setTimeout(() => setExportSuccessMsg(null), 4000);
    }
  };

  const handleDownloadSinglePdf = async () => {
    setIsExportingSinglePdf(true);
    const activeTab = cardTabsList.find((t) => t.id === activeCardType);
    const activeLabel = activeTab?.label || 'Wedding-Card';
    const filename = `${details.partner1FirstName}-${details.partner2FirstName}-${activeLabel.replace(/\s+/g, '-')}-Print-Ready`;
    const success = await downloadCardAsPdf('live-preview-card', filename, activeCardType, details);
    setIsExportingSinglePdf(false);
    setIsExportDropdownOpen(false);
    if (success) {
      setExportSuccessMsg(`${activeLabel} exported as high-resolution Print-Ready PDF!`);
      setTimeout(() => setExportSuccessMsg(null), 4500);
    }
  };

  const handleDownloadFullSuitePdf = async () => {
    setIsExportingPdf(true);
    const renderedCards = cardTabsList.map((tab) => ({
      type: tab.id,
      elementId: `bundle-card-${tab.id}`,
      label: tab.label,
      sizeLabel: tab.sizeLabel
    }));

    const success = await exportFullSuitePdf(suite, details, customization, renderedCards);
    setIsExportingPdf(false);
    setIsExportDropdownOpen(false);
    if (success) {
      setExportSuccessMsg(`Complete 8-Piece Wedding Suite Proof & Print Booklet downloaded (.PDF)!`);
      setTimeout(() => setExportSuccessMsg(null), 5000);
    }
  };

  const handleDownloadFullSuite = async () => {
    setIsExportingZip(true);
    const renderedCards = cardTabsList.map((tab) => ({
      type: tab.id,
      elementId: `bundle-card-${tab.id}`,
      label: tab.label
    }));

    const success = await exportFullSuiteZip(suite, details, renderedCards);
    setIsExportingZip(false);
    if (success) {
      setExportSuccessMsg(`Complete 8-Piece Wedding Suite & Print Guide downloaded (.ZIP)!`);
      setTimeout(() => setExportSuccessMsg(null), 5000);
    }
  };

  return (
    <div id="customizer-container" className="space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E8DFC9] pb-4">
        <div className="flex items-center gap-2 text-xs">
          <button
            id="back-to-collections-btn"
            onClick={onBackToCatalog}
            className="text-[#8A7968] hover:text-[#3A322B] transition-colors flex items-center gap-1 font-medium cursor-pointer"
          >
            ← All Collections
          </button>
          <span className="text-[#C4B7A6]">/</span>
          <span className="text-[#3A322B] font-semibold">{suite.title}</span>
          <span className="px-2 py-0.5 bg-[#EFE8DC] text-[#6E5F52] text-[11px] rounded-full">
            Live Studio
          </span>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="mobile-preview-btn"
            onClick={onOpenMobilePreview}
            className="px-3 py-2 bg-white hover:bg-[#FAF6EF] text-[#4A3E34] text-xs font-medium rounded-md border border-[#DED4C5] flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#8A7968]" />
            <span>Mobile Guest Invite</span>
          </button>

          <button
            id="print-guide-btn"
            onClick={onOpenPrintGuide}
            className="px-3 py-2 bg-white hover:bg-[#FAF6EF] text-[#4A3E34] text-xs font-medium rounded-md border border-[#DED4C5] flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#8A7968]" />
            <span>Paper & Print Guide</span>
          </button>

          {/* Download PDF Dropdown / Split Action */}
          <div className="relative">
            <button
              id="download-pdf-menu-btn"
              type="button"
              onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
              className="px-3.5 py-2 bg-[#8A6D5E] hover:bg-[#765B4D] text-white text-xs font-medium rounded-md flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              {isExportingPdf || isExportingSinglePdf ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
                </>
              )}
            </button>

            {isExportDropdownOpen && (
              <div
                id="download-pdf-dropdown-menu"
                className="absolute right-0 mt-1.5 w-64 p-2 bg-white rounded-xl border border-[#D5C2B4] shadow-xl z-50 animate-in fade-in slide-in-from-top-1 text-left space-y-1"
              >
                <div className="px-2.5 py-1 text-[10px] font-semibold text-[#8C7B6D] uppercase tracking-wider border-b border-[#F0E6DC]">
                  Export Print-Ready PDF (300 DPI)
                </div>

                <button
                  type="button"
                  id="pdf-export-active-card-opt"
                  disabled={isExportingSinglePdf}
                  onClick={handleDownloadSinglePdf}
                  className="w-full p-2 rounded-lg text-left hover:bg-[#FAF5F0] transition-colors flex items-start gap-2.5 cursor-pointer text-xs"
                >
                  <div className="p-1.5 rounded-md bg-[#FAF2EB] text-[#8A6D5E] shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#2D221B]">
                      {cardTabsList.find((t) => t.id === activeCardType)?.label} (PDF)
                    </div>
                    <div className="text-[10.5px] text-[#7A695A]">
                      Export active card ({cardTabsList.find((t) => t.id === activeCardType)?.sizeLabel}) for immediate printing.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  id="pdf-export-full-suite-opt"
                  disabled={isExportingPdf}
                  onClick={handleDownloadFullSuitePdf}
                  className="w-full p-2 rounded-lg text-left hover:bg-[#FAF5F0] transition-colors flex items-start gap-2.5 cursor-pointer text-xs"
                >
                  <div className="p-1.5 rounded-md bg-[#FAF2EB] text-[#8A6D5E] shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#2D221B]">
                      Full Suite Booklet (8-Page PDF)
                    </div>
                    <div className="text-[10.5px] text-[#7A695A]">
                      Complete proof booklet with cover spec sheet &amp; all stationery cards.
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            id="download-full-bundle-btn"
            disabled={isExportingZip}
            onClick={handleDownloadFullSuite}
            className="px-3.5 py-2 bg-[#3A322B] hover:bg-[#251F1A] disabled:bg-[#8A8177] text-[#FAF5ED] text-xs font-medium rounded-md flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            {isExportingZip ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Preparing .ZIP...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download Entire Suite (.ZIP)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {exportSuccessMsg && (
        <div className="p-3 bg-[#EAF2E8] border border-[#C5DDC0] rounded-lg text-emerald-900 text-xs font-medium flex items-center justify-between animate-fade-in shadow-xs">
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

      {/* Stationery Item Navigation Bar (8 Items) */}
      <div className="overflow-x-auto pb-2 scrollbar-none border-b border-[#EDE5D8]">
        <div className="flex items-center gap-2 min-w-max">
          {cardTabsList.map((tab) => {
            const isActive = activeCardType === tab.id;
            return (
              <button
                key={tab.id}
                id={`card-tab-${tab.id}`}
                onClick={() => setActiveCardType(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#3A322B] text-[#FAF5ED] shadow-sm'
                    : 'bg-white text-[#635548] hover:bg-[#F2ECE1] border border-[#E8DEC9]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-sm ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EAE2D2] text-[#6E6154]'
                  }`}
                >
                  {tab.sizeLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Workspace Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: LIVE STAGE & CARD PREVIEW (lg:col-span-6 or 7) */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-4">
          {/* Card Presentation Stage */}
          <div
            className="relative w-full p-6 sm:p-10 rounded-2xl border border-[#E5DAC8] shadow-xs flex flex-col items-center justify-center min-h-[580px] transition-colors"
            style={{ backgroundColor: customization.palette.background }}
          >
            {/* Live Rendered Card Component */}
            <div className="relative z-10 w-full flex justify-center">
              <StationeryCard
                domId="live-preview-card"
                suite={suite}
                cardType={activeCardType}
                details={details}
                customization={customization}
              />
            </div>

            {/* Stage Controls & Bleed Toggle Overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#6B5C4E] bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#D9CEBD]">
                Live 300-DPI Preview
              </span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <button
                id="toggle-bleed-btn"
                onClick={() =>
                  handleCustomizationChange('showBleedAndCrop', !customization.showBleedAndCrop)
                }
                title="Toggle Print Bleed & Crop Marks"
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                  customization.showBleedAndCrop
                    ? 'bg-[#3A322B] text-white border-[#3A322B]'
                    : 'bg-white/90 text-[#6B5C4E] border-[#D9CEBD] hover:bg-white'
                }`}
              >
                Bleed & Crop Marks: {customization.showBleedAndCrop ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Card Quick Action Bar below preview */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-[#EDE5D8] shadow-2xs">
            <div className="text-xs text-[#706253]">
              <span className="font-medium text-[#2E251E]">
                {CARD_TABS.find((t) => t.id === activeCardType)?.label}
              </span>
              <span className="text-[#9C8C7D] ml-2">
                Format: {CARD_TABS.find((t) => t.id === activeCardType)?.sizeLabel} Print Ready
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                id="stage-randomize-motifs-btn"
                type="button"
                onClick={() => handleRandomizeMotifs(true)}
                title="Shuffle through watercolor floral border assets"
                className="px-3 py-2 bg-white hover:bg-[#FAF5F2] text-[#6E4F3E] text-xs font-semibold rounded-md border border-[#D5C2B4] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs active:scale-95"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#B87A7A]" />
                <span>Randomize</span>
              </button>

              <button
                id="download-single-card-pdf-btn"
                disabled={isExportingSinglePdf}
                onClick={handleDownloadSinglePdf}
                title="Export high-resolution 300 DPI print-ready PDF"
                className="flex-1 sm:flex-none px-3.5 py-2 bg-[#8A6D5E] hover:bg-[#765B4D] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                {isExportingSinglePdf ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Exporting PDF...</span>
                  </>
                ) : (
                  <>
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              <button
                id="download-single-card-btn"
                disabled={isExportingSingle}
                onClick={handleDownloadSingle}
                title="Download high-resolution image"
                className="flex-1 sm:flex-none px-3 py-2 bg-[#FAF6EE] hover:bg-[#F2ECE0] text-[#3A322B] text-xs font-semibold rounded-md border border-[#D5C6B1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {isExportingSingle ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>PNG</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE CUSTOMIZATION TABS & CONTROLS (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8DEC9] shadow-sm overflow-hidden flex flex-col">
          {/* Studio Control Tabs Header */}
          <div className="grid grid-cols-7 border-b border-[#EDE5D8] bg-[#FAF7F2] text-xs">
            <button
              id="tab-btn-details"
              onClick={() => setActiveControlTab('details')}
              className={`py-3 px-1 text-center font-medium transition-colors border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeControlTab === 'details'
                  ? 'border-[#3A322B] text-[#2C231D] bg-white'
                  : 'border-transparent text-[#7A6C5F] hover:text-[#3A322B]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="text-[10px]">Details</span>
            </button>

            <button
              id="tab-btn-florals"
              onClick={() => setActiveControlTab('florals')}
              className={`py-3 px-1 text-center font-medium transition-colors border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeControlTab === 'florals'
                  ? 'border-[#8A6D5E] text-[#8A6D5E] bg-white font-semibold'
                  : 'border-transparent text-[#7A6C5F] hover:text-[#8A6D5E]'
              }`}
            >
              <Flower2 className="w-3.5 h-3.5 text-[#B87A7A]" />
              <span className="text-[10px]">Floral Art</span>
            </button>

            <button
              id="tab-btn-colors"
              onClick={() => setActiveControlTab('colors')}
              className={`py-3 px-1 text-center font-medium transition-colors border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeControlTab === 'colors'
                  ? 'border-[#3A322B] text-[#2C231D] bg-white'
                  : 'border-transparent text-[#7A6C5F] hover:text-[#3A322B]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="text-[10px]">Color & Foil</span>
            </button>

            <button
              id="tab-btn-typography"
              onClick={() => setActiveControlTab('typography')}
              className={`py-3 px-1 text-center font-medium transition-colors border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeControlTab === 'typography'
                  ? 'border-[#3A322B] text-[#2C231D] bg-white'
                  : 'border-transparent text-[#7A6C5F] hover:text-[#3A322B]'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span className="text-[10px]">Paper & Fonts</span>
            </button>

            <button
              id="tab-btn-schedule"
              onClick={() => setActiveControlTab('schedule')}
              className={`py-3 px-1 text-center font-medium transition-colors border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeControlTab === 'schedule'
                  ? 'border-[#3A322B] text-[#2C231D] bg-white'
                  : 'border-transparent text-[#7A6C5F] hover:text-[#3A322B]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px]">Timeline</span>
            </button>

            <button
              id="tab-btn-menu"
              onClick={() => setActiveControlTab('menu')}
              className={`py-3 px-1 text-center font-medium transition-colors border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeControlTab === 'menu'
                  ? 'border-[#3A322B] text-[#2C231D] bg-white'
                  : 'border-transparent text-[#7A6C5F] hover:text-[#3A322B]'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span className="text-[10px]">Menu</span>
            </button>

            <button
              id="tab-btn-wording"
              onClick={() => setActiveControlTab('wording')}
              className={`py-3 px-1 text-center font-medium transition-colors border-b-2 cursor-pointer flex flex-col items-center gap-1 ${
                activeControlTab === 'wording'
                  ? 'border-[#3A322B] text-[#2C231D] bg-white'
                  : 'border-transparent text-[#7A6C5F] hover:text-[#3A322B]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A68048]" />
              <span className="text-[10px]">Wording</span>
            </button>
          </div>

          {/* Studio Tab Content Panel */}
          <div className="p-5 space-y-6 max-h-[620px] overflow-y-auto">
            {/* TAB 1: DETAILS & COUPLE INFO */}
            {activeControlTab === 'details' && (
              <div className="space-y-5">
                {/* Quick Sample Filler */}
                <div className="p-3 bg-[#FAF6EF] rounded-lg border border-[#EADBCC] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#5A4839] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#A68048]" />
                      Auto-Fill Couple Sample:
                    </span>
                  </div>
                  <select
                    id="sample-couple-select"
                    onChange={(e) => handleLoadSampleCouple(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-white rounded-md border border-[#D5C6B1] text-[#332A24] focus:outline-none focus:ring-1 focus:ring-[#8A7968]"
                  >
                    <option value="">Select a sample destination couple...</option>
                    {SAMPLE_COUPLES.map((c, idx) => (
                      <option key={idx} value={idx}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Couple Names */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Couple Names & Monogram
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Partner 1 First Name
                      </label>
                      <input
                        id="input-p1-first"
                        type="text"
                        value={details.partner1FirstName}
                        onChange={(e) => handleDetailChange('partner1FirstName', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Partner 1 Last Name
                      </label>
                      <input
                        id="input-p1-last"
                        type="text"
                        value={details.partner1LastName}
                        onChange={(e) => handleDetailChange('partner1LastName', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Partner 2 First Name
                      </label>
                      <input
                        id="input-p2-first"
                        type="text"
                        value={details.partner2FirstName}
                        onChange={(e) => handleDetailChange('partner2FirstName', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Partner 2 Last Name
                      </label>
                      <input
                        id="input-p2-last"
                        type="text"
                        value={details.partner2LastName}
                        onChange={(e) => handleDetailChange('partner2LastName', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                      Monogram / Initials
                    </label>
                    <input
                      id="input-monogram"
                      type="text"
                      value={details.monogramText}
                      onChange={(e) => handleDetailChange('monogramText', e.target.value)}
                      placeholder="e.g. E & J or EM"
                      className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Date & Location */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Date & Venue
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Wedding Date
                      </label>
                      <input
                        id="input-wedding-date"
                        type="text"
                        value={details.weddingDate}
                        onChange={(e) => handleDetailChange('weddingDate', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Ceremony Time
                      </label>
                      <input
                        id="input-wedding-time"
                        type="text"
                        value={details.weddingTime}
                        onChange={(e) => handleDetailChange('weddingTime', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                      Venue Name
                    </label>
                    <input
                      id="input-venue-name"
                      type="text"
                      value={details.venueName}
                      onChange={(e) => handleDetailChange('venueName', e.target.value)}
                      className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                      Church, Chapel or Parish (for Order of Service)
                    </label>
                    <input
                      id="input-church-parish"
                      type="text"
                      value={details.churchParish || ''}
                      onChange={(e) => handleDetailChange('churchParish', e.target.value)}
                      placeholder="e.g. ST. MARY'S CHURCH, TETBURY"
                      className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Venue Street Address
                      </label>
                      <input
                        id="input-venue-address"
                        type="text"
                        value={details.venueAddress}
                        onChange={(e) => handleDetailChange('venueAddress', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        City, State / Region
                      </label>
                      <input
                        id="input-city-state"
                        type="text"
                        value={details.cityState}
                        onChange={(e) => handleDetailChange('cityState', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* RSVP & Place Card Specifics */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    RSVP & Place Card Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        RSVP Deadline
                      </label>
                      <input
                        id="input-rsvp-deadline"
                        type="text"
                        value={details.rsvpDeadline}
                        onChange={(e) => handleDetailChange('rsvpDeadline', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        RSVP Wedding Website
                      </label>
                      <input
                        id="input-rsvp-website"
                        type="text"
                        value={details.rsvpWebsite}
                        onChange={(e) => handleDetailChange('rsvpWebsite', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                      Dress Code / Attire
                    </label>
                    <input
                      id="input-dress-code"
                      type="text"
                      value={details.dressCode}
                      onChange={(e) => handleDetailChange('dressCode', e.target.value)}
                      placeholder="e.g. Black Tie Optional"
                      className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Sample Place Card Guest
                      </label>
                      <input
                        id="input-placecard-guest"
                        type="text"
                        value={details.placeCardGuestName}
                        onChange={(e) => handleDetailChange('placeCardGuestName', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                        Table Assignment
                      </label>
                      <input
                        id="input-placecard-table"
                        type="text"
                        value={details.placeCardTable}
                        onChange={(e) => handleDetailChange('placeCardTable', e.target.value)}
                        className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#5E5144] block mb-1">
                      Thank You Card Message
                    </label>
                    <textarea
                      id="input-thankyou-message"
                      rows={2}
                      value={details.thankYouMessage}
                      onChange={(e) => handleDetailChange('thankYouMessage', e.target.value)}
                      className="w-full text-xs p-2.5 rounded-md border border-[#DECDBB] focus:ring-1 focus:ring-[#8A7968] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FLORAL ART & WATERCOLOR BOTANICAL OVERLAYS */}
            {activeControlTab === 'florals' && (
              <div className="space-y-6">
                {/* Master Layer Switch */}
                <div className="p-3.5 bg-[#FAF5F2] rounded-xl border border-[#EADBCC] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#30231B] flex items-center gap-1.5">
                      <Flower2 className="w-4 h-4 text-[#B87A7A]" />
                      <span>Watercolor Floral Overlay Layer</span>
                    </div>
                    <p className="text-[10px] text-[#7A695A]">
                      Toggle or select high-resolution watercolor floral border motifs to overlay on your stationery.
                    </p>
                  </div>
                  <button
                    type="button"
                    id="toggle-floral-layer-switch"
                    onClick={() => {
                      const currentlyEnabled = customization.floralOverlayEnabled !== false && customization.floralStyle !== 'none';
                      if (currentlyEnabled) {
                        handleCustomizationChange('floralOverlayEnabled', false);
                        handleCustomizationChange('floralStyle', 'none');
                      } else {
                        handleCustomizationChange('floralOverlayEnabled', true);
                        const defaultAsset = customization.floralAssetId || 'blush_rose_border';
                        handleCustomizationChange('floralAssetId', defaultAsset);
                        handleCustomizationChange('floralStyle', defaultAsset as FloralStyle);
                      }
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      customization.floralOverlayEnabled !== false && customization.floralStyle !== 'none'
                        ? 'bg-[#8A6D5E]'
                        : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        customization.floralOverlayEnabled !== false && customization.floralStyle !== 'none'
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Randomize Motifs & Exploration Feature */}
                <div className="p-3.5 bg-gradient-to-br from-[#FAF5F0] to-[#F3EBE2] rounded-xl border border-[#E3D2C2] shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C07B53]" />
                      <span className="text-xs font-serif font-bold text-[#30231B]">
                        Aesthetic Motif Exploration
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/90 border border-[#E0D2C2] text-[#7A6453] font-medium">
                      8 Curated Motifs
                    </span>
                  </div>

                  <p className="text-[10.5px] text-[#6A584A] leading-relaxed">
                    Quickly shuffle through romantic garden arches, white peonies, champagne ranunculus, and wildflower borders to preview different botanical pairings.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      id="randomize-motifs-btn"
                      onClick={() => handleRandomizeMotifs(true)}
                      className="flex-1 sm:flex-none px-3.5 py-2 bg-[#8A6D5E] hover:bg-[#775B4D] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>Randomize Motifs</span>
                    </button>

                    <button
                      type="button"
                      id="toggle-auto-cycle-btn"
                      onClick={() => setIsAutoCycling(!isAutoCycling)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isAutoCycling
                          ? 'bg-amber-100 border-amber-300 text-amber-900 ring-2 ring-amber-300 shadow-xs'
                          : 'bg-white border-[#D9CCBE] text-[#5A4839] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {isAutoCycling ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-amber-700" />
                          <span>Pause Slideshow</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-[#8A6D5E]" />
                          <span>Auto-Cycle Slideshow</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Palette Filter Categories */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                      Curated Botanical Palettes
                    </h4>
                    <span className="text-[10px] text-[#9E8B7A]">8 Fine-Art Watercolor Motifs</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Palettes (8)' },
                      { id: 'blush', label: 'Blush & Peach' },
                      { id: 'ivory', label: 'Ivory & Peony' },
                      { id: 'sage', label: 'Sage & Foliage' },
                      { id: 'wildflower', label: 'Meadow & Lavender' },
                      { id: 'mauve', label: 'Dusty Rose & Mauve' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        id={`filter-floral-cat-${cat.id}`}
                        onClick={() => setFloralCategoryFilter(cat.id)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          floralCategoryFilter === cat.id
                            ? 'bg-[#3A322B] text-white border-[#3A322B] shadow-xs'
                            : 'bg-white text-[#6E5B4B] border-[#E5DACE] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High-Resolution Floral Asset Gallery Cards */}
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 gap-2.5">
                    {FLORAL_BORDER_ASSETS.filter((asset) =>
                      floralCategoryFilter === 'all' ? true : asset.category === floralCategoryFilter
                    ).map((asset) => {
                      const isSelected =
                        customization.floralOverlayEnabled !== false &&
                        (customization.floralAssetId === asset.id ||
                          (!customization.floralAssetId &&
                            (customization.floralStyle === asset.id ||
                              (asset.id === 'blush_rose_border' && customization.floralStyle === 'blush_rose_corner') ||
                              (asset.id === 'white_peony_frame' && customization.floralStyle === 'white_peony_corner') ||
                              (asset.id === 'wildflower_sage_border' && customization.floralStyle === 'wildflower_meadow'))));

                      return (
                        <button
                          key={asset.id}
                          id={`floral-card-${asset.id}`}
                          onClick={() => {
                            handleCustomizationChange('floralOverlayEnabled', true);
                            handleCustomizationChange('floralAssetId', asset.id);
                            handleCustomizationChange('floralStyle', asset.id as FloralStyle);
                            if (asset.recommendedBorder && customization.borderStyle === 'none') {
                              handleCustomizationChange('borderStyle', asset.recommendedBorder as BorderStyle);
                            }
                          }}
                          className={`p-3 rounded-xl border text-left transition-all flex gap-3.5 items-center cursor-pointer ${
                            isSelected
                              ? 'border-[#8A6D5E] bg-[#FAF5F2] ring-2 ring-[#8A6D5E]/30 shadow-xs'
                              : 'border-[#EAE0D2] bg-white hover:border-[#D0BFB0] hover:bg-[#FAF9F6]'
                          }`}
                        >
                          {/* Image thumbnail with ratio */}
                          <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-[#DFD4C5] shadow-xs relative bg-[#FAF7F2]">
                            <img
                              src={asset.imageUrl}
                              alt={asset.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#8A6D5E]/15 flex items-center justify-center">
                                <span className="bg-[#8A6D5E] text-white p-1 rounded-full shadow-xs">
                                  <Check className="w-3 h-3" />
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Info & tags */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-serif font-bold text-[#2A2019] truncate">{asset.name}</span>
                              {isSelected && (
                                <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-[#8A6D5E] text-white font-medium flex-shrink-0">
                                  Active Layer
                                </span>
                              )}
                            </div>
                            <div className="text-[10.5px] text-[#8C6F5E] italic mt-0.5">{asset.mood}</div>
                            <p className="text-[10px] text-[#6A5A4D] line-clamp-1 mt-0.5">{asset.paletteDescription}</p>

                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {asset.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[9px] px-1.5 py-0.5 bg-[#F2ECE4] text-[#5A493B] rounded-md"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Layer Fine-Tuning Controls */}
                <div className="space-y-4 pt-3 border-t border-[#EDE5D8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Overlay Layer Fine-Tuning
                  </h4>

                  {/* Opacity & Density Slider for Motif / Floral Layer */}
                  <div className="p-3.5 bg-white rounded-xl border border-[#EAE0D2] shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-[#30231B] flex items-center gap-1.5">
                          <span>Motif & Floral Layer Opacity / Intensity</span>
                        </span>
                        <p className="text-[10px] text-[#7A695A]">
                          Adjust watermark transparency from a light watercolor wash to vivid botanical pigments.
                        </p>
                      </div>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-[#FAF5F2] border border-[#E4D4C5] text-[#8A6D5E] font-bold">
                        {Math.round((customization.floralBackgroundOpacity ?? (customization.motifOpacity ?? 0.85)) * 100)}%
                      </span>
                    </div>

                    {/* Gradient track slider */}
                    <div className="space-y-1.5 pt-1">
                      <input
                        id="input-floral-opacity"
                        type="range"
                        min="5"
                        max="100"
                        step="1"
                        value={Math.round((customization.floralBackgroundOpacity ?? (customization.motifOpacity ?? 0.85)) * 100)}
                        onChange={(e) => {
                          const val = Number(e.target.value) / 100;
                          handleCustomizationChange('floralBackgroundOpacity', val);
                        }}
                        className="w-full h-2 rounded-lg accent-[#8A6D5E] bg-gradient-to-r from-[#F0E6DD] via-[#D5C2B4] to-[#8A6D5E] cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] text-[#9E8B7A] font-mono">
                        <span>5% (Whisper)</span>
                        <span>50% (Soft)</span>
                        <span>100% (Vivid)</span>
                      </div>
                    </div>

                    {/* Quick Preset Pills */}
                    <div className="grid grid-cols-5 gap-1 pt-1">
                      {[
                        { label: 'Subtle', val: 0.15, desc: '15%' },
                        { label: 'Soft', val: 0.35, desc: '35%' },
                        { label: 'Medium', val: 0.65, desc: '65%' },
                        { label: 'Standard', val: 0.85, desc: '85%' },
                        { label: 'Vivid', val: 1.0, desc: '100%' }
                      ].map((preset) => {
                        const currentVal = customization.floralBackgroundOpacity ?? (customization.motifOpacity ?? 0.85);
                        const isPresetActive = Math.abs(currentVal - preset.val) < 0.05;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            id={`motif-opacity-preset-${preset.label.toLowerCase()}`}
                            onClick={() => handleCustomizationChange('floralBackgroundOpacity', preset.val)}
                            className={`py-1.5 px-1 rounded-lg border transition-all cursor-pointer text-center ${
                              isPresetActive
                                ? 'bg-[#8A6D5E] text-white border-[#8A6D5E] shadow-2xs font-semibold'
                                : 'bg-[#FAF7F2] text-[#6E5B4B] border-[#E5DACE] hover:bg-[#F2ECE4]'
                            }`}
                          >
                            <div className="text-[10px] font-medium leading-tight">{preset.label}</div>
                            <div className="text-[8.5px] opacity-75 font-mono">{preset.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Paper Blend Mode */}
                  <div className="p-3 bg-white rounded-lg border border-[#EAE0D2] space-y-2">
                    <div className="text-xs font-medium text-[#4A3C30]">Paper Texture Blend Mode</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'multiply', label: 'Multiply', desc: 'Natural Ink Absorb' },
                        { id: 'normal', label: 'Normal', desc: 'Opaque Pigment' },
                        { id: 'soft-light', label: 'Soft Light', desc: 'Dreamy Tint' },
                        { id: 'overlay', label: 'Overlay', desc: 'High Contrast' }
                      ].map((mode) => {
                        const isSelected = (customization.floralBlendMode || 'multiply') === mode.id;
                        return (
                          <button
                            key={mode.id}
                            id={`blend-mode-${mode.id}`}
                            onClick={() => handleCustomizationChange('floralBlendMode', mode.id)}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#8A6D5E] bg-[#FAF5F2] ring-1 ring-[#8A6D5E] text-[#2E251E]'
                                : 'border-[#EAE0D2] bg-white hover:bg-[#FAF8F5] text-[#6E5B4B]'
                            }`}
                          >
                            <div className="text-xs font-semibold">{mode.label}</div>
                            <div className="text-[9px] text-[#8C7D6F] truncate">{mode.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Framing / Placement */}
                  <div className="p-3 bg-white rounded-lg border border-[#EAE0D2] space-y-2">
                    <div className="text-xs font-medium text-[#4A3C30]">Motif Framing Placement</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'full', label: 'Full Bleed', desc: 'Perimeter Garland' },
                        { id: 'frame', label: 'Framed Inset', desc: 'Margin Inset' },
                        { id: 'header', label: 'Header Arch', desc: 'Crown Floral Arch' }
                      ].map((placement) => {
                        const isSelected = (customization.floralOverlayPlacement || 'full') === placement.id;
                        return (
                          <button
                            key={placement.id}
                            id={`placement-btn-${placement.id}`}
                            onClick={() => handleCustomizationChange('floralOverlayPlacement', placement.id)}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#8A6D5E] bg-[#FAF5F2] ring-1 ring-[#8A6D5E] text-[#2E251E]'
                                : 'border-[#EAE0D2] bg-white hover:bg-[#FAF8F5] text-[#6E5B4B]'
                            }`}
                          >
                            <div className="text-xs font-semibold">{placement.label}</div>
                            <div className="text-[9px] text-[#8C7D6F]">{placement.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Clean / No Floral Layer Action Button */}
                  <div className="pt-1 flex gap-2">
                    <button
                      type="button"
                      id="disable-floral-btn"
                      onClick={() => {
                        handleCustomizationChange('floralOverlayEnabled', false);
                        handleCustomizationChange('floralAssetId', '');
                        handleCustomizationChange('floralStyle', 'none');
                      }}
                      className="flex-1 py-2 px-3 rounded-lg border border-[#DECDBB] text-xs font-medium text-[#6E5B4B] hover:bg-[#FAF7F2] transition-colors text-center cursor-pointer"
                    >
                      Clear Floral Layer (Clean Typography)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COLOR & FOIL */}
            {activeControlTab === 'colors' && (
              <div className="space-y-6">
                {/* Palette presets */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Curated Wedding Colorways
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {COLOR_PALETTES.map((pal) => {
                      const isSelected = customization.palette.id === pal.id;
                      return (
                        <button
                          key={pal.id}
                          id={`palette-btn-${pal.id}`}
                          onClick={() => handleCustomizationChange('palette', pal)}
                          className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-[#3A322B] ring-2 ring-[#3A322B]/20 bg-[#FAF7F2]'
                              : 'border-[#EADBCC] hover:border-[#CBB9A5] bg-white'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-[#30251E]">{pal.name}</div>
                            <div className="text-[10px] text-[#857567]">{pal.tag}</div>
                          </div>
                          <div className="flex items-center -space-x-1">
                            <span
                              className="w-4 h-4 rounded-full border border-white shadow-2xs"
                              style={{ backgroundColor: pal.cardBg }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-white shadow-2xs"
                              style={{ backgroundColor: pal.accent }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-white shadow-2xs"
                              style={{ backgroundColor: pal.text }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Metallic Foil Finishes */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Metallic Hot Foil Stamping
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'gold' as FoilType, label: 'Gold Foil', color: 'bg-amber-100 border-amber-300 text-amber-900' },
                      { id: 'rose-gold' as FoilType, label: 'Rose Gold', color: 'bg-rose-100 border-rose-300 text-rose-900' },
                      { id: 'silver' as FoilType, label: 'Silver Foil', color: 'bg-slate-100 border-slate-300 text-slate-800' },
                      { id: 'none' as FoilType, label: 'No Foil', color: 'bg-neutral-100 border-neutral-300 text-neutral-700' }
                    ].map((foil) => {
                      const isSelected = customization.palette.foil === foil.id;
                      return (
                        <button
                          key={foil.id}
                          id={`foil-btn-${foil.id}`}
                          onClick={() => {
                            const updated = { ...customization.palette, foil: foil.id };
                            handleCustomizationChange('palette', updated);
                          }}
                          className={`p-2.5 rounded-md border text-center text-xs font-medium transition-all cursor-pointer ${
                            foil.color
                          } ${
                            isSelected ? 'ring-2 ring-offset-1 ring-[#3A322B] shadow-xs' : 'opacity-80'
                          }`}
                        >
                          {foil.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Fine-tune specific colors */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Custom Color Fine-Tuning
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-2 rounded-md border border-[#EAE0D2]">
                      <span className="text-xs text-[#524438]">Paper Color</span>
                      <input
                        id="color-picker-cardbg"
                        type="color"
                        value={customization.palette.cardBg}
                        onChange={(e) => {
                          handleCustomizationChange('palette', {
                            ...customization.palette,
                            cardBg: e.target.value
                          });
                        }}
                        className="w-6 h-6 rounded-full border-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md border border-[#EAE0D2]">
                      <span className="text-xs text-[#524438]">Text Color</span>
                      <input
                        id="color-picker-text"
                        type="color"
                        value={customization.palette.text}
                        onChange={(e) => {
                          handleCustomizationChange('palette', {
                            ...customization.palette,
                            text: e.target.value
                          });
                        }}
                        className="w-6 h-6 rounded-full border-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md border border-[#EAE0D2]">
                      <span className="text-xs text-[#524438]">Accent Color</span>
                      <input
                        id="color-picker-accent"
                        type="color"
                        value={customization.palette.accent}
                        onChange={(e) => {
                          handleCustomizationChange('palette', {
                            ...customization.palette,
                            accent: e.target.value
                          });
                        }}
                        className="w-6 h-6 rounded-full border-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md border border-[#EAE0D2]">
                      <span className="text-xs text-[#524438]">Outer Canvas</span>
                      <input
                        id="color-picker-bg"
                        type="color"
                        value={customization.palette.background}
                        onChange={(e) => {
                          handleCustomizationChange('palette', {
                            ...customization.palette,
                            background: e.target.value
                          });
                        }}
                        className="w-6 h-6 rounded-full border-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PAPER & TYPOGRAPHY */}
            {activeControlTab === 'typography' && (
              <div className="space-y-6">
                {/* Font Preset & Visual Specimen Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857] flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-[#8A6D5E]" />
                      <span>Typography Pairings & Presets</span>
                    </h4>
                    <div className="flex items-center gap-1 bg-[#FAF5F0] p-0.5 rounded-md border border-[#E5DACE] text-[10px]">
                      <button
                        type="button"
                        onClick={() => setFontViewMode('dropdown')}
                        className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                          fontViewMode === 'dropdown'
                            ? 'bg-[#8A6D5E] text-white font-medium shadow-2xs'
                            : 'text-[#7A695A] hover:text-[#332A24]'
                        }`}
                      >
                        Dropdown
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontViewMode('gallery')}
                        className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                          fontViewMode === 'gallery'
                            ? 'bg-[#8A6D5E] text-white font-medium shadow-2xs'
                            : 'text-[#7A695A] hover:text-[#332A24]'
                        }`}
                      >
                        All Cards
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: Interactive Dropdown with Live In-Menu Specimen Cards */}
                  {fontViewMode === 'dropdown' ? (
                    <div className="relative">
                      {(() => {
                        const activePreset =
                          FONT_PRESETS.find((f) => f.id === customization.fontPresetId) || FONT_PRESETS[0];
                        return (
                          <div className="space-y-2">
                            {/* Dropdown Trigger Button */}
                            <button
                              type="button"
                              id="font-selection-dropdown-trigger"
                              onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                              className={`w-full p-3 bg-white rounded-xl border text-left transition-all cursor-pointer shadow-2xs flex items-center justify-between gap-3 ${
                                isFontDropdownOpen
                                  ? 'border-[#8A6D5E] ring-2 ring-[#8A6D5E]/20 bg-[#FAF7F2]'
                                  : 'border-[#E2D4C5] hover:border-[#BFAF9F]'
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className={`text-base font-semibold text-[#2D221B] truncate ${activePreset.headingFont}`}>
                                    {activePreset.name}
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF2EB] text-[#8A6D5E] border border-[#EADBCC] font-mono shrink-0">
                                    Active
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-xs text-[#7A6857] truncate ${activePreset.headingFont}`}>
                                    Sample: {details.partner1FirstName || 'Martha'} &amp; {details.partner2FirstName || 'Robert'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 text-[#8A6D5E] shrink-0">
                                <span className="text-[11px] font-medium hidden sm:inline">
                                  {isFontDropdownOpen ? 'Close Menu' : 'Change Font'}
                                </span>
                                {isFontDropdownOpen ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </div>
                            </button>

                            {/* Dropdown Menu Overlay */}
                            {isFontDropdownOpen && (
                              <div
                                id="font-selection-dropdown-menu"
                                className="p-2 bg-white rounded-xl border border-[#D8C7B5] shadow-lg space-y-2 animate-in fade-in slide-in-from-top-1 duration-150"
                              >
                                <div className="px-2 py-1 flex items-center justify-between border-b border-[#F0E6DD] text-[10px] text-[#8C7B6D]">
                                  <span>Select typeface pairing (hover to live-preview):</span>
                                  <span className="font-mono">{FONT_PRESETS.length} Curated Styles</span>
                                </div>

                                <div className="space-y-1.5">
                                  {FONT_PRESETS.map((font) => {
                                    const isSelected = customization.fontPresetId === font.id;
                                    const isHovered = hoveredFontPresetId === font.id;

                                    return (
                                      <div
                                        key={font.id}
                                        id={`font-dropdown-option-${font.id}`}
                                        onMouseEnter={() => setHoveredFontPresetId(font.id)}
                                        onMouseLeave={() => setHoveredFontPresetId(null)}
                                        onClick={() => {
                                          handleCustomizationChange('fontPresetId', font.id);
                                          setIsFontDropdownOpen(false);
                                          setHoveredFontPresetId(null);
                                        }}
                                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                                          isSelected
                                            ? 'border-[#8A6D5E] bg-[#FAF5F0] ring-1 ring-[#8A6D5E]/30 shadow-2xs'
                                            : isHovered
                                            ? 'border-[#CBB9A5] bg-[#FDFBF7]'
                                            : 'border-[#EDE3D8] bg-white hover:border-[#D5C4B3]'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <span className={`text-sm font-semibold text-[#2D221B] ${font.headingFont}`}>
                                              {font.name}
                                            </span>
                                            {isSelected && (
                                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#8A6D5E] text-white font-medium">
                                                Selected
                                              </span>
                                            )}
                                          </div>
                                          {isSelected ? (
                                            <Check className="w-4 h-4 text-[#8A6D5E]" />
                                          ) : (
                                            <span className="text-[10px] text-[#A08E7F] hover:text-[#8A6D5E]">
                                              Apply &rarr;
                                            </span>
                                          )}
                                        </div>

                                        {/* Inline specimen phrase */}
                                        <div className="mt-1.5 p-1.5 rounded bg-[#FAF8F5] border border-[#EFE8DE] flex items-center justify-between">
                                          <span className={`text-xs text-[#3E3127] truncate ${font.headingFont}`}>
                                            {details.partner1FirstName || 'Martha'} &amp; {details.partner2FirstName || 'Robert'}
                                          </span>
                                          <span className={`text-xs text-[#8A6D5E] italic ${font.scriptFont}`}>
                                            invitation
                                          </span>
                                        </div>

                                        <p className="text-[10.5px] text-[#857567] mt-1 line-clamp-1">{font.description}</p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    /* Mode 2: Full Specimen Cards Gallery */
                    <div className="space-y-2.5">
                      {FONT_PRESETS.map((font) => {
                        const isSelected = customization.fontPresetId === font.id;
                        return (
                          <div
                            key={font.id}
                            id={`font-preset-card-${font.id}`}
                            onClick={() => handleCustomizationChange('fontPresetId', font.id)}
                            onMouseEnter={() => setHoveredFontPresetId(font.id)}
                            onMouseLeave={() => setHoveredFontPresetId(null)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#8A6D5E] ring-2 ring-[#8A6D5E]/20 bg-[#FAF7F2] shadow-2xs'
                                : 'border-[#EADBCC] hover:border-[#CBB9A5] bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-base font-semibold text-[#2C211A] ${font.headingFont}`}>
                                {font.name}
                              </span>
                              {isSelected ? (
                                <span className="flex items-center gap-1 text-[11px] font-semibold text-[#8A6D5E]">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Applied</span>
                                </span>
                              ) : (
                                <span className="text-[11px] text-[#9A8778] hover:text-[#332A24]">
                                  Click to apply
                                </span>
                              )}
                            </div>

                            {/* Specimen Preview Block inside card */}
                            <div className="my-2 p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EDE3D6] space-y-0.5">
                              <div className={`text-base text-[#2E241D] ${font.headingFont}`}>
                                {details.partner1FirstName || 'Martha'} &amp; {details.partner2FirstName || 'Robert'}
                              </div>
                              <div className={`text-sm text-[#8A6D5E] italic ${font.scriptFont}`}>
                                together with their families
                              </div>
                            </div>

                            <p className="text-[11px] text-[#857567]">{font.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* VISUAL PREVIEW CARD: Dedicated Typeface Specimen Proof Sheet */}
                  {(() => {
                    const specimenPresetId = hoveredFontPresetId || customization.fontPresetId;
                    const specimenFont =
                      FONT_PRESETS.find((f) => f.id === specimenPresetId) || FONT_PRESETS[0];
                    const isCurrentlyActive = customization.fontPresetId === specimenFont.id;

                    return (
                      <div
                        id="font-typeface-visual-preview-card"
                        className="mt-3 p-4 rounded-xl border border-[#DDCFBF] bg-[#FCFAF7] shadow-xs space-y-3 relative overflow-hidden"
                      >
                        {/* Decorative paper watermark corner */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFE5D8]/40 to-transparent pointer-events-none rounded-tr-xl" />

                        {/* Card Header with Status Tag */}
                        <div className="flex items-center justify-between border-b border-[#EDE2D5] pb-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5 text-[#8A6D5E]" />
                              <span className="text-xs font-bold text-[#3B2F26]">
                                Typeface Specimen Proof Card
                              </span>
                            </div>
                            <p className="text-[10px] text-[#7E6E60]">
                              {isCurrentlyActive
                                ? 'Active suite typography'
                                : `Previewing "${specimenFont.name}" (unapplied)`}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {isCurrentlyActive ? (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFE3D5] text-[#5E4A3B] font-semibold border border-[#DDCBB8] flex items-center gap-1">
                                <Check className="w-3 h-3 text-[#5E4A3B]" />
                                Active In Suite
                              </span>
                            ) : (
                              <button
                                type="button"
                                id="apply-hovered-font-btn"
                                onClick={() => {
                                  handleCustomizationChange('fontPresetId', specimenFont.id);
                                  setHoveredFontPresetId(null);
                                  setIsFontDropdownOpen(false);
                                }}
                                className="text-[10px] px-2.5 py-1 rounded-md bg-[#8A6D5E] hover:bg-[#73584A] text-white font-semibold shadow-2xs cursor-pointer transition-colors"
                              >
                                Apply This Font
                              </button>
                            )}
                          </div>
                        </div>

                        {/* High-Resolution Typography Specimen Display Area */}
                        <div className="p-3.5 rounded-lg bg-white border border-[#E8DEC2]/80 shadow-2xs space-y-2 text-center">
                          {/* 1. Display Names in Heading Typeface */}
                          <div className="space-y-0.5">
                            <div className="text-[9px] uppercase tracking-widest text-[#A8988A] font-mono">
                              Heading Display • {specimenFont.headingFont.replace('font-', '')}
                            </div>
                            <h3
                              className={`text-xl sm:text-2xl font-normal text-[#2E221B] tracking-wide ${specimenFont.headingFont}`}
                            >
                              {details.partner1FirstName || 'Martha'} &amp;{' '}
                              {details.partner2FirstName || 'Robert'}
                            </h3>
                          </div>

                          {/* 2. Romance Script Flourish Subtext */}
                          <div className="pt-0.5">
                            <div className="text-[9px] uppercase tracking-widest text-[#A8988A] font-mono">
                              Calligraphy Accent • {specimenFont.scriptFont.replace('font-script-', '')}
                            </div>
                            <p
                              className={`text-lg sm:text-xl text-[#8A6D5E] -mt-0.5 ${specimenFont.scriptFont}`}
                            >
                              together with their families
                            </p>
                          </div>

                          {/* 3. Invitation Body Specimen in Body Typeface */}
                          <div className="pt-1 border-t border-[#F5EFE6]">
                            <div className="text-[9px] uppercase tracking-widest text-[#A8988A] font-mono mb-0.5">
                              Body Typography • {specimenFont.bodyFont.replace('font-', '')}
                            </div>
                            <p
                              className={`text-[11px] text-[#54463B] leading-relaxed uppercase tracking-wider ${specimenFont.bodyFont}`}
                            >
                              {details.weddingDate || 'Saturday, September 24, 2026'} &bull;{' '}
                              {details.venueName || 'Somerset Country Estate'}
                            </p>
                          </div>

                          {/* 4. Glyph & Character Sample Strip */}
                          <div className="pt-1.5 border-t border-[#F5EFE6] flex items-center justify-between text-[10px] text-[#8C7D70] font-mono">
                            <span className={specimenFont.headingFont}>Aa Bb Cc Gg Rr &amp; Ww</span>
                            <span>0 1 2 3 4 5 6 7 8 9</span>
                          </div>
                        </div>

                        {/* Pairing Breakdown Taxonomy Notes */}
                        <div className="grid grid-cols-3 gap-1.5 text-center text-[9.5px]">
                          <div className="p-1.5 rounded bg-[#FAF5F0] border border-[#ECE0D3]">
                            <div className="text-[#9A8778]">Headings</div>
                            <div className="font-semibold text-[#3D3027] truncate">
                              {specimenFont.headingFont.replace('font-', '').toUpperCase()}
                            </div>
                          </div>
                          <div className="p-1.5 rounded bg-[#FAF5F0] border border-[#ECE0D3]">
                            <div className="text-[#9A8778]">Flourish</div>
                            <div className="font-semibold text-[#3D3027] truncate">
                              {specimenFont.scriptFont.replace('font-script-', '').toUpperCase()}
                            </div>
                          </div>
                          <div className="p-1.5 rounded bg-[#FAF5F0] border border-[#ECE0D3]">
                            <div className="text-[#9A8778]">Body Sans</div>
                            <div className="font-semibold text-[#3D3027] truncate">
                              {specimenFont.bodyFont.replace('font-', '').toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Script Font Selection */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                      Calligraphy &amp; Script Flourish
                    </h4>
                    <span className="text-[10px] text-[#8A7969]">Individual script override</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'pinyon', label: 'Pinyon Script', fontClass: 'font-script-pinyon text-lg', mood: 'French Royal' },
                      { id: 'alex', label: 'Alex Brush', fontClass: 'font-script-alex text-base', mood: 'Modern Flow' },
                      { id: 'vibes', label: 'Great Vibes', fontClass: 'font-script-vibes text-base', mood: 'Cascading Swashes' },
                      { id: 'none', label: 'Clean Serif Only', fontClass: 'font-serif text-xs font-medium', mood: 'Minimalist' }
                    ].map((script) => {
                      const isSelected = customization.scriptFont === script.id;
                      return (
                        <button
                          key={script.id}
                          id={`script-font-${script.id}`}
                          onClick={() => handleCustomizationChange('scriptFont', script.id)}
                          className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#8A6D5E] bg-[#FAF5F0] ring-1 ring-[#8A6D5E]/30 font-semibold shadow-2xs'
                              : 'border-[#EAE0D2] bg-white text-[#635447] hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <span className={`block text-[#2D221B] ${script.fontClass}`}>{script.label}</span>
                          <span className="text-[9.5px] text-[#8C7D70] font-sans mt-0.5 block">{script.mood}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Paper Finish & Texture */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Paper Finish & Texture
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'smooth' as PaperFinish, label: 'Smooth Cotton', desc: 'Crisp matte' },
                      { id: 'linen' as PaperFinish, label: 'Tuscan Linen', desc: 'Tactile weave' },
                      { id: 'deckled' as PaperFinish, label: 'Handmade Deckled', desc: 'Feathered edge' }
                    ].map((finish) => {
                      const isSelected = customization.paperFinish === finish.id;
                      return (
                        <button
                          key={finish.id}
                          id={`paper-finish-${finish.id}`}
                          onClick={() => handleCustomizationChange('paperFinish', finish.id)}
                          className={`p-2.5 rounded-md border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#3A322B] bg-[#FAF7F2] ring-1 ring-[#3A322B]'
                              : 'border-[#EAE0D2] bg-white hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <div className="text-xs font-medium text-[#2E251E]">{finish.label}</div>
                          <div className="text-[10px] text-[#8C7D6F]">{finish.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Floral Pattern & High-Resolution Watercolor Borders */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857] flex items-center gap-1.5">
                      <Flower2 className="w-3.5 h-3.5 text-[#B87A7A]" />
                      <span>Watercolor Floral Motif Overlay</span>
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        id="details-randomize-motifs-btn"
                        onClick={() => handleRandomizeMotifs(true)}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#FAF5F0] hover:bg-[#F2E7DC] text-[#8A6D5E] border border-[#E4D4C5] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Shuffle className="w-3 h-3 text-[#B87A7A]" />
                        <span>Randomize</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveControlTab('florals')}
                        className="text-[11px] text-[#8A6D5E] hover:underline font-medium flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Floral Studio</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* High-Resolution Watercolor Border Gallery */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {FLORAL_BORDER_ASSETS.slice(0, 4).map((asset) => {
                      const isSelected =
                        customization.floralOverlayEnabled !== false &&
                        (customization.floralAssetId === asset.id ||
                          (!customization.floralAssetId &&
                            (customization.floralStyle === asset.id ||
                              (asset.id === 'blush_rose_border' && (customization.floralStyle === 'blush_rose_corner' || suite.defaultFloralStyle === 'blush_rose_corner')) ||
                              (asset.id === 'white_peony_frame' && (customization.floralStyle === 'white_peony_corner' || suite.defaultFloralStyle === 'white_peony_corner')) ||
                              (asset.id === 'wildflower_sage_border' && (customization.floralStyle === 'wildflower_meadow' || suite.defaultFloralStyle === 'wildflower_meadow')))));

                      return (
                        <button
                          key={asset.id}
                          id={`quick-floral-asset-${asset.id}`}
                          onClick={() => {
                            handleCustomizationChange('floralOverlayEnabled', true);
                            handleCustomizationChange('floralAssetId', asset.id);
                            handleCustomizationChange('floralStyle', asset.id as FloralStyle);
                            if (asset.recommendedBorder) {
                              handleCustomizationChange('borderStyle', asset.recommendedBorder as BorderStyle);
                            }
                          }}
                          className={`p-2.5 rounded-lg border text-left transition-all flex gap-2.5 items-center cursor-pointer ${
                            isSelected
                              ? 'border-[#8A6D5E] bg-[#FAF5F2] ring-1 ring-[#8A6D5E]'
                              : 'border-[#EAE0D2] bg-white hover:bg-[#FAF8F5]'
                          }`}
                        >
                          <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0 border border-[#E0D5C7] shadow-xs">
                            <img
                              src={asset.imageUrl}
                              alt={asset.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-[#2E251E] truncate">{asset.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#8A6D5E] flex-shrink-0" />}
                            </div>
                            <p className="text-[10px] text-[#7A6A5C] line-clamp-1 mt-0.5">{asset.paletteDescription}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {asset.tags.slice(0, 2).map((tag, idx) => (
                                <span key={idx} className="text-[8.5px] px-1 py-0.2 bg-[#F3ECE4] text-[#6E5B4B] rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Clean / No Floral Option Button & Opacity Controls */}
                  <div className="pt-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        id="floral-none-button"
                        onClick={() => {
                          handleCustomizationChange('floralOverlayEnabled', false);
                          handleCustomizationChange('floralAssetId', '');
                          handleCustomizationChange('floralStyle', 'none');
                        }}
                        className={`text-xs px-3 py-1.5 rounded-md border text-left cursor-pointer transition-all ${
                          (customization.floralOverlayEnabled === false || !customization.floralAssetId) &&
                          customization.floralStyle === 'none'
                            ? 'border-[#8A6D5E] bg-[#FAF5F2] font-semibold text-[#2E251E] ring-1 ring-[#8A6D5E]'
                            : 'border-[#EAE0D2] bg-white text-[#6E5B4B] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <span>No Floral Background (Clean Typography)</span>
                      </button>
                    </div>

                    {/* Dedicated Motif & Floral Layer Opacity Slider Control */}
                    <div className="p-3 bg-[#FAF7F2] rounded-lg border border-[#EADBCC] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-[#4A3C30] flex items-center gap-1">
                          <Flower2 className="w-3 h-3 text-[#B87A7A]" />
                          <span>Motif & Floral Overlay Opacity</span>
                        </span>
                        <span className="font-mono text-[11px] text-[#8A6D5E] font-bold px-1.5 py-0.5 bg-white rounded border border-[#E5DACE]">
                          {Math.round((customization.floralBackgroundOpacity ?? (customization.motifOpacity ?? 0.85)) * 100)}%
                        </span>
                      </div>
                      <input
                        id="input-typography-floral-opacity"
                        type="range"
                        min="5"
                        max="100"
                        step="1"
                        value={Math.round((customization.floralBackgroundOpacity ?? (customization.motifOpacity ?? 0.85)) * 100)}
                        onChange={(e) => {
                          const val = Number(e.target.value) / 100;
                          handleCustomizationChange('floralBackgroundOpacity', val);
                        }}
                        className="w-full h-1.5 rounded-lg accent-[#8A6D5E] bg-gradient-to-r from-[#F0E6DD] via-[#D5C2B4] to-[#8A6D5E] cursor-pointer"
                      />
                      <div className="grid grid-cols-4 gap-1 pt-0.5">
                        {[
                          { label: 'Subtle 20%', val: 0.2 },
                          { label: 'Soft 50%', val: 0.5 },
                          { label: 'Standard 85%', val: 0.85 },
                          { label: 'Full 100%', val: 1.0 }
                        ].map((preset) => {
                          const currentVal = customization.floralBackgroundOpacity ?? (customization.motifOpacity ?? 0.85);
                          const isPresetActive = Math.abs(currentVal - preset.val) < 0.05;
                          return (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => handleCustomizationChange('floralBackgroundOpacity', preset.val)}
                              className={`text-[9.5px] py-1 rounded border transition-colors cursor-pointer text-center ${
                                isPresetActive
                                  ? 'bg-[#8A6D5E] text-white border-[#8A6D5E] font-semibold'
                                  : 'bg-white text-[#6E5B4B] border-[#E5DACE] hover:bg-[#F2ECE4]'
                              }`}
                            >
                              {preset.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Border & Frame Style */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Frame & Border Layout
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'indented-corner-gold' as BorderStyle, label: 'Gilded Indented Frame' },
                      { id: 'classic-church-rule' as BorderStyle, label: 'Church Double-Rule' },
                      { id: 'double-line-inset' as BorderStyle, label: 'Double Line Inset' },
                      { id: 'vintage-flourish-frame' as BorderStyle, label: 'Cathedral Frame' },
                      { id: 'none' as BorderStyle, label: 'None (Clean)' },
                      { id: 'single-thin' as BorderStyle, label: 'Single Thin' },
                      { id: 'double-ornate' as BorderStyle, label: 'Double Ornate' },
                      { id: 'arch-curve' as BorderStyle, label: 'Arch Curve' },
                      { id: 'gold-emboss' as BorderStyle, label: 'Emboss Frame' },
                      { id: 'minimal-frame' as BorderStyle, label: 'Top/Bottom' }
                    ].map((border) => {
                      const isSelected = customization.borderStyle === border.id;
                      return (
                        <button
                          key={border.id}
                          id={`border-style-${border.id}`}
                          onClick={() => handleCustomizationChange('borderStyle', border.id)}
                          className={`p-2 rounded-md border text-xs text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#3A322B] bg-[#FAF7F2] font-semibold text-[#2C231D]'
                              : 'border-[#EAE0D2] bg-white text-[#6B5C4E]'
                          }`}
                        >
                          {border.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Decorative Motif Illustration */}
                <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Stationery Motif / Iconography
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'blush_rose_corner' as MotifType, label: 'Watercolor Roses' },
                      { id: 'peony_bloom' as MotifType, label: 'Ivory Peony' },
                      { id: 'cross_or_diamond' as MotifType, label: 'Cross & Diamond' },
                      { id: 'heritage_crest' as MotifType, label: 'Royal Crest' },
                      { id: 'vintage_filigree' as MotifType, label: 'Cathedral Filigree' },
                      { id: 'olive_branch' as MotifType, label: 'Olive Laurel' },
                      { id: 'botanical_arch' as MotifType, label: 'Botanical Arch' },
                      { id: 'monogram_crest' as MotifType, label: 'Monogram Crest' },
                      { id: 'wildflower_wreath' as MotifType, label: 'Wildflowers' },
                      { id: 'romantic_rose' as MotifType, label: 'French Rose' },
                      { id: 'art_deco_lines' as MotifType, label: 'Gatsby Deco' },
                      { id: 'minimal_geometric' as MotifType, label: 'Minimal Diamond' },
                      { id: 'none' as MotifType, label: 'No Motif' }
                    ].map((m) => {
                      const isSelected = customization.motif === m.id;
                      return (
                        <button
                          key={m.id}
                          id={`motif-type-${m.id}`}
                          onClick={() => handleCustomizationChange('motif', m.id)}
                          className={`p-2 rounded-md border text-[11px] text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#3A322B] bg-[#FAF7F2] font-semibold text-[#2C231D]'
                              : 'border-[#EAE0D2] bg-white text-[#6B5C4E]'
                          }`}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SCHEDULE & ORDER OF SERVICE */}
            {activeControlTab === 'schedule' && (
              <div className="space-y-5">
                {/* Format Mode Selector */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE5D8] space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5C4E] block">
                    Ceremony & Schedule Format
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="mode-btn-order-of-service"
                      onClick={() => handleCustomizationChange('scheduleDisplayMode', 'order_of_service')}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        isOrderOfServiceMode
                          ? 'bg-[#3A322B] text-white border-[#3A322B] shadow-xs'
                          : 'bg-white text-[#5E5043] border-[#DECDBB] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span className="block font-semibold">⛪ Order of Service (A4)</span>
                      <span className="text-[10px] opacity-80 block">Church liturgy, hymns & bridal party</span>
                    </button>

                    <button
                      id="mode-btn-timeline"
                      onClick={() => handleCustomizationChange('scheduleDisplayMode', 'timeline')}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        !isOrderOfServiceMode
                          ? 'bg-[#3A322B] text-white border-[#3A322B] shadow-xs'
                          : 'bg-white text-[#5E5043] border-[#DECDBB] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span className="block font-semibold">⏳ Day-of Timeline</span>
                      <span className="text-[10px] opacity-80 block">Hourly event icons & flow</span>
                    </button>
                  </div>
                </div>

                {isOrderOfServiceMode ? (
                  /* ORDER OF SERVICE CONTROLS */
                  <div className="space-y-5">
                    {/* Layout Selector: Two-Column vs Single-Column */}
                    <div className="p-3 bg-white rounded-lg border border-[#EDE5D8] space-y-2">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6857] block">
                        Order of Service Columns & Layout
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleCustomizationChange('orderOfServiceLayout', 'two_column')}
                          className={`p-2 rounded-md border text-xs text-left transition-all cursor-pointer ${
                            customization.orderOfServiceLayout === 'two_column' ||
                            (!customization.orderOfServiceLayout && suite.defaultOrderOfServiceLayout === 'two_column')
                              ? 'border-[#3A322B] bg-[#FAF7F2] font-semibold text-[#2C231D] ring-1 ring-[#3A322B]'
                              : 'border-[#EAE0D2] bg-white text-[#6B5C4E]'
                          }`}
                        >
                          <div className="font-semibold">Two-Column Editorial</div>
                          <div className="text-[10px] text-[#8C7D6F]">Dual columns with ministers & readings</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCustomizationChange('orderOfServiceLayout', 'single')}
                          className={`p-2 rounded-md border text-xs text-left transition-all cursor-pointer ${
                            customization.orderOfServiceLayout === 'single' ||
                            (!customization.orderOfServiceLayout && suite.defaultOrderOfServiceLayout === 'single')
                              ? 'border-[#3A322B] bg-[#FAF7F2] font-semibold text-[#2C231D] ring-1 ring-[#3A322B]'
                              : 'border-[#EAE0D2] bg-white text-[#6B5C4E]'
                          }`}
                        >
                          <div className="font-semibold">Single-Column Classic</div>
                          <div className="text-[10px] text-[#8C7D6F]">Centered vertical liturgy sequence</div>
                        </button>
                      </div>
                    </div>

                    {/* Header Titles & Clergy */}
                    <div className="space-y-3 p-3 bg-white rounded-lg border border-[#EDE5D8]">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                        Ceremony Header, Church & Ministers
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Top Heading</label>
                          <input
                            type="text"
                            value={details.ceremonyHeaderTitle || 'ORDER OF SERVICE'}
                            onChange={(e) => handleDetailChange('ceremonyHeaderTitle', e.target.value)}
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Subtitle</label>
                          <input
                            type="text"
                            value={details.ceremonySubtitle || 'FOR THE CELEBRATION OF HOLY MATRIMONY'}
                            onChange={(e) => handleDetailChange('ceremonySubtitle', e.target.value)}
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Church / Parish / Venue Name</label>
                        <input
                          type="text"
                          value={details.churchParish || ''}
                          onChange={(e) => handleDetailChange('churchParish', e.target.value)}
                          placeholder="e.g. ST. MARY'S CHURCH & THE GLASSHOUSE"
                          className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-[#7A6A5C] block mb-0.5">
                          Officiating Ministers (separate with · or new lines)
                        </label>
                        <textarea
                          rows={2}
                          value={details.officiatingMinisters || ''}
                          onChange={(e) => handleDetailChange('officiatingMinisters', e.target.value)}
                          placeholder="e.g. Rev. Dr. J. N. Kudadzi · Rev. Michael Aryee · Rev. Patrick Mensah"
                          className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Scripture Verse Quote</label>
                        <input
                          type="text"
                          value={details.scriptureQuote || ''}
                          onChange={(e) => handleDetailChange('scriptureQuote', e.target.value)}
                          placeholder="e.g. “Therefore what God has joined together, let no one separate.” — Matthew 19:6"
                          className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                        />
                      </div>
                    </div>

                    {/* Liturgical Ceremony Sequence Parts */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                          Liturgy & Ceremony Sequence ({details.ceremonyParts?.length || 0} Parts)
                        </h5>
                        <button
                          id="add-ceremony-part-btn"
                          onClick={handleAddCeremonyPart}
                          className="text-xs px-2.5 py-1 bg-[#FAF6EE] hover:bg-[#F2ECE0] text-[#4A3E34] border border-[#D5C6B1] rounded-md font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Part</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                        {(details.ceremonyParts || []).map((part, idx) => (
                          <div
                            key={part.id}
                            className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EDE4D6] space-y-2 relative"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-semibold text-[#665446]">
                                Part #{idx + 1}: {part.sectionTitle}
                              </span>
                              {(details.ceremonyParts || []).length > 2 && (
                                <button
                                  onClick={() => handleRemoveCeremonyPart(part.id)}
                                  className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                  title="Remove part"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Section Title</label>
                                <input
                                  type="text"
                                  value={part.sectionTitle}
                                  onChange={(e) => handleUpdateCeremonyPart(part.id, 'sectionTitle', e.target.value)}
                                  placeholder="e.g. ENTRANCE OF THE BRIDE"
                                  className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Piece / Scripture / Vows</label>
                                <input
                                  type="text"
                                  value={part.pieceOrText}
                                  onChange={(e) => handleUpdateCeremonyPart(part.id, 'pieceOrText', e.target.value)}
                                  placeholder="e.g. Canon in D — Johann Pachelbel"
                                  className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Performer / Reader / Celebrant</label>
                                <input
                                  type="text"
                                  value={part.performerOrReader || ''}
                                  onChange={(e) => handleUpdateCeremonyPart(part.id, 'performerOrReader', e.target.value)}
                                  placeholder="e.g. Organist: Mr. Julian Davies"
                                  className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Hymn / Scripture Verse Excerpt (Optional)</label>
                                <input
                                  type="text"
                                  value={part.lyricsExcerpt || ''}
                                  onChange={(e) => handleUpdateCeremonyPart(part.id, 'lyricsExcerpt', e.target.value)}
                                  placeholder="e.g. Bring me my bow of burning gold..."
                                  className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bridal Party & Attendants Form */}
                    <div className="space-y-3 pt-3 border-t border-[#EDE5D8]">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                        Bridal Party & Officiants Listing
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Officiant / Celebrant</label>
                          <input
                            type="text"
                            value={details.bridalParty?.officiant || ''}
                            onChange={(e) => handleUpdateBridalParty('officiant', e.target.value)}
                            placeholder="The Reverend Canon James Thornton"
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Best Man</label>
                          <input
                            type="text"
                            value={details.bridalParty?.bestMan || ''}
                            onChange={(e) => handleUpdateBridalParty('bestMan', e.target.value)}
                            placeholder="Lord Alexander Hughes"
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Maid of Honour</label>
                          <input
                            type="text"
                            value={details.bridalParty?.maidOfHonour || ''}
                            onChange={(e) => handleUpdateBridalParty('maidOfHonour', e.target.value)}
                            placeholder="Miss Clara Sterling"
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Bridesmaids</label>
                          <input
                            type="text"
                            value={details.bridalParty?.bridesmaids || ''}
                            onChange={(e) => handleUpdateBridalParty('bridesmaids', e.target.value)}
                            placeholder="Eleanor, Charlotte, Sophie"
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Ushers / Groomsmen</label>
                          <input
                            type="text"
                            value={details.bridalParty?.ushers || ''}
                            onChange={(e) => handleUpdateBridalParty('ushers', e.target.value)}
                            placeholder="Henry, Edward, Thomas"
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Readers</label>
                          <input
                            type="text"
                            value={details.bridalParty?.readers || ''}
                            onChange={(e) => handleUpdateBridalParty('readers', e.target.value)}
                            placeholder="Miss Clara Sterling & Dr. Pendelton"
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* TIMELINE CONTROLS */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                        Day-of Timeline Milestones
                      </h4>
                      <button
                        id="add-timeline-event-btn"
                        onClick={handleAddScheduleEvent}
                        className="text-xs px-2.5 py-1 bg-[#FAF6EE] hover:bg-[#F2ECE0] text-[#4A3E34] border border-[#D5C6B1] rounded-md font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Event</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {details.scheduleEvents.map((event, idx) => (
                        <div
                          key={event.id}
                          className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EDE4D6] space-y-2 relative"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-[#665446]">
                              Milestone #{idx + 1}
                            </span>
                            {details.scheduleEvents.length > 2 && (
                              <button
                                onClick={() => handleRemoveScheduleEvent(event.id)}
                                className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                title="Remove event"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                              <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Time</label>
                              <input
                                type="text"
                                value={event.time}
                                onChange={(e) =>
                                  handleUpdateScheduleEvent(event.id, 'time', e.target.value)
                                }
                                className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Title</label>
                              <input
                                type="text"
                                value={event.title}
                                onChange={(e) =>
                                  handleUpdateScheduleEvent(event.id, 'title', e.target.value)
                                }
                                className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-[#7A6A5C] block mb-0.5">
                              Location / Subtitle
                            </label>
                            <input
                              type="text"
                              value={event.subtitle}
                              onChange={(e) =>
                                handleUpdateScheduleEvent(event.id, 'subtitle', e.target.value)
                              }
                              className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: MENU & COURSES */}
            {activeControlTab === 'menu' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                    Reception Menu Courses
                  </h4>
                  <button
                    id="add-menu-course-btn"
                    onClick={handleAddMenuCourse}
                    className="text-xs px-2.5 py-1 bg-[#FAF6EE] hover:bg-[#F2ECE0] text-[#4A3E34] border border-[#D5C6B1] rounded-md font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Course</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {details.menuCourses.map((course, idx) => (
                    <div
                      key={course.id || idx}
                      className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EDE4D6] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#665446]">
                          Course #{idx + 1}
                        </span>
                        {details.menuCourses.length > 1 && (
                          <button
                            onClick={() => handleRemoveMenuCourse(course.id)}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            title="Remove course"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">Label</label>
                          <input
                            type="text"
                            value={course.course}
                            onChange={(e) =>
                              handleUpdateMenuCourse(course.id, 'course', e.target.value)
                            }
                            placeholder="PRIMO"
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] text-[#7A6A5C] block mb-0.5">
                            Dish Name
                          </label>
                          <input
                            type="text"
                            value={course.dish}
                            onChange={(e) =>
                              handleUpdateMenuCourse(course.id, 'dish', e.target.value)
                            }
                            className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-[#7A6A5C] block mb-0.5">
                          Dish Description
                        </label>
                        <input
                          type="text"
                          value={course.description || (course as any).dishDescription}
                          onChange={(e) =>
                            handleUpdateMenuCourse(course.id, 'description', e.target.value)
                          }
                          className="w-full text-xs p-1.5 bg-white rounded border border-[#D8CCBD]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: WORDING & INSPIRATION */}
            {activeControlTab === 'wording' && (
              <div className="space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A6857]">
                  Curated Invitation Wording Styles
                </h4>
                <p className="text-xs text-[#7A6C5F] leading-relaxed">
                  Click any tone to instantly adapt your wedding invitation headline and ceremony subtext.
                </p>

                <div className="space-y-3">
                  {WORDING_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EADBCC] space-y-2 hover:border-[#8A7968] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#30251E]">
                          {preset.name}
                        </span>
                        <button
                          id={`apply-wording-${idx}`}
                          onClick={() => {
                            onUpdateDetails({
                              ...details,
                              invitationHeadline: preset.headline,
                              ceremonySubtext: preset.subtext,
                              receptionDetails: preset.reception,
                              dressCode: preset.dress
                            });
                          }}
                          className="text-[11px] px-2.5 py-1 bg-[#3A322B] text-[#FAF5ED] rounded font-medium hover:bg-[#201A16] cursor-pointer"
                        >
                          Apply Tone
                        </button>
                      </div>
                      <div className="text-[11px] text-[#6E5F52] italic space-y-1">
                        <p>"{preset.headline}"</p>
                        <p>"{preset.subtext}"</p>
                        <p className="text-[10px] text-[#8C7D6F] not-italic">
                          {preset.reception} · {preset.dress}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OFF-SCREEN RENDER CONTAINERS FOR THE 8 CARDS (Used for exporting the complete .ZIP bundle) */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-0">
        {cardTabsList.map((tab) => (
          <div key={tab.id} id={`bundle-card-${tab.id}`}>
            <StationeryCard
              suite={suite}
              cardType={tab.id}
              details={details}
              customization={customization}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
