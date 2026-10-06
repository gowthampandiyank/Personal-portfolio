export interface ZoneCamera {
  x: number;      // percentage or vw offset
  y: number;      // percentage or vh offset
  zoom: number;   // camera zoom scale
  rotate: number; // degrees slight camera pitch/rotation
}

export interface ZoneButton {
  label: string;
  action: string; // e.g. 'zone:2', 'modal:skills', 'modal:projects', 'action:resume', 'link:github'
  primary?: boolean;
}

export interface ZoneData {
  id: number;
  slug: string;
  title: string;
  kicker: string;
  description: string;
  badge: string;
  camera: ZoneCamera;
  buttons: ZoneButton[];
  telemetry: {
    label: string;
    value: string;
  }[];
}

export const ZONES: ZoneData[] = [
  {
    id: 1,
    slug: 'hero',
    title: 'Gowtham Pandiyan',
    kicker: 'Data Analyst · SQL & Power BI Specialist',
    description: 'Turning data into insights, systems into solutions. Engineering dimensional data warehouses, automated ETL pipelines, and executive dashboards.',
    badge: 'ZONE 01 // LANDSCAPE & RUNWAY',
    camera: {
      x: 0,
      y: 0,
      zoom: 1.0,
      rotate: 0,
    },
    buttons: [
      { label: 'Explore Skills', action: 'zone:2', primary: true },
      { label: 'View Projects', action: 'zone:4', primary: false },
    ],
    telemetry: [
      { label: 'COORDINATES', value: '13.0827° N, 80.2707° E' },
      { label: 'STATUS', value: 'ACTIVE · OPEN TO ROLES' },
    ],
  },
  {
    id: 2,
    slug: 'skills',
    title: 'Technical Repertoire',
    kicker: 'Industrial Port & Logistics Terminal',
    description: '3-tier technical architecture spanning relational SQL & database modeling, Power BI & advanced DAX, and automated Python ETL data pipelines.',
    badge: 'ZONE 02 // LOGISTICS PORT & CARGO',
    camera: {
      x: -24,
      y: -16,
      zoom: 1.15,
      rotate: -1.2,
    },
    buttons: [
      { label: 'Browse Skills Matrix', action: 'modal:skills', primary: true },
      { label: 'Inspect Projects', action: 'zone:4', primary: false },
    ],
    telemetry: [
      { label: 'CORE STACK', value: 'SQL · POWER BI · PYTHON · DAX' },
      { label: 'INTEGRITY', value: '99.9% TABULAR ACCURACY' },
    ],
  },
  {
    id: 3,
    slug: 'about',
    title: 'Career Trajectory',
    kicker: 'Corporate District & Office Towers',
    description: 'From software engineering and frontend development to rigorous data analytics. Bridging interactive UI execution with database modeling and commercial decision velocity.',
    badge: 'ZONE 03 // CORPORATE TOWERS & PLAZA',
    camera: {
      x: -48,
      y: -28,
      zoom: 1.24,
      rotate: 1.0,
    },
    buttons: [
      { label: 'Read Career Journey', action: 'modal:about', primary: true },
      { label: 'Download Resume', action: 'action:resume', primary: false },
    ],
    telemetry: [
      { label: 'BASE', value: 'CHENNAI, TN (REMOTE OPEN)' },
      { label: 'EXPERIENCE', value: '2+ YEARS PRODUCTION ANALYTICS' },
    ],
  },
  {
    id: 4,
    slug: 'projects',
    title: 'Featured Workstations',
    kicker: 'Logistics Warehouse & Loading Bays',
    description: 'Production data products: Lumio SaaS Telemetry, ShopIQ SQL Case Study, IPL/WPL Cricket Analytics, and Portfolio Builder Pro.',
    badge: 'ZONE 04 // WAREHOUSE FLEET & DOCKS',
    camera: {
      x: -70,
      y: -44,
      zoom: 1.2,
      rotate: -0.8,
    },
    buttons: [
      { label: 'View All Projects', action: 'modal:projects', primary: true },
      { label: 'GitHub Repositories', action: 'link:github', primary: false },
    ],
    telemetry: [
      { label: 'PROJECTS READY', value: '4 PRODUCTION WORKSTATIONS' },
      { label: 'QUERY SPEED', value: '4.2x ACCELERATION' },
    ],
  },
  {
    id: 5,
    slug: 'contact',
    title: "Let's Build with Data",
    kicker: 'Fulfillment Interior & Dispatch Hub',
    description: 'Available for full-time Data Analyst roles, analytics engineering consultations, and executive dashboard development. Send a transmission or connect directly.',
    badge: 'ZONE 05 // FULFILLMENT INTERIOR & COMM',
    camera: {
      x: -86,
      y: -60,
      zoom: 1.35,
      rotate: 0.6,
    },
    buttons: [
      { label: 'Send Transmission', action: 'modal:contact', primary: true },
      { label: 'Direct Email', action: 'action:email', primary: false },
    ],
    telemetry: [
      { label: 'RESPONSE TIME', value: '< 24 HOURS GUARANTEED' },
      { label: 'TRANSMISSION', value: 'SSL ENCRYPTED TO SUPABASE' },
    ],
  },
];
