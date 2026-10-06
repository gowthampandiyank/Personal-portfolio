import React from 'react';

/**
 * Scene 2: Port with cranes, ship, planes (Skills)
 * Features:
 * - Industrial logistics shipping port & dock quays
 * - High-detail container ship gently bobbing in water
 * - Massive gantry container cranes on rail tracks
 * - Drifting cargo airplane approaching airport runway
 * - Stacked multi-tier freight containers with subtle tech tags (SQL, Python, Power BI)
 */
export const Scene2Port: React.FC = () => {
  return (
    <div className="relative w-full h-full select-none pointer-events-none">
      <svg
        viewBox="0 0 1600 1200"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2EEF8" />
            <stop offset="100%" stopColor="#C4DCED" />
          </linearGradient>
          <linearGradient id="quayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#DFDFD9" />
          </linearGradient>
          <filter id="softShadow2" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.08" />
          </filter>
        </defs>

        <style>{`
          @keyframes shipBob {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-7px) rotate(-0.6deg); }
          }
          @keyframes planeDrift {
            0% { transform: translate(-140px, 80px); }
            100% { transform: translate(320px, -180px); }
          }
          @keyframes waterRipple {
            0%, 100% { opacity: 0.3; transform: scaleX(1); }
            50% { opacity: 0.6; transform: scaleX(1.08); }
          }
          @keyframes radarRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .bobbing-ship {
            animation: shipBob 5.5s ease-in-out infinite;
            transform-origin: center center;
          }
          .drifting-plane {
            animation: planeDrift 18s linear infinite;
          }
          .water-wave {
            animation: waterRipple 4s ease-in-out infinite;
          }
          .radar-spin {
            animation: radarRotate 8s linear infinite;
            transform-origin: 1360px 220px;
          }
        `}</style>

        {/* 1. Water Basin (Isometric Ocean Bay) */}
        <path
          d="M 280 480 L 1600 480 L 1600 1200 L 0 1200 L 0 780 Z"
          fill="url(#waterGrad)"
        />

        {/* Water Ripple Lines */}
        <g stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6">
          <line x1="200" y1="840" x2="380" y2="840" className="water-wave" />
          <line x1="120" y1="920" x2="280" y2="920" className="water-wave" />
          <line x1="600" y1="1020" x2="840" y2="1020" className="water-wave" />
          <line x1="720" y1="880" x2="980" y2="880" className="water-wave" />
          <line x1="1100" y1="960" x2="1350" y2="960" className="water-wave" />
        </g>

        {/* 2. Concrete Port Terminal Quay / Wharf Platform */}
        <g filter="url(#softShadow2)">
          {/* Main Pier Top */}
          <polygon points="120,440 920,440 760,780 -40,780" fill="url(#quayGrad)" />
          {/* Pier Front Edge Depth */}
          <polygon points="-40,780 760,780 760,815 -40,815" fill="#B8B8B0" />
          <polygon points="760,780 920,440 920,475 760,815" fill="#C8C8C0" />
        </g>

        {/* Port Ground Markings (Isometric Logistics Lines) */}
        <g stroke="#9E9E96" strokeWidth="1" strokeDasharray="6 6" opacity="0.5">
          <line x1="220" y1="460" x2="100" y2="760" />
          <line x1="380" y1="460" x2="260" y2="760" />
          <line x1="540" y1="460" x2="420" y2="760" />
          <line x1="700" y1="460" x2="580" y2="760" />
        </g>

        {/* 3. Stacked Cargo Containers (Representing Technical Modules) */}
        {[
          { x: 180, y: 520, fill: '#E54835', label: 'SQL' },
          { x: 235, y: 490, fill: '#10B981', label: 'PBI' },
          { x: 180, y: 480, fill: '#FFFFFF', label: 'DAX' },
          { x: 290, y: 560, fill: '#FFFFFF', label: 'PY' },
          { x: 345, y: 530, fill: '#E54835', label: 'ETL' },
          { x: 290, y: 520, fill: '#10B981', label: 'DW' },
          { x: 400, y: 600, fill: '#10B981', label: 'API' },
          { x: 455, y: 570, fill: '#FFFFFF', label: 'GIT' },
          { x: 400, y: 560, fill: '#E54835', label: 'CSV' },
        ].map((c, i) => (
          <g key={`container-${i}`} transform={`translate(${c.x}, ${c.y})`} filter="url(#softShadow2)">
            {/* Isometric Container Box */}
            <polygon points="0,0 48,-24 72,-12 24,12" fill={c.fill} />
            <polygon points="24,12 72,-12 72,12 24,36" fill="#A0A09A" />
            <polygon points="0,0 24,12 24,36 0,24" fill="#888882" />
            {/* Tech Label on Front Face */}
            <text x="6" y="24" fontFamily="monospace" fontSize="8" fill="#FFFFFF" fontWeight="bold">
              {c.label}
            </text>
          </g>
        ))}

        {/* 4. Giant Gantry Cranes (2 Units on Wharf) */}
        {[
          { x: 420, y: 480, scale: 1.0 },
          { x: 620, y: 460, scale: 0.95 },
        ].map((crane, idx) => (
          <g key={`crane-${idx}`} transform={`translate(${crane.x}, ${crane.y}) scale(${crane.scale})`} filter="url(#softShadow2)">
            {/* Crane Base Legs */}
            <line x1="-30" y1="120" x2="-10" y2="0" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="30" y1="120" x2="10" y2="0" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="-15" y1="80" x2="15" y2="80" stroke="#FFFFFF" strokeWidth="3" />
            {/* Crane Overhead Boom Truss */}
            <polygon points="-70,-40 90,-40 85,-26 -65,-26" fill="#FFFFFF" stroke="#D0D0C8" strokeWidth="1.5" />
            {/* Red / Accent Hoist Cab */}
            <rect x="10" y="-30" width="22" height="18" fill="#10B981" />
            {/* Pulley & Spreader Cables */}
            <line x1="21" y1="-12" x2="21" y2="35" stroke="#444444" strokeWidth="1.5" />
            <rect x="8" y="35" width="26" height="8" fill="#FFFFFF" stroke="#666666" strokeWidth="1" />
          </g>
        ))}

        {/* 5. Giant Container Cargo Ship Bobbing in Water */}
        <g className="bobbing-ship" transform="translate(480, 840)">
          {/* Ship Hull Shadow in Water */}
          <ellipse cx="280" cy="90" rx="360" ry="45" fill="#000000" opacity="0.12" />

          {/* Red/Dark Hull Base */}
          <polygon points="0,50 560,0 620,30 20,80" fill="#E54835" />
          <polygon points="20,80 620,30 620,60 20,110" fill="#B91C1C" />
          {/* White Upper Deck Level */}
          <polygon points="10,40 550,-10 590,15 25,65" fill="#FFFFFF" />

          {/* Cargo Container Stacks on Ship Deck */}
          {[
            { x: 70, y: 10, fill: '#10B981' },
            { x: 130, y: 5, fill: '#FFFFFF' },
            { x: 190, y: 0, fill: '#E54835' },
            { x: 250, y: -5, fill: '#10B981' },
            { x: 310, y: -10, fill: '#FFFFFF' },
            { x: 370, y: -15, fill: '#E54835' },
          ].map((sc, i) => (
            <g key={`ship-cont-${i}`} transform={`translate(${sc.x}, ${sc.y})`}>
              <polygon points="0,0 45,-18 68,-7 23,11" fill={sc.fill} />
              <polygon points="23,11 68,-7 68,14 23,32" fill="#B0B0A8" />
              <polygon points="0,0 23,11 23,32 0,21" fill="#909088" />
            </g>
          ))}

          {/* Bridge Superstructure (Wheelhouse & Radar) */}
          <g transform="translate(460, -45)">
            <polygon points="0,0 60,-15 80,-3 20,12" fill="#FFFFFF" />
            <polygon points="20,12 80,-3 80,30 20,45" fill="#E8E8E0" />
            <polygon points="0,0 20,12 20,45 0,33" fill="#D0D0C8" />
            {/* Windows Band */}
            <polygon points="6,6 64,-9 64,-3 6,12" fill="#111111" />
            {/* Exhaust Funnel with Orange Accent */}
            <polygon points="40,-25 55,-28 60,-24 45,-21" fill="#E54835" />
            <polygon points="45,-21 60,-24 60,-3 45,0" fill="#B91C1C" />
          </g>
        </g>

        {/* 6. Airport Runway & Drifting Air Cargo Plane (Top Right) */}
        <g transform="translate(1040, 160)" filter="url(#softShadow2)">
          {/* Runway Strip */}
          <polygon points="0,220 540,60 560,95 20,255" fill="#3D3D3D" />
          {/* Dashed Runway Center Line */}
          <polygon points="10,237 550,77 550,79 10,239" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="16 16" />
          {/* Airport Terminal Building */}
          <polygon points="240,60 480,-10 520,6 280,76" fill="#FFFFFF" />
          <polygon points="280,76 520,6 520,36 280,106" fill="#E8E8E0" />
          {/* Control Tower */}
          <polygon points="440,-50 470,-60 485,-55 455,-45" fill="#FFFFFF" />
          <polygon points="455,-45 485,-55 485,0 455,10" fill="#D8D8D0" />
          {/* Rotating Radar Antenna */}
          <circle cx="470" cy="-65" r="4" fill="#10B981" />
          <line x1="470" y1="-65" x2="480" y2="-72" stroke="#10B981" strokeWidth="2" />
        </g>

        {/* Drifting Cargo Plane */}
        <g className="drifting-plane" transform="translate(1080, 260)">
          {/* Soft Shadow on Ground */}
          <ellipse cx="60" cy="140" rx="45" ry="12" fill="#000000" opacity="0.12" />
          {/* Fuselage & Swept Wings (Crisp Minimalist Aircraft) */}
          <g transform="rotate(-30)">
            {/* Wings */}
            <polygon points="20,-8 50,-50 65,-48 45,-2" fill="#E54835" />
            <polygon points="20,18 50,60 65,58 45,12" fill="#E54835" />
            {/* Fuselage */}
            <ellipse cx="40" cy="5" rx="55" ry="12" fill="#FFFFFF" />
            <polygon points="-15,5 15,-2 15,12" fill="#E54835" />
            {/* Tail Fin */}
            <polygon points="85,5 98,-18 105,-18 92,5" fill="#10B981" />
          </g>
        </g>
      </svg>
    </div>
  );
};
