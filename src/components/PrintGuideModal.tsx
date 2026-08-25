import React from 'react';
import { X, Printer, Layers, Scissors, Check, Sparkles, BookOpen } from 'lucide-react';

interface PrintGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintGuideModal: React.FC<PrintGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E0D5C3] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFC9] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#E5D7C2] flex items-center justify-center text-[#8A7968]">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-semibold text-[#2E241E]">
                Fine Art Paper & Printing Guide
              </h3>
              <p className="text-xs text-[#7A6C5F]">
                Expert advice for printing your downloaded wedding suites
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#524438] leading-relaxed">
          {/* Card Dimensions & Envelopes */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#30251E] flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-[#8A7968]" />
              Standard Dimensions & Matching Envelopes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-white rounded-lg border border-[#EDE3D4] space-y-1">
                <div className="font-semibold text-[#2B231D]">Main Wedding Invitation</div>
                <div className="text-[11px] text-[#7A6A5C]">5" × 7" (127 × 178 mm)</div>
                <div className="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-sm inline-block">
                  Pairs with A7 Envelope (5.25" × 7.25")
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#EDE3D4] space-y-1">
                <div className="font-semibold text-[#2B231D]">RSVP & Response Card</div>
                <div className="text-[11px] text-[#7A6A5C]">3.5" × 5" (89 × 127 mm)</div>
                <div className="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-sm inline-block">
                  Pairs with A1 Envelope (4-Bar: 3.625" × 5.125")
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#EDE3D4] space-y-1">
                <div className="font-semibold text-[#2B231D]">Day-of Schedule & Menu</div>
                <div className="text-[11px] text-[#7A6A5C]">4" × 9" (102 × 229 mm) Tea Length</div>
                <div className="text-[10px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-sm inline-block">
                  Pairs with #10 Policy Envelope or Plate Display
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#EDE3D4] space-y-1">
                <div className="font-semibold text-[#2B231D]">Thank You & Details Card</div>
                <div className="text-[11px] text-[#7A6A5C]">4" × 6" (102 × 152 mm)</div>
                <div className="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-sm inline-block">
                  Pairs with A6 Envelope (4.75" × 6.5")
                </div>
              </div>
            </div>
          </div>

          {/* Paper Weight & Texture Recommendations */}
          <div className="space-y-3 pt-4 border-t border-[#E8DFC9]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#30251E] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#8A7968]" />
              Recommended Paper Stocks & Weights
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg border border-[#EDE3D4] space-y-1">
                <span className="font-semibold text-[#2B231D] block">
                  1. 120lb - 130lb (300-350 gsm) Heavy Cotton Cardstock
                </span>
                <p className="text-[11px] text-[#736355]">
                  The gold standard of luxury bridal stationery. Provides substantial hand-feel, rich tactile absorption for inks, and completely prevents warping or light bleed-through.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#EDE3D4] space-y-1">
                <span className="font-semibold text-[#2B231D] block">
                  2. Handmade Deckled-Edge Cotton (Feathered Border)
                </span>
                <p className="text-[11px] text-[#736355]">
                  Authentic rough deckled edges offer old-world romance and vintage charm. Excellent for vineyard, chateau, and romantic floral themes.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#EDE3D4] space-y-1">
                <span className="font-semibold text-[#2B231D] block">
                  3. Color Tone Recommendation: Natural Warm White / Eggshell
                </span>
                <p className="text-[11px] text-[#736355]">
                  Opt for soft cream or eggshell whites rather than harsh fluorescent optical blue-whites to achieve a gentle, timeless finish.
                </p>
              </div>
            </div>
          </div>

          {/* Where to Print */}
          <div className="space-y-3 pt-4 border-t border-[#E8DFC9]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#30251E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8A7968]" />
              Recommended Printing Vendors
            </h4>
            <div className="p-3.5 bg-[#FAF5EE] rounded-lg border border-[#E0D4C1] space-y-2 text-[11px]">
              <p>
                <strong>Local Print Artisans:</strong> Search your local area for boutique letterpress or fine art print shops if you desire hot foil stamping or embossed debossing.
              </p>
              <p>
                <strong>Online Fine Stationery Printers:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1 text-[#665749]">
                <li><strong>Cards & Pockets</strong> (Specializes in custom cardstock sizes, pocketfolds, and euro flap envelopes)</li>
                <li><strong>Artifact Uprising</strong> (Premium Mohawk superfine eggshell paper)</li>
                <li><strong>CatPrint</strong> (Heavy cotton paper stocks with real foil options)</li>
                <li><strong>Moo.com</strong> (38pt Luxe Cotton paper with colored seam cores)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8DFC9] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#3A322B] text-white rounded-md text-xs font-medium cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
