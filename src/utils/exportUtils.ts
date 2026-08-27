import { toPng, toJpeg } from 'html-to-image';
import gifshot from 'gifshot';
import confetti from 'canvas-confetti';
import { CardItemType } from '../types';

export const CARD_DIMENSIONS_INCHES: Record<
  CardItemType,
  { width: number; height: number; orientation: 'portrait' | 'landscape'; mmLabel: string }
> = {
  invitation: { width: 5, height: 7, orientation: 'portrait', mmLabel: '127 × 178 mm' },
  birthday_card: { width: 5, height: 7, orientation: 'portrait', mmLabel: '127 × 178 mm' },
  baby_card: { width: 5, height: 7, orientation: 'portrait', mmLabel: '127 × 178 mm' },
  holiday_card: { width: 5, height: 7, orientation: 'portrait', mmLabel: '127 × 178 mm' },
  party_card: { width: 5, height: 7, orientation: 'portrait', mmLabel: '127 × 178 mm' },
  greeting_card: { width: 5, height: 7, orientation: 'portrait', mmLabel: '127 × 178 mm' },
  rsvp: { width: 3.5, height: 5, orientation: 'portrait', mmLabel: '89 × 127 mm' },
  details: { width: 4, height: 6, orientation: 'portrait', mmLabel: '102 × 152 mm' },
  schedule: { width: 4, height: 9, orientation: 'portrait', mmLabel: '102 × 229 mm' },
  menu: { width: 4, height: 9, orientation: 'portrait', mmLabel: '102 × 229 mm' },
  thankyou: { width: 4, height: 6, orientation: 'portrait', mmLabel: '102 × 152 mm' },
  placecard: { width: 3.5, height: 2, orientation: 'landscape', mmLabel: '89 × 51 mm' },
  planner: { width: 8.5, height: 11, orientation: 'portrait', mmLabel: '216 × 279 mm' }
};

export const triggerCelebration = () => {
  try {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#E8DCC4', '#5E6B56', '#B07575', '#FAF5EE']
    });
  } catch (e) {
    console.error('Confetti error:', e);
  }
};

/**
 * Downloads the card as a high-resolution PNG or JPEG image.
 */
export const downloadCardAsImage = async (
  elementId: string,
  filename: string,
  format: 'png' | 'jpeg' = 'png'
): Promise<boolean> => {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    const dataUrl =
      format === 'png'
        ? await toPng(node, { quality: 1, pixelRatio: 3, cacheBust: true })
        : await toJpeg(node, { quality: 0.98, pixelRatio: 3, cacheBust: true });

    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = dataUrl;
    link.click();
    triggerCelebration();
    return true;
  } catch (err) {
    console.error('Failed to export card image:', err);
    return false;
  }
};

/**
 * Creates and downloads an animated luxury GIF eCard with subtle shimmer effects.
 */
export const downloadCardAsGif = async (
  elementId: string,
  filename: string
): Promise<boolean> => {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    // Capture base crisp snapshot of the card
    const baseDataUrl = await toPng(node, { quality: 1, pixelRatio: 2, cacheBust: true });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = baseDataUrl;
    await new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    const w = 540;
    const h = Math.round((img.height / img.width) * w);
    canvas.width = w;
    canvas.height = h;

    const numFrames = 10;
    const frames: string[] = [];

    for (let i = 0; i < numFrames; i++) {
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      // Render diagonal soft ambient gold foil shimmer
      const progress = i / numFrames;
      const sweepX = -w + progress * (w * 2.6);
      const gradient = ctx.createLinearGradient(sweepX, 0, sweepX + 160, h);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.08)');
      gradient.addColorStop(0.5, 'rgba(255, 245, 210, 0.28)');
      gradient.addColorStop(0.65, 'rgba(255, 255, 255, 0.08)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      frames.push(canvas.toDataURL('image/jpeg', 0.88));
    }

    return new Promise((resolve) => {
      gifshot.createGIF(
        {
          images: frames,
          gifWidth: w,
          gifHeight: h,
          interval: 0.12,
          numFrames: numFrames,
          sampleInterval: 10
        },
        (obj: any) => {
          if (!obj.error) {
            const animatedImage = obj.image;
            const link = document.createElement('a');
            link.download = `${filename}.gif`;
            link.href = animatedImage;
            link.click();
            triggerCelebration();
            resolve(true);
          } else {
            console.error('GIF generation error:', obj.error);
            // Fallback to PNG download
            downloadCardAsImage(elementId, filename, 'png');
            resolve(false);
          }
        }
      );
    });
  } catch (err) {
    console.error('Failed to create animated GIF:', err);
    // Fallback to PNG
    downloadCardAsImage(elementId, filename, 'png');
    return false;
  }
};

