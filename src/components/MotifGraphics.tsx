import React from 'react';
import { FoilType, MotifType } from '../types';

interface MotifProps {
  type: MotifType;
  color?: string;
  foil?: FoilType;
  className?: string;
  size?: number;
}

export const MotifGraphics: React.FC<MotifProps> = ({
  type,
  color = '#5E6B56',
  foil = 'none',
  className = '',
  size = 48
}) => {
  if (type === 'none') return null;

  const getFoilClass = () => {
    if (foil === 'gold') return 'text-[#C5A059] filter drop-shadow-[0_1px_1px_rgba(197,160,89,0.4)]';
    if (foil === 'rose-gold') return 'text-[#C48383] filter drop-shadow-[0_1px_1px_rgba(196,131,131,0.4)]';
    if (foil === 'silver') return 'text-[#9AA0A6] filter drop-shadow-[0_1px_1px_rgba(154,160,166,0.4)]';
    return '';
  };

  const foilClass = getFoilClass();

  if (type === 'olive_branch') {
    return (
      <svg
        width={size * 1.5}
        height={size}
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <path
          d="M10 32C35 30 75 32 110 24"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Olive Leaves Left & Center */}
        <path
          d="M25 31C22 22 28 15 36 21C34 26 30 30 25 31Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path
          d="M38 31C43 23 52 24 50 31C45 33 40 33 38 31Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path
          d="M48 31C47 39 55 44 60 37C57 32 52 31 48 31Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path
          d="M62 31C63 21 73 19 75 27C70 30 65 31 62 31Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path
          d="M72 30C75 38 85 39 86 31C80 29 75 29 72 30Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path
          d="M86 28C91 19 101 20 99 27C94 28 89 28 86 28Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path
          d="M98 26C103 21 112 23 110 28C105 28 100 27 98 26Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        {/* Small Olives */}
        <circle cx="34" cy="35" r="2.2" fill="currentColor" fillOpacity="0.6" />
        <circle cx="68" cy="23" r="2.2" fill="currentColor" fillOpacity="0.6" />
        <circle cx="92" cy="32" r="2.2" fill="currentColor" fillOpacity="0.6" />
      </svg>
    );
  }

  if (type === 'monogram_crest') {
    return (
      <svg
        width={size * 1.3}
        height={size * 1.3}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.2" />
        {/* Top & bottom flourishes */}
        <path d="M50 8 C46 16 54 16 50 20 C46 16 54 16 50 8" stroke="currentColor" strokeWidth="1" />
        <path d="M50 92 C46 84 54 84 50 80 C46 84 54 84 50 92" stroke="currentColor" strokeWidth="1" />
        {/* Side laurel arches */}
        <path d="M12 50C12 35 24 20 40 16" stroke="currentColor" strokeWidth="0.8" />
        <path d="M88 50C88 35 76 20 60 16" stroke="currentColor" strokeWidth="0.8" />
        <path d="M12 50C12 65 24 80 40 84" stroke="currentColor" strokeWidth="0.8" />
        <path d="M88 50C88 65 76 80 60 84" stroke="currentColor" strokeWidth="0.8" />
        {/* Tiny stars */}
        <circle cx="50" cy="14" r="1.5" fill="currentColor" />
        <circle cx="50" cy="86" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'wildflower_wreath') {
    return (
      <svg
        width={size * 1.4}
        height={size}
        viewBox="0 0 140 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <path d="M15 35 C40 15 100 15 125 35" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
        <path d="M25 40 C50 55 90 55 115 40" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 2" />
        {/* Wildflower florets */}
        <circle cx="70" cy="20" r="3" stroke="currentColor" strokeWidth="0.9" fill="none" />
        <circle cx="70" cy="20" r="1" fill="currentColor" />
        <circle cx="45" cy="24" r="2.5" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="95" cy="24" r="2.5" stroke="currentColor" strokeWidth="0.8" />
        <path d="M42 20 Q45 14 48 20" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.4" />
        <path d="M92 20 Q95 14 98 20" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.4" />
        <path d="M67 15 Q70 9 73 15" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.4" />
      </svg>
    );
  }

  if (type === 'art_deco_lines') {
    return (
      <svg
        width={size * 1.6}
        height={size * 0.8}
        viewBox="0 0 160 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <path d="M10 30H60M100 30H150" stroke="currentColor" strokeWidth="1" />
        <path d="M80 8L95 30L80 52L65 30Z" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M80 16L90 30L80 44L70 30Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="80" cy="30" r="2" fill="currentColor" />
        <line x1="20" y1="24" x2="55" y2="24" stroke="currentColor" strokeWidth="0.5" />
        <line x1="105" y1="24" x2="140" y2="24" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    );
  }

  if (type === 'romantic_rose') {
    return (
      <svg
        width={size * 1.2}
        height={size * 1.2}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        {/* Stylized Rose Outline */}
        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" />
        <path
          d="M40 28C35 28 32 32 32 36C32 42 40 48 40 48C40 48 48 42 48 36C48 32 45 28 40 28Z"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="none"
        />
        <path d="M37 34C37 32 39 30 40 30C42 30 43 32 43 34C43 37 40 40 40 40C40 40 37 37 37 34Z" fill="currentColor" fillOpacity="0.7" />
        <path d="M28 42C24 40 22 45 26 48C29 46 29 44 28 42Z" fill="currentColor" fillOpacity="0.5" />
        <path d="M52 42C56 40 58 45 54 48C51 46 51 44 52 42Z" fill="currentColor" fillOpacity="0.5" />
        <line x1="40" y1="52" x2="40" y2="62" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    );
  }

  if (type === 'botanical_arch') {
    return (
      <svg
        width={size * 1.8}
        height={size * 0.9}
        viewBox="0 0 160 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <path d="M20 70 C20 25 140 25 140 70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M26 70 C26 32 134 32 134 70" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
        {/* Leaf details along the arch */}
        <path d="M45 42 Q40 36 44 32 Q50 36 45 42" fill="currentColor" fillOpacity="0.8" />
        <path d="M60 28 Q58 20 64 18 Q68 24 60 28" fill="currentColor" fillOpacity="0.8" />
        <path d="M80 22 Q80 14 85 16 Q86 22 80 22" fill="currentColor" fillOpacity="0.8" />
        <path d="M100 28 Q102 20 108 22 Q106 28 100 28" fill="currentColor" fillOpacity="0.8" />
        <path d="M115 42 Q120 36 124 40 Q118 45 115 42" fill="currentColor" fillOpacity="0.8" />
      </svg>
    );
  }

  if (type === 'heritage_crest') {
    return (
      <svg
        width={size * 1.5}
        height={size * 1.2}
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <path d="M60 12 C40 12 25 28 25 52 C25 72 45 88 60 92 C75 88 95 72 95 52 C95 28 80 12 60 12Z" stroke="currentColor" strokeWidth="0.9" fill="none" />
        <path d="M60 18 C44 18 31 32 31 52 C31 68 47 82 60 86 C73 82 89 68 89 52 C89 32 76 18 60 18Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        {/* Crown / Top Flourish */}
        <path d="M50 12 L60 4 L70 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="3" r="1.5" fill="currentColor" />
        <circle cx="48" cy="11" r="1" fill="currentColor" />
        <circle cx="72" cy="11" r="1" fill="currentColor" />
        {/* Laurel Sprigs */}
        <path d="M18 55 C16 40 24 25 35 20" stroke="currentColor" strokeWidth="0.8" />
        <path d="M102 55 C104 40 96 25 85 20" stroke="currentColor" strokeWidth="0.8" />
        <path d="M18 55 C16 70 26 82 38 86" stroke="currentColor" strokeWidth="0.8" />
        <path d="M102 55 C104 70 94 82 82 86" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="52" r="3" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="52" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'cross_or_diamond') {
    return (
      <svg
        width={size * 1.6}
        height={size * 0.6}
        viewBox="0 0 160 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <line x1="10" y1="25" x2="68" y2="25" stroke="currentColor" strokeWidth="0.8" />
        <line x1="92" y1="25" x2="150" y2="25" stroke="currentColor" strokeWidth="0.8" />
        {/* Central Diamond Cross */}
        <polygon points="80,12 88,25 80,38 72,25" stroke="currentColor" strokeWidth="0.9" fill="none" />
        <line x1="80" y1="16" x2="80" y2="34" stroke="currentColor" strokeWidth="0.6" />
        <line x1="74" y1="25" x2="86" y2="25" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="80" cy="25" r="1.5" fill="currentColor" />
        {/* Tiny side dots */}
        <circle cx="64" cy="25" r="1.2" fill="currentColor" />
        <circle cx="96" cy="25" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'vintage_filigree') {
    return (
      <svg
        width={size * 1.5}
        height={size * 0.7}
        viewBox="0 0 140 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <path d="M15 30 C35 30 45 15 70 15 C95 15 105 30 125 30" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M25 30 C45 30 55 45 70 45 C85 45 95 30 115 30" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="70" cy="30" r="3" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.2" />
        <circle cx="70" cy="30" r="1" fill="currentColor" />
        <circle cx="48" cy="30" r="1.5" fill="currentColor" />
        <circle cx="92" cy="30" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'eucalyptus_corner') {
    return (
      <svg
        width={size * 1.4}
        height={size * 0.8}
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${foilClass} ${className}`}
        style={foil === 'none' ? { color } : undefined}
      >
        <path d="M20 55 C40 30 80 20 105 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M35 48 C30 40 36 34 44 38 C42 44 38 48 35 48Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M52 40 C50 30 60 26 66 32 C62 38 56 41 52 40Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M72 32 C74 22 84 22 86 30 C80 34 75 34 72 32Z" fill="currentColor" fillOpacity="0.8" />
        <path d="M90 24 C95 16 104 18 102 25 C97 27 92 26 90 24Z" fill="currentColor" fillOpacity="0.8" />
      </svg>
    );
  }

  // minimal_geometric fallback
  return (
    <svg
      width={size * 1.4}
      height={size * 0.5}
      viewBox="0 0 140 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${foilClass} ${className}`}
      style={foil === 'none' ? { color } : undefined}
    >
      <line x1="10" y1="15" x2="55" y2="15" stroke="currentColor" strokeWidth="0.8" />
      <polygon points="70,9 76,15 70,21 64,15" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="70" cy="15" r="1.5" fill="currentColor" />
      <line x1="85" y1="15" x2="130" y2="15" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
};

export const WaxSealBadge: React.FC<{
  initials: string;
  color?: string;
  className?: string;
}> = ({ initials, color = '#8E3B3B', className = '' }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full shadow-md transition-transform select-none ${className}`}
      style={{
        width: '46px',
        height: '46px',
        background: `radial-gradient(circle at 35% 35%, #BA5C5C, ${color}, #5A1E1E)`,
        boxShadow: '0 4px 10px rgba(0,0,0,0.18), inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.4)'
      }}
    >
      <div className="absolute inset-1 rounded-full border border-amber-200/40 border-dashed pointer-events-none" />
      <span className="font-cormorant italic font-semibold text-amber-100 text-xs tracking-wider drop-shadow-sm">
        {initials || 'E&J'}
      </span>
    </div>
  );
};
