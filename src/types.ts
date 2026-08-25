export type CardItemType = 
  | 'invitation' 
  | 'rsvp' 
  | 'schedule' 
  | 'menu' 
  | 'thankyou' 
  | 'placecard' 
  | 'details' 
  | 'planner';

export type StyleCategory = 
  | 'all'
  | 'service'
  | 'botanical' 
  | 'editorial' 
  | 'romantic' 
  | 'minimalist' 
  | 'art-deco' 
  | 'tuscan' 
  | 'boho' 
  | 'regal';

export type FoilType = 'gold' | 'rose-gold' | 'silver' | 'none';
export type PaperFinish = 'smooth' | 'linen' | 'deckled' | 'cotton';
export type BorderStyle = 
  | 'none' 
  | 'single-thin' 
  | 'double-ornate' 
  | 'classic-church-rule' 
  | 'gold-emboss' 
  | 'arch-curve' 
  | 'minimal-frame'
  | 'vintage-flourish-frame'
  | 'indented-corner-gold'
  | 'double-line-inset';

export type FloralStyle = 
  | 'none'
  | 'blush_rose_corner'
  | 'blush_rose_border'
  | 'blush_gold_arch'
  | 'white_peony_corner'
  | 'white_peony_frame'
  | 'ivory_ranunculus_wreath'
  | 'wildflower_meadow'
  | 'wildflower_sage_border'
  | 'sage_eucalyptus_border'
  | 'eucalyptus_garland'
  | 'dusty_rose_mauve'
  | 'champagne_magnolia'
  | 'dual_corner_roses'
  | 'gold_botanical_crest';

export type MotifType = 
  | 'olive_branch' 
  | 'monogram_crest' 
  | 'wildflower_wreath' 
  | 'art_deco_lines' 
  | 'eucalyptus_corner' 
  | 'minimal_geometric' 
  | 'romantic_rose' 
  | 'vintage_filigree'
  | 'botanical_arch'
  | 'heritage_crest'
  | 'cross_or_diamond'
  | 'blush_rose_corner'
  | 'peony_bloom'
  | 'gold_foil_laurel'
  | 'none';

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface CeremonyPart {
  id: string;
  sectionTitle: string;
  pieceOrText: string;
  performerOrReader?: string;
  lyricsExcerpt?: string;
  category?: 'liturgy' | 'music' | 'vows' | 'reception';
}

export interface BridalPartyDetails {
  officiant: string;
  maidOfHonour: string;
  bestMan: string;
  bridesmaids: string;
  ushers: string;
  readers: string;
}

export interface MenuCourse {
  id: string;
  course: string;
  dish: string;
  description: string;
}

export interface CoupleDetails {
  partner1FirstName: string;
  partner1LastName: string;
  partner2FirstName: string;
  partner2LastName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  cityState: string;
  monogramText: string;
  invitationHeadline: string;
  ceremonySubtext: string;
  receptionDetails: string;
  dressCode: string;
  rsvpDeadline: string;
  rsvpWebsite: string;
  rsvpEmail: string;
  rsvpNotes: string;
  accommodationsNote: string;
  thankYouMessage: string;
  placeCardGuestName: string;
  placeCardTable: string;
  placeCardMealChoice: string;
  scheduleEvents: ScheduleEvent[];
  menuCourses: MenuCourse[];
  // Order of Service Specific Fields
  ceremonyHeaderTitle: string;
  ceremonySubtitle: string;
  churchParish: string;
  officiatingMinisters: string;
  scriptureQuote: string;
  ceremonyParts: CeremonyPart[];
  bridalParty: BridalPartyDetails;
}

export interface ColorPalette {
  id: string;
  name: string;
  tag: string;
  background: string;
  cardBg: string;
  text: string;
  accent: string;
  foil: FoilType;
  border: string;
  previewClass: string;
}

export interface FontPreset {
  id: string;
  name: string;
  description: string;
  headingFont: string;
  scriptFont: string;
  bodyFont: string;
}

export interface WeddingSuite {
  id: string;
  title: string;
  collectionName: string;
  tagline: string;
  description: string;
  styleCategory: StyleCategory;
  defaultPalette: ColorPalette;
  defaultFontPreset: string;
  defaultMotif: MotifType;
  defaultFloralStyle?: FloralStyle;
  featured: boolean;
  rating: number;
  downloadCount: number;
  accentAccentColor: string;
  includedItems: CardItemType[];
  tags: string[];
  defaultScheduleMode?: 'timeline' | 'order_of_service';
  defaultOrderOfServiceLayout?: 'single' | 'two_column';
}

export interface SuiteCustomization {
  palette: ColorPalette;
  fontPresetId: string;
  scriptFont: 'pinyon' | 'alex' | 'vibes' | 'none';
  paperFinish: PaperFinish;
  borderStyle: BorderStyle;
  motif: MotifType;
  motifOpacity?: number;
  floralStyle: FloralStyle;
  floralAssetId?: string;
  floralOverlayEnabled?: boolean;
  floralBackgroundOpacity?: number;
  floralBlendMode?: 'normal' | 'multiply' | 'overlay' | 'soft-light';
  floralOverlayPlacement?: 'full' | 'frame' | 'header' | 'corners';
  showBleedAndCrop: boolean;
  aspectRatioFormat: 'print-standard' | 'mobile-story' | 'square';
  scheduleDisplayMode: 'timeline' | 'order_of_service';
  orderOfServiceLayout: 'single' | 'two_column';
}
