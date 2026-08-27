import React from 'react';
import { CardItemType, CoupleDetails, SuiteCustomization, WeddingSuite, FloralStyle } from '../types';
import { MotifGraphics } from './MotifGraphics';
import { FloralCornerArtwork } from './FloralCornerArtwork';
import { FLORAL_BORDER_ASSETS, getFloralAssetById, getCardFloralImage } from '../data/floralAssets';
import { Wine, Heart, Sparkles, Utensils, Music, Flame, Clock, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface StationeryCardProps {
  suite: WeddingSuite;
  cardType: CardItemType;
  details: CoupleDetails;
  customization: SuiteCustomization;
  scale?: number;
  interactive?: boolean;
  domId?: string;
}

export const StationeryCard: React.FC<StationeryCardProps> = ({
  suite,
  cardType,
  details,
  customization,
  domId
}) => {
  const { palette, paperFinish, borderStyle, motif, showBleedAndCrop, fontPresetId } = customization;

  // Resolve active floral style & high-res image asset
  const isFloralEnabled = customization.floralOverlayEnabled !== false;
  const activeFloralStyle: FloralStyle = isFloralEnabled
    ? customization.floralStyle ||
      (motif === 'blush_rose_corner' ? 'blush_rose_corner' : suite.defaultFloralStyle) ||
      'none'
    : 'none';

  const activeFloralAsset = isFloralEnabled
    ? (customization.floralAssetId && getFloralAssetById(customization.floralAssetId)) ||
      (activeFloralStyle === 'blush_rose_border' || activeFloralStyle === 'blush_rose_corner'
        ? getFloralAssetById('blush_rose_border')
        : activeFloralStyle === 'blush_gold_arch'
        ? getFloralAssetById('blush_gold_arch')
        : activeFloralStyle === 'white_peony_frame' || activeFloralStyle === 'white_peony_corner'
        ? getFloralAssetById('white_peony_frame')
        : activeFloralStyle === 'ivory_ranunculus_wreath'
        ? getFloralAssetById('ivory_ranunculus_wreath')
        : activeFloralStyle === 'wildflower_sage_border' || activeFloralStyle === 'wildflower_meadow'
        ? getFloralAssetById('wildflower_sage_border')
        : activeFloralStyle === 'sage_eucalyptus_border' || activeFloralStyle === 'eucalyptus_garland'
        ? getFloralAssetById('sage_eucalyptus_border')
        : activeFloralStyle === 'dusty_rose_mauve'
        ? getFloralAssetById('dusty_rose_mauve')
        : activeFloralStyle === 'champagne_magnolia'
        ? getFloralAssetById('champagne_magnolia')
        : undefined)
    : undefined;

  const activeCardFloralImage = isFloralEnabled
    ? getCardFloralImage(activeFloralAsset, cardType)
    : undefined;

  // Resolve font classes
  let headingFontClass = 'font-cormorant';
  let bodyFontClass = 'font-montserrat';
  if (fontPresetId === 'modern-playfair') {
    headingFontClass = 'font-playfair';
    bodyFontClass = 'font-sans-clean';
  } else if (fontPresetId === 'cinzel-regal') {
    headingFontClass = 'font-cinzel';
    bodyFontClass = 'font-montserrat';
  } else if (fontPresetId === 'editorial-bodoni') {
    headingFontClass = 'font-bodoni';
    bodyFontClass = 'font-sans-clean';
  }

  const scriptFontClass =
    customization.scriptFont === 'alex'
      ? 'font-script-alex'
      : customization.scriptFont === 'vibes'
      ? 'font-script-vibes'
      : customization.scriptFont === 'none'
      ? headingFontClass
      : 'font-script-pinyon';

  // Paper texture class
  const paperClass =
    paperFinish === 'linen'
      ? 'paper-linen'
      : paperFinish === 'deckled'
      ? 'paper-deckled'
      : '';

  // Foil class for highlighted text
  const getFoilClass = () => {
    if (palette.foil === 'gold') return 'gold-foil-text font-semibold';
    if (palette.foil === 'rose-gold') return 'rose-gold-foil-text font-semibold';
    if (palette.foil === 'silver') return 'silver-foil-text font-semibold';
    return '';
  };
  const foilTextClass = getFoilClass();

  // Helper for timeline icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wine':
        return <Wine className="w-3.5 h-3.5" />;
      case 'Heart':
        return <Heart className="w-3.5 h-3.5" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Utensils':
        return <Utensils className="w-3.5 h-3.5" />;
      case 'Music':
        return <Music className="w-3.5 h-3.5" />;
      case 'Flame':
        return <Flame className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  // Card Aspect Ratio / Dimensions
  const isOrderOfService =
    (customization.scheduleDisplayMode === 'order_of_service' || suite.defaultScheduleMode === 'order_of_service') &&
    cardType === 'schedule';

  const isTwoColumnOrderOfService =
    isOrderOfService &&
    (customization.orderOfServiceLayout === 'two_column' ||
      suite.defaultOrderOfServiceLayout === 'two_column' ||
      activeFloralStyle === 'blush_rose_corner');

  let containerDimensions = 'w-full max-w-[460px] aspect-[5/7]';
  if (isOrderOfService) {
    containerDimensions = 'w-full max-w-[530px] min-h-[820px] aspect-[1/1.414]';
  } else if (cardType === 'schedule' || cardType === 'menu') {
    containerDimensions = 'w-full max-w-[420px] aspect-[4/8.5] min-h-[640px]';
  } else if (cardType === 'rsvp' || cardType === 'details' || cardType === 'thankyou') {
    containerDimensions = 'w-full max-w-[460px] aspect-[5/3.6] min-h-[330px]';
  } else if (cardType === 'placecard') {
    containerDimensions = 'w-full max-w-[380px] aspect-[3.5/2] min-h-[220px]';
  } else if (cardType === 'planner') {
    containerDimensions = 'w-full max-w-[500px] aspect-[1/1.3] min-h-[650px]';
  }

  // Border frame styling
  const renderCardBorders = () => {
    if (borderStyle === 'indented-corner-gold' || (activeFloralStyle !== 'none' && borderStyle === 'none')) {
      return (
        <>
          <div
            className="absolute inset-3 pointer-events-none rounded-xs"
            style={{
              borderColor: palette.foil !== 'none' ? '#C5A059' : palette.border,
              borderWidth: '1.2px'
            }}
          />
          <div
            className="absolute inset-4.5 pointer-events-none rounded-xs"
            style={{
              borderColor: palette.foil !== 'none' ? '#C5A059' : palette.border,
              borderWidth: '0.6px',
              opacity: 0.85
            }}
          />
          {/* Subtle corner accent squares */}
          <div
            className="absolute top-3.5 left-3.5 w-1.5 h-1.5 pointer-events-none border-t border-l"
            style={{ borderColor: palette.foil !== 'none' ? '#C5A059' : palette.border }}
          />
          <div
            className="absolute top-3.5 right-3.5 w-1.5 h-1.5 pointer-events-none border-t border-r"
            style={{ borderColor: palette.foil !== 'none' ? '#C5A059' : palette.border }}
          />
          <div
            className="absolute bottom-3.5 left-3.5 w-1.5 h-1.5 pointer-events-none border-b border-l"
            style={{ borderColor: palette.foil !== 'none' ? '#C5A059' : palette.border }}
          />
          <div
            className="absolute bottom-3.5 right-3.5 w-1.5 h-1.5 pointer-events-none border-b border-r"
            style={{ borderColor: palette.foil !== 'none' ? '#C5A059' : palette.border }}
          />
        </>
      );
    }
    if (borderStyle === 'double-line-inset') {
      return (
        <>
          <div
            className="absolute inset-2.5 pointer-events-none"
            style={{ borderColor: palette.border, borderWidth: '1.2px' }}
          />
          <div
            className="absolute inset-4 pointer-events-none"
            style={{ borderColor: palette.border, borderWidth: '0.6px' }}
          />
        </>
      );
    }
    if (borderStyle === 'classic-church-rule') {
      return (
        <>
          <div
            className="absolute inset-3 pointer-events-none rounded-xs"
            style={{ borderColor: palette.border, borderWidth: '1.2px' }}
          />
          <div
            className="absolute inset-4.5 pointer-events-none rounded-xs"
            style={{ borderColor: palette.border, borderWidth: '0.6px' }}
          />
          {/* Corner accent marks */}
          <div
            className="absolute top-3.5 left-3.5 w-2 h-2 pointer-events-none border-t border-l"
            style={{ borderColor: palette.border }}
          />
          <div
            className="absolute top-3.5 right-3.5 w-2 h-2 pointer-events-none border-t border-r"
            style={{ borderColor: palette.border }}
          />
          <div
            className="absolute bottom-3.5 left-3.5 w-2 h-2 pointer-events-none border-b border-l"
            style={{ borderColor: palette.border }}
          />
          <div
            className="absolute bottom-3.5 right-3.5 w-2 h-2 pointer-events-none border-b border-r"
            style={{ borderColor: palette.border }}
          />
        </>
      );
    }
    if (borderStyle === 'vintage-flourish-frame') {
      return (
        <>
          <div
            className="absolute inset-3 pointer-events-none rounded-xs"
            style={{ borderColor: palette.border, borderWidth: '1px' }}
          />
          <div
            className="absolute inset-5 pointer-events-none rounded-xs border-dashed"
            style={{ borderColor: `${palette.border}90`, borderWidth: '0.7px' }}
          />
        </>
      );
    }
    if (borderStyle === 'single-thin') {
      return (
        <div
          className="absolute inset-3.5 pointer-events-none rounded-xs"
          style={{ borderColor: palette.border, borderWidth: '1px' }}
        />
      );
    }
    if (borderStyle === 'double-ornate') {
      return (
        <>
          <div
            className="absolute inset-3 pointer-events-none rounded-xs"
            style={{ borderColor: palette.border, borderWidth: '1px' }}
          />
          <div
            className="absolute inset-4.5 pointer-events-none rounded-xs border-dashed"
            style={{ borderColor: palette.border, borderWidth: '0.8px' }}
          />
        </>
      );
    }
    if (borderStyle === 'arch-curve') {
      return (
        <div
          className="absolute inset-3 pointer-events-none rounded-t-[140px] rounded-b-md"
          style={{ borderColor: palette.border, borderWidth: '1px' }}
        />
      );
    }
    if (borderStyle === 'gold-emboss') {
      return (
        <div
          className="absolute inset-3 pointer-events-none rounded-xs border-2 shadow-[inset_0_0_8px_rgba(197,160,89,0.2)]"
          style={{ borderColor: palette.foil !== 'none' ? '#C5A059' : palette.border }}
        />
      );
    }
    if (borderStyle === 'minimal-frame') {
      return (
        <div
          className="absolute inset-5 pointer-events-none"
          style={{ borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}
        />
      );
    }
    return null;
  };

  const renderFloralBackground = () => {
    if (!activeFloralAsset || !activeCardFloralImage) return null;

    const baseOpacity =
      customization.floralBackgroundOpacity ??
      (customization.motifOpacity ?? (cardType === 'schedule' ? 0.45 : 0.78));

    const blendMode =
      (customization.floralBlendMode as any) ||
      (paperFinish === 'black-linen' ? 'screen' : 'multiply');

    if (cardType === 'invitation') {
      return (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-[1]">
            <img
              src={activeCardFloralImage}
              alt={activeFloralAsset.name}
              referrerPolicy="no-referrer"
              className="w-full h-full select-none object-cover"
              style={{
                opacity: baseOpacity,
                mixBlendMode: blendMode,
                filter: palette.foil !== 'none' ? 'contrast(1.03) saturate(1.05)' : 'none'
              }}
            />
          </div>
          {/* Luminous Aperture Protection for pristine typography contrast */}
          <div
            className="absolute inset-x-6 inset-y-8 sm:inset-x-8 sm:inset-y-10 pointer-events-none rounded-2xl z-[2]"
            style={{
              background: `radial-gradient(ellipse at center, ${palette.cardBg}F8 45%, ${palette.cardBg}99 75%, transparent 100%)`
            }}
          />
        </>
      );
    }

    if (cardType === 'rsvp' || cardType === 'details' || cardType === 'planner') {
      return (
        <div className="absolute top-0 inset-x-0 h-[38%] pointer-events-none overflow-hidden rounded-t-[inherit] z-[1]">
          <img
            src={activeCardFloralImage}
            alt={`${cardType} floral header`}
            referrerPolicy="no-referrer"
            className="w-full h-full select-none object-cover object-top"
            style={{
              opacity: baseOpacity,
              mixBlendMode: blendMode,
              maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
            }}
          />
        </div>
      );
    }

    if (cardType === 'menu') {
      return (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-[1]">
            <img
              src={activeCardFloralImage}
              alt="Menu floral framing"
              referrerPolicy="no-referrer"
              className="w-full h-full select-none object-cover"
              style={{
                opacity: baseOpacity * 0.85,
                mixBlendMode: blendMode
              }}
            />
          </div>
          <div
            className="absolute inset-x-4 inset-y-10 pointer-events-none rounded-xl z-[2]"
            style={{
              background: `radial-gradient(ellipse at center, ${palette.cardBg}F6 45%, ${palette.cardBg}88 78%, transparent 100%)`
            }}
          />
        </>
      );
    }

    if (cardType === 'schedule') {
      return (
        <>
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-[1]">
            <img
              src={activeCardFloralImage}
              alt="Schedule floral framing"
              referrerPolicy="no-referrer"
              className="w-full h-full select-none object-cover"
              style={{
                opacity: Math.min(baseOpacity, 0.45),
                mixBlendMode: blendMode
              }}
            />
          </div>
          <div
            className="absolute inset-x-4 inset-y-8 pointer-events-none rounded-xl z-[2]"
            style={{
              background: `radial-gradient(ellipse at center, ${palette.cardBg}F8 50%, ${palette.cardBg}90 80%, transparent 100%)`
            }}
          />
        </>
      );
    }

    if (cardType === 'thankyou') {
      return (
        <div className="absolute top-1 inset-x-0 h-[38%] pointer-events-none overflow-hidden z-[1] flex items-center justify-center p-2">
          <img
            src={activeCardFloralImage}
            alt="Thank you floral crest"
            referrerPolicy="no-referrer"
            className="h-full max-w-full select-none object-contain"
            style={{
              opacity: baseOpacity,
              mixBlendMode: blendMode
            }}
          />
        </div>
      );
    }

    if (cardType === 'placecard') {
      return (
        <div className="absolute top-0 left-0 w-[42%] h-full pointer-events-none overflow-hidden rounded-tl-[inherit] z-[1]">
          <img
            src={activeCardFloralImage}
            alt="Place card floral accent"
            referrerPolicy="no-referrer"
            className="w-full h-full select-none object-contain object-top-left p-1"
            style={{
              opacity: baseOpacity,
              mixBlendMode: blendMode
            }}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div
      id={domId}
      className={`relative mx-auto ${containerDimensions} transition-all duration-300 select-none flex flex-col justify-between p-5 sm:p-7 rounded-sm shadow-xl overflow-hidden ${paperClass}`}
      style={{
        backgroundColor: palette.cardBg,
        color: palette.text
      }}
    >
      {/* Bleed & Crop Marks Overlay (if toggled for professional printing) */}
      {showBleedAndCrop && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute top-2 left-2 w-3 h-[1px] bg-neutral-400" />
          <div className="absolute top-2 left-2 w-[1px] h-3 bg-neutral-400" />
          <div className="absolute top-2 right-2 w-3 h-[1px] bg-neutral-400" />
          <div className="absolute top-2 right-2 w-[1px] h-3 bg-neutral-400" />
          <div className="absolute bottom-2 left-2 w-3 h-[1px] bg-neutral-400" />
          <div className="absolute bottom-2 left-2 w-[1px] h-3 bg-neutral-400" />
          <div className="absolute bottom-2 right-2 w-3 h-[1px] bg-neutral-400" />
          <div className="absolute bottom-2 right-2 w-[1px] h-3 bg-neutral-400" />
          <span className="absolute bottom-1 right-3 text-[9px] font-mono text-neutral-400">
            0.125" BLEED SAFE
          </span>
        </div>
      )}

      {/* High-Resolution Watercolor Floral Background Asset */}
      {renderFloralBackground()}

      {/* Decorative frame border */}
      {renderCardBorders()}

      {/* Optional Watercolor Vector Corner Accents (when vector style explicitly active and no asset overlay) */}
      {!activeFloralAsset && activeFloralStyle !== 'none' && (
        <div
          style={{
            opacity: customization.floralBackgroundOpacity ?? (customization.motifOpacity ?? 0.85)
          }}
        >
          <FloralCornerArtwork
            style={activeFloralStyle}
            position="top-left"
            foil={palette.foil}
          />
          {activeFloralStyle === 'white_peony_corner' && (
            <FloralCornerArtwork
              style={activeFloralStyle}
              position="bottom-right"
              foil={palette.foil}
            />
          )}
        </div>
      )}

      {/* CARD TYPE: WEDDING INVITATION */}
      {cardType === 'invitation' && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full text-center py-4 sm:py-5 px-3 sm:px-4 max-w-[340px] mx-auto">
          {/* Top Motif / Monogram & Headline */}
          <div className="flex flex-col items-center space-y-1 pt-1">
            <MotifGraphics
              type={motif}
              color={palette.accent}
              foil={palette.foil}
              size={motif === 'olive_branch' || motif === 'botanical_arch' ? 34 : 26}
            />
            <p
              className={`text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase opacity-85 font-medium leading-tight ${bodyFontClass}`}
            >
              {details.invitationHeadline}
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-auto py-1 space-y-0.5 w-full">
            <div className="flex flex-col items-center justify-center">
              <span
                className={`text-2xl sm:text-[2.15rem] tracking-tight leading-none font-normal ${headingFontClass} ${
                  palette.foil !== 'none' ? foilTextClass : ''
                }`}
              >
                {details.partner1FirstName} {details.partner1LastName}
              </span>
              <span
                className={`text-lg sm:text-xl my-[-2px] opacity-85 ${scriptFontClass}`}
                style={{ color: palette.accent }}
              >
                and
              </span>
              <span
                className={`text-2xl sm:text-[2.15rem] tracking-tight leading-none font-normal ${headingFontClass} ${
                  palette.foil !== 'none' ? foilTextClass : ''
                }`}
              >
                {details.partner2FirstName} {details.partner2LastName}
              </span>
            </div>
            <p
              className={`text-[8.5px] sm:text-[9.5px] max-w-[260px] mx-auto tracking-[0.16em] uppercase opacity-75 leading-relaxed pt-1.5 ${bodyFontClass}`}
            >
              {details.ceremonySubtext}
            </p>
          </div>

          {/* Ceremony & Date Details */}
          <div className="space-y-1.5 w-full flex flex-col items-center pb-0.5">
            {/* Date & Time */}
            <div
              className="py-1.5 border-y w-[88%] flex flex-col items-center justify-center space-y-0.5"
              style={{ borderColor: `${palette.border}90` }}
            >
              <div
                className={`text-xs sm:text-[13px] tracking-[0.2em] uppercase font-semibold ${headingFontClass}`}
                style={{ color: palette.accent }}
              >
                {details.weddingDate}
              </div>
              <div className={`text-[9.5px] sm:text-[10px] tracking-[0.15em] opacity-85 ${bodyFontClass}`}>
                {details.weddingTime}
              </div>
            </div>

            {/* Venue & Location */}
            <div className="space-y-0.5">
              <div className={`text-xs sm:text-[12.5px] font-semibold tracking-wider ${headingFontClass}`}>
                {details.venueName}
              </div>
              <div className={`text-[9px] sm:text-[9.5px] tracking-wide opacity-80 ${bodyFontClass}`}>
                {details.venueAddress}
              </div>
              <div className={`text-[9px] sm:text-[9.5px] tracking-wider font-medium opacity-90 ${bodyFontClass}`}>
                {details.cityState}
              </div>
            </div>

            {/* Footer details */}
            <div className="pt-0.5">
              <p className={`text-[8px] sm:text-[9px] tracking-wider opacity-75 italic ${bodyFontClass}`}>
                {details.receptionDetails}
              </p>
              {details.dressCode && (
                <p className={`text-[7.5px] sm:text-[8.5px] tracking-[0.18em] uppercase font-medium pt-0.5 opacity-75 ${bodyFontClass}`}>
                  {details.dressCode}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CARD TYPE: RSVP CARD */}
      {cardType === 'rsvp' && (
        <div className="relative z-10 flex flex-col justify-between h-full pt-16 sm:pt-20 pb-3 px-3 text-center">
          <div className="flex flex-col items-center space-y-0.5">
            <h3
              className={`text-xl sm:text-2xl tracking-[0.25em] font-normal uppercase ${headingFontClass} ${foilTextClass}`}
            >
              R. S. V. P.
            </h3>
            <p className={`text-[9.5px] tracking-[0.18em] opacity-80 uppercase font-medium ${bodyFontClass}`} style={{ color: palette.accent }}>
              Kindly reply by {details.rsvpDeadline}
            </p>
          </div>

          <div className="my-auto space-y-2 max-w-[340px] mx-auto w-full text-left pt-1">
            <div className="flex items-end border-b pb-1 text-xs" style={{ borderColor: palette.border }}>
              <span className={`text-[11px] font-medium tracking-wider mr-2 ${bodyFontClass}`}>M</span>
              <span className="text-[10px] text-neutral-400 italic">Name(s) of guests</span>
            </div>

            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center gap-2 text-[10.5px] opacity-90">
                <span className="w-3 h-3 rounded-full border border-neutral-400 inline-block" />
                <span className={`tracking-wide ${bodyFontClass}`}>Accepts with pleasure &amp; delight</span>
              </div>
              <div className="flex items-center gap-2 text-[10.5px] opacity-90">
                <span className="w-3 h-3 rounded-full border border-neutral-400 inline-block" />
                <span className={`tracking-wide ${bodyFontClass}`}>Declines with warmest regrets</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t text-center space-y-0.5" style={{ borderColor: `${palette.border}80` }}>
            <p className={`text-[9px] tracking-wider opacity-80 ${bodyFontClass}`}>
              Digital responses &amp; details: <span className="font-semibold underline">{details.rsvpWebsite}</span>
            </p>
            {details.rsvpNotes && (
              <p className={`text-[8px] opacity-65 italic ${bodyFontClass}`}>
                {details.rsvpNotes}
              </p>
            )}
          </div>
        </div>
      )}

      {/* CARD TYPE: SCHEDULE / ORDER OF SERVICE */}
      {cardType === 'schedule' && (
        <>
          {isOrderOfService ? (
            /* AUTHENTIC ORDER OF SERVICE (A4 / CEREMONY BOOKLET) */
            <div className="relative z-10 flex flex-col justify-between h-full py-1 text-center">
              {/* Header Section */}
              <div className="space-y-1 pt-1">
                <MotifGraphics
                  type={motif === 'none' ? 'cross_or_diamond' : motif}
                  color={palette.accent}
                  foil={palette.foil}
                  size={28}
                  className="mx-auto mb-1"
                />
                
                <h2
                  className={`text-sm sm:text-base tracking-[0.3em] font-normal uppercase ${headingFontClass} ${
                    palette.foil !== 'none' ? foilTextClass : ''
                  }`}
                >
                  {details.ceremonyHeaderTitle || 'ORDER OF SERVICE'}
                </h2>
                
                <p className={`text-[8.5px] sm:text-[9.5px] tracking-[0.25em] uppercase opacity-70 ${bodyFontClass}`}>
                  {details.ceremonySubtitle || 'FOR THE MARRIAGE OF'}
                </p>

                {/* Main Couple Names */}
                <h1
                  className={`text-xl sm:text-2xl tracking-[0.15em] font-normal uppercase py-1 ${headingFontClass}`}
                  style={{ color: palette.text }}
                >
                  {details.partner1FirstName} & {details.partner2FirstName}
                </h1>

                {/* Church Parish & Date in words */}
                <div className="space-y-0.5 pb-1">
                  <p className={`text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-medium ${bodyFontClass}`} style={{ color: palette.accent }}>
                    {details.churchParish || details.venueName}
                  </p>
                  <p className={`text-[8.5px] sm:text-[9px] tracking-[0.15em] uppercase opacity-75 ${bodyFontClass}`}>
                    {details.weddingDate} · {details.weddingTime}
                  </p>
                </div>

                {/* Divider Rule with center diamond */}
                <div className="flex items-center justify-center gap-2 py-1 max-w-[280px] mx-auto opacity-70">
                  <div className="flex-1 h-[0.8px]" style={{ backgroundColor: palette.border }} />
                  <span className="text-[9px]" style={{ color: palette.accent }}>✦</span>
                  <div className="flex-1 h-[0.8px]" style={{ backgroundColor: palette.border }} />
                </div>
              </div>

              {/* Ceremony Content: Two-Column Layout or Single-Column Liturgy */}
              {isTwoColumnOrderOfService ? (
                <div className="my-auto py-2 px-1 w-full flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-3 text-left w-full">
                    {/* Left Column: Ministers + First half of ceremony */}
                    <div className="space-y-2 border-r pr-2.5" style={{ borderColor: `${palette.border}50` }}>
                      {/* Officiating Ministers Section */}
                      {details.officiatingMinisters && (
                        <div className="pb-1.5 border-b space-y-0.5" style={{ borderColor: `${palette.border}40` }}>
                          <span
                            className={`text-[7px] sm:text-[8px] tracking-[0.2em] uppercase font-bold block ${headingFontClass}`}
                            style={{ color: palette.accent }}
                          >
                            ✦ Officiating Ministers ✦
                          </span>
                          <div className={`text-[7.5px] sm:text-[8px] leading-tight opacity-80 ${bodyFontClass}`}>
                            {details.officiatingMinisters.split('·').map((minister, idx) => (
                              <p key={idx} className="py-0.5">{minister.trim()}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Left Column Ceremony Sequence */}
                      <div className="space-y-2 pt-0.5">
                        {(details.ceremonyParts || []).slice(0, Math.ceil((details.ceremonyParts || []).length / 2)).map((part) => (
                          <div key={part.id} className="space-y-0.5">
                            <span
                              className={`text-[7.5px] sm:text-[8.5px] tracking-[0.18em] uppercase font-semibold block ${headingFontClass}`}
                              style={{ color: palette.accent }}
                            >
                              {part.sectionTitle}
                            </span>
                            <p className={`text-[8.5px] sm:text-[9.5px] italic font-normal leading-tight ${headingFontClass}`}>
                              {part.pieceOrText}
                            </p>
                            {part.performerOrReader && (
                              <p className={`text-[7px] sm:text-[7.5px] tracking-wide opacity-65 ${bodyFontClass}`}>
                                {part.performerOrReader}
                              </p>
                            )}
                            {part.lyricsExcerpt && (
                              <p className={`text-[7px] sm:text-[7.5px] italic opacity-75 py-0.5 leading-tight ${bodyFontClass}`}>
                                “{part.lyricsExcerpt}”
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Remainder of Ceremony */}
                    <div className="space-y-2 pl-0.5">
                      <div className="space-y-2 pt-0.5">
                        {(details.ceremonyParts || []).slice(Math.ceil((details.ceremonyParts || []).length / 2)).map((part) => (
                          <div key={part.id} className="space-y-0.5">
                            <span
                              className={`text-[7.5px] sm:text-[8.5px] tracking-[0.18em] uppercase font-semibold block ${headingFontClass}`}
                              style={{ color: palette.accent }}
                            >
                              {part.sectionTitle}
                            </span>
                            <p className={`text-[8.5px] sm:text-[9.5px] italic font-normal leading-tight ${headingFontClass}`}>
                              {part.pieceOrText}
                            </p>
                            {part.performerOrReader && (
                              <p className={`text-[7px] sm:text-[7.5px] tracking-wide opacity-65 ${bodyFontClass}`}>
                                {part.performerOrReader}
                              </p>
                            )}
                            {part.lyricsExcerpt && (
                              <p className={`text-[7px] sm:text-[7.5px] italic opacity-75 py-0.5 leading-tight ${bodyFontClass}`}>
                                “{part.lyricsExcerpt}”
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scripture Verse Quote & Delicate Motif at Bottom */}
                  {details.scriptureQuote && (
                    <div className="pt-2 mt-2 border-t text-center space-y-1" style={{ borderColor: `${palette.border}60` }}>
                      <p className={`text-[8px] sm:text-[9px] italic opacity-85 tracking-wide ${headingFontClass}`}>
                        {details.scriptureQuote}
                      </p>
                      <div className="flex items-center justify-center gap-1.5 opacity-60 text-[8px]" style={{ color: palette.accent }}>
                        <span>✦</span>
                        <span>♡</span>
                        <span>✦</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Standard Single Column Liturgy Sequence */
                <div className="my-auto py-2 space-y-2.5 max-w-[380px] mx-auto w-full text-center">
                  {(details.ceremonyParts && details.ceremonyParts.length > 0
                    ? details.ceremonyParts
                    : [
                        {
                          id: 'cp-1',
                          sectionTitle: 'ENTRANCE OF THE BRIDE',
                          pieceOrText: 'Canon in D Major — Johann Pachelbel',
                          performerOrReader: 'Organist: Mr. Julian Davies'
                        },
                        {
                          id: 'cp-2',
                          sectionTitle: 'WELCOME & OPENING PRAYER',
                          pieceOrText: 'The Collect & Greeting',
                          performerOrReader: 'The Reverend Canon James Thornton'
                        },
                        {
                          id: 'cp-3',
                          sectionTitle: 'FIRST READING',
                          pieceOrText: '1 Corinthians 13: 4–8',
                          performerOrReader: 'Read by Miss Clara Sterling'
                        },
                        {
                          id: 'cp-4',
                          sectionTitle: 'THE MARRIAGE',
                          pieceOrText: 'The Solemn Exchange of Vows & Giving of Rings'
                        },
                        {
                          id: 'cp-5',
                          sectionTitle: 'HYMN',
                          pieceOrText: 'Jerusalem (And did those feet in ancient time)',
                          lyricsExcerpt: 'Bring me my bow of burning gold! Bring me my arrows of desire!'
                        },
                        {
                          id: 'cp-6',
                          sectionTitle: 'THE NUPTIAL BLESSING',
                          pieceOrText: 'Prayers & Benediction'
                        },
                        {
                          id: 'cp-7',
                          sectionTitle: 'SIGNING OF THE REGISTER',
                          pieceOrText: 'Ave Maria — Franz Schubert'
                        },
                        {
                          id: 'cp-8',
                          sectionTitle: 'RECESSIONAL',
                          pieceOrText: 'Wedding March — Felix Mendelssohn'
                        }
                      ]
                  ).map((part) => (
                    <div key={part.id} className="space-y-0.5">
                      <span
                        className={`text-[8.5px] sm:text-[9.5px] tracking-[0.22em] uppercase font-semibold block ${headingFontClass}`}
                        style={{ color: palette.accent }}
                      >
                        {part.sectionTitle}
                      </span>
                      <p className={`text-[10px] sm:text-[11px] italic font-normal tracking-wide ${headingFontClass}`}>
                        {part.pieceOrText}
                      </p>
                      {part.performerOrReader && (
                        <p className={`text-[7.5px] sm:text-[8.5px] tracking-wide opacity-65 ${bodyFontClass}`}>
                          {part.performerOrReader}
                        </p>
                      )}
                      {part.lyricsExcerpt && (
                        <p
                          className={`text-[8px] sm:text-[8.5px] italic opacity-75 max-w-[260px] mx-auto py-0.5 leading-tight ${bodyFontClass}`}
                        >
                          “{part.lyricsExcerpt}”
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Bridal Party & Attendants Footer */}
              <div
                className="pt-2 border-t text-center space-y-1 mt-auto"
                style={{ borderColor: `${palette.border}80` }}
              >
                <div className="grid grid-cols-2 gap-2 text-[8px] sm:text-[8.5px] max-w-[340px] mx-auto text-left opacity-80">
                  <div>
                    <span className="font-semibold block uppercase tracking-wider text-[7.5px] opacity-90" style={{ color: palette.accent }}>
                      Officiant & Best Man
                    </span>
                    <p className={`truncate ${bodyFontClass}`}>{details.bridalParty?.officiant || 'Rev. James Thornton'}</p>
                    <p className={`truncate ${bodyFontClass}`}>Best Man: {details.bridalParty?.bestMan || 'Lord Alexander Hughes'}</p>
                  </div>
                  <div>
                    <span className="font-semibold block uppercase tracking-wider text-[7.5px] opacity-90" style={{ color: palette.accent }}>
                      Maid of Honour & Attendants
                    </span>
                    <p className={`truncate ${bodyFontClass}`}>{details.bridalParty?.maidOfHonour || 'Clara Sterling'}</p>
                    <p className={`truncate ${bodyFontClass}`}>{details.bridalParty?.bridesmaids || 'Bridesmaids & Ushers'}</p>
                  </div>
                </div>

                <p className={`text-[7.5px] tracking-[0.2em] uppercase opacity-55 pt-0.5 ${bodyFontClass}`}>
                  Please join the Bride & Groom for celebratory drinks following the service
                </p>
              </div>
            </div>
          ) : (
            /* STANDARD TIMELINE FORMAT */
            <div className="relative z-10 flex flex-col justify-between h-full py-4 px-3 text-center">
              <div className="space-y-1 pt-1">
                <MotifGraphics type={motif} color={palette.accent} foil={palette.foil} size={30} />
                <h3 className={`text-xl sm:text-2xl tracking-[0.2em] font-normal uppercase ${headingFontClass}`}>
                  Order of Events
                </h3>
                <p className={`text-[9.5px] tracking-[0.18em] uppercase opacity-80 ${bodyFontClass}`}>
                  {details.partner1FirstName} & {details.partner2FirstName} · {details.weddingDate}
                </p>
              </div>

              {/* Timeline Events */}
              <div className="my-auto py-2 space-y-2.5 w-full max-w-[320px] mx-auto">
                {details.scheduleEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 text-left">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${palette.accent}18`,
                        color: palette.accent
                      }}
                    >
                      {getIcon(event.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className={`text-xs font-semibold tracking-wide ${headingFontClass}`}>
                          {event.title}
                        </h4>
                        <span
                          className={`text-[10px] font-medium tracking-wider shrink-0 ${bodyFontClass}`}
                          style={{ color: palette.accent }}
                        >
                          {event.time}
                        </span>
                      </div>
                      <p className={`text-[9.5px] opacity-75 tracking-tight truncate ${bodyFontClass}`}>
                        {event.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center border-t" style={{ borderColor: `${palette.border}80` }}>
                <p className={`text-[9px] tracking-[0.15em] uppercase opacity-75 ${bodyFontClass}`}>
                  {details.venueName} · {details.cityState}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* CARD TYPE: DINNER MENU */}
      {cardType === 'menu' && (
        <div className="relative z-10 flex flex-col justify-between h-full py-4 px-3 text-center">
          <div className="space-y-0.5 pt-1">
            <MotifGraphics type={motif} color={palette.accent} foil={palette.foil} size={28} />
            <h3
              className={`text-xl sm:text-2xl tracking-[0.25em] font-normal uppercase ${headingFontClass} ${foilTextClass}`}
            >
              Wedding Menu
            </h3>
            <p className={`text-[9.5px] tracking-[0.2em] uppercase opacity-80 ${bodyFontClass}`}>
              {details.partner1FirstName} & {details.partner2FirstName}
            </p>
          </div>

          {/* Courses */}
          <div className="my-auto py-2 space-y-3.5 max-w-[340px] mx-auto w-full">
            {details.menuCourses.map((item, idx) => (
              <div key={item.id || idx} className="space-y-0.5">
                <span
                  className={`text-[8.5px] tracking-[0.25em] uppercase font-bold block ${bodyFontClass}`}
                  style={{ color: palette.accent }}
                >
                  — {item.course} —
                </span>
                <h4 className={`text-xs sm:text-[13px] font-semibold tracking-wide ${headingFontClass}`}>
                  {item.dish}
                </h4>
                <p className={`text-[9px] opacity-80 max-w-[280px] mx-auto leading-relaxed ${bodyFontClass}`}>
                  {item.description || (item as any).dishDescription}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t text-center space-y-0.5" style={{ borderColor: `${palette.border}80` }}>
            <p className={`text-[8.5px] tracking-wider opacity-75 italic ${bodyFontClass}`}>
              Hand-selected regional wine pairings poured throughout dinner
            </p>
            <p className={`text-[8px] uppercase tracking-[0.2em] font-medium opacity-65 ${bodyFontClass}`}>
              Buon Appetito
            </p>
          </div>
        </div>
      )}

      {/* CARD TYPE: THANK YOU CARD */}
      {cardType === 'thankyou' && (
        <div className="relative z-10 flex flex-col justify-between h-full pt-20 pb-3 px-4 text-center">
          <div className="space-y-0.5">
            <h3
              className={`text-lg sm:text-xl tracking-[0.22em] font-normal uppercase ${headingFontClass} ${foilTextClass}`}
            >
              With Deepest Gratitude
            </h3>
          </div>

          <div className="my-auto py-2 max-w-[340px] mx-auto">
            <p className={`text-[10.5px] leading-relaxed opacity-90 ${bodyFontClass}`}>
              {details.thankYouMessage}
            </p>
          </div>

          <div className="pt-2 text-center border-t space-y-0.5" style={{ borderColor: `${palette.border}80` }}>
            <span className={`text-xl block ${scriptFontClass}`} style={{ color: palette.accent }}>
              {details.partner1FirstName} & {details.partner2FirstName}
            </span>
            <p className={`text-[8.5px] tracking-[0.2em] uppercase opacity-65 ${bodyFontClass}`}>
              {details.weddingDate}
            </p>
          </div>
        </div>
      )}

      {/* CARD TYPE: PLACE CARD */}
      {cardType === 'placecard' && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full py-2 pl-12 pr-4 text-center">
          <div className="space-y-1.5 max-w-[260px] mx-auto">
            <div className="flex items-center justify-center gap-1 opacity-70 text-[9px]" style={{ color: palette.accent }}>
              <span>✦</span>
              <span>♡</span>
              <span>✦</span>
            </div>
            <h4
              className={`text-xl sm:text-2xl font-normal tracking-wide leading-tight ${headingFontClass} ${
                palette.foil !== 'none' ? foilTextClass : ''
              }`}
            >
              {details.placeCardGuestName}
            </h4>
            <div
              className={`text-[9.5px] tracking-[0.2em] uppercase font-bold ${bodyFontClass}`}
              style={{ color: palette.accent }}
            >
              {details.placeCardTable}
            </div>
            <div className="text-[8px] tracking-widest opacity-70 uppercase font-medium pt-0.5">
              {details.placeCardMealChoice}
            </div>
          </div>
        </div>
      )}

      {/* CARD TYPE: DETAILS & ACCOMMODATIONS */}
      {cardType === 'details' && (
        <div className="relative z-10 flex flex-col justify-between h-full pt-16 sm:pt-18 pb-3 px-4 text-center">
          <div className="space-y-0.5">
            <h3 className={`text-base sm:text-lg tracking-[0.22em] font-normal uppercase ${headingFontClass}`}>
              Guest Information & Travel
            </h3>
          </div>

          <div className="my-auto space-y-2.5 max-w-[340px] mx-auto text-left py-1">
            <div>
              <span className={`text-[8.5px] uppercase tracking-widest font-bold block ${bodyFontClass}`} style={{ color: palette.accent }}>
                Accommodations
              </span>
              <p className={`text-[9.5px] opacity-85 leading-relaxed ${bodyFontClass}`}>
                {details.accommodationsNote}
              </p>
            </div>
            <div>
              <span className={`text-[8.5px] uppercase tracking-widest font-bold block ${bodyFontClass}`} style={{ color: palette.accent }}>
                Dress Code
              </span>
              <p className={`text-[9.5px] opacity-85 ${bodyFontClass}`}>
                {details.dressCode}
              </p>
            </div>
          </div>

          <div className="pt-1.5 border-t text-center" style={{ borderColor: `${palette.border}80` }}>
            <p className={`text-[8.5px] opacity-75 tracking-wider ${bodyFontClass}`}>
              For transport shuttles and registry details, visit <span className="font-semibold underline">{details.rsvpWebsite}</span>
            </p>
          </div>
        </div>
      )}

      {/* CARD TYPE: PLANNER & CHECKLIST KEEPSAKE */}
      {cardType === 'planner' && (
        <div className="relative z-10 flex flex-col justify-between h-full pt-16 pb-3 px-4 text-left">
          <div className="text-center space-y-0.5">
            <h3 className={`text-lg sm:text-xl tracking-[0.2em] font-normal uppercase ${headingFontClass}`}>
              Wedding Day Master Plan
            </h3>
            <p className={`text-[9px] uppercase tracking-widest opacity-75 ${bodyFontClass}`}>
              {details.partner1FirstName} & {details.partner2FirstName} · {details.weddingDate}
            </p>
          </div>

          <div className="my-2.5 space-y-2 text-xs">
            <div className="p-2.5 rounded-sm bg-black/5 space-y-1">
              <span className={`text-[8.5px] uppercase font-bold tracking-widest block ${bodyFontClass}`} style={{ color: palette.accent }}>
                Ceremony & Location
              </span>
              <p className="text-[9.5px] opacity-80">{details.venueName} — {details.venueAddress}, {details.cityState}</p>
            </div>

            <div className="space-y-1.5 pt-0.5">
              <span className={`text-[8.5px] uppercase font-bold tracking-widest block opacity-80 ${bodyFontClass}`}>
                Key Countdown Checklist
              </span>
              {[
                'Stationery Suite printed & addressed',
                'Final catering guest count verified with venue',
                'Florals, bouquet & arch arrangements finalized',
                'Music playlist & first dance song confirmed',
                'Day-of bridal emergency kit packed'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[9.5px] opacity-85">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-1.5 border-t text-center" style={{ borderColor: `${palette.border}80` }}>
            <p className={`text-[8.5px] italic opacity-70 ${bodyFontClass}`}>
              A keepsake timeline to guide your dream celebration
            </p>
          </div>
        </div>
      )}

      {/* CARD TYPE: BIRTHDAY INVITATION & CELEBRATION */}
      {cardType === 'birthday_card' && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full text-center py-5 px-4 max-w-[340px] mx-auto">
          {/* Top Motif / Age Badge */}
          <div className="flex flex-col items-center space-y-1.5 pt-1">
            <MotifGraphics
              type={motif === 'none' ? 'birthday_cake' : motif}
              color={palette.accent}
              foil={palette.foil}
              size={32}
            />
            <p className={`text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase opacity-85 font-medium ${bodyFontClass}`}>
              {details.invitationHeadline || 'PLEASE JOIN US TO CELEBRATE'}
            </p>
          </div>

          {/* Photo Slot if available */}
          {details.photoUrl && (
            <div className="my-2 relative w-36 h-36 rounded-full overflow-hidden border-2 shadow-md p-1" style={{ borderColor: palette.accent }}>
              <img
                src={details.photoUrl}
                alt={details.honoreeName || 'Honoree'}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Honoree & Milestone */}
          <div className="my-auto py-2 space-y-1 w-full">
            <h2
              className={`text-2xl sm:text-3xl tracking-tight font-normal leading-tight ${headingFontClass} ${
                palette.foil !== 'none' ? foilTextClass : ''
              }`}
            >
              {details.honoreeName || `${details.partner1FirstName}'s Birthday`}
            </h2>

            {details.birthdayAge && (
              <span className={`text-xl sm:text-2xl block my-0.5 ${scriptFontClass}`} style={{ color: palette.accent }}>
                Turning {details.birthdayAge}
              </span>
            )}

            <p className={`text-[9.5px] max-w-[260px] mx-auto tracking-[0.16em] uppercase opacity-80 leading-relaxed ${bodyFontClass}`}>
              {details.ceremonySubtext || 'An Evening of Dinner, Drinks & Merriment'}
            </p>
          </div>

          {/* Celebration Logistics */}
          <div className="space-y-2 w-full flex flex-col items-center pb-1">
            <div
              className="py-1.5 border-y w-[88%] flex flex-col items-center justify-center space-y-0.5"
              style={{ borderColor: `${palette.border}90` }}
            >
              <div className={`text-xs sm:text-[13px] tracking-[0.2em] uppercase font-semibold ${headingFontClass}`} style={{ color: palette.accent }}>
                {details.weddingDate}
              </div>
              <div className={`text-[9.5px] tracking-[0.15em] opacity-85 ${bodyFontClass}`}>
                {details.weddingTime}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className={`text-xs font-semibold tracking-wider ${headingFontClass}`}>
                {details.venueName}
              </div>
              <div className={`text-[9px] tracking-wide opacity-80 ${bodyFontClass}`}>
                {details.venueAddress} · {details.cityState}
              </div>
            </div>

            <div className="pt-1 text-[8.5px] tracking-wider opacity-85">
              RSVP by {details.rsvpDeadline || 'July 1st'} to {details.rsvpWebsite || 'the host'}
            </div>
          </div>
        </div>
      )}

      {/* CARD TYPE: BABY SHOWER & BIRTH ANNOUNCEMENT */}
      {cardType === 'baby_card' && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full text-center py-5 px-4 max-w-[340px] mx-auto">
          <div className="flex flex-col items-center space-y-1.5 pt-1">
            <MotifGraphics
              type={motif === 'none' ? 'baby_stroller' : motif}
              color={palette.accent}
              foil={palette.foil}
              size={32}
            />
            <p className={`text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase opacity-85 font-medium ${bodyFontClass}`}>
              {details.invitationHeadline || 'A SWEET LITTLE ONE IS ON THE WAY'}
            </p>
          </div>

          {details.photoUrl && (
            <div className="my-2 relative w-36 h-44 rounded-t-full overflow-hidden border-2 shadow-md p-1" style={{ borderColor: palette.accent }}>
              <img
                src={details.photoUrl}
                alt="Baby announcement"
                className="w-full h-full object-cover rounded-t-full"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="my-auto py-2 space-y-1 w-full">
            <p className={`text-xs tracking-[0.2em] uppercase opacity-75 font-medium ${bodyFontClass}`}>
              BABY SHOWER HONORING
            </p>
            <h2
              className={`text-2xl sm:text-3xl tracking-tight font-normal leading-tight ${headingFontClass} ${
                palette.foil !== 'none' ? foilTextClass : ''
              }`}
            >
              {details.honoreeName || `${details.partner1FirstName}`}
            </h2>
            <p className={`text-[9.5px] max-w-[260px] mx-auto tracking-[0.16em] uppercase opacity-80 leading-relaxed ${bodyFontClass}`}>
              {details.ceremonySubtext || 'Join us for brunch, treats & sweet celebrations'}
            </p>
          </div>

          <div className="space-y-2 w-full flex flex-col items-center pb-1">
            <div
              className="py-1.5 border-y w-[88%] flex flex-col items-center justify-center space-y-0.5"
              style={{ borderColor: `${palette.border}90` }}
            >
              <div className={`text-xs sm:text-[13px] tracking-[0.2em] uppercase font-semibold ${headingFontClass}`} style={{ color: palette.accent }}>
                {details.weddingDate}
              </div>
              <div className={`text-[9.5px] tracking-[0.15em] opacity-85 ${bodyFontClass}`}>
                {details.weddingTime}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className={`text-xs font-semibold tracking-wider ${headingFontClass}`}>
                {details.venueName}
              </div>
              <div className={`text-[9px] tracking-wide opacity-80 ${bodyFontClass}`}>
                {details.venueAddress} · {details.cityState}
              </div>
            </div>

            <div className="pt-1 text-[8.5px] tracking-wider opacity-85">
              Registry: <span className="font-semibold">{details.rsvpWebsite || 'Target & Babylist'}</span>
            </div>
          </div>
        </div>
      )}

      {/* CARD TYPE: HOLIDAY & SEASONAL GREETINGS */}
      {cardType === 'holiday_card' && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full text-center py-5 px-4 max-w-[340px] mx-auto">
          <div className="flex flex-col items-center space-y-1 pt-1">
            <MotifGraphics
              type={motif === 'none' ? 'holiday_pine' : motif}
              color={palette.accent}
              foil={palette.foil}
              size={32}
            />
            <span className={`text-2xl sm:text-3xl pt-1 ${scriptFontClass}`} style={{ color: palette.accent }}>
              Joy & Warmth
            </span>
          </div>

          {details.photoUrl && (
            <div className="my-2 relative w-full h-44 rounded-sm overflow-hidden border shadow-md" style={{ borderColor: palette.border }}>
              <img
                src={details.photoUrl}
                alt="Family Holiday Portrait"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="my-auto py-2 space-y-1.5">
            <h2
              className={`text-xl sm:text-2xl tracking-[0.2em] font-normal uppercase ${headingFontClass} ${
                palette.foil !== 'none' ? foilTextClass : ''
              }`}
            >
              {details.invitationHeadline || 'SEASON’S GREETINGS'}
            </h2>
            <p className={`text-[10px] leading-relaxed max-w-[270px] mx-auto opacity-85 ${bodyFontClass}`}>
              {details.ceremonySubtext ||
                'Wishing you a holiday season filled with peace, love, and light, and a wonderful New Year ahead.'}
            </p>
          </div>

          <div className="pt-2 border-t w-[88%] text-center space-y-0.5" style={{ borderColor: `${palette.border}80` }}>
            <span className={`text-lg sm:text-xl block ${scriptFontClass}`} style={{ color: palette.accent }}>
              {details.senderSignoff || `With Love, The ${details.partner1LastName || 'Family'}`}
            </span>
            <p className={`text-[8.5px] uppercase tracking-[0.2em] opacity-75 font-mono ${bodyFontClass}`}>
              EST. 2026
            </p>
          </div>
        </div>
      )}

      {/* CARD TYPE: COCKTAIL / DINNER / PARTY INVITATION */}
      {cardType === 'party_card' && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full text-center py-5 px-4 max-w-[340px] mx-auto">
          <div className="flex flex-col items-center space-y-1 pt-1">
            <MotifGraphics
              type={motif === 'none' ? 'cocktail_glass' : motif}
              color={palette.accent}
              foil={palette.foil}
              size={32}
            />
            <p className={`text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase opacity-85 font-medium ${bodyFontClass}`}>
              {details.invitationHeadline || 'AN EVENING SOIREE'}
            </p>
          </div>

          <div className="my-auto py-2 space-y-1 w-full">
            <h2
              className={`text-2xl sm:text-3xl tracking-tight font-normal leading-tight ${headingFontClass} ${
                palette.foil !== 'none' ? foilTextClass : ''
              }`}
            >
              {details.honoreeName || 'Cocktails & Dinner'}
            </h2>
            <p className={`text-[9.5px] max-w-[260px] mx-auto tracking-[0.16em] uppercase opacity-80 leading-relaxed ${bodyFontClass}`}>
              {details.ceremonySubtext || 'Craft drinks, shared plates & lively conversation'}
            </p>
          </div>

          <div className="space-y-2 w-full flex flex-col items-center pb-1">
            <div
              className="py-1.5 border-y w-[88%] flex flex-col items-center justify-center space-y-0.5"
              style={{ borderColor: `${palette.border}90` }}
            >
              <div className={`text-xs sm:text-[13px] tracking-[0.2em] uppercase font-semibold ${headingFontClass}`} style={{ color: palette.accent }}>
                {details.weddingDate}
              </div>
              <div className={`text-[9.5px] tracking-[0.15em] opacity-85 ${bodyFontClass}`}>
                {details.weddingTime}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className={`text-xs font-semibold tracking-wider ${headingFontClass}`}>
                {details.venueName}
              </div>
              <div className={`text-[9px] tracking-wide opacity-80 ${bodyFontClass}`}>
                {details.venueAddress} · {details.cityState}
              </div>
            </div>

            <div className="pt-1 text-[8.5px] tracking-wider opacity-85">
              RSVP by {details.rsvpDeadline || 'Friday'} · {details.dressCode || 'Smart Casual'}
            </div>
          </div>
        </div>
      )}

      {/* CARD TYPE: MULTIPURPOSE GREETING CARD (FOLDED / FLAT) */}
      {cardType === 'greeting_card' && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full text-center py-6 px-4 max-w-[340px] mx-auto">
          {/* Top Motifs */}
          <div className="flex flex-col items-center space-y-2 pt-2">
            <MotifGraphics
              type={motif === 'none' ? 'sparkle_stars' : motif}
              color={palette.accent}
              foil={palette.foil}
              size={34}
            />
          </div>

          {/* Cover Message */}
          <div className="my-auto py-3 space-y-2">
            <h2
              className={`text-2xl sm:text-3xl tracking-tight font-normal leading-snug ${headingFontClass} ${
                palette.foil !== 'none' ? foilTextClass : ''
              }`}
            >
              {details.invitationHeadline || 'Thinking of You'}
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed opacity-85 max-w-[260px] mx-auto ${bodyFontClass}`}>
              {details.ceremonySubtext || 'Sending warmest thoughts, heartfelt blessings, and smiles your way.'}
            </p>
          </div>

          {/* Bottom Signoff */}
          <div className="pt-3 border-t w-[80%] text-center" style={{ borderColor: `${palette.border}80` }}>
            <span className={`text-xl sm:text-2xl block ${scriptFontClass}`} style={{ color: palette.accent }}>
              {details.senderSignoff || `${details.partner1FirstName || 'With warmth'}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

