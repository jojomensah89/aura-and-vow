import { ColorPalette, CoupleDetails, FontPreset, WeddingSuite } from '../types';
import { GREETINGS_TEMPLATES } from './greetingsData';

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'ivory-olive',
    name: 'Tuscan Olive & Warm Linen',
    tag: 'Earthy Romance',
    background: '#F7F5F0',
    cardBg: '#FCFBF8',
    text: '#2D3328',
    accent: '#5E6B56',
    foil: 'gold',
    border: '#D9D3C5',
    previewClass: 'bg-[#5E6B56]'
  },
  {
    id: 'noir-champagne',
    name: 'Noir & French Champagne',
    tag: 'Modern Editorial',
    background: '#F3F3F2',
    cardBg: '#FFFFFF',
    text: '#1A1A1A',
    accent: '#A68048',
    foil: 'gold',
    border: '#E3DECE',
    previewClass: 'bg-[#1A1A1A]'
  },
  {
    id: 'blush-cashmere',
    name: 'Dusty Rose & Cashmere',
    tag: 'Soft Romantic',
    background: '#FBF5F4',
    cardBg: '#FFF9F8',
    text: '#3D2A2A',
    accent: '#B07575',
    foil: 'rose-gold',
    border: '#EAD5D5',
    previewClass: 'bg-[#B07575]'
  },
  {
    id: 'sage-gold',
    name: 'Eucalyptus Sage & Gilded Leaf',
    tag: 'Botanical Chic',
    background: '#F3F6F2',
    cardBg: '#FAFCF9',
    text: '#223023',
    accent: '#475C46',
    foil: 'gold',
    border: '#C8D6C7',
    previewClass: 'bg-[#475C46]'
  },
  {
    id: 'midnight-star',
    name: 'Midnight Navy & Silver Foil',
    tag: 'Celestial Classic',
    background: '#F0F3F7',
    cardBg: '#FFFFFF',
    text: '#111D2D',
    accent: '#314E73',
    foil: 'silver',
    border: '#CBD8E6',
    previewClass: 'bg-[#111D2D]'
  },
  {
    id: 'terracotta-sun',
    name: 'Warm Terracotta & Sand',
    tag: 'Boho Sunset',
    background: '#FAF3ED',
    cardBg: '#FFF9F4',
    text: '#3E251A',
    accent: '#A6553B',
    foil: 'gold',
    border: '#E7C8B5',
    previewClass: 'bg-[#A6553B]'
  },
  {
    id: 'regal-burgundy',
    name: 'Imperial Burgundy & Gold',
    tag: 'Timeless Luxury',
    background: '#F8F2F3',
    cardBg: '#FFFCFC',
    text: '#2D1216',
    accent: '#6E1D2A',
    foil: 'gold',
    border: '#DDBDC3',
    previewClass: 'bg-[#6E1D2A]'
  },
  {
    id: 'minimal-slate',
    name: 'Pure Alabaster & Slate',
    tag: 'Ultra Minimal',
    background: '#F8F9FA',
    cardBg: '#FFFFFF',
    text: '#212529',
    accent: '#495057',
    foil: 'none',
    border: '#DEE2E6',
    previewClass: 'bg-[#495057]'
  }
];

export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'classic-cormorant',
    name: 'Cormorant & Pinyon Script',
    description: 'Timeless luxury calligraphy with old-world romance',
    headingFont: 'font-cormorant',
    scriptFont: 'font-script-pinyon',
    bodyFont: 'font-montserrat'
  },
  {
    id: 'modern-playfair',
    name: 'Playfair & Alex Brush',
    description: 'Sophisticated modern bridal editorial elegance',
    headingFont: 'font-playfair',
    scriptFont: 'font-script-alex',
    bodyFont: 'font-sans-clean'
  },
  {
    id: 'cinzel-regal',
    name: 'Cinzel & Great Vibes',
    description: 'Regal Roman capitals paired with cascading fluid script',
    headingFont: 'font-cinzel',
    scriptFont: 'font-script-vibes',
    bodyFont: 'font-montserrat'
  },
  {
    id: 'editorial-bodoni',
    name: 'Bodoni Moda & Clean Sans',
    description: 'Vogue-inspired high fashion typographic contrast',
    headingFont: 'font-bodoni',
    scriptFont: 'font-script-alex',
    bodyFont: 'font-sans-clean'
  }
];

export const DEFAULT_COUPLE_DETAILS: CoupleDetails = {
  // General & Multi-occasion Card Fields
  title: 'The Marriage of Martha Sinclair & Robert Hawthorne',
  headline: 'THE MARRIAGE OF',
  honoreeOrCouple: 'Martha Sinclair & Robert Hawthorne',
  eventDate: 'Saturday, October 24, 2026',
  eventTime: "Two o'clock in the afternoon",
  hostName: 'Together with their families',
  subtext: 'Request the pleasure of your company at the celebration of their marriage',
  rsvpPhoneOrEmail: 'rsvp@marthaandrobert2026.com',
  greetingHeadline: 'Thinking of You with Warmest Wishes',
  insideLeftText: 'May your days be filled with happiness, love, and light.',
  insideRightMessage: 'Wishing you the happiest celebration and a wonderful year ahead!',
  senderSignoff: 'With love & warmest regards,',

  // Couple details
  partner1FirstName: 'Martha',
  partner1LastName: 'Sinclair',
  partner2FirstName: 'Robert',
  partner2LastName: 'Hawthorne',
  weddingDate: 'Saturday, October 24, 2026',
  weddingTime: "Two o'clock in the afternoon",
  venueName: "St. Mary's Church & Highgrove Estate",
  venueAddress: 'Church Street, Tetbury',
  cityState: 'Gloucestershire, United Kingdom',
  monogramText: 'M & R',
  invitationHeadline: 'THE MARRIAGE OF',
  ceremonySubtext: 'REQUEST THE PLEASURE OF YOUR COMPANY AT THE CELEBRATION OF THEIR NUPTIAL MASS & RECEPTION',
  receptionDetails: 'Reception, garden champagne, and dinner to follow at Highgrove Manor Gardens.',
  dressCode: 'Formal Black Tie & Morning Suit Attire',
  rsvpDeadline: 'September 15, 2026',
  rsvpWebsite: 'www.marthaandrobert2026.com',
  rsvpEmail: 'rsvp@marthaandrobert2026.com',
  rsvpNotes: 'Kindly reply by September 15th. Please indicate any dietary requirements.',
  accommodationsNote: 'Rooms are reserved at The Close Hotel & Calcot Manor. Mention the Sinclair-Hawthorne wedding.',
  thankYouMessage: 'With our sincerest love and deepest gratitude for sharing in the joyous celebration of our wedding day. Your presence made our vows unforgettable.',
  placeCardGuestName: 'Lord & Lady Harrington',
  placeCardTable: 'Table No. 01 — The Manor Hall',
  placeCardMealChoice: 'Roasted Cotswold Beef & Yorkshire Pudding',
  scheduleEvents: [
    {
      id: 'sch-1',
      time: '1:30 PM',
      title: 'Guest Arrival & Chimes',
      subtitle: "St. Mary's Church Bells",
      iconName: 'Clock'
    },
    {
      id: 'sch-2',
      time: '2:00 PM',
      title: 'The Nuptial Ceremony',
      subtitle: 'Order of Service & Vows',
      iconName: 'Heart'
    },
    {
      id: 'sch-3',
      time: '3:30 PM',
      title: 'Confetti & Chauffeur Departure',
      subtitle: 'Church Lychgate',
      iconName: 'Sparkles'
    },
    {
      id: 'sch-4',
      time: '4:00 PM',
      title: 'Champagne & String Quartet',
      subtitle: 'Manor South Lawn',
      iconName: 'Wine'
    },
    {
      id: 'sch-5',
      time: '6:00 PM',
      title: 'The Wedding Breakfast',
      subtitle: 'The Great Orangery',
      iconName: 'Utensils'
    },
    {
      id: 'sch-6',
      time: '8:30 PM',
      title: 'Cutting of the Cake & First Dance',
      subtitle: 'Manor Ballroom',
      iconName: 'Music'
    }
  ],
  menuCourses: [
    {
      id: 'course-1',
      course: 'ENTRÉE',
      dish: 'Twice-Baked Montgomery Cheddar Soufflé',
      description: 'Candied walnuts, shaved apple, and truffle vinaigrette'
    },
    {
      id: 'course-2',
      course: 'PLAT PRINCIPAL',
      dish: 'Herb-Crusted Cotswold Lamb or Wild Turbot',
      description: 'Dauphinoise potato, buttered heritage asparagus, and port wine jus'
    },
    {
      id: 'course-3',
      course: 'DESSERT',
      dish: 'English Summer Berry Pavlova & Clotted Cream',
      description: 'Wild strawberry coulis and spun sugar garnish'
    }
  ],
  // Order of Service ceremony structure
  ceremonyHeaderTitle: 'ORDER OF SERVICE',
  ceremonySubtitle: 'FOR THE CELEBRATION OF HOLY MATRIMONY',
  churchParish: "ST. MARY'S CHURCH & THE GLASSHOUSE",
  officiatingMinisters: 'Rev. Dr. J. N. Kudadzi · Rev. Michael Aryee · Rev. Patrick Mensah',
  scriptureQuote: '“Therefore what God has joined together, let no one separate.” — Matthew 19:6',
  ceremonyParts: [
    {
      id: 'cp-1',
      sectionTitle: 'ARRIVAL OF GUESTS',
      pieceOrText: 'Prelude in G Major & Choral Melodies',
      performerOrReader: 'Organist & Chamber Strings',
      category: 'music'
    },
    {
      id: 'cp-2',
      sectionTitle: 'BRIDAL PROCESSION',
      pieceOrText: 'Canon in D Major — Johann Pachelbel',
      performerOrReader: 'Entrance of the Bridal Party & Bride',
      category: 'liturgy'
    },
    {
      id: 'cp-3',
      sectionTitle: 'WELCOME & OPENING PRAYER',
      pieceOrText: 'The Collect of the Day & Nuptial Invocations',
      performerOrReader: 'Rev. Dr. J. N. Kudadzi',
      category: 'liturgy'
    },
    {
      id: 'cp-4',
      sectionTitle: 'SCRIPTURE READING',
      pieceOrText: '1 Corinthians 13: 4–8 & Colossians 3: 12–14',
      performerOrReader: 'Read by Miss Clara Sterling',
      category: 'liturgy'
    },
    {
      id: 'cp-5',
      sectionTitle: 'SONG MINISTRATIONS',
      pieceOrText: '“The Prayer” & “Great Is Thy Faithfulness”',
      performerOrReader: 'Sanctuary Choir & Soloist',
      lyricsExcerpt: 'Lead us to a place, guide us with your grace, to a place where we will be safe.',
      category: 'music'
    },
    {
      id: 'cp-6',
      sectionTitle: 'SERMON & HOMILY',
      pieceOrText: 'The Covenant of Christian Marriage',
      performerOrReader: 'Rev. Michael Aryee',
      category: 'liturgy'
    },
    {
      id: 'cp-7',
      sectionTitle: 'EXCHANGE OF VOWS & RINGS',
      pieceOrText: 'The Solemn Nuptial Consent and Blessing of Rings',
      performerOrReader: 'Martha & Robert (Officiated by Ministers)',
      category: 'vows'
    },
    {
      id: 'cp-8',
      sectionTitle: 'SIGNING OF THE REGISTER',
      pieceOrText: 'Panis Angelicus & Ave Maria — Schubert',
      performerOrReader: 'Choir & Attendants Signing',
      category: 'liturgy'
    },
    {
      id: 'cp-9',
      sectionTitle: 'LOVE OFFERING & THANKSGIVING',
      pieceOrText: 'Congregational Hymn of Praise & Joy',
      performerOrReader: 'Congregation & Musicians',
      category: 'music'
    },
    {
      id: 'cp-10',
      sectionTitle: 'CLOSING PRAYER & BENEDICTION',
      pieceOrText: 'The Lord’s Prayer & Final Blessing of the Couple',
      performerOrReader: 'Rev. Patrick Mensah',
      category: 'liturgy'
    },
    {
      id: 'cp-11',
      sectionTitle: 'RECESSIONAL',
      pieceOrText: 'Wedding March — Mendelssohn',
      performerOrReader: 'Departure of Mr. & Mrs. Hawthorne',
      category: 'music'
    },
    {
      id: 'cp-12',
      sectionTitle: 'CUTTING OF THE CAKE & COCKTAILS',
      pieceOrText: 'Champagne Toast, Hors d’oeuvres & Celebration',
      performerOrReader: 'Manor Lawn & Orangery',
      category: 'reception'
    }
  ],
  bridalParty: {
    officiant: 'The Reverend Canon James Thornton',
    maidOfHonour: 'Miss Clara Sterling',
    bestMan: 'Lord Alexander Hughes',
    bridesmaids: 'Eleanor Vance, Charlotte Montgomery, Sophie Laurent',
    ushers: 'Henry Bennett, Edward Thornton, Thomas Rhodes',
    readers: 'Miss Clara Sterling & Dr. Arthur Pendelton'
  }
};

export const SAMPLE_COUPLES: Array<{
  name: string;
  p1First: string;
  p1Last: string;
  p2First: string;
  p2Last: string;
  date: string;
  venue: string;
  city: string;
  monogram: string;
}> = [
  {
    name: 'Cotswolds Church & Estate (Martha & Robert)',
    p1First: 'Martha',
    p1Last: 'Sinclair',
    p2First: 'Robert',
    p2Last: 'Hawthorne',
    date: 'Saturday, October 24, 2026',
    venue: "St. Mary's Church & Highgrove Manor",
    city: 'Tetbury, Gloucestershire, UK',
    monogram: 'M & R'
  },
  {
    name: 'Tuscany Destination (Eleanor & Julian)',
    p1First: 'Eleanor',
    p1Last: 'Vance',
    p2First: 'Julian',
    p2Last: 'Montgomery',
    date: 'Saturday, October 17, 2026',
    venue: 'Villa Cetinale & Gardens',
    city: 'Siena, Tuscany, Italy',
    monogram: 'E & J'
  },
  {
    name: 'Parisian Chateau (Camille & Sébastien)',
    p1First: 'Camille',
    p1Last: 'Laurent',
    p2First: 'Sébastien',
    p2Last: 'De La Tour',
    date: 'Friday, June 19, 2026',
    venue: 'Château de Villette',
    city: 'Condécourt, Paris, France',
    monogram: 'C & S'
  },
  {
    name: 'New York Editorial (Sophia & Mateo)',
    p1First: 'Sophia',
    p1Last: 'Rhodes',
    p2First: 'Mateo',
    p2Last: 'Castillo',
    date: 'Saturday, September 26, 2026',
    venue: 'The Public Library Astor Hall',
    city: 'Fifth Avenue, New York City',
    monogram: 'S + M'
  },
  {
    name: 'California Coast (Amara & Liam)',
    p1First: 'Amara',
    p1Last: 'Bennett',
    p2First: 'Liam',
    p2Last: 'O’Connor',
    date: 'Sunday, August 9, 2026',
    venue: 'Post Ranch Inn Cliffs',
    city: 'Big Sur, California',
    monogram: 'A & L'
  }
];

export const WEDDING_SUITES: WeddingSuite[] = [
  ...GREETINGS_TEMPLATES,
  {
    id: 'suite-blush-rose-botanical',
    title: 'The Botanical Blush Liturgy',
    category: 'weddings',
    subcategory: 'Garden & Botanical',
    format: 'stationery-suite',
    collectionName: 'Glasshouse & Botanical Gardens',
    tagline: 'Watercolor blush roses, sage eucalyptus & gilded double-line frame',
    description: 'Inspired by romantic garden ceremonies. Features lush hand-painted blush rose and peach peony corner florals, dual-column liturgical service sequence, officiating minister credits, and refined gold hairline framing.',
    styleCategory: 'botanical',
    defaultPalette: COLOR_PALETTES[1], // Noir & Champagne
    defaultFontPreset: 'classic-cormorant',
    defaultMotif: 'blush_rose_corner',
    defaultFloralStyle: 'blush_rose_corner',
    featured: true,
    rating: 5.0,
    downloadCount: 7920,
    accentAccentColor: '#C48383',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Blush Roses', 'Floral Corner', 'Order of Service', 'Eucalyptus', 'Gold Double Frame'],
    defaultScheduleMode: 'order_of_service',
    defaultOrderOfServiceLayout: 'two_column'
  },
  {
    id: 'suite-white-peony-gold',
    title: 'White Peony & Gilded Frame',
    collectionName: 'Château Grandiflora Collection',
    tagline: 'Ivory garden blooms with dual-corner botanicals and letterpress rules',
    description: 'Timeless floral romance featuring layered white garden peonies, olive leaf sprigs, traditional ceremony hymns, and stately two-column order of service layout.',
    styleCategory: 'botanical',
    defaultPalette: COLOR_PALETTES[0], // Tuscan olive & warm linen
    defaultFontPreset: 'cinzel-regal',
    defaultMotif: 'peony_bloom',
    defaultFloralStyle: 'white_peony_corner',
    featured: true,
    rating: 4.98,
    downloadCount: 5630,
    accentAccentColor: '#859B81',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['White Peonies', 'Dual Florals', 'Order of Service', 'Gold Inset'],
    defaultScheduleMode: 'order_of_service',
    defaultOrderOfServiceLayout: 'two_column'
  },
  {
    id: 'suite-wildflower-somerset',
    title: 'Somerset Wildflower Meadow',
    collectionName: 'English Countryside Flora',
    tagline: 'Lavender sprigs, chamomile blossoms, and rustic botanical elegance',
    description: 'Charming meadow floral pattern with delicate botanical accents, ideal for barn, estate, or outdoor country church celebrations.',
    styleCategory: 'botanical',
    defaultPalette: COLOR_PALETTES[3],
    defaultFontPreset: 'modern-playfair',
    defaultMotif: 'wildflower_wreath',
    defaultFloralStyle: 'wildflower_sage_border',
    featured: false,
    rating: 4.95,
    downloadCount: 3840,
    accentAccentColor: '#7E8F7A',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Wildflowers', 'Lavender', 'Meadow', 'Organic Botanical'],
    defaultScheduleMode: 'order_of_service',
    defaultOrderOfServiceLayout: 'single'
  },
  {
    id: 'suite-sage-eucalyptus-gilded',
    title: 'Sage Eucalyptus & Gilded Flora',
    collectionName: 'Orangery & Conservatory Series',
    tagline: 'Dusty sage leaves, silver dollar eucalyptus, and golden botanical accents',
    description: 'Subtle romantic greenery framing with delicate gold-leaf shimmer, clean editorial typography, and understated organic luxury.',
    styleCategory: 'botanical',
    defaultPalette: COLOR_PALETTES[0],
    defaultFontPreset: 'classic-cormorant',
    defaultMotif: 'olive_branch',
    defaultFloralStyle: 'sage_eucalyptus_border',
    featured: true,
    rating: 4.97,
    downloadCount: 4280,
    accentAccentColor: '#6B826B',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Sage Green', 'Eucalyptus', 'Gilded Flora', 'Minimal Organic'],
    defaultScheduleMode: 'order_of_service',
    defaultOrderOfServiceLayout: 'two_column'
  },
  {
    id: 'suite-robert-martha-classic',
    title: 'The Heritage Order of Service',
    collectionName: 'St. Mary’s Tetbury Series',
    tagline: 'Authentic British church ceremony liturgy with refined letterpress rules',
    description: 'Inspired by traditional English country church weddings. Features formal A4 Order of Service layout, hymn verses, nuptial readings, attendant listings, and timeless Roman typography.',
    styleCategory: 'service',
    defaultPalette: COLOR_PALETTES[1], // Noir & Champagne
    defaultFontPreset: 'classic-cormorant',
    defaultMotif: 'cross_or_diamond',
    defaultFloralStyle: 'none',
    featured: true,
    rating: 4.99,
    downloadCount: 6840,
    accentAccentColor: '#1A1A1A',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Order of Service', 'Church Liturgy', 'Martha & Robert', 'British Heritage', 'Letterpress Rules'],
    defaultScheduleMode: 'order_of_service',
    defaultOrderOfServiceLayout: 'single'
  },
  {
    id: 'suite-oxford-cathedral',
    title: 'The Oxford Chapel Liturgy',
    collectionName: 'Bodleian & Radcliffe Heritage',
    tagline: 'Gothic cathedral flourishes, royal crest, and ceremonial hymn typography',
    description: 'Stately academic and cathedral-inspired wedding stationery. Elegant diamond flourishes, traditional ceremony sequence, and ornate monogram crests.',
    styleCategory: 'service',
    defaultPalette: COLOR_PALETTES[0], // Tuscan olive & warm linen
    defaultFontPreset: 'cinzel-regal',
    defaultMotif: 'heritage_crest',
    featured: true,
    rating: 4.97,
    downloadCount: 4150,
    accentAccentColor: '#5E6B56',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Cathedral', 'Royal Crest', 'Choral Liturgy', 'Traditional Ceremony'],
    defaultScheduleMode: 'order_of_service'
  },
  {
    id: 'suite-tuscan-olive',
    title: 'The Tuscan Olive',
    collectionName: 'Villa Cetinale Collection',
    tagline: 'Hand-drawn botanical sprigs on sun-warmed Italian linen',
    description: 'Earthy elegance with delicate hand-sketched olive laurel motifs, timeless serif typography, and soft Roman cursive. Perfect for vineyard, estate, or garden celebrations.',
    styleCategory: 'tuscan',
    defaultPalette: COLOR_PALETTES[0],
    defaultFontPreset: 'classic-cormorant',
    defaultMotif: 'olive_branch',
    featured: true,
    rating: 4.98,
    downloadCount: 4280,
    accentAccentColor: '#5E6B56',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Olive Foliage', 'Vineyard', 'Italian Linen', 'Timeless Luxury']
  },
  {
    id: 'suite-vogue-editorial',
    title: 'The Modern Editorial',
    collectionName: 'Fifth Avenue Studio',
    tagline: 'High-contrast fashion-forward typography with crisp border geometry',
    description: 'Inspired by luxury Parisian fashion spreads and contemporary black-tie galas. Bold Bodoni letterforms paired with clean minimalist lines and elegant gold foil framing.',
    styleCategory: 'editorial',
    defaultPalette: COLOR_PALETTES[1],
    defaultFontPreset: 'editorial-bodoni',
    defaultMotif: 'minimal_geometric',
    featured: true,
    rating: 4.96,
    downloadCount: 5120,
    accentAccentColor: '#1A1A1A',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['High Fashion', 'Black Tie', 'Minimalist Frame', 'Monogram Chic']
  },
  {
    id: 'suite-eucalyptus-arch',
    title: 'Botanical Eucalyptus',
    collectionName: 'Kew Garden Series',
    tagline: 'Lush watercolor greenery arch with gentle gold-leaf illumination',
    description: 'Organic and peaceful eucalyptus sprigs framing your wedding announcements. Soft sage tones combined with delicate golden accents create an effortless natural luxury.',
    styleCategory: 'botanical',
    defaultPalette: COLOR_PALETTES[3],
    defaultFontPreset: 'modern-playfair',
    defaultMotif: 'botanical_arch',
    featured: true,
    rating: 4.94,
    downloadCount: 3890,
    accentAccentColor: '#475C46',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Greenery', 'Garden Wedding', 'Gold Leaf', 'Nature']
  },
  {
    id: 'suite-chateau-rose',
    title: 'Provence Dusty Rose',
    collectionName: 'Côte d’Azur Heritage',
    tagline: 'Romantic French blush tones with cascading royal calligraphy',
    description: 'Soft cashmere and dusty rose pairing with ornate floral crest embellishments and sweeping script. Designed for chateau weddings, romantic ballrooms, and fairytale celebrations.',
    styleCategory: 'romantic',
    defaultPalette: COLOR_PALETTES[2],
    defaultFontPreset: 'classic-cormorant',
    defaultMotif: 'romantic_rose',
    featured: false,
    rating: 4.95,
    downloadCount: 3410,
    accentAccentColor: '#B07575',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Dusty Rose', 'Chateau', 'French Script', 'Floral Crest']
  },
  {
    id: 'suite-art-deco-noir',
    title: 'The Great Gatsby Noir',
    collectionName: 'Metropolitan 1920s',
    tagline: 'Architectural gilded arches and sharp geometric symmetry',
    description: 'Sophisticated 1920s glamour featuring intricate gold foil arch lines and regal Cinzel capitals. Ideal for historic estates, rooftop soirees, and opulent ballroom affairs.',
    styleCategory: 'art-deco',
    defaultPalette: COLOR_PALETTES[1],
    defaultFontPreset: 'cinzel-regal',
    defaultMotif: 'art_deco_lines',
    featured: false,
    rating: 4.92,
    downloadCount: 2980,
    accentAccentColor: '#A68048',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Gatsby Glamour', 'Art Deco Lines', 'Gilded Arch', 'Vintage Luxury']
  },
  {
    id: 'suite-boho-terracotta',
    title: 'Desert Sunset Terracotta',
    collectionName: 'Sedona & Joshua Tree',
    tagline: 'Warm terracotta hues, dry florals, and modern free-spirited warmth',
    description: 'Earthy desert warmth featuring sunset clay tones, arched layouts, and warm organic modern typography. Created for outdoor, mountain, and sun-drenched coastal vows.',
    styleCategory: 'boho',
    defaultPalette: COLOR_PALETTES[5],
    defaultFontPreset: 'modern-playfair',
    defaultMotif: 'wildflower_wreath',
    featured: false,
    rating: 4.91,
    downloadCount: 2650,
    accentAccentColor: '#A6553B',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Terracotta', 'Bohemian', 'Desert Clay', 'Warm Earth']
  },
  {
    id: 'suite-celestial-midnight',
    title: 'Midnight Celestial',
    collectionName: 'Starlight Romance',
    tagline: 'Deep navy twilight skies and silver stardust constellations',
    description: 'Mystical and romantic evening suite with subtle constellation flourishes and shimmering silver accents. Perfect for twilight ceremonies, museum venues, and planetariums.',
    styleCategory: 'regal',
    defaultPalette: COLOR_PALETTES[4],
    defaultFontPreset: 'cinzel-regal',
    defaultMotif: 'monogram_crest',
    featured: false,
    rating: 4.97,
    downloadCount: 3120,
    accentAccentColor: '#314E73',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Midnight Navy', 'Constellations', 'Silver Foil', 'Starry Night']
  },
  {
    id: 'suite-pure-minimalist',
    title: 'Pure Alabaster Monogram',
    collectionName: 'Scandinavian Atelier',
    tagline: 'Unadorned whitespace, immaculate kerning, and architectural balance',
    description: 'For couples who believe less is everything. Pure cotton paper texture, generous margins, and an architectural bespoke monogram that anchors your entire wedding aesthetic.',
    styleCategory: 'minimalist',
    defaultPalette: COLOR_PALETTES[7],
    defaultFontPreset: 'editorial-bodoni',
    defaultMotif: 'monogram_crest',
    featured: false,
    rating: 4.99,
    downloadCount: 4890,
    accentAccentColor: '#495057',
    includedItems: ['invitation', 'rsvp', 'schedule', 'menu', 'thankyou', 'placecard', 'details', 'planner'],
    tags: ['Pure White', 'Ultra Minimal', 'Bespoke Monogram', 'Architectural']
  }
];

export const WORDING_PRESETS = [
  {
    name: 'Formal & Traditional',
    headline: 'TOGETHER WITH THEIR PARENTS',
    subtext: 'REQUEST THE HONOUR OF YOUR PRESENCE AT THE NUPTIAL MASS UNITING',
    reception: 'Reception immediately following the ceremony in the Grand Ballroom.',
    dress: 'Black Tie Formal Attire'
  },
  {
    name: 'Modern & Intimate',
    headline: 'PLEASE JOIN US TO CELEBRATE THE MARRIAGE OF',
    subtext: 'AS WE EXCHANGE VOWS AND BEGIN OUR ADVENTURE TOGETHER',
    reception: 'Cocktails, artisan dinner, and dancing under the stars to follow.',
    dress: 'Cocktail Attire / Smart Elegance'
  },
  {
    name: 'Destination & Romantic',
    headline: 'TOGETHER UNDER THE TUSCAN SUN',
    subtext: 'CORDIALLY INVITE YOU TO WITNESS AND CELEBRATE THEIR UNION',
    reception: 'An evening of Italian wine, regional feasts, and dancing in the courtyard.',
    dress: 'Summer Formal & Garden Party Chic'
  },
  {
    name: 'Poetic & Whimsical',
    headline: 'TWO HEARTS, ONE LIFETIME',
    subtext: 'INVITE YOU TO CELEBRATE LOVE, LAUGHTER, AND HAPPILY EVER AFTER',
    reception: 'Dinner, drinks, and unforgettable merriment until the clock strikes midnight.',
    dress: 'Festive & Romantic Formal Attire'
  }
];
