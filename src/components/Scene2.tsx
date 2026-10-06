import React from 'react';

export interface Scene2Props {
  className?: string;
  onOpenSkills?: () => void;
}

/**
 * Scene 2: Isometric Logistics Port Terminal (Skills Zone)
 * Layered SVG representation:
 * - Industrial waterfront with water ripples and dock basin
 * - Concrete quays with container crane rails and guide markers
 * - Multi-tier stacks of freight containers tagged with tech stacks (SQL, Power BI, Python, DAX)
 * - Twin heavy-duty container gantry cranes
 * - Detailed container cargo ship gently bobbing in the water
 * - Cargo aircraft drifting overhead on its descent path
 */
export const Scene2: React.FC<Scene2Props> = ({ className = '', onOpenSkills }) => {
  return (
    <div className={`relative w-full h-full select-none ${className}`}>
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
        `}</style>

        {/* 1. Sea / Harbor Water Basin */}
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
          { x: 180, y: 520, fill: '#E54835', textFill: '#FFFFFF', label: 'SQL' },
          { x: 235, y: 490, fill: '#222222', textFill: '#FFFFFF', label: 'PBI' },
          { x: 180, y: 480, fill: '#FFFFFF', textFill: '#111111', label: 'DAX' },
          { x: 290, y: 560, fill: '#FFFFFF', textFill: '#111111', label: 'PY' },
          { x: 345, y: 530, fill: '#E54835', textFill: '#FFFFFF', label: 'ETL' },
          { x: 290, y: 520, fill: '#333333', textFill: '#FFFFFF', label: 'DW' },
          { x: 400, y: 600, fill: '#F2F2EE', textFill: '#111111', label: 'API' },
          { x: 455, y: 570, fill: '#FFFFFF', textFill: '#111111', label: 'GIT' },
          { x: 400, y: 560, fill: '#E54835', textFill: '#FFFFFF', label: 'CSV' },
        ].map((c, i) => (
          <g key={`container-${i}`} transform={`translate(${c.x}, ${c.y})`} filter="url(#softShadow2)">
            {/* Isometric Container Box */}
            <polygon points="0,0 48,-24 72,-12 24,12" fill={c.fill} stroke="#D4D4CC" strokeWidth="0.5" />
            <polygon points="24,12 72,-12 72,12 24,36" fill="#A0A09A" />
            <polygon points="0,0 24,12 24,36 0,24" fill="#888882" />
            {/* Tech Label on Front Face */}
            <text x="6" y="24" fontFamily="monospace" fontSize="8" fill={c.textFill} fontWeight="bold">
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
            {/* Accent Hoist Cab */}
            <rect x="10" y="-30" width="22" height="18" fill="#E54835" />
            {/* Pulley & Spreader Cables */}
            <line x1="21" y1="-12" x2="21" y2="35" stroke="#444444" strokeWidth="1.5" />
            <rect x="8" y="35" width="26" height="8" fill="#FFFFFF" stroke="#666666" strokeWidth="1" />
          </g>
        ))}

        {/* 5. Isometric Container Ship Bobbing in Water */}
        <g className="bobbing-ship" transform="translate(860, 680)">
          {/* Ship Hull Shadow in Water */}
          <polygon points="-40,110 380,110 440,160 -10,160" fill="#000000" opacity="0.12" />

          {/* Hull Lower Draft */}
          <polygon points="-20,90 360,90 410,135 -10,135" fill="#2E2E2E" />
          {/* Hull Main Deck */}
          <polygon points="0,50 340,50 390,90 20,90" fill="#FFFFFF" stroke="#D4D4CC" />

          {/* Ship Containers on Deck */}
          <g transform="translate(60, 10)">
            <polygon points="0,0 180,0 200,20 20,20" fill="#E54835" />
            <polygon points="20,20 200,20 200,40 20,40" fill="#C93826" />
          </g>
          <g transform="translate(70, -18)">
            <polygon points="0,0 140,0 160,20 20,20" fill="#FFFFFF" stroke="#CCC" />
            <polygon points="20,20 160,20 160,38 20,38" fill="#E4E4DC" />
          </g>

          {/* Bridge Superstructure (Stern Cab) */}
          <g transform="translate(300, -35)">
            <rect x="0" y="0" width="45" height="75" fill="#FFFFFF" stroke="#DDD" />
            <rect x="6" y="10" width="33" height="12" fill="#06B6D4" opacity="0.8" />
            {/* Exhaust Funnel */}
            <rect x="14" y="-18" width="16" height="20" fill="#222222" />
            <rect x="14" y="-18" width="16" height="5" fill="#E54835" />
          </g>
        </g>

        {/* 6. Cargo Airplane Drifting Overhead */}
        <g className="drifting-plane" transform="translate(600, 240)">
          {/* Soft Altitude Shadow */}
          <ellipse cx="0" cy="180" rx="36" ry="10" fill="#000000" opacity="0.06" />

          {/* Aircraft Fuselage */}
          <path
            d="M -70 0 C -40 -12, 40 -12, 70 0 C 40 12, -40 12, -70 0 Z"
            fill="#FFFFFF"
            stroke="#DCDCD4"
            strokeWidth="1.5"
          />
          {/* Wings */}
          <polygon points="-10,0 35,-65 55,-65 15,0" fill="#F0F0EA" stroke="#DCDCD4" />
          <polygon points="-10,0 35,65 55,65 15,0" fill="#E6E6DE" stroke="#DCDCD4" />
          {/* Tail Fin */}
          <polygon points="-65,0 -40,-26 -30,-26 -55,0" fill="#E54835" />
        </g>

        {/* 7. Interactive Terminal Beacon */}
        <g
          transform="translate(240, 420)"
          className="cursor-pointer pointer-events-auto"
          onClick={() => onOpenSkills?.()}
        >
          <rect x="0" y="0" width="134" height="26" rx="4" fill="#FFFFFF" stroke="#E2E2DE" filter="url(#softShadow2)" />
          <rect x="0" y="0" width="3" height="26" rx="1.5" fill="#E54835" />
          <text x="10" y="17" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#111111">
            TERMINAL // SKILLS
          </text>
        </g>
      </svg>
    </div>
  );
};
