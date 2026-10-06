import React from 'react';

interface Scene4WarehouseProps {
  onSelectProject?: (projectId: string) => void;
}

/**
 * Scene 4: Warehouse with logistics trucks & loading docks (Projects)
 * Features:
 * - Isometric high-bay logistics warehouse with industrial sawtooth / flat roofs
 * - 4 dedicated loading bays (Bay 01 - Bay 04)
 * - Articulated cargo trucks at docks and animated delivery truck moving along the apron
 * - Modern forklift moving palletized crates
 * - Roof-mounted industrial ventilation HVAC units and solar array
 * - Visual interactive project hotspots for Lumio, ShopIQ SQL, IPL/WPL Cricket, Portfolio Builder Pro
 */
export const Scene4Warehouse: React.FC<Scene4WarehouseProps> = ({ onSelectProject }) => {
  return (
    <div className="relative w-full h-full select-none">
      <svg
        viewBox="0 0 1600 1200"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="apronGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7F7F4" />
            <stop offset="100%" stopColor="#E5E5DE" />
          </linearGradient>
          <linearGradient id="warehouseRoof" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E9E9E3" />
          </linearGradient>
          <linearGradient id="warehouseWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ECECE6" />
            <stop offset="100%" stopColor="#D2D2CA" />
          </linearGradient>
          <linearGradient id="truckBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E4E4DC" />
          </linearGradient>
          <filter id="softShadow4" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000000" floodOpacity="0.08" />
          </filter>
        </defs>

        <style>{`
          @keyframes truckDrift {
            0% { transform: translate(0px, 0px); }
            50% { transform: translate(70px, -40px); }
            100% { transform: translate(140px, -80px); }
          }
          @keyframes forkliftMove {
            0%, 100% { transform: translate(0px, 0px); }
            50% { transform: translate(-30px, 16px); }
          }
          @keyframes bayPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .moving-truck {
            animation: truckDrift 16s linear infinite;
          }
          .moving-forklift {
            animation: forkliftMove 9s ease-in-out infinite;
          }
          .bay-indicator {
            animation: bayPulse 3s ease-in-out infinite;
          }
        `}</style>

        {/* 1. Ground Apron / Concrete Yard */}
        <polygon points="0,520 860,180 1600,460 760,1160" fill="url(#apronGrad4)" />

        {/* Concrete Ground Grid Markings & Guideways */}
        <g stroke="#D6D6CE" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.65">
          <line x1="280" y1="840" x2="680" y2="600" />
          <line x1="380" y1="900" x2="780" y2="660" />
          <line x1="480" y1="960" x2="880" y2="720" />
          <line x1="580" y1="1020" x2="980" y2="780" />
        </g>

        {/* 2. Main High-Bay Logistics Warehouse Facility */}
        <g filter="url(#softShadow4)">
          {/* Main Warehouse Base Shadow */}
          <polygon points="420,380 1140,240 1280,540 560,680" fill="#000000" opacity="0.08" />

          {/* Left Wall (Facing Viewer/Docks) */}
          <polygon points="460,420 840,640 840,460 460,240" fill="url(#warehouseWall)" />
          {/* Right Wall */}
          <polygon points="840,640 1260,430 1260,250 840,460" fill="#D9D9D1" />
          {/* Warehouse Roof Slab */}
          <polygon points="460,240 840,460 1260,250 880,30" fill="url(#warehouseRoof)" stroke="#E0E0D8" strokeWidth="2" />

          {/* Architectural Skylights on Roof */}
          {[
            { x: 620, y: 190 },
            { x: 740, y: 130 },
            { x: 860, y: 70 },
            { x: 720, y: 260 },
            { x: 840, y: 200 },
            { x: 960, y: 140 },
          ].map((sky, i) => (
            <polygon
              key={`skylight-${i}`}
              points={`${sky.x},${sky.y} ${sky.x + 40},${sky.y + 22} ${sky.x + 90},${sky.y - 4} ${sky.x + 50},${sky.y - 26}`}
              fill="#E1EFF8"
              stroke="#CBDDEB"
              strokeWidth="1.5"
              opacity="0.85"
            />
          ))}

          {/* Rooftop Industrial Ventilation HVAC Units */}
          <g transform="translate(680, 290)">
            <polygon points="0,0 36,20 60,8 24,-12" fill="#FFFFFF" stroke="#D5D5CD" />
            <polygon points="0,0 36,20 36,36 0,16" fill="#D2D2C8" />
            <polygon points="36,20 60,8 60,24 36,36" fill="#BCBCB2" />
            <circle cx="28" cy="4" r="6" fill="#999990" />
          </g>

          {/* Facility Name / Identification Header */}
          <g transform="translate(540, 295) rotate(29)">
            <rect x="0" y="0" width="130" height="24" rx="2" fill="#222222" />
            <text x="8" y="16" fontFamily="monospace" fontSize="9" fill="#FFFFFF" fontWeight="bold" letterSpacing="1">
              LOGISTICS BAY // 04
            </text>
          </g>
        </g>

        {/* 3. Four Loading Docks / Bays with Shutter Doors */}
        {/* Bay 1: Lumio */}
        <g transform="translate(510, 410)">
          <polygon points="0,0 60,35 60,110 0,75" fill="#383838" />
          {/* Shutter Horizontal Slats */}
          {[15, 30, 45, 60, 75, 90].map((slat, idx) => (
            <line key={`b1-slat-${idx}`} x1="4" y1={slat} x2="56" y2={slat + 30} stroke="#4F4F4F" strokeWidth="2" />
          ))}
          {/* Bay Number */}
          <circle cx="30" cy="-12" r="9" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />
          <text x="27" y="-8" fontSize="10" fontWeight="bold" fill="#111111" fontFamily="sans-serif">1</text>
          <circle cx="30" cy="8" r="3" fill="#10B981" className="bay-indicator" />
        </g>

        {/* Bay 2: ShopIQ SQL */}
        <g transform="translate(590, 455)">
          <polygon points="0,0 60,35 60,110 0,75" fill="#383838" />
          {[15, 30, 45, 60, 75, 90].map((slat, idx) => (
            <line key={`b2-slat-${idx}`} x1="4" y1={slat} x2="56" y2={slat + 30} stroke="#4F4F4F" strokeWidth="2" />
          ))}
          <circle cx="30" cy="-12" r="9" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />
          <text x="27" y="-8" fontSize="10" fontWeight="bold" fill="#111111" fontFamily="sans-serif">2</text>
          <circle cx="30" cy="8" r="3" fill="#10B981" className="bay-indicator" />
        </g>

        {/* Bay 3: IPL/WPL Cricket */}
        <g transform="translate(670, 500)">
          <polygon points="0,0 60,35 60,110 0,75" fill="#383838" />
          {[15, 30, 45, 60, 75, 90].map((slat, idx) => (
            <line key={`b3-slat-${idx}`} x1="4" y1={slat} x2="56" y2={slat + 30} stroke="#4F4F4F" strokeWidth="2" />
          ))}
          <circle cx="30" cy="-12" r="9" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />
          <text x="27" y="-8" fontSize="10" fontWeight="bold" fill="#111111" fontFamily="sans-serif">3</text>
          <circle cx="30" cy="8" r="3" fill="#10B981" className="bay-indicator" />
        </g>

        {/* Bay 4: Portfolio Builder Pro */}
        <g transform="translate(750, 545)">
          <polygon points="0,0 60,35 60,110 0,75" fill="#383838" />
          {[15, 30, 45, 60, 75, 90].map((slat, idx) => (
            <line key={`b4-slat-${idx}`} x1="4" y1={slat} x2="56" y2={slat + 30} stroke="#4F4F4F" strokeWidth="2" />
          ))}
          <circle cx="30" cy="-12" r="9" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1.5" />
          <text x="27" y="-8" fontSize="10" fontWeight="bold" fill="#111111" fontFamily="sans-serif">4</text>
          <circle cx="30" cy="8" r="3" fill="#10B981" className="bay-indicator" />
        </g>

        {/* 4. Docked Semi-Trailer Trucks at Bays */}
        {/* Truck at Bay 1 */}
        <g transform="translate(420, 460)">
          {/* Shadow */}
          <ellipse cx="60" cy="90" rx="70" ry="24" fill="#000000" opacity="0.12" />
          {/* Cargo Container Body */}
          <polygon points="20,20 110,-32 110,40 20,92" fill="#FFFFFF" stroke="#E0E0D8" />
          <polygon points="110,-32 140,-15 140,57 110,40" fill="#E2E2DC" />
          {/* Tractor Cab */}
          <polygon points="-10,38 20,20 20,92 -10,110" fill="#D5D5CD" />
          {/* Wheels */}
          <ellipse cx="10" cy="100" rx="9" ry="6" fill="#333333" />
          <ellipse cx="65" cy="72" rx="9" ry="6" fill="#333333" />
          <ellipse cx="95" cy="55" rx="9" ry="6" fill="#333333" />
        </g>

        {/* Truck at Bay 3 */}
        <g transform="translate(580, 550)">
          <ellipse cx="60" cy="90" rx="70" ry="24" fill="#000000" opacity="0.12" />
          <polygon points="20,20 110,-32 110,40 20,92" fill="#F8F8F6" stroke="#E0E0D8" />
          <polygon points="110,-32 140,-15 140,57 110,40" fill="#E0E0DA" />
          <polygon points="-10,38 20,20 20,92 -10,110" fill="#2E2E2E" />
          <ellipse cx="10" cy="100" rx="9" ry="6" fill="#333333" />
          <ellipse cx="65" cy="72" rx="9" ry="6" fill="#333333" />
          <ellipse cx="95" cy="55" rx="9" ry="6" fill="#333333" />
        </g>

        {/* 5. Moving Logistics Delivery Van on Apron */}
        <g className="moving-truck" transform="translate(240, 780)">
          {/* Shadow */}
          <ellipse cx="50" cy="40" rx="46" ry="16" fill="#000000" opacity="0.14" />
          {/* Body */}
          <polygon points="10,15 60,-12 85,2 35,30" fill="#FFFFFF" stroke="#E2E2DA" />
          <polygon points="35,30 85,2 85,32 35,60" fill="#ECECE6" />
          <polygon points="10,15 35,30 35,60 10,45" fill="#D2D2CA" />
          {/* Cab windshield */}
          <polygon points="62,0 78,9 78,18 62,9" fill="#999990" />
          {/* Wheels */}
          <circle cx="28" cy="52" r="6" fill="#262626" />
          <circle cx="70" cy="28" r="6" fill="#262626" />
        </g>

        {/* 6. Active Forklift Operating on Logistics Floor */}
        <g className="moving-forklift" transform="translate(860, 680)">
          {/* Forklift Shadow */}
          <ellipse cx="18" cy="22" rx="28" ry="10" fill="#000000" opacity="0.15" />
          {/* Forklift Chassis */}
          <polygon points="0,0 24,-14 36,-7 12,7" fill="#E54835" />
          <polygon points="12,7 36,-7 36,12 12,26" fill="#C93826" />
          {/* Mast and Overhead Guard */}
          <line x1="32" y1="-5" x2="32" y2="-28" stroke="#333333" strokeWidth="2.5" />
          <line x1="22" y1="-10" x2="22" y2="-32" stroke="#333333" strokeWidth="2" />
          {/* Pallet with Box */}
          <polygon points="36,-8 54,-18 64,-12 46,-2" fill="#E8D5B5" />
          <polygon points="46,-2 64,-12 64,4 46,14" fill="#D0BD9C" />
          {/* Wheels */}
          <circle cx="8" cy="18" r="4.5" fill="#222222" />
          <circle cx="30" cy="6" r="4.5" fill="#222222" />
        </g>

        {/* 7. Stacks of Wooden Pallets and Freight Crates */}
        <g transform="translate(980, 620)">
          {/* Crate 1 */}
          <polygon points="0,0 34,-18 54,-8 20,10" fill="#F4F4F0" stroke="#DFDFD7" />
          <polygon points="20,10 54,-8 54,20 20,38" fill="#E6E6DE" />
          <polygon points="0,0 20,10 20,38 0,28" fill="#DCDCD4" />
          {/* Crate 2 stacked */}
          <polygon points="10,-24 44,-42 64,-32 30,-14" fill="#FFFFFF" stroke="#E2E2DA" />
          <polygon points="30,-14 64,-32 64,-4 30,14" fill="#EDEDE5" />
          <polygon points="10,-24 30,-14 30,14 10,4" fill="#D8D8D0" />
        </g>

        {/* 8. Interactive Project Station Badges (Clickable) */}
        {[
          {
            id: 'proj-lumio',
            title: '1. LUMIO SaaS',
            subtitle: 'Executive Telemetry & BI',
            x: 360,
            y: 380,
            tag: 'LIVE SUITE',
          },
          {
            id: 'proj-shopiq',
            title: '2. SHOPIQ SQL',
            subtitle: 'E-Comm Warehouse & RFM',
            x: 520,
            y: 300,
            tag: 'CASE STUDY',
          },
          {
            id: 'proj-cricket',
            title: '3. IPL/WPL ANALYTICS',
            subtitle: 'Win Prob & Match Models',
            x: 690,
            y: 220,
            tag: 'PYTHON + POWER BI',
          },
          {
            id: 'proj-builder',
            title: '4. BUILDER PRO',
            subtitle: 'Analytics Portfolio Engine',
            x: 870,
            y: 150,
            tag: 'FULL-STACK',
          },
        ].map((station) => (
          <g
            key={station.id}
            transform={`translate(${station.x}, ${station.y})`}
            className="cursor-pointer transition-transform duration-200 hover:scale-105 pointer-events-auto"
            onClick={() => onSelectProject?.(station.id)}
          >
            {/* Guide line down to bay */}
            <line x1="60" y1="45" x2="60" y2="75" stroke="#111111" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="60" cy="75" r="3.5" fill="#E54835" />

            {/* Badge Card */}
            <rect
              x="0"
              y="0"
              width="156"
              height="46"
              rx="8"
              fill="#FFFFFF"
              stroke="#E2E2DE"
              strokeWidth="1.5"
              filter="url(#softShadow4)"
            />
            {/* Left Accent Bar */}
            <rect x="0" y="0" width="4" height="46" rx="2" fill="#E54835" />

            {/* Tag badge */}
            <rect x="10" y="6" width="62" height="12" rx="3" fill="#F4F4F0" />
            <text x="14" y="15" fontSize="7" fontWeight="bold" fontFamily="monospace" fill="#555555">
              {station.tag}
            </text>

            {/* Title & Subtitle */}
            <text x="10" y="29" fontSize="10" fontWeight="bold" fill="#111111" fontFamily="sans-serif">
              {station.title}
            </text>
            <text x="10" y="39" fontSize="8" fill="#666666" fontFamily="sans-serif">
              {station.subtitle}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
