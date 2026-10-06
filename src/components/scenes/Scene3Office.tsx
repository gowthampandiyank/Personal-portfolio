import React from 'react';

/**
 * Scene 3: Office towers (About & Career Journey)
 * Features:
 * - Sleek corporate skyscrapers and high-rise glass towers
 * - Architectural skybridge connecting enterprise towers
 * - Plaza esplanade with geometric trees and courtyard
 * - Rooftop telemetry masts and communication antennas
 * - Clean corporate aesthetic symbolizing enterprise business intelligence
 */
export const Scene3Office: React.FC = () => {
  return (
    <div className="relative w-full h-full select-none pointer-events-none">
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

        {/* 3. Main Center Corporate Office Tower (Black/Bronze Glass Architectural Tower) */}
        <g filter="url(#softShadow3)">
          {/* Main Tower Roof Top */}
          <polygon points="760,180 940,90 1060,150 880,240" fill="#FFFFFF" />
          {/* Right Face (Sunlit Glass Pattern) */}
          <polygon points="880,240 1060,150 1060,720 880,810" fill="url(#darkTowerGrad)" />
          {/* Left Face (Shadowed Glass Facade) */}
          <polygon points="760,180 880,240 880,810 760,750" fill="#111111" />

          {/* Tower Floor Mullion Lines & Window Bands */}
          <g stroke="#F2C811" strokeWidth="1" opacity="0.4">
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
          <circle cx="910" cy="76" r="4.5" fill="#10B981" className="beacon-light" />
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
          <line x1="720" y1="420" x2="720" y2="460" stroke="#10B981" strokeWidth="2" />
          <line x1="750" y1="405" x2="750" y2="445" stroke="#10B981" strokeWidth="2" />
          <line x1="780" y1="390" x2="780" y2="430" stroke="#10B981" strokeWidth="2" />
        </g>

        {/* 6. Third Low-Rise Tech Center (Right) */}
        <g filter="url(#softShadow3)">
          <polygon points="1080,420 1260,330 1360,380 1180,470" fill="#FFFFFF" />
          <polygon points="1180,470 1360,380 1360,620 1180,710" fill="#E8E8E2" />
          <polygon points="1080,420 1180,470 1180,710 1080,660" fill="#D2D2CA" />
          {/* Entrance Canopy */}
          <polygon points="1120,620 1190,585 1210,595 1140,630" fill="#10B981" />
        </g>

        {/* 7. Plaza Landscaping & Geometric Trees */}
        {[
          { x: 520, y: 820, scale: 1.0 },
          { x: 580, y: 850, scale: 1.1 },
          { x: 640, y: 820, scale: 0.9 },
          { x: 700, y: 860, scale: 1.05 },
          { x: 980, y: 780, scale: 1.0 },
          { x: 1040, y: 750, scale: 1.15 },
          { x: 1100, y: 790, scale: 0.85 },
          { x: 1160, y: 760, scale: 0.95 },
        ].map((t, i) => (
          <g key={`plaza-tree-${i}`} transform={`translate(${t.x}, ${t.y}) scale(${t.scale})`} filter="url(#softShadow3)">
            {/* Planter Box */}
            <polygon points="-16,-4 16,-4 22,2 -10,2" fill="#E0E0D8" />
            {/* Trunk */}
            <line x1="3" y1="0" x2="3" y2="-15" stroke="#777770" strokeWidth="3" />
            {/* Geometric Sphere Foliage */}
            <circle cx="3" cy="-28" r="16" fill="#88C0A0" />
            <circle cx="-1" cy="-32" r="11" fill="#A8D5BA" opacity="0.8" />
          </g>
        ))}

        {/* 8. Modern Plaza Water Feature / Mirror Pool */}
        <g filter="url(#softShadow3)">
          <polygon points="780,760 920,690 980,720 840,790" fill="#C4DCED" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="820" y1="755" x2="900" y2="715" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
};
