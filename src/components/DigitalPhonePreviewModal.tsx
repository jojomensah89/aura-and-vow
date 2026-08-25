import React, { useState } from 'react';
import { CoupleDetails, SuiteCustomization, WeddingSuite } from '../types';
import { StationeryCard } from './StationeryCard';
import { X, Calendar, MapPin, Share2, Check, ExternalLink, Heart } from 'lucide-react';
import { WaxSealBadge } from './MotifGraphics';

interface DigitalPhonePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  suite: WeddingSuite;
  details: CoupleDetails;
  customization: SuiteCustomization;
}

export const DigitalPhonePreviewModal: React.FC<DigitalPhonePreviewModalProps> = ({
  isOpen,
  onClose,
  suite,
  details,
  customization
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://ourwedding.celebrate.com/${details.partner1FirstName.toLowerCase()}-${details.partner2FirstName.toLowerCase()}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E0D5C3] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#E8DFC9] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <WaxSealBadge initials={details.monogramText || 'E&J'} />
            <div>
              <h3 className="text-sm font-serif font-semibold text-[#2E241E]">
                Guest Mobile Experience Preview
              </h3>
              <p className="text-[11px] text-[#7A6C5F]">
                How friends & family view your digital wedding invitation
              </p>
            </div>
          </div>
          <button
            id="close-mobile-preview-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Smartphone Bezel Simulator */}
        <div className="p-6 overflow-y-auto flex flex-col items-center bg-[#F4EFE6]">
          <div className="w-[310px] sm:w-[340px] bg-neutral-900 rounded-[38px] p-3 shadow-2xl border-4 border-neutral-700">
            {/* Phone Screen */}
            <div className="bg-[#FAF8F5] rounded-[30px] overflow-hidden flex flex-col min-h-[560px] text-[#2C241E]">
              {/* Dynamic Island / Notch */}
              <div className="pt-2 px-6 flex justify-between items-center text-[10px] text-neutral-400 font-medium">
                <span>9:41</span>
                <div className="w-16 h-3.5 bg-neutral-900 rounded-full" />
                <span>5G 100%</span>
              </div>

              {/* Mobile Content Area */}
              <div className="p-4 space-y-4 overflow-y-auto max-h-[510px]">
                {/* Envelope Top Header */}
                <div className="text-center space-y-1 pt-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C7A6B]">
                    Special Wedding Invitation
                  </span>
                  <h4 className="text-sm font-serif font-medium text-[#2E251E]">
                    {details.partner1FirstName} & {details.partner2FirstName}
                  </h4>
                </div>

                {/* Scaled Invitation Card */}
                <div className="shadow-md rounded-sm overflow-hidden">
                  <StationeryCard
                    suite={suite}
                    cardType="invitation"
                    details={details}
                    customization={customization}
                  />
                </div>

                {/* Interactive Mobile RSVP & Actions */}
                <div className="p-3 bg-white rounded-xl border border-[#EDE5D8] space-y-2.5 text-center shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-xs text-[#8A7968]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{details.weddingDate}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-[11px] text-[#6B5D50]">
                    <MapPin className="w-3 h-3 text-[#A68048]" />
                    <span>{details.venueName}, {details.cityState}</span>
                  </div>

                  {rsvpSent ? (
                    <div className="p-2 bg-emerald-50 text-emerald-800 text-xs rounded-md font-medium flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      RSVP Received with Joy!
                    </div>
                  ) : (
                    <button
                      onClick={() => setRsvpSent(true)}
                      className="w-full py-2 bg-[#3A322B] hover:bg-[#201A16] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      Respond & RSVP Online
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-[#E8DFC9] bg-white flex items-center justify-between text-xs">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-[#FAF6EE] hover:bg-[#F2ECE0] text-[#4A3E34] border border-[#D5C6B1] rounded-md font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Guest Digital Link'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#3A322B] text-white rounded-md font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
