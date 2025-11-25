import React from 'react';

export const StadiumConnectLogo: React.FC<{ size?: number; className?: string }> = ({ 
  size = 32, 
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Ring (Stadium) */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="url(#gradient1)" 
        strokeWidth="3"
        fill="none"
      />
      
      {/* Inner Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="35" 
        stroke="url(#gradient2)" 
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      
      {/* Stadium Seats Pattern */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = 50 + 38 * Math.cos(angle);
        const y1 = 50 + 38 * Math.sin(angle);
        const x2 = 50 + 42 * Math.cos(angle);
        const y2 = 50 + 42 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#gradient3)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      
      {/* Center Field */}
      <rect 
        x="40" 
        y="44" 
        width="20" 
        height="12" 
        rx="2"
        fill="url(#gradient4)"
      />
      
      {/* Connection Symbol (Wifi-like) */}
      <g transform="translate(50, 50)">
        {/* Inner wave */}
        <path 
          d="M -8 -5 Q -8 -12, 0 -12 Q 8 -12, 8 -5" 
          stroke="url(#gradient5)" 
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Middle wave */}
        <path 
          d="M -12 -2 Q -12 -16, 0 -16 Q 12 -16, 12 -2" 
          stroke="url(#gradient5)" 
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Outer wave */}
        <path 
          d="M -16 1 Q -16 -20, 0 -20 Q 16 -20, 16 1" 
          stroke="url(#gradient5)" 
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Center dot */}
        <circle cx="0" cy="-2" r="2" fill="url(#gradient5)" />
      </g>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B3D91" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Version simple pour favicon
export const StadiumConnectIcon: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="#0B3D91" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="7" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <rect x="10" y="11" width="4" height="2" rx="0.5" fill="#22c55e"/>
      <path d="M 10 8 Q 10 6, 12 6 Q 14 6, 14 8" stroke="#D4A017" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="9" r="1" fill="#D4A017"/>
    </svg>
  );
};
