import React from 'react';

export interface Scene3Props {
  className?: string;
  onOpenAbout?: () => void;
}

/**
 * Scene 3: Isometric Corporate Office Towers (About & Career Journey Zone)
 * Layered SVG representation:
 * - Geometric office skyscrapers with reflective glass facades
 * - Architectural skybridge connecting commercial high-rises
 * - Ground-level plaza esplanade with courtyard trees
 * - Rooftop telemetry masts and communication beacons
 * - Neutral corporate palette reflecting enterprise business intelligence
 */
export const Scene3: React.FC<Scene3Props> = ({ className = '', onOpenAbout }) => {
  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <svg
        viewBox="0 0 1600 1200"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="officeGroundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F5F2" />
            <stop offset="100%" stopColor="#E4E4DE" />
          </linearGradient>
          <linearGradient id="glassFacade1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#ECECE6" />
          </linearGradient>
          <linearGradient id="darkTowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#181818" />
          </linearGradient>
          <filter id="softShadow3" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.09" />
          </filter>
        </defs>

        <style>{`
          @keyframes antennaPulse {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
          }
          @keyframes windowShimmer {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.45; }
          }
          .beacon-light {
            animation: antennaPulse 2.4s ease-in-out infinite;
            transform-origin: center center;
          }
          .window-grid {
            animation: windowShimmer 5s ease-in-out infinite;
          }
        `}</style>

        {/* 1. Ground Plaza / Business District Base */}
        <polygon points="0,480 840,160 1600,420 800,1080" fill="url(#officeGroundGrad)" />

        {/* Plaza Paving Stone Isometric Grid */}
        <g stroke="#D0D0CA" strokeWidth="0.8" opacity="0.4">
          {[...Array(14)].map((_, i) => (
            <line key={`p1-${i}`} x1={200 + i * 80} y1="400" x2={-200 + i * 80} y2="900" />
          ))}
          {[...Array(14)].map((_, i) => (
            <line key={`p2-${i}`} x1="100" y1={420 + i * 45} x2="1400" y2={100 + i * 45} />
          ))}
        </g>

        {/* 2. Background City Skyline Silhouettes */}
        <g opacity="0.35">
          <polygon points="180,320 280,270 320,290 220,340" fill="#D0D0C8" />
          <polygon points="220,340 320,290 320,440 220,490" fill="#C0C0B8" />

          <polygon points="1280,280 1380,230 1440,260 1340,310" fill="#D0D0C8" />
          <polygon points="1340,310 1440,260 1440,420 1340,470" fill="#C0C0B8" />
        </g>

        {/* 3. Main Center Corporate Office Tower (Black/Bronze Architectural Glass Tower) */}
        <g filter="url(#softShadow3)">
          {/* Main Tower Roof Top */}
          <polygon points="760,180 940,90 1060,150 880,240" fill="#FFFFFF" />
          {/* Right Face (Sunlit Glass Pattern) */}
          <polygon points="880,240 1060,150 1060,720 880,810" fill="url(#darkTowerGrad)" />
          {/* Left Face (Shadowed Glass Facade) */}
          <polygon points="760,180 880,240 880,810 760,750" fill="#111111" />

          {/* Tower Floor Mullion Lines & Window Bands */}
          <g stroke="#E54835" strokeWidth="1" opacity="0.3">
            {[...Array(12)].map((_, i) => (
              <line key={`w1-${i}`} x1="880" y1={280 + i * 42} x2="1060" y2={190 + i * 42} />
            ))}
          </g>
          <g stroke="#FFFFFF" strokeWidth="0.8" opacity="0.25">
            {[...Array(12)].map((_, i) => (
              <line key={`w2-${i}`} x1="760" y1={220 + i * 42} x2="880" y2={280 + i * 42} />
            ))}
          </g>

          {/* Rooftop Telecommunication Mast & Beacon */}
          <line x1="910" y1="165" x2="910" y2="80" stroke="#888888" strokeWidth="3" />
          <line x1="910" y1="110" x2="930" y2="105" stroke="#888888" strokeWidth="1.5" />
          <line x1="910" y1="125" x2="890" y2="130" stroke="#888888" strokeWidth="1.5" />
          <circle cx="910" cy="76" r="4.5" fill="#E54835" className="beacon-light" />
        </g>

        {/* 4. Secondary Modern White Tower (Left) */}
        <g filter="url(#softShadow3)">
          {/* Roof */}
          <polygon points="440,320 600,240 700,290 540,370" fill="#FFFFFF" />
          {/* Right Face */}
          <polygon points="540,370 700,290 700,680 540,760" fill="url(#glassFacade1)" />
          {/* Left Face */}
          <polygon points="440,320 540,370 540,760 440,710" fill="#D8D8D0" />

          {/* Vertical Glass Grid Lines */}
          <g stroke="#B8B8B0" strokeWidth="1" opacity="0.6">
            <line x1="580" y1="350" x2="580" y2="740" />
            <line x1="620" y1="330" x2="620" y2="720" />
            <line x1="660" y1="310" x2="660" y2="700" />
          </g>
        </g>

        {/* 5. Modern Skybridge Connecting Towers */}
        <g filter="url(#softShadow3)">
          {/* Skybridge Top */}
          <polygon points="660,420 780,360 810,375 690,435" fill="#FFFFFF" />
          {/* Skybridge Face with Glass */}
          <polygon points="690,435 810,375 810,415 690,475" fill="#E8E8E0" />
          <polygon points="660,420 690,435 690,475 660,460" fill="#D0D0C8" />
          {/* Glass Ribs */}
          <line x1="720" y1="420" x2="720" y2="460" stroke="#E54835" strokeWidth="2" />
          <line x1="750" y1="405" x2="750" y2="445" stroke="#E54835" strokeWidth="2" />
          <line x1="780" y1="390" x2="780" y2="430" stroke="#E54835" strokeWidth="2" />
        </g>

        {/* 6. Third Low-Rise Tech Center (Right) */}
        <g filter="url(#softShadow3)">
          <polygon points="1080,420 1260,330 1360,380 1180,470" fill="#FFFFFF" />
          <polygon points="1180,470 1360,380 1360,620 1180,710" fill="#E8E8E2" />
          <polygon points="1080,420 1180,470 1180,710 1080,660" fill="#D0D0CA" />
        </g>

        {/* 7. Plaza Geometric Planters with Landscaped Trees */}
        {[
          { x: 500, y: 720 },
          { x: 580, y: 760 },
          { x: 660, y: 800 },
          { x: 960, y: 790 },
          { x: 1040, y: 750 },
        ].map((tree, idx) => (
          <g key={`plaza-tree-${idx}`} transform={`translate(${tree.x}, ${tree.y})`}>
            {/* Planter Box */}
            <polygon points="0,0 24,-12 40,-4 16,8" fill="#FFFFFF" stroke="#D0D0C8" />
            <polygon points="16,8 40,-4 40,8 16,20" fill="#C0C0B8" />
            <polygon points="0,0 16,8 16,20 0,12" fill="#B0B0A8" />
            {/* Spherical Minimal Foliage */}
            <circle cx="20" cy="-14" r="14" fill="#B0C8BA" />
            <circle cx="20" cy="-14" r="10" fill="#88A896" />
          </g>
        ))}

        {/* 8. Interactive Station Trigger */}
        <g
          transform="translate(820, 830)"
          className="cursor-pointer pointer-events-auto"
          onClick={() => onOpenAbout?.()}
        >
          <rect x="0" y="0" width="144" height="26" rx="4" fill="#FFFFFF" stroke="#E2E2DE" filter="url(#softShadow3)" />
          <rect x="0" y="0" width="3" height="26" rx="1.5" fill="#E54835" />
          <text x="10" y="17" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#111111">
            DISTRICT // CAREER
          </text>
        </g>
      </svg>
    </div>
  );
};
