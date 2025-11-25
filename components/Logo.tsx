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
      style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }}
    >
      <defs>
        {/* Background Gradient - Deep Premium Blue */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#0B3D91" />
        </linearGradient>

        {/* Gold Gradient - Luxury Metal Look */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDB813" />
          <stop offset="30%" stopColor="#FFF7CC" />
          <stop offset="60%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#B4860B" />
        </linearGradient>

        {/* Blue Accent Gradient */}
        <linearGradient id="blueAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Main Badge Shape (Background) */}
      <circle cx="50" cy="50" r="48" fill="url(#bgGradient)" stroke="url(#goldGradient)" strokeWidth="1.5" />

      {/* 2. Abstract Stadium Structure (Rings) */}
      {/* Outer Ring */}
      <path 
        d="M 50 15 A 35 35 0 0 1 85 50 A 35 35 0 0 1 50 85 A 35 35 0 0 1 15 50 A 35 35 0 0 1 50 15" 
        stroke="url(#blueAccent)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        opacity="0.3" 
      />
      
      {/* 3. The "S" / Field Shape (Centerpiece) */}
      <path 
        d="M 30 50 Q 30 35, 50 35 Q 70 35, 70 50 Q 70 65, 50 65 Q 30 65, 30 50 Z" 
        fill="none" 
        stroke="url(#goldGradient)" 
        strokeWidth="2.5"
      />
      
      {/* 4. Connection / Pulse Lines (Tech aspect) */}
      <path d="M 50 22 L 50 28" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 72 L 50 78" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M 22 50 L 28 50" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
      <path d="M 72 50 L 78 50" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />

      {/* 5. Center Core (Active Dot) */}
      <circle cx="50" cy="50" r="6" fill="url(#goldGradient)">
        <animate attributeName="opacity" values="1;0.7;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="3" fill="#0B3D91" />

    </svg>
  );
};

export const StadiumConnectIcon: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="iconGold" x1="0%" y1="0%" x2="100%" y2="100%">
           <stop offset="0%" stopColor="#FDB813" />
           <stop offset="100%" stopColor="#D4A017" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="#0B3D91" stroke="url(#iconGold)" strokeWidth="1.5"/>
      <path d="M 7 12 Q 7 8, 12 8 Q 17 8, 17 12 Q 17 16, 12 16 Q 7 16, 7 12 Z" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
      <circle cx="12" cy="12" r="2" fill="url(#iconGold)"/>
    </svg>
  );
};