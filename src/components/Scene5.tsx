import React from 'react';

export interface Scene5Props {
  className?: string;
  onOpenContact?: () => void;
  onOpenSocial?: (type: 'linkedin' | 'github' | 'email') => void;
}

/**
 * Scene 5: Isometric Warehouse Interior & Dispatch Operations Terminal (Contact & Socials Zone)
 * Layered SVG representation:
 * - High-ceiling industrial warehouse interior with structural steel trusses
 * - Hanging overhead pendant lamps casting subtle ambient light cones
 * - Automated high-bay pallet racking with organized storage crates
 * - Central Command & Dispatch Console: dual monitors, telemetry graphs, live pipeline status
 * - Motorized roller conveyor with parcels gliding down the sorting line
 * - Interactive direct triggers for Contact Message transmission and social channels
 */
export const Scene5: React.FC<Scene5Props> = ({ className = '', onOpenContact, onOpenSocial }) => {
  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <svg
        viewBox="0 0 1600 1200"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="interiorFloorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E6E6DE" />
          </linearGradient>
          <linearGradient id="backWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5F5F0" />
            <stop offset="100%" stopColor="#DFDFD7" />
          </linearGradient>
          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E4E4DC" />
          </linearGradient>
          <filter id="softShadow5" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.08" />
          </filter>
        </defs>

        <style>{`
          @keyframes parcelGlide {
            0% { transform: translate(0px, 0px); }
            100% { transform: translate(110px, 60px); }
          }
          @keyframes statusBlink {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          .gliding-parcel {
            animation: parcelGlide 5s linear infinite;
          }
          .status-dot {
            animation: statusBlink 2.2s ease-in-out infinite;
            transform-origin: center center;
          }
        `}</style>

        {/* 1. Interior Floor Plane */}
        <polygon points="120,540 800,200 1480,540 800,1080" fill="url(#interiorFloorGrad)" />

        {/* Polished Epoxy Floor Grid Lines */}
        <g stroke="#D4D4CA" strokeWidth="1.2" opacity="0.6">
          <line x1="360" y1="680" x2="1040" y2="340" />
          <line x1="480" y1="760" x2="1160" y2="420" />
          <line x1="600" y1="840" x2="1280" y2="500" />
          <line x1="560" y1="440" x2="1040" y2="880" />
          <line x1="440" y1="520" x2="920" y2="960" />
        </g>

        {/* 2. Structural Walls & High Ceiling Steel Trusses */}
        <polygon points="120,540 800,200 800,-80 120,120" fill="url(#backWallGrad)" opacity="0.75" />
        <polygon points="800,200 1480,540 1480,120 800,-80" fill="#E8E8DF" opacity="0.8" />

        {/* Overhead Steel Roof Trusses */}
        {[0, 160, 320].map((offset, i) => (
          <g key={`truss-${i}`} transform={`translate(0, ${offset - 60})`} opacity="0.45">
            <line x1="320" y1="280" x2="800" y2="80" stroke="#777770" strokeWidth="4" />
            <line x1="800" y1="80" x2="1280" y2="280" stroke="#777770" strokeWidth="4" />
            <line x1="420" y1="230" x2="1180" y2="230" stroke="#777770" strokeWidth="3" />
            <line x1="540" y1="180" x2="680" y2="230" stroke="#777770" strokeWidth="2" />
            <line x1="1060" y1="180" x2="920" y2="230" stroke="#777770" strokeWidth="2" />
          </g>
        ))}

        {/* Hanging Industrial Pendant Lamps */}
        {[
          { x: 580, y: 310 },
          { x: 800, y: 220 },
          { x: 1020, y: 310 },
        ].map((lamp, i) => (
          <g key={`lamp-${i}`}>
            <line x1={lamp.x} y1={lamp.y - 120} x2={lamp.x} y2={lamp.y} stroke="#555555" strokeWidth="2" />
            <polygon
              points={`${lamp.x - 22},${lamp.y} ${lamp.x + 22},${lamp.y} ${lamp.x + 14},${lamp.y - 14} ${lamp.x - 14},${lamp.y - 14}`}
              fill="#333333"
            />
            <polygon
              points={`${lamp.x - 12},${lamp.y + 4} ${lamp.x + 12},${lamp.y + 4} ${lamp.x + 90},${lamp.y + 240} ${lamp.x - 90},${lamp.y + 240}`}
              fill="#FFFFFF"
              opacity="0.12"
            />
          </g>
        ))}

        {/* 3. High-Bay Storage Racks (Left Side) */}
        <g transform="translate(260, 360)">
          <line x1="0" y1="0" x2="0" y2="240" stroke="#333333" strokeWidth="5" />
          <line x1="140" y1="-70" x2="140" y2="170" stroke="#333333" strokeWidth="5" />
          <line x1="70" y1="120" x2="70" y2="360" stroke="#333333" strokeWidth="5" />
          <line x1="210" y1="50" x2="210" y2="290" stroke="#333333" strokeWidth="5" />

          {[60, 140, 220].map((lvl, idx) => (
            <g key={`shelf-${idx}`}>
              <line x1="0" y1={lvl} x2="140" y2={lvl - 70} stroke="#E54835" strokeWidth="4" />
              <line x1="70" y1={lvl + 120} x2="210" y2={lvl + 50} stroke="#E54835" strokeWidth="4" />
              <line x1="0" y1={lvl} x2="70" y2={lvl + 120} stroke="#888880" strokeWidth="2" />

              <polygon points="20,50 50,35 70,45 40,60" fill="#EAD9C2" stroke="#CCA" />
              <polygon points="40,60 70,45 70,70 40,85" fill="#D8C5AB" />
              <polygon points="80,20 110,5 130,15 100,30" fill="#EAD9C2" stroke="#CCA" />
            </g>
          ))}
        </g>

        {/* 4. Automated Roller Conveyor System (Right Side) */}
        <g transform="translate(940, 520)">
          <polygon points="0,0 220,-110 260,-90 40,20" fill="#C8C8C0" stroke="#999990" strokeWidth="2" />
          <polygon points="0,0 40,20 40,44 0,24" fill="#999990" />
          <polygon points="40,20 260,-90 260,-66 40,44" fill="#777770" />

          {[20, 60, 100, 140, 180].map((r, i) => (
            <line key={`roller-${i}`} x1={r} y1={-r / 2 + 10} x2={r + 35} y2={-r / 2 + 28} stroke="#444444" strokeWidth="3" />
          ))}

          {/* Gliding Parcel */}
          <g className="gliding-parcel" transform="translate(60, -40)">
            <polygon points="0,0 28,-14 42,-7 14,7" fill="#E6C89C" stroke="#B89B72" />
            <polygon points="14,7 42,-7 42,12 14,26" fill="#D4B688" />
            <polygon points="0,0 14,7 14,26 0,19" fill="#C0A175" />
            <polygon points="16,10 26,5 26,9 16,14" fill="#FFFFFF" />
          </g>
        </g>

        {/* 5. Central Dispatch Command Workstation / Console Desk */}
        <g transform="translate(680, 560)" filter="url(#softShadow5)">
          <polygon points="0,40 180,-50 320,20 140,110" fill="url(#deskGrad)" stroke="#D4D4CC" strokeWidth="2" />
          <polygon points="0,40 140,110 140,150 0,80" fill="#D2D2CA" />
          <polygon points="140,110 320,20 320,60 140,150" fill="#BCBCB4" />

          {/* Dual Monitor Displays */}
          <g transform="translate(60, -10)">
            <polygon points="30,30 46,22 46,38 30,46" fill="#333333" />
            <polygon points="0,15 65,-18 65,30 0,63" fill="#181818" stroke="#444444" strokeWidth="2" />
            <polygon points="4,18 61,-12 61,26 4,56" fill="#0F172A" />
            <line x1="12" y1="46" x2="30" y2="30" stroke="#06B6D4" strokeWidth="2" />
            <line x1="30" y1="30" x2="44" y2="36" stroke="#06B6D4" strokeWidth="2" />
            <line x1="44" y1="36" x2="56" y2="10" stroke="#E54835" strokeWidth="2" />
            <circle cx="56" cy="10" r="2.5" fill="#E54835" />
          </g>

          <g transform="translate(130, 25)">
            <polygon points="30,30 46,22 46,38 30,46" fill="#333333" />
            <polygon points="0,15 65,-18 65,30 0,63" fill="#181818" stroke="#444444" strokeWidth="2" />
            <polygon points="4,18 61,-12 61,26 4,56" fill="#0A0A0A" />
            <line x1="10" y1="28" x2="48" y2="9" stroke="#E54835" strokeWidth="1.5" />
            <line x1="10" y1="36" x2="54" y2="14" stroke="#888888" strokeWidth="1" />
            <line x1="10" y1="44" x2="42" y2="28" stroke="#E54835" strokeWidth="1" />
            <circle cx="10" cy="50" r="1.5" fill="#E54835" className="status-dot" />
          </g>

          {/* Chair */}
          <g transform="translate(110, 110)">
            <ellipse cx="25" cy="20" rx="22" ry="12" fill="#222222" />
            <polygon points="8,10 42,-8 42,16 8,34" fill="#333333" />
            <circle cx="25" cy="35" r="4" fill="#111111" />
          </g>
        </g>

        {/* 6. Live Telemetry Antenna */}
        <g transform="translate(800, 320)">
          <line x1="0" y1="0" x2="0" y2="-60" stroke="#E54835" strokeWidth="2" />
          <circle cx="0" cy="-60" r="6" fill="#FFFFFF" stroke="#E54835" strokeWidth="2" />
          <circle cx="0" cy="-60" r="2.5" fill="#E54835" className="status-dot" />
        </g>

        {/* 7. Interactive Communication Hotspots */}
        <g
          transform="translate(680, 770)"
          className="cursor-pointer transition-transform duration-200 hover:scale-105 pointer-events-auto"
          onClick={() => onOpenContact?.()}
        >
          <line x1="80" y1="0" x2="80" y2="-30" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          <circle cx="80" cy="-30" r="3" fill="#E54835" />
          <rect
            x="0"
            y="0"
            width="170"
            height="48"
            rx="8"
            fill="#FFFFFF"
            stroke="#E2E2DE"
            strokeWidth="1.5"
            filter="url(#softShadow5)"
          />
          <rect x="0" y="0" width="4" height="48" rx="2" fill="#E54835" />
          <rect x="12" y="8" width="86" height="12" rx="3" fill="#F4F4F0" />
          <text x="16" y="17" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#555555">
            DISPATCH CONSOLE
          </text>
          <text x="12" y="32" fontSize="11" fontWeight="bold" fill="#111111" fontFamily="sans-serif">
            Send Message ✉
          </text>
          <text x="12" y="42" fontSize="7.5" fill="#666666" fontFamily="sans-serif">
            Direct SSL transmission to Supabase
          </text>
        </g>

        {/* Social Comms Radio Station */}
        <g
          transform="translate(940, 720)"
          className="cursor-pointer transition-transform duration-200 hover:scale-105 pointer-events-auto"
        >
          <rect
            x="0"
            y="0"
            width="176"
            height="48"
            rx="8"
            fill="#FFFFFF"
            stroke="#E2E2DE"
            strokeWidth="1.5"
            filter="url(#softShadow5)"
          />
          <rect x="0" y="0" width="4" height="48" rx="2" fill="#111111" />
          <text x="12" y="18" fontSize="8" fontWeight="bold" fontFamily="monospace" fill="#666666">
            CHANNELS // CONNECT
          </text>
          <g
            className="hover:opacity-75 transition-opacity"
            onClick={() => onOpenSocial?.('linkedin')}
          >
            <rect x="12" y="24" width="48" height="18" rx="4" fill="#0A66C2" />
            <text x="20" y="36" fontSize="9" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
              LinkedIn
            </text>
          </g>
          <g
            className="hover:opacity-75 transition-opacity"
            onClick={() => onOpenSocial?.('github')}
          >
            <rect x="66" y="24" width="48" height="18" rx="4" fill="#24292E" />
            <text x="75" y="36" fontSize="9" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
              GitHub
            </text>
          </g>
          <g
            className="hover:opacity-75 transition-opacity"
            onClick={() => onOpenSocial?.('email')}
          >
            <rect x="120" y="24" width="44" height="18" rx="4" fill="#E54835" />
            <text x="128" y="36" fontSize="9" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
              Email
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
