import { toPng, toJpeg } from 'html-to-image';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import { CardItemType, CoupleDetails, SuiteCustomization, WeddingSuite } from '../types';

export const CARD_DIMENSIONS_INCHES: Record<
  CardItemType,
  { width: number; height: number; orientation: 'portrait' | 'landscape'; mmLabel: string }
> = {
  invitation: { width: 5, height: 7, orientation: 'portrait', mmLabel: '127 × 178 mm' },
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
        ? await toPng(node, { quality: 1, pixelRatio: 2.5 })
        : await toJpeg(node, { quality: 0.98, pixelRatio: 2.5 });

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
 * Exports a single stationery card as a high-resolution, print-ready PDF using jsPDF.
 */
export const downloadCardAsPdf = async (
  elementId: string,
  filename: string,
  cardType: CardItemType,
  details?: CoupleDetails,
  customWidth?: number,
  customHeight?: number
): Promise<boolean> => {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Element with id ${elementId} not found for PDF export`);
    return false;
  }

  try {
    // Capture high-fidelity render with high pixel ratio
    const dataUrl = await toPng(node, {
      quality: 1.0,
      pixelRatio: 3.0,
      cacheBust: true
    });

    const dim = CARD_DIMENSIONS_INCHES[cardType] || {
      width: 5,
      height: 7,
      orientation: 'portrait'
    };
    const width = customWidth || dim.width;
    const height = customHeight || dim.height;
    const orientation = width > height ? 'landscape' : 'portrait';

    const pdf = new jsPDF({
      orientation,
      unit: 'in',
      format: [width, height],
      compress: true
    });

    // Set document properties
    pdf.setProperties({
      title: `${details ? `${details.partner1FirstName} & ${details.partner2FirstName} — ` : ''}${filename}`,
      subject: 'Print-Ready Luxury Wedding Stationery Card',
      author: 'Aura & Vow Bespoke Atelier',
      creator: 'Aura & Vow Digital Stationery Studio',
      keywords: 'wedding, invitation, stationery, luxury, print'
    });

    // Add card image to fit page exactly
    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'FAST');

    pdf.save(`${filename}.pdf`);
    triggerCelebration();
    return true;
  } catch (err) {
    console.error('Failed to export card as PDF:', err);
    return false;
  }
};

export const generatePrintGuideText = (suite: WeddingSuite, details: CoupleDetails): string => {
  return `=====================================================
AURA & VOW — BESPOKE DIGITAL WEDDING SUITE
=====================================================
Collection: ${suite.title} (${suite.collectionName})
Couple: ${details.partner1FirstName} ${details.partner1LastName} & ${details.partner2FirstName} ${details.partner2LastName}
Date of Celebration: ${details.weddingDate}
Venue: ${details.venueName}, ${details.cityState}

PRINTING & PAPER RECOMMENDATIONS:
-----------------------------------------------------
1. RECOMMENDED PAPER STOCKS:
   - 120lb - 130lb (300-350 gsm) Heavy Cotton Cardstock (Uncoated / Matte)
   - Handmade Deckled Edge Cotton Paper for rustic luxury or vintage suites
   - Linen Weave finish for tactile richness
   - Eggshell or Warm Natural White (avoid bright harsh blue-white)

2. STANDARD CARD DIMENSIONS:
   - Wedding Invitation: 5" x 7" (A7 standard envelope: 5.25" x 7.25")
   - RSVP Reply Card: 3.5" x 5" (A1 envelope / 4-bar)
   - Order of Events / Schedule: 4" x 9" (or 5" x 7")
   - Dinner Menu: 4" x 9" Tea Length
   - Thank You Note: 4" x 6" or 3.5" x 5" (A6 / A1 envelope)
   - Escort / Place Cards: 3.5" x 2" standard folded or flat tent

3. PRINT VENDOR OPTIONS:
   - Local bespoke print shops (ask for letterpress or hot foil stamping if desired)
   - Online luxury stationery printers: Cards & Pockets, Artifact Uprising, CatPrint, Moo (Cotton 38pt)
   - Home printing: Ensure your inkjet/laser printer supports 300+ gsm cardstock

Thank you for crafting your wedding stationery with Aura & Vow!
May your wedding day be filled with endless love and joy.
=====================================================`;
};

/**
 * Exports the complete 8-piece suite as a unified, high-resolution, multi-page print booklet PDF.
 */
export const exportFullSuitePdf = async (
  suite: WeddingSuite,
  details: CoupleDetails,
  customization: SuiteCustomization,
  renderedCardElements: Array<{
    type: CardItemType;
    elementId: string;
    label: string;
    sizeLabel: string;
  }>
): Promise<boolean> => {
  try {
    // Start with 8.5" x 11" Specimen & Print Overview Sheet
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [8.5, 11],
      compress: true
    });

    pdf.setProperties({
      title: `${details.partner1FirstName} & ${details.partner2FirstName} — Complete Wedding Stationery Suite`,
      subject: `Print-Ready Suite Proof (${suite.title})`,
      author: 'Aura & Vow Atelier',
      creator: 'Aura & Vow Digital Stationery Studio',
      keywords: 'wedding, invitation, suite, print, stationery'
    });

    // PAGE 1: Studio Spec Sheet & Cover
    pdf.setFillColor(250, 246, 240); // #FAF6F0
    pdf.rect(0, 0, 8.5, 11, 'F');

    // Inner decorative frame
    pdf.setDrawColor(216, 199, 181); // #D8C7B5
    pdf.setLineWidth(0.02);
    pdf.rect(0.5, 0.5, 7.5, 10);
    pdf.rect(0.55, 0.55, 7.4, 9.9);

    // Atelier Header
    pdf.setTextColor(110, 85, 65); // #6E5541
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('A U R A  &  V O W   •   B E S P O K E   A T E L I E R', 4.25, 1.1, { align: 'center' });

    pdf.setTextColor(58, 45, 36); // #3A2D24
    pdf.setFont('times', 'bold');
    pdf.setFontSize(26);
    pdf.text('PRINT-READY STATIONERY SUITE', 4.25, 1.6, { align: 'center' });

    pdf.setFont('times', 'italic');
    pdf.setFontSize(14);
    pdf.setTextColor(138, 109, 94);
    pdf.text(
      `${details.partner1FirstName} ${details.partner1LastName}  &  ${details.partner2FirstName} ${details.partner2LastName}`,
      4.25,
      2.05,
      { align: 'center' }
    );

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(100, 85, 75);
    pdf.text(`${details.weddingDate}   •   ${details.venueName}, ${details.cityState}`, 4.25, 2.35, {
      align: 'center'
    });

    // Divider
    pdf.setDrawColor(200, 180, 160);
    pdf.line(2.0, 2.65, 6.5, 2.65);

    // Collection Meta Box
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0.9, 2.9, 6.7, 1.4, 'F');
    pdf.rect(0.9, 2.9, 6.7, 1.4, 'S');

    const activePalette = customization.palette || suite.defaultPalette;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10.5);
    pdf.setTextColor(58, 45, 36);
    pdf.text(`Collection: ${suite.title} (${suite.collectionName})`, 1.15, 3.25);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(90, 75, 65);
    pdf.text(`Color Palette: ${activePalette.name} (${activePalette.tag || 'Luxury'})`, 1.15, 3.55);
    pdf.text(`Foil Accent: ${(activePalette.foil || 'Gold').toUpperCase()}   •   Paper Finish: ${customization.paperFinish || 'Cotton Cardstock'}`, 1.15, 3.85);
    pdf.text(`Botanical Motif: ${customization.motif || suite.defaultMotif || 'Gilded Garden'}   •   Total Pieces: ${renderedCardElements.length} Cards`, 1.15, 4.15);

    // Table of Contents & Sizing Specs
    pdf.setFont('times', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(58, 45, 36);
    pdf.text('Included Suite Pieces & Print Dimensions', 0.9, 4.7);

    let tableY = 5.0;
    renderedCardElements.forEach((item, idx) => {
      const dim = CARD_DIMENSIONS_INCHES[item.type] || { width: 5, height: 7, mmLabel: 'Standard' };
      pdf.setFillColor(idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 245 : 255, idx % 2 === 0 ? 240 : 255);
      pdf.rect(0.9, tableY, 6.7, 0.38, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(58, 45, 36);
      pdf.text(`Page ${idx + 2}.  ${item.label}`, 1.1, tableY + 0.24);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(110, 95, 85);
      pdf.text(`${dim.width}" × ${dim.height}"  (${dim.mmLabel})`, 6.0, tableY + 0.24, { align: 'right' });

      tableY += 0.42;
    });

    // Paper & Print Guidelines
    pdf.setFont('times', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(58, 45, 36);
    pdf.text('Professional Printing Advice:', 0.9, 8.9);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(90, 75, 65);
    const guideLines = [
      '• Paper Stock: We recommend 120–130lb (300–350 gsm) Uncoated Cotton or Linen Cardstock.',
      '• Trim & Bleed: Each following page is formatted to exact finished dimensions for borderless digital & offset presses.',
      '• Color Profile: Calibrated in high-contrast RGB/CMYK gamut matching standard luxury wedding stationers.'
    ];
    guideLines.forEach((gl, i) => {
      pdf.text(gl, 0.9, 9.2 + i * 0.25);
    });

    pdf.setFont('times', 'italic');
    pdf.setFontSize(9);
    pdf.setTextColor(140, 120, 105);
    pdf.text('Crafted with love on Aura & Vow Digital Stationery Studio', 4.25, 10.2, { align: 'center' });

    // PAGES 2+: Add each card in its individual high-resolution print page
    for (let i = 0; i < renderedCardElements.length; i++) {
      const item = renderedCardElements[i];
      const node = document.getElementById(item.elementId);
      if (node) {
        try {
          const dataUrl = await toPng(node, {
            quality: 1.0,
            pixelRatio: 3.0,
            cacheBust: true
          });

          const dim = CARD_DIMENSIONS_INCHES[item.type] || {
            width: 5,
            height: 7,
            orientation: 'portrait'
          };
          const orientation = dim.width > dim.height ? 'landscape' : 'portrait';

          pdf.addPage([dim.width, dim.height], orientation);
          pdf.addImage(dataUrl, 'PNG', 0, 0, dim.width, dim.height, undefined, 'FAST');
        } catch (cardErr) {
          console.warn(`Could not render card ${item.label} to PDF:`, cardErr);
        }
      }
    }

    const filename = `${details.partner1FirstName}-${details.partner2FirstName}-Wedding-Suite-Print-Ready.pdf`;
    pdf.save(filename);
    triggerCelebration();
    return true;
  } catch (err) {
    console.error('Failed to export full suite PDF:', err);
    return false;
  }
};

export const exportFullSuiteZip = async (
  suite: WeddingSuite,
  details: CoupleDetails,
  renderedCardElements: Array<{ type: CardItemType; elementId: string; label: string }>
): Promise<boolean> => {
  try {
    const zip = new JSZip();
    const folderName = `${details.partner1FirstName}-${details.partner2FirstName}-Wedding-Suite`;
    const suiteFolder = zip.folder(folderName) || zip;

    // Add print guidelines text file
    const printGuide = generatePrintGuideText(suite, details);
    suiteFolder.file('00-Print-Guide-and-Paper-Recommendations.txt', printGuide);

    // Capture each rendered card element
    for (let i = 0; i < renderedCardElements.length; i++) {
      const item = renderedCardElements[i];
      const node = document.getElementById(item.elementId);
      if (node) {
        try {
          const dataUrl = await toPng(node, { quality: 1, pixelRatio: 2.5 });
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
          const filename = `${String(i + 1).padStart(2, '0')}-${item.label.replace(/\s+/g, '-')}.png`;
          suiteFolder.file(filename, base64Data, { base64: true });
        } catch (cardErr) {
          console.warn(`Could not render card ${item.label}:`, cardErr);
        }
      }
    }

    // Generate zip blob and trigger download
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${folderName}.zip`;
    link.click();
    URL.revokeObjectURL(url);

    triggerCelebration();
    return true;
  } catch (err) {
    console.error('Failed to generate full suite zip bundle:', err);
    return false;
  }
};
