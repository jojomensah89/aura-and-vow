import blushRoseBorderImg from '../assets/images/blush_rose_border_1787655169985.jpg';
import blushGoldArchImg from '../assets/images/blush_gold_arch_1787655507711.jpg';
import whitePeonyFrameImg from '../assets/images/white_peony_frame_1787655183553.jpg';
import ivoryRanunculusWreathImg from '../assets/images/ivory_ranunculus_wreath_1787655521984.jpg';
import wildflowerSageBorderImg from '../assets/images/wildflower_sage_border_1787655197514.jpg';
import sageEucalyptusBorderImg from '../assets/images/sage_eucalyptus_border_1787655213038.jpg';
import dustyRoseMauveImg from '../assets/images/dusty_rose_mauve_1787655533967.jpg';
import champagneMagnoliaImg from '../assets/images/champagne_magnolia_1787655542669.jpg';

// Card-specific tailored individual stationery artwork
import rsvpFloralHeaderImg from '../assets/images/rsvp_floral_header_1787657285261.jpg';
import menuTallBotanicalImg from '../assets/images/menu_tall_botanical_1787657299969.jpg';
import placecardRoseFlourishImg from '../assets/images/placecard_rose_flourish_1787657319555.jpg';
import thankyouWreathCrestImg from '../assets/images/thankyou_wreath_crest_1787657333771.jpg';
import { CardItemType } from '../types';

export interface FloralBorderAsset {
  id: string;
  name: string;
  category: 'blush' | 'ivory' | 'sage' | 'mauve' | 'wildflower';
  paletteDescription: string;
  description: string;
  imageUrl: string;
  recommendedBorder: string;
  recommendedFoil: 'gold' | 'rose-gold' | 'silver' | 'none';
  tags: string[];
  aspectRatioHint?: string;
  mood: string;
  cardSpecificImages?: Partial<Record<CardItemType, string>>;
}

export const FLORAL_BORDER_ASSETS: FloralBorderAsset[] = [
  {
    id: 'blush_rose_border',
    name: 'Blush Rose & Peach Peonies',
    category: 'blush',
    paletteDescription: 'Soft Blush Pink, Peach Ranunculus & Sage Eucalyptus',
    description: 'High-resolution watercolor border with delicate English garden roses, peach blooms, sage greenery, and subtle gilded accents on warm ivory cotton paper.',
    imageUrl: blushRoseBorderImg,
    recommendedBorder: 'indented-corner-gold',
    recommendedFoil: 'rose-gold',
    tags: ['Blush Pink', 'Garden Rose', 'Romantic', 'Eucalyptus', 'Gold Accents'],
    mood: 'Romantic Garden Romance',
    cardSpecificImages: {
      invitation: blushRoseBorderImg,
      rsvp: rsvpFloralHeaderImg,
      menu: menuTallBotanicalImg,
      schedule: menuTallBotanicalImg,
      thankyou: thankyouWreathCrestImg,
      placecard: placecardRoseFlourishImg,
      details: rsvpFloralHeaderImg,
      planner: rsvpFloralHeaderImg
    }
  },
  {
    id: 'blush_gold_arch',
    name: 'Blush Rose & Gilded Botanical Arch',
    category: 'blush',
    paletteDescription: 'Petal Blush, Peach Rosebuds & Shimmering Gold Foil Sprigs',
    description: 'Cascading watercolor floral arch framing the upper crown and side borders with blush roses and radiant gilded botanicals.',
    imageUrl: blushGoldArchImg,
    recommendedBorder: 'indented-corner-gold',
    recommendedFoil: 'gold',
    tags: ['Floral Arch', 'Blush & Gold', 'Gilded Twigs', 'Royal Romance'],
    mood: 'Fairytale Ballroom & Orangery',
    cardSpecificImages: {
      invitation: blushGoldArchImg,
      rsvp: rsvpFloralHeaderImg,
      menu: menuTallBotanicalImg,
      schedule: menuTallBotanicalImg,
      thankyou: thankyouWreathCrestImg,
      placecard: placecardRoseFlourishImg,
      details: rsvpFloralHeaderImg,
      planner: rsvpFloralHeaderImg
    }
  },
  {
    id: 'white_peony_frame',
    name: 'White Peony & Gilded Olive',
    category: 'ivory',
    paletteDescription: 'Ivory White Peonies, Silver Dollar Eucalyptus & Olive',
    description: 'Refined dual-corner watercolor framing with lush ivory garden peonies, dusty olive sprigs, and airy wash for stately cathedral or estate weddings.',
    imageUrl: whitePeonyFrameImg,
    recommendedBorder: 'classic-church-rule',
    recommendedFoil: 'gold',
    tags: ['White Peony', 'Ivory', 'Olive Branches', 'Château', 'Classic'],
    mood: 'Timeless Cathedral & Estate',
    cardSpecificImages: {
      invitation: whitePeonyFrameImg,
      rsvp: rsvpFloralHeaderImg,
      menu: menuTallBotanicalImg,
      schedule: menuTallBotanicalImg,
      thankyou: thankyouWreathCrestImg,
      placecard: placecardRoseFlourishImg,
      details: rsvpFloralHeaderImg,
      planner: rsvpFloralHeaderImg
    }
  },
  {
    id: 'ivory_ranunculus_wreath',
    name: 'Ivory Ranunculus & Champagne Sprigs',
    category: 'ivory',
    paletteDescription: 'Warm Ivory Ranunculus, White Roses & Champagne Gold Leaves',
    description: 'Delicate floral perimeter garland with warm ivory petals, white ranunculus, pale olive foliage, and gilded champagne accents.',
    imageUrl: ivoryRanunculusWreathImg,
    recommendedBorder: 'double-line-inset',
    recommendedFoil: 'gold',
    tags: ['Ranunculus', 'Champagne Flora', 'Warm Ivory', 'Subtle Gold'],
    mood: 'Chic Modern Elegance',
    cardSpecificImages: {
      invitation: ivoryRanunculusWreathImg,
      rsvp: rsvpFloralHeaderImg,
      menu: menuTallBotanicalImg,
      schedule: menuTallBotanicalImg,
      thankyou: thankyouWreathCrestImg,
      placecard: placecardRoseFlourishImg,
      details: rsvpFloralHeaderImg,
      planner: rsvpFloralHeaderImg
    }
  },
  {
    id: 'sage_eucalyptus_border',
    name: 'Sage Eucalyptus & Gilded Foliage',
    category: 'sage',
    paletteDescription: 'Dusty Sage, Silver Leaves, Olive Sprigs & Golden Twigs',
    description: 'Organic minimalist botanical garland border with gentle eucalyptus leaves and fine shimmering golden botanical elements.',
    imageUrl: sageEucalyptusBorderImg,
    recommendedBorder: 'indented-corner-gold',
    recommendedFoil: 'gold',
    tags: ['Eucalyptus', 'Sage Green', 'Botanical Arch', 'Minimal Organic'],
    mood: 'Understated Organic Luxury',
    cardSpecificImages: {
      invitation: sageEucalyptusBorderImg,
      rsvp: rsvpFloralHeaderImg,
      menu: menuTallBotanicalImg,
      schedule: menuTallBotanicalImg,
      thankyou: thankyouWreathCrestImg,
      placecard: placecardRoseFlourishImg,
      details: rsvpFloralHeaderImg,
      planner: rsvpFloralHeaderImg
    }
  },
  {
    id: 'wildflower_sage_border',
    name: 'Somerset Wildflower Meadow',
    category: 'wildflower',
    paletteDescription: 'Pastel Lilac, Chamomile, Lavender & Meadow Herbs',
    description: 'Enchanting botanical watercolor border adorned with English countryside wildflowers, sweet peas, and soft lavender sprigs.',
    imageUrl: wildflowerSageBorderImg,
    recommendedBorder: 'double-line-inset',
    recommendedFoil: 'gold',
    tags: ['Wildflower', 'Lavender', 'Country Barn', 'Meadow', 'Pastel'],
    mood: 'English Countryside & Rustic Manor',
    cardSpecificImages: {
      invitation: wildflowerSageBorderImg,
      rsvp: rsvpFloralHeaderImg,
      menu: menuTallBotanicalImg,
      schedule: menuTallBotanicalImg,
      thankyou: thankyouWreathCrestImg,
      placecard: placecardRoseFlourishImg,
      details: rsvpFloralHeaderImg,
      planner: rsvpFloralHeaderImg
    }
  },
  {
    id: 'dusty_rose_mauve',
    name: 'Dusty Rose & Antique Mauve Garland',
    category: 'mauve',
    paletteDescription: 'Antique Dusty Rose, Soft Mauve Blossoms & Frosted Sage',
    description: 'Deep romantic watercolor garland combining antique dusty rose tea roses, soft mauve blossoms, and frosted eucalyptus.',
    imageUrl: dustyRoseMauveImg,
    recommendedBorder: 'vintage-flourish-frame',
    recommendedFoil: 'rose-gold',
    tags: ['Dusty Rose', 'Mauve', 'Antique Romance', 'Frosted Sage'],
    mood: 'Vintage Romance & Twilight Manor',
    cardSpecificImages: {
      invitation: dustyRoseMauveImg,
      rsvp: rsvpFloralHeaderImg,
      menu: menuTallBotanicalImg,
      schedule: menuTallBotanicalImg,
      thankyou: thankyouWreathCrestImg,
      placecard: placecardRoseFlourishImg,
      details: rsvpFloralHeaderImg,
      planner: rsvpFloralHeaderImg
    }
  },
  {
    id: 'champagne_magnolia',
    name: 'Champagne Magnolia & Cream Petals',
    category: 'ivory',
    paletteDescription: 'Champagne Magnolia, Cream Petals & Soft Sage Greenery',
    description: 'Graceful fine-art watercolor border featuring cream magnolia blossoms and subtle golden specks around an open canvas.',
    imageUrl: champagneMagnoliaImg,
    recommendedBorder: 'classic-church-rule',
    recommendedFoil: 'gold',
    tags: ['Magnolia', 'Champagne', 'Cream', 'Fine Art'],
    mood: 'Fine Art Luxury & Garden Villa',
    cardSpecificImages: {
      invitation: champagneMagnoliaImg,
      rsvp: rsvpFloralHeaderImg,
      menu: menuTallBotanicalImg,
      schedule: menuTallBotanicalImg,
      thankyou: thankyouWreathCrestImg,
      placecard: placecardRoseFlourishImg,
      details: rsvpFloralHeaderImg,
      planner: rsvpFloralHeaderImg
    }
  }
];

export const getFloralAssetById = (id: string): FloralBorderAsset | undefined => {
  return FLORAL_BORDER_ASSETS.find((asset) => asset.id === id);
};

export const getCardFloralImage = (
  asset: FloralBorderAsset | undefined,
  cardType: CardItemType
): string | undefined => {
  if (!asset) return undefined;
  if (asset.cardSpecificImages && asset.cardSpecificImages[cardType]) {
    return asset.cardSpecificImages[cardType];
  }
  return asset.imageUrl;
};
