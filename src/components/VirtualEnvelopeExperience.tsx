import React, { useState } from 'react';
import { GreetingTemplate, CardGeneralDetails, SuiteCustomization, GuestRSVPResponse } from '../types';
import { StationeryCard } from './StationeryCard';
import { X, Sparkles, Send, CheckCircle2, Heart, Share2, Copy, MessageSquare, Volume2, VolumeX, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VirtualEnvelopeExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  template: GreetingTemplate;
  details: CardGeneralDetails;
  customization: SuiteCustomization;
  onAddRSVPResponse?: (response: GuestRSVPResponse) => void;
  existingRSVPs?: GuestRSVPResponse[];
}

export const VirtualEnvelopeExperience: React.FC<VirtualEnvelopeExperienceProps> = ({
  isOpen,
  onClose,
  template,
  details,
  customization,
  onAddRSVPResponse,
  existingRSVPs = []
}) => {
  const [envelopeState, setEnvelopeState] = useState<'sealed' | 'opening' | 'open' | 'card_revealed'>('sealed');
  const [foldedCardOpen, setFoldedCardOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'rsvp' | 'wishes'>('card');

  // Interactive guest RSVP form
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [guestCount, setGuestCount] = useState(1);
  const [dietary, setDietary] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  if (!isOpen) return null;

  const isFolded = template.format === 'folded-card';
  const envelope = customization.envelope || {
    envelopeColor: '#F6F3EC',
    linerPattern: 'botanical',
    sealType: 'wax-monogram',
    sealColor: '#A68048',
    addressedTo: 'Honored Guest',
    stampDesign: 'vintage-flower'
  };

  const handleOpenEnvelope = () => {
    if (envelopeState !== 'sealed') return;
    setEnvelopeState('opening');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#EAD5D5', '#5E6B56', '#FAF8F5']
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setEnvelopeState('open');
      setTimeout(() => {
        setEnvelopeState('card_revealed');
      }, 500);
    }, 700);
  };

  const handleCopyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newResponse: GuestRSVPResponse = {
      id: `rsvp-${Date.now()}`,
      guestName: guestName.trim(),
      attending,
      guestCount: attending ? guestCount : 0,
      dietaryRestrictions: dietary.trim() || undefined,
      message: guestMessage.trim() || undefined,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    if (onAddRSVPResponse) {
      onAddRSVPResponse(newResponse);
    }
    setRsvpSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#5E6B56', '#C5A059', '#FFFFFF']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div
      id="virtual-envelope-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E8DFC9] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFC9] bg-white/80 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FAF4EA] border border-[#DED3C1] flex items-center justify-center text-[#8C7A6B]">
              <Mail className="w-4 h-4 text-[#A68048]" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-[#2C241E]">
                Digital eCard & Virtual Envelope
              </h3>
              <p className="text-[11px] text-[#7A6C5F]">
                {template.title} · Interactive Paperless Experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShareLink}
              className="px-3 py-1.5 bg-[#FAF6EF] hover:bg-[#F2ECE1] text-[#4A3E34] text-xs font-medium rounded-full border border-[#D8CDBC] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#8A7968]" />
                  <span>Share eCard</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#7A6C5F] hover:text-[#2C241E] hover:bg-[#F0EBE1] rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#F4EFE6] border-b border-[#E8DFC9] text-xs">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
              activeTab === 'card'
                ? 'bg-[#3A322B] text-white shadow-xs'
                : 'text-[#6B5A4B] hover:bg-white/60'
            }`}
          >
            💌 Envelope & Card
          </button>

          <button
            onClick={() => setActiveTab('rsvp')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rsvp'
                ? 'bg-[#3A322B] text-white shadow-xs'
                : 'text-[#6B5A4B] hover:bg-white/60'
            }`}
          >
            <span>✍️ RSVP & Guest Attendance</span>
            {existingRSVPs.length > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[10px]">
                {existingRSVPs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('wishes')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
              activeTab === 'wishes'
                ? 'bg-[#3A322B] text-white shadow-xs'
                : 'text-[#6B5A4B] hover:bg-white/60'
            }`}
          >
            🤍 Guestbook & Wishes ({existingRSVPs.filter((r) => r.message).length})
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gradient-to-b from-[#FAF8F5] to-[#F3EEE3]">
          {/* TAB 1: INTERACTIVE ENVELOPE & CARD */}
          {activeTab === 'card' && (
            <div className="flex flex-col items-center justify-center space-y-6 min-h-[480px]">
              {/* Envelope closed stage */}
              {envelopeState === 'sealed' && (
                <div className="flex flex-col items-center space-y-4 text-center animate-fade-in">
                  <p className="text-xs text-[#7A6C5F] uppercase tracking-[0.2em] font-medium">
                    Click the wax seal to open your invitation
                  </p>

                  <div
                    onClick={handleOpenEnvelope}
                    className="relative w-80 sm:w-96 h-56 rounded-2xl shadow-xl border border-[#D9CEBA] flex flex-col justify-between p-6 cursor-pointer hover:scale-[1.02] transition-transform select-none group"
                    style={{ backgroundColor: envelope.envelopeColor }}
                  >
                    {/* Envelope Flap Line */}
                    <div className="absolute top-0 inset-x-0 h-24 border-b border-[#D8CCB8] clip-envelope-flap bg-black/[0.02]" />

                    {/* Stamp */}
                    <div className="self-end w-12 h-14 bg-white border border-[#D5C9B4] rounded-xs shadow-2xs flex flex-col items-center justify-center p-1 rotate-1">
                      <Sparkles className="w-4 h-4 text-[#A68048]" />
                      <span className="text-[7px] font-mono tracking-widest text-[#8C7A6B] mt-1">
                        POST 2026
                      </span>
                    </div>

                    {/* Recipient line */}
                    <div className="my-auto text-center space-y-1">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-[#8C7A6B] font-mono">
                        SPECIAL DELIVERY FOR
                      </p>
                      <h4 className="text-xl font-cormorant italic text-[#3A3027] font-semibold">
                        {envelope.addressedTo || details.placeCardGuestName || 'Our Honored Guest'}
                      </h4>
                    </div>

                    {/* Central Wax Seal */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group-hover:scale-110 transition-transform">
                      <div
                        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-amber-100 font-serif font-bold text-sm select-none"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, #D4AF37, ${envelope.sealColor}, #5C4010)`,
                          boxShadow: '0 6px 16px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.4)'
                        }}
                      >
                        <span className="font-cormorant italic tracking-wider text-base drop-shadow-sm">
                          {details.monogramText || '✦'}
                        </span>
                      </div>
                    </div>

                    <div className="text-[9px] text-[#A39281] font-mono text-center tracking-widest">
                      ISLE & NOTE · BESPOKE DIGITAL STATIONERY
                    </div>
                  </div>
                </div>
              )}

              {/* Envelope opening transition & Card presentation */}
              {(envelopeState === 'opening' || envelopeState === 'open' || envelopeState === 'card_revealed') && (
                <div className="w-full flex flex-col items-center space-y-6">
                  {/* Action Controls for Folded Card */}
                  {isFolded && (
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#DED3C1] shadow-2xs">
                      <span className="text-xs font-medium text-[#6B5A4B]">Folded Card Mode:</span>
                      <button
                        onClick={() => setFoldedCardOpen(false)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors cursor-pointer ${
                          !foldedCardOpen
                            ? 'bg-[#3A322B] text-white font-medium'
                            : 'text-[#6B5A4B] hover:bg-[#FAF6EF]'
                        }`}
                      >
                        Front Cover
                      </button>
                      <button
                        onClick={() => setFoldedCardOpen(true)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors cursor-pointer ${
                          foldedCardOpen
                            ? 'bg-[#3A322B] text-white font-medium'
                            : 'text-[#6B5A4B] hover:bg-[#FAF6EF]'
                        }`}
                      >
                        Inside Message 📖
                      </button>
                    </div>
                  )}

                  {/* Card Display Container */}
                  <div className="relative transform transition-all duration-500 hover:scale-[1.01]">
                    {!isFolded || !foldedCardOpen ? (
                      <StationeryCard
                        suite={template}
                        cardType={template.includedItems[0] || 'invitation'}
                        details={details}
                        customization={customization}
                        domId="virtual-ecard-front"
                      />
                    ) : (
                      /* Folded Inside Spread */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl bg-white p-6 sm:p-8 rounded-sm shadow-xl border border-[#E3DAC8]">
                        {/* Inside Left */}
                        <div className="flex flex-col justify-center items-center text-center p-4 border-r border-[#EFE8DA]">
                          <p className="font-cormorant italic text-base sm:text-lg text-[#5A4E43] leading-relaxed">
                            {details.insideLeftText ||
                              '“A gentle warmth that stays forever in the memories made with loved ones.”'}
                          </p>
                        </div>

                        {/* Inside Right (Personal Note) */}
                        <div className="flex flex-col justify-between p-4 space-y-4 text-left">
                          <p className="text-xs sm:text-sm font-sans text-[#3A3027] leading-relaxed whitespace-pre-line font-medium">
                            {details.insideRightMessage ||
                              `Dear Friends & Family,\n\nWe cannot wait to celebrate this special day with you. Your presence means the world to us.\n\nWith all our love,`}
                          </p>
                          <div className="pt-3 border-t border-[#EFE8DA] text-right">
                            <span className="font-script-pinyon text-2xl text-[#8E3B3B] block">
                              {details.senderSignoff || `${details.partner1FirstName} & ${details.partner2FirstName}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Prompts */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('rsvp')}
                      className="px-5 py-2.5 bg-[#3A322B] hover:bg-[#231E1A] text-white text-xs font-semibold rounded-full shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply with RSVP</span>
                    </button>

                    <button
                      onClick={handleCopyShareLink}
                      className="px-4 py-2.5 bg-white hover:bg-[#FAF6EF] text-[#4A3E34] text-xs font-medium rounded-full border border-[#D8CDBC] shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#8A7968]" />
                      <span>{copiedLink ? 'Link Copied!' : 'Copy Shareable Link'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GUEST RSVP FORM & RESPONSES */}
          {activeTab === 'rsvp' && (
            <div className="max-w-xl mx-auto space-y-6">
              {!rsvpSubmitted ? (
                <form
                  onSubmit={handleRSVPSubmit}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DAC8] shadow-sm space-y-5"
                >
                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-serif font-bold text-[#2C241E]">
                      Kindly Respond
                    </h3>
                    <p className="text-xs text-[#7A6C5F]">
                      Please submit your attendance by {details.rsvpDeadline || 'the requested deadline'}.
                    </p>
                  </div>

                  {/* Attendance Toggle */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#4A3E34]">
                      Will you be attending?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        className={`py-3 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          attending
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold shadow-2xs'
                            : 'bg-[#FAF8F5] border-[#DED3C1] text-[#6B5A4B]'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Joyfully Accepts</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        className={`py-3 px-4 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          !attending
                            ? 'bg-amber-50 border-amber-500 text-amber-800 font-semibold shadow-2xs'
                            : 'bg-[#FAF8F5] border-[#DED3C1] text-[#6B5A4B]'
                        }`}
                      >
                        <X className="w-4 h-4 text-amber-600" />
                        <span>Regretfully Declines</span>
                      </button>
                    </div>
                  </div>

                  {/* Guest Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#4A3E34]">
                      Full Name(s) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord & Lady Harrington"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CDBC] bg-[#FAF8F5] text-xs text-[#2C241E] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968]"
                    />
                  </div>

                  {/* Guest Count (if attending) */}
                  {attending && (
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#4A3E34]">
                        Total Number of Guests Attending
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CDBC] bg-[#FAF8F5] text-xs text-[#2C241E] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968]"
                      >
                        <option value={1}>1 Guest (Just me)</option>
                        <option value={2}>2 Guests (Me + Plus One)</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests (Family)</option>
                      </select>
                    </div>
                  )}

                  {/* Dietary Requirements */}
                  {attending && (
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-[#4A3E34]">
                        Dietary Notes / Allergies (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Vegetarian, Gluten-Free, Nut allergy"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CDBC] bg-[#FAF8F5] text-xs text-[#2C241E] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968]"
                      />
                    </div>
                  )}

                  {/* Heartfelt Message */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#4A3E34]">
                      Message to the Hosts / Wishes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share a sweet congratulatory note or memory..."
                      value={guestMessage}
                      onChange={(e) => setGuestMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CDBC] bg-[#FAF8F5] text-xs text-[#2C241E] focus:outline-hidden focus:ring-1 focus:ring-[#8A7968]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#3A322B] hover:bg-[#231E1A] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send RSVP Response</span>
                  </button>
                </form>
              ) : (
                <div className="bg-white p-8 rounded-2xl border border-emerald-200 text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#2C241E]">
                    RSVP Confirmed!
                  </h3>
                  <p className="text-xs text-[#6B5A4B] max-w-sm mx-auto leading-relaxed">
                    Thank you, {guestName}. Your response has been recorded and sent to the hosts.
                  </p>
                  <button
                    onClick={() => setRsvpSubmitted(false)}
                    className="px-4 py-2 bg-[#FAF6EF] text-[#4A3E34] text-xs font-medium rounded-full border border-[#D8CDBC] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  >
                    Edit Response
                  </button>
                </div>
              )}

              {/* Live RSVP Tally */}
              {existingRSVPs.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-[#E5DAC8] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EFE8DA] pb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3E34]">
                      Guest Attendance Tracker ({existingRSVPs.length} Total Replies)
                    </h4>
                    <span className="text-xs text-emerald-700 font-semibold">
                      {existingRSVPs.filter((r) => r.attending).reduce((acc, r) => acc + r.guestCount, 0)} Attending
                    </span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {existingRSVPs.map((rsvp) => (
                      <div
                        key={rsvp.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE2D2] text-xs"
                      >
                        <div>
                          <span className="font-semibold text-[#2C241E] block">
                            {rsvp.guestName}
                          </span>
                          <span className="text-[10px] text-[#7A6C5F]">
                            {rsvp.attending ? `Attending (${rsvp.guestCount} guests)` : 'Declined'} · {rsvp.submittedAt}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            rsvp.attending
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {rsvp.attending ? 'Accepted' : 'Declined'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GUESTBOOK & WISHES WALL */}
          {activeTab === 'wishes' && (
            <div className="max-w-xl mx-auto space-y-4">
              <div className="text-center space-y-1 pb-2">
                <h3 className="text-xl font-serif font-bold text-[#2C241E]">
                  Guestbook & Warm Wishes
                </h3>
                <p className="text-xs text-[#7A6C5F]">
                  Heartfelt messages and blessings shared by friends and family.
                </p>
              </div>

              {existingRSVPs.filter((r) => r.message).length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-[#E5DAC8] text-center space-y-2">
                  <Heart className="w-8 h-8 text-[#A68048] mx-auto opacity-60" />
                  <p className="text-xs text-[#7A6C5F]">
                    No wishes left yet. Be the first to leave a message in the RSVP tab!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {existingRSVPs
                    .filter((r) => r.message)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 sm:p-5 rounded-xl border border-[#E5DAC8] shadow-2xs space-y-2 text-left"
                      >
                        <p className="text-xs text-[#3A3027] italic leading-relaxed">
                          “{item.message}”
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-[#8C7A6B] border-t border-[#F2ECE1] pt-2">
                          <span className="font-semibold text-[#4A3E34]">{item.guestName}</span>
                          <span>{item.submittedAt}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
