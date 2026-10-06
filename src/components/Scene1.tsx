import React from 'react';

export interface Scene1Props {
  className?: string;
}

/**
 * Scene 1: Isometric Landscape with Winding Road (Hero Zone)
 * Layered SVG representation:
 * - Distant mountain silhouettes and atmospheric topography contours
 * - Layered isometric plateaus and rolling hills
 * - Winding highway ribbon with road marking dashes
 * - Moving courier/logistics vehicle traversing the road
 * - Clustered geometric isometric pine trees with wind swaying
 * - Technical telemetry roadside beacon and milestone node
 */
export const Scene1: React.FC<Scene1Props> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1600 1200"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="groundGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ECECE8" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5F5F2" />
            <stop offset="100%" stopColor="#E2E2DC" />
          </linearGradient>
          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D5D5D0" />
            <stop offset="100%" stopColor="#BCBCB6" />
          </linearGradient>
          <filter id="softShadow1" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.06" />
          </filter>
        </defs>

        <style>{`
          @keyframes treeSway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(2deg) skewX(1deg); }
          }
          @keyframes vanMove {
            0% { transform: translate(0px, 0px); }
            50% { transform: translate(60px, -35px); }
            100% { transform: translate(120px, -70px); }
          }
          @keyframes pulseBeacon {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.9; transform: scale(1.15); }
          }
          .swaying-tree {
            transform-origin: bottom center;
            animation: treeSway 6s ease-in-out infinite;
          }
          .moving-van {
            animation: vanMove 14s linear infinite;
          }
          .pulse-node {
            animation: pulseBeacon 3s ease-in-out infinite;
          }
        `}</style>

        {/* 1. Distant Mountain Ridges & Contours */}
        <path
          d="M0 320 Q 320 200, 680 280 T 1320 220 L 1600 300 L 1600 1200 L 0 1200 Z"
          fill="url(#hillGrad1)"
          opacity="0.5"
        />
        <path
          d="M0 420 Q 420 340, 840 400 T 1600 360 L 1600 1200 L 0 1200 Z"
          fill="url(#groundGrad1)"
        />

        {/* Isometric Grid Surface Pattern */}
        <g stroke="#D0D0CA" strokeWidth="0.8" opacity="0.35">
          {[...Array(16)].map((_, i) => (
            <line key={`g1-${i}`} x1="0" y1={300 + i * 55} x2="1600" y2={-200 + i * 55 + 500} />
          ))}
          {[...Array(16)].map((_, i) => (
            <line key={`g2-${i}`} x1={i * 110} y1="300" x2={-400 + i * 110} y2="1200" />
          ))}
        </g>

        {/* 2. Elevated Plateau / Hills (Isometric blocks) */}
        <g filter="url(#softShadow1)">
          {/* Plateau 1 */}
          <polygon points="240,460 520,320 740,430 460,570" fill="#FFFFFF" />
          <polygon points="460,570 740,430 740,480 460,620" fill="#E4E4DF" />
          <polygon points="240,460 460,570 460,620 240,510" fill="#D6D6D0" />

          {/* Plateau 2 */}
          <polygon points="860,380 1180,220 1440,350 1120,510" fill="#FFFFFF" />
          <polygon points="1120,510 1440,350 1440,400 1120,560" fill="#E4E4DF" />
          <polygon points="860,380 1120,510 1120,560 860,430" fill="#D6D6D0" />
        </g>

        {/* 3. Winding Road Through the Hills */}
        <g filter="url(#softShadow1)">
          {/* Main Road Bed */}
          <path
            d="M 60 920 C 320 840, 480 720, 640 680 C 840 640, 960 520, 1140 460 C 1320 400, 1480 340, 1580 310"
            stroke="#999992"
            strokeWidth="56"
            strokeLinecap="round"
            fill="none"
          />
          {/* Road Surface Top Layer */}
          <path
            d="M 60 920 C 320 840, 480 720, 640 680 C 840 640, 960 520, 1140 460 C 1320 400, 1480 340, 1580 310"
            stroke="url(#roadGrad)"
            strokeWidth="48"
            strokeLinecap="round"
            fill="none"
          />
          {/* Dashed White Center Line */}
          <path
            d="M 60 920 C 320 840, 480 720, 640 680 C 840 640, 960 520, 1140 460 C 1320 400, 1480 340, 1580 310"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeDasharray="18 20"
            strokeLinecap="square"
            fill="none"
          />
        </g>

        {/* 4. Moving Delivery Vehicle (Courier Van) */}
        <g className="moving-van" transform="translate(480, 710)">
          {/* Shadow */}
          <ellipse cx="28" cy="22" rx="34" ry="12" fill="#000000" opacity="0.16" />
          {/* Cab & Cargo Body */}
          <polygon points="8,10 42,-6 58,2 24,18" fill="#FFFFFF" />
          <polygon points="24,18 58,2 58,18 24,34" fill="#E2E2DC" />
          <polygon points="8,10 24,18 24,34 8,26" fill="#D2D2CA" />
          {/* Accent Line */}
          <polygon points="40,-4 54,3 54,7 40,0" fill="#E54835" />
          {/* Wheels */}
          <circle cx="18" cy="30" r="4.5" fill="#333333" />
          <circle cx="48" cy="16" r="4.5" fill="#333333" />
        </g>

        {/* 5. Isometric Trees Clustered Along the Ridges */}
        {[
          { x: 340, y: 410, scale: 0.9, delay: '0s' },
          { x: 390, y: 380, scale: 0.8, delay: '0.8s' },
          { x: 440, y: 440, scale: 1.0, delay: '1.4s' },
          { x: 490, y: 390, scale: 0.85, delay: '0.4s' },
          { x: 890, y: 310, scale: 0.75, delay: '1.2s' },
          { x: 940, y: 280, scale: 0.85, delay: '1.8s' },
          { x: 1040, y: 260, scale: 0.95, delay: '0.6s' },
          { x: 1120, y: 320, scale: 1.1, delay: '0.2s' },
          { x: 1200, y: 280, scale: 0.8, delay: '1.5s' },
          { x: 260, y: 780, scale: 1.0, delay: '1.0s' },
          { x: 310, y: 820, scale: 0.85, delay: '0.5s' },
          { x: 780, y: 740, scale: 1.15, delay: '1.3s' },
          { x: 840, y: 710, scale: 0.9, delay: '0.7s' },
        ].map((t, idx) => (
          <g
            key={`tree-${idx}`}
            className="swaying-tree"
            style={{ animationDelay: t.delay }}
            transform={`translate(${t.x}, ${t.y}) scale(${t.scale})`}
          >
            {/* Tree Shadow */}
            <ellipse cx="0" cy="8" rx="16" ry="6" fill="#000000" opacity="0.08" />
            {/* Trunk */}
            <line x1="0" y1="0" x2="0" y2="12" stroke="#8A8A82" strokeWidth="4" />
            {/* Isometric Cone Foliage (Geometric layers) */}
            <polygon points="0,-48 18,-24 -18,-24" fill="#C4DDD0" opacity="0.9" />
            <polygon points="0,-36 22,-12 -22,-12" fill="#A2C8B4" opacity="0.95" />
            <polygon points="0,-24 26,2 -26,2" fill="#88B49C" />
          </g>
        ))}

        {/* 6. Technical Roadside Telemetry Beacon */}
        <g transform="translate(680, 620)">
          <line x1="0" y1="0" x2="0" y2="-40" stroke="#E54835" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="0" cy="-40" r="7" fill="#FFFFFF" stroke="#E54835" strokeWidth="2" />
          <circle cx="0" cy="-40" r="3" fill="#E54835" className="pulse-node" />
          {/* Label Card */}
          <rect x="12" y="-52" width="94" height="22" rx="4" fill="#FFFFFF" stroke="#E2E2DE" filter="url(#softShadow1)" />
          <text x="18" y="-38" fontFamily="monospace" fontSize="8" fill="#E54835" fontWeight="bold">
            NODE 01 // ENTRY
          </text>
        </g>
      </svg>
    </div>
  );
};
