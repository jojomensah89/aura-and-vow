import React from 'react';
import { FloralStyle, FoilType } from '../types';

interface FloralCornerProps {
  style: FloralStyle;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'both-corners';
  className?: string;
  foil?: FoilType;
}

export const FloralCornerArtwork: React.FC<FloralCornerProps> = ({
  style,
  position = 'top-left',
  className = '',
  foil = 'none'
}) => {
  if (style === 'none') return null;

  const renderArtwork = (pos: 'tl' | 'tr' | 'bl' | 'br') => {
    // Rotation & flip based on corner position
    let transformClass = '';
    if (pos === 'tr') transformClass = 'scale-x-[-1]';
    if (pos === 'bl') transformClass = 'scale-y-[-1]';
    if (pos === 'br') transformClass = 'scale-x-[-1] scale-y-[-1]';

    if (style === 'blush_rose_corner' || style === 'dual_corner_roses') {
      return (
        <div className={`pointer-events-none ${transformClass}`}>
          <svg
            width="175"
            height="175"
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 sm:w-36 md:w-44 h-auto drop-shadow-xs"
          >
            <defs>
              {/* Radial gradients for soft watercolor rose petals */}
              <radialGradient id="roseBlush1" cx="45%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#FFF1EC" />
                <stop offset="35%" stopColor="#F8D3CE" />
                <stop offset="70%" stopColor="#EAA59F" />
                <stop offset="100%" stopColor="#D98A84" />
              </radialGradient>
              
              <radialGradient id="rosePeach" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFF7F2" />
                <stop offset="40%" stopColor="#FCE0D4" />
                <stop offset="80%" stopColor="#F5BEA8" />
                <stop offset="100%" stopColor="#E29F85" />
              </radialGradient>

              <radialGradient id="peonyCream" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#FDF4EA" />
                <stop offset="85%" stopColor="#F4E2D0" />
                <stop offset="100%" stopColor="#E1C6AF" />
              </radialGradient>

              <linearGradient id="eucalyptusGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A4B7A0" />
                <stop offset="60%" stopColor="#859B81" />
                <stop offset="100%" stopColor="#677D64" />
              </linearGradient>

              <linearGradient id="softSage" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CAD7C5" />
                <stop offset="100%" stopColor="#98AB93" />
              </linearGradient>

              <linearGradient id="goldSprig" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E9D5A3" />
                <stop offset="50%" stopColor="#CBB079" />
                <stop offset="100%" stopColor="#9A7B42" />
              </linearGradient>
            </defs>

            {/* BACKGROUND EUCALYPTUS BRANCHES & STEMS */}
            <path d="M12 12 Q45 85 95 130" stroke="#7A8E77" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
            <path d="M10 25 Q70 60 145 75" stroke="#7A8E77" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
            <path d="M25 10 Q60 70 75 145" stroke="#7A8E77" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />

            {/* GOLD LEAF SPRIGS */}
            <path d="M5 45 Q35 75 80 85" stroke="url(#goldSprig)" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
            <circle cx="82" cy="85" r="2.2" fill="url(#goldSprig)" />
            <circle cx="68" cy="74" r="1.8" fill="url(#goldSprig)" />
            <circle cx="50" cy="62" r="1.5" fill="url(#goldSprig)" />

            <path d="M45 5 Q75 35 85 80" stroke="url(#goldSprig)" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
            <circle cx="85" cy="82" r="2.2" fill="url(#goldSprig)" />
            <circle cx="74" cy="68" r="1.8" fill="url(#goldSprig)" />
            <circle cx="62" cy="50" r="1.5" fill="url(#goldSprig)" />

            {/* EUCALYPTUS ROUNDED LEAVES */}
            {/* Top leaves */}
            <ellipse cx="65" cy="22" rx="16" ry="10" transform="rotate(-25 65 22)" fill="url(#eucalyptusGreen)" opacity="0.9" />
            <path d="M52 27 C58 22 72 22 78 18" stroke="#5E725B" strokeWidth="0.8" opacity="0.6" />

            <ellipse cx="102" cy="32" rx="18" ry="11" transform="rotate(15 102 32)" fill="url(#softSage)" opacity="0.92" />
            <ellipse cx="138" cy="48" rx="15" ry="9" transform="rotate(35 138 48)" fill="url(#eucalyptusGreen)" opacity="0.85" />
            <ellipse cx="168" cy="70" rx="12" ry="7" transform="rotate(45 168 70)" fill="url(#softSage)" opacity="0.8" />

            {/* Left side leaves */}
            <ellipse cx="22" cy="65" rx="10" ry="16" transform="rotate(-65 22 65)" fill="url(#eucalyptusGreen)" opacity="0.9" />
            <ellipse cx="32" cy="102" rx="11" ry="18" transform="rotate(-15 32 102)" fill="url(#softSage)" opacity="0.92" />
            <ellipse cx="48" cy="138" rx="9" ry="15" transform="rotate(-35 48 138)" fill="url(#eucalyptusGreen)" opacity="0.85" />
            <ellipse cx="70" cy="168" rx="7" ry="12" transform="rotate(-45 70 168)" fill="url(#softSage)" opacity="0.8" />

            {/* DELICATE ROSEBUDS & BLUSH BERRIES */}
            <circle cx="120" cy="25" r="3.5" fill="#E8A29A" opacity="0.9" />
            <circle cx="126" cy="20" r="2.8" fill="#F1BCB5" opacity="0.95" />
            <circle cx="114" cy="18" r="2.4" fill="#F4CEC8" opacity="0.95" />
            <circle cx="25" cy="120" r="3.5" fill="#E8A29A" opacity="0.9" />
            <circle cx="20" cy="126" r="2.8" fill="#F1BCB5" opacity="0.95" />
            <circle cx="18" cy="114" r="2.4" fill="#F4CEC8" opacity="0.95" />

            {/* PEACH PEONY BLOOM (Top-Right of cluster) */}
            <g transform="translate(68, 48)">
              {/* Outer petals */}
              <path d="M-12 18 C-32 8 -28 -18 -8 -26 C8 -32 30 -22 34 2 C38 24 16 34 -4 32 Z" fill="url(#rosePeach)" opacity="0.95" />
              {/* Layer 2 petals */}
              <path d="M-6 12 C-22 4 -18 -12 -4 -18 C8 -22 22 -14 24 2 C26 16 12 22 -2 20 Z" fill="#FFE8DC" opacity="0.9" />
              {/* Inner Petal whorl */}
              <path d="M-2 6 C-12 2 -8 -8 0 -10 C8 -12 14 -6 14 2 C14 10 6 12 0 10 Z" fill="#F4B79E" opacity="0.95" />
              <path d="M1 3 C-4 1 -3 -4 1 -5 C5 -6 8 -3 8 1 C8 5 4 5 1 3 Z" fill="#D98A6F" />
            </g>

            {/* CREAM / IVORY GARDEN ROSE (Bottom-Left of cluster) */}
            <g transform="translate(48, 68)">
              {/* Outer petals */}
              <path d="M18 -12 C8 -32 -18 -28 -26 -8 C-32 8 -22 30 2 34 C24 38 34 16 32 -4 Z" fill="url(#peonyCream)" opacity="0.95" />
              {/* Layer 2 petals */}
              <path d="M12 -6 C4 -22 -12 -18 -18 -4 C-22 8 -14 22 2 24 C16 26 22 12 20 -2 Z" fill="#FFFFFF" opacity="0.9" />
              {/* Inner Petal whorl */}
              <path d="M6 -2 C2 -12 -8 -8 -10 0 C-12 8 -6 14 2 14 C10 14 12 6 10 0 Z" fill="#EBD2BA" opacity="0.95" />
              <path d="M3 1 C1 -4 -4 -3 -5 1 C-6 5 -3 8 1 8 C5 8 5 4 3 1 Z" fill="#C5A485" />
            </g>

            {/* MAIN BLUSH GARDEN ROSE (Focal center flower) */}
            <g transform="translate(42, 42)">
              {/* Outer large petals */}
              <path d="M-22 0 C-38 -18 -18 -42 8 -40 C32 -38 46 -14 42 16 C38 42 12 50 -14 44 C-36 38 -44 14 -22 0 Z" fill="url(#roseBlush1)" />
              {/* Second row of ruffled petals */}
              <path d="M-16 -2 C-28 -14 -12 -32 6 -30 C24 -28 34 -10 30 12 C26 30 6 36 -10 32 C-26 26 -30 10 -16 -2 Z" fill="#FFE2DC" opacity="0.95" />
              {/* Third petal layer */}
              <path d="M-10 -2 C-18 -10 -6 -22 6 -20 C18 -18 24 -6 20 8 C16 20 2 24 -8 20 C-18 16 -20 4 -10 -2 Z" fill="url(#roseBlush1)" />
              {/* Center Rose Petal Swirl */}
              <path d="M-4 -2 C-10 -6 -2 -14 4 -12 C10 -10 14 -2 12 4 C10 10 0 12 -4 8 Z" fill="#F4ADA5" />
              <path d="M-1 -1 C-4 -3 0 -7 3 -6 C6 -5 8 -1 7 2 C6 5 1 5 -1 2 Z" fill="#C76760" />
              <circle cx="2" cy="1" r="1.5" fill="#A8453E" />
            </g>

            {/* ACCENT SMALL BLOSSOMS & HYDRANGEA FLORETS */}
            {/* Top accent floret */}
            <g transform="translate(88, 18)">
              <circle cx="-3" cy="0" r="3" fill="#FFF5F2" />
              <circle cx="3" cy="0" r="3" fill="#FFF5F2" />
              <circle cx="0" cy="-3" r="3" fill="#FFF5F2" />
              <circle cx="0" cy="3" r="3" fill="#FFF5F2" />
              <circle cx="0" cy="0" r="1" fill="#DFA095" />
            </g>

            {/* Left accent floret */}
            <g transform="translate(18, 88)">
              <circle cx="-3" cy="0" r="3" fill="#FFF5F2" />
              <circle cx="3" cy="0" r="3" fill="#FFF5F2" />
              <circle cx="0" cy="-3" r="3" fill="#FFF5F2" />
              <circle cx="0" cy="3" r="3" fill="#FFF5F2" />
              <circle cx="0" cy="0" r="1" fill="#DFA095" />
            </g>
          </svg>
        </div>
      );
    }

    if (style === 'white_peony_corner') {
      return (
        <div className={`pointer-events-none ${transformClass}`}>
          <svg
            width="170"
            height="170"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 sm:w-36 md:w-42 h-auto drop-shadow-xs"
          >
            <defs>
              <radialGradient id="pureWhitePeony" cx="45%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#F9F8F5" />
                <stop offset="85%" stopColor="#EFECE4" />
                <stop offset="100%" stopColor="#DCD6C8" />
              </radialGradient>
              <linearGradient id="oliveLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#96A68D" />
                <stop offset="100%" stopColor="#63755A" />
              </linearGradient>
            </defs>

            {/* Olive & Willow greenery */}
            <path d="M10 10 Q50 65 120 85" stroke="#687B60" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 10 Q65 50 85 120" stroke="#687B60" strokeWidth="1.4" strokeLinecap="round" />
            <ellipse cx="60" cy="18" rx="14" ry="7" transform="rotate(-20 60 18)" fill="url(#oliveLeaf)" />
            <ellipse cx="105" cy="35" rx="16" ry="8" transform="rotate(25 105 35)" fill="url(#oliveLeaf)" />
            <ellipse cx="18" cy="60" rx="7" ry="14" transform="rotate(-70 18 60)" fill="url(#oliveLeaf)" />
            <ellipse cx="35" cy="105" rx="8" ry="16" transform="rotate(-25 35 105)" fill="url(#oliveLeaf)" />

            {/* Gold leaf sprigs */}
            <circle cx="85" cy="22" r="2" fill="#C5A059" />
            <circle cx="130" cy="55" r="2" fill="#C5A059" />
            <circle cx="22" cy="85" r="2" fill="#C5A059" />
            <circle cx="55" cy="130" r="2" fill="#C5A059" />

            {/* Main White Peony */}
            <g transform="translate(45, 45)">
              <path d="M-20 0 C-36 -16 -16 -38 8 -36 C30 -34 42 -12 38 14 C34 38 10 44 -12 40 C-32 34 -38 12 -20 0 Z" fill="url(#pureWhitePeony)" />
              <path d="M-14 -2 C-24 -12 -10 -28 4 -26 C18 -24 28 -8 24 10 C20 24 4 28 -8 26 C-20 22 -24 8 -14 -2 Z" fill="#FFFFFF" opacity="0.9" />
              <path d="M-6 -2 C-12 -6 -2 -14 4 -12 C10 -10 14 -2 12 4 C10 10 0 12 -4 8 Z" fill="#F0EDE4" />
              <circle cx="2" cy="1" r="2" fill="#D0B98B" />
            </g>
          </svg>
        </div>
      );
    }

    if (style === 'wildflower_meadow') {
      return (
        <div className={`pointer-events-none ${transformClass}`}>
          <svg
            width="160"
            height="160"
            viewBox="0 0 180 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 sm:w-32 md:w-38 h-auto"
          >
            {/* Stems */}
            <path d="M5 5 Q40 50 110 65" stroke="#7E8F7A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M5 5 Q50 40 65 110" stroke="#7E8F7A" strokeWidth="1.2" strokeLinecap="round" />
            {/* Lavender Sprigs */}
            <circle cx="80" cy="25" r="3" fill="#B4A7D6" opacity="0.9" />
            <circle cx="92" cy="28" r="3" fill="#9987C4" opacity="0.9" />
            <circle cx="104" cy="34" r="3" fill="#8873B6" opacity="0.9" />
            <circle cx="25" cy="80" r="3" fill="#B4A7D6" opacity="0.9" />
            <circle cx="28" cy="92" r="3" fill="#9987C4" opacity="0.9" />
            <circle cx="34" cy="104" r="3" fill="#8873B6" opacity="0.9" />
            {/* Daisies */}
            <g transform="translate(42, 42)">
              <circle cx="-6" cy="0" r="4" fill="#FFFFFF" />
              <circle cx="6" cy="0" r="4" fill="#FFFFFF" />
              <circle cx="0" cy="-6" r="4" fill="#FFFFFF" />
              <circle cx="0" cy="6" r="4" fill="#FFFFFF" />
              <circle cx="-4" cy="-4" r="3.5" fill="#FFFFFF" />
              <circle cx="4" cy="4" r="3.5" fill="#FFFFFF" />
              <circle cx="4" cy="-4" r="3.5" fill="#FFFFFF" />
              <circle cx="-4" cy="4" r="3.5" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="3.5" fill="#E8BA45" />
            </g>
          </svg>
        </div>
      );
    }

    if (style === 'eucalyptus_garland') {
      return (
        <div className={`pointer-events-none ${transformClass}`}>
          <svg
            width="170"
            height="170"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 sm:w-36 h-auto"
          >
            <path d="M10 10 Q60 50 140 60" stroke="#687B65" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M10 10 Q50 60 60 140" stroke="#687B65" strokeWidth="1.4" strokeLinecap="round" />
            <ellipse cx="50" cy="22" rx="14" ry="9" transform="rotate(-15 50 22)" fill="#8B9F88" opacity="0.9" />
            <ellipse cx="90" cy="30" rx="16" ry="10" transform="rotate(10 90 30)" fill="#788D75" opacity="0.9" />
            <ellipse cx="125" cy="45" rx="13" ry="8" transform="rotate(25 125 45)" fill="#9CB099" opacity="0.85" />
            <ellipse cx="22" cy="50" rx="9" ry="14" transform="rotate(-75 22 50)" fill="#8B9F88" opacity="0.9" />
            <ellipse cx="30" cy="90" rx="10" ry="16" transform="rotate(-20 30 90)" fill="#788D75" opacity="0.9" />
            <ellipse cx="45" cy="125" rx="8" ry="13" transform="rotate(-35 45 125)" fill="#9CB099" opacity="0.85" />
            {/* Berries */}
            <circle cx="70" cy="18" r="2.2" fill="#50624E" />
            <circle cx="18" cy="70" r="2.2" fill="#50624E" />
          </svg>
        </div>
      );
    }

    if (style === 'gold_botanical_crest') {
      return (
        <div className={`pointer-events-none ${transformClass}`}>
          <svg
            width="150"
            height="150"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 sm:w-32 h-auto text-[#C5A059] filter drop-shadow-[0_1px_1px_rgba(197,160,89,0.3)]"
          >
            <path d="M10 10 Q45 45 110 50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M10 10 Q45 45 50 110" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M35 20 C42 12 55 15 52 24 C45 28 38 25 35 20Z" fill="currentColor" fillOpacity="0.75" />
            <path d="M70 28 C78 20 90 24 88 32 C80 36 74 33 70 28Z" fill="currentColor" fillOpacity="0.75" />
            <path d="M20 35 C12 42 15 55 24 52 C28 45 25 38 20 35Z" fill="currentColor" fillOpacity="0.75" />
            <path d="M28 70 C20 78 24 90 32 88 C36 80 33 74 28 70Z" fill="currentColor" fillOpacity="0.75" />
            <circle cx="45" cy="45" r="4" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="45" cy="45" r="1.5" fill="currentColor" />
          </svg>
        </div>
      );
    }

    return null;
  };

  // Multiple corner positions
  if (style === 'dual_corner_roses' || position === 'both-corners') {
    return (
      <>
        <div className={`absolute top-0 left-0 z-20 ${className}`}>
          {renderArtwork('tl')}
        </div>
        <div className={`absolute bottom-0 right-0 z-20 ${className}`}>
          {renderArtwork('br')}
        </div>
      </>
    );
  }

  return (
    <div
      className={`absolute z-20 ${
        position === 'top-left'
          ? 'top-0 left-0'
          : position === 'top-right'
          ? 'top-0 right-0'
          : position === 'bottom-left'
          ? 'bottom-0 left-0'
          : 'bottom-0 right-0'
      } ${className}`}
    >
      {renderArtwork(
        position === 'top-left'
          ? 'tl'
          : position === 'top-right'
          ? 'tr'
          : position === 'bottom-left'
          ? 'bl'
          : 'br'
      )}
    </div>
  );
};
