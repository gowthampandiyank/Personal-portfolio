import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Database, Terminal, BarChart3, LineChart, Cpu, Layers } from 'lucide-react';

// Exact SVG Logos styled strictly in Black, White, and Orange (#E54835)
const NumpyLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className}>
    <path
      d="M54.32 27.164L33.304 16.559 10.226 28.071l21.594 10.84zM63.961 32.031L86 43.16 63.137 54.637 41.512 43.782zM93.398 16.715l22.645 11.355-20.254 10.168-22.082-11.141zM83.652 11.824L63.265 1.601 43.101 11.667l21.008 10.59zM67.715 99.605v27.816l24.695-12.324-.023-27.828zM92.375 77.555l-.027-27.535-24.633 12.246v27.547zM122.02 72.398v27.926l-21.066 10.508-.016-27.797zM122.02 62.633V35.266l-21.105 10.492.016 27.59z"
      fill="#FFFFFF"
    />
    <path
      d="M58.996 62.266l-16.629-8.367v36.14S22.019 46.756 20.14 42.865c-.242-.504-1.242-1.051-1.496-1.188-3.668-1.914-14.355-7.324-14.355-7.324v63.871l14.785 7.926V72.75s20.129 38.676 20.336 39.102c.21.422 2.219 4.492 4.383 5.926 2.87 1.906 15.195 9.316 15.195 9.316z"
      fill="#E54835"
    />
  </svg>
);

const PandasLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className}>
    <path
      d="M48.697 15.176h12.25v25.437h-12.25zm0 52.251h12.25v25.436h-12.25z"
      fill="#FFFFFF"
    />
    <path d="M48.697 48.037h12.25v12.001h-12.25z" fill="#E54835" />
    <path
      d="M29.017 36.087h12.25v84.552h-12.25zM67.97 88.414h12.25v25.436H67.97zm0-52.297h12.25v25.437H67.97z"
      fill="#FFFFFF"
    />
    <path d="M67.97 68.983h12.25v12.001H67.97z" fill="#E54835" />
    <path d="M87.238 8.55h12.25v84.552h-12.25z" fill="#FFFFFF" />
  </svg>
);

const GithubLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className={`${className} text-[#E54835]`}
  >
    <g fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
      />
      <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" />
    </g>
  </svg>
);

const PowerBiLogo: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <div className={`${className} flex items-end gap-0.5 bg-black p-1 border border-white/40 shrink-0`}>
    <div className="w-1 h-2 bg-white" />
    <div className="w-1 h-3 bg-[#E54835]" />
    <div className="w-1 h-4 bg-white" />
  </div>
);

interface FloatingElementConfig {
  id: number;
  category: 'logo' | 'sql' | 'dax' | 'number';
  x: string;
  y: string;
  speed: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
  rotate: number;
  opacity: number;
  title?: string;
  content: string;
  accentColor: string; // Strictly '#E54835' or '#FFFFFF'
  icon?: 'numpy' | 'pandas' | 'github' | 'powerbi' | 'database' | 'terminal' | 'chart';
}

export const BackgroundAnimation: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Curated 15 rich floating data analytics elements strictly in Black, White, and Orange (#E54835)
  const elements: FloatingElementConfig[] = useMemo(
    () => [
      // 1. NumPy 3D Isometric Logo (Top Left)
      {
        id: 1,
        category: 'logo',
        icon: 'numpy',
        title: 'NUMPY',
        content: 'np.ndarray · Vectorized Matrix',
        x: '5%',
        y: '10%',
        speed: -160,
        duration: 21,
        delay: 0,
        dx: 12,
        dy: -16,
        rotate: 3,
        opacity: 0.55,
        accentColor: '#E54835',
      },

      // 2. Pandas Columns Multi-Color Logo (Top Right)
      {
        id: 2,
        category: 'logo',
        icon: 'pandas',
        title: 'PANDAS',
        content: 'pd.DataFrame · Groupby',
        x: '84%',
        y: '12%',
        speed: -220,
        duration: 23,
        delay: 1.2,
        dx: -14,
        dy: 14,
        rotate: -4,
        opacity: 0.6,
        accentColor: '#FFFFFF',
      },

      // 3. SQL Query Code Box (Upper Left)
      {
        id: 3,
        category: 'sql',
        icon: 'terminal',
        title: 'SQL QUERY // CTE',
        content: 'SELECT user_id, DENSE_RANK() OVER (PARTITION BY cohort ORDER BY revenue DESC)',
        x: '8%',
        y: '22%',
        speed: -190,
        duration: 25,
        delay: 2.1,
        dx: 15,
        dy: 10,
        rotate: -2,
        opacity: 0.5,
        accentColor: '#E54835',
      },

      // 4. Power BI DAX Formula Box (Upper Right)
      {
        id: 4,
        category: 'dax',
        icon: 'powerbi',
        title: 'DAX MEASURE // BI',
        content: 'CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(\'Calendar\'[Date]))',
        x: '75%',
        y: '25%',
        speed: -240,
        duration: 24,
        delay: 0.5,
        dx: -12,
        dy: -15,
        rotate: 2,
        opacity: 0.55,
        accentColor: '#FFFFFF',
      },

      // 5. Telemetry Live KPI Number
      {
        id: 5,
        category: 'number',
        icon: 'chart',
        title: 'METRIC',
        content: '+24.8% REVENUE // FORECAST SURPASSED',
        x: '46%',
        y: '18%',
        speed: -150,
        duration: 20,
        delay: 3.0,
        dx: 10,
        dy: -12,
        rotate: 1,
        opacity: 0.48,
        accentColor: '#E54835',
      },

      // 6. GitHub Octocat Logo (Mid-Top Left)
      {
        id: 6,
        category: 'logo',
        icon: 'github',
        title: 'GITHUB',
        content: 'git commit -m "feat: warehouse pipeline"',
        x: '4%',
        y: '38%',
        speed: -210,
        duration: 27,
        delay: 1.8,
        dx: 10,
        dy: 16,
        rotate: 4,
        opacity: 0.5,
        accentColor: '#FFFFFF',
      },

      // 7. SQL Filtering Query (Mid Right)
      {
        id: 7,
        category: 'sql',
        icon: 'database',
        title: 'POSTGRESQL // 14MS',
        content: 'WHERE churn_risk < 0.05 AND confidence >= 0.98',
        x: '82%',
        y: '42%',
        speed: -180,
        duration: 22,
        delay: 2.7,
        dx: -16,
        dy: 12,
        rotate: -3,
        opacity: 0.5,
        accentColor: '#E54835',
      },

      // 8. Power BI DAX Divide Code (Mid Left)
      {
        id: 8,
        category: 'dax',
        icon: 'powerbi',
        title: 'DAX // RATIO',
        content: 'DIVIDE([Net Margin] - [Target], [Target], 0)',
        x: '12%',
        y: '52%',
        speed: -250,
        duration: 26,
        delay: 1.0,
        dx: 14,
        dy: -14,
        rotate: 3,
        opacity: 0.52,
        accentColor: '#FFFFFF',
      },

      // 9. Data Integrity & Rows Telemetry Number
      {
        id: 9,
        category: 'number',
        icon: 'database',
        title: 'DATA WAREHOUSE',
        content: '12,480 ROWS // 99.9% INTEGRITY',
        x: '48%',
        y: '48%',
        speed: -170,
        duration: 28,
        delay: 3.4,
        dx: -10,
        dy: 10,
        rotate: -2,
        opacity: 0.45,
        accentColor: '#E54835',
      },

      // 10. NumPy Mathematical Compute (Mid-Bottom Left)
      {
        id: 10,
        category: 'logo',
        icon: 'numpy',
        title: 'NUMPY ARRAY',
        content: 'matrix_a @ matrix_b.T // O(N LOG N)',
        x: '6%',
        y: '65%',
        speed: -230,
        duration: 24,
        delay: 0.7,
        dx: 12,
        dy: 14,
        rotate: -4,
        opacity: 0.52,
        accentColor: '#E54835',
      },

      // 11. Statistical Regression Number
      {
        id: 11,
        category: 'number',
        icon: 'chart',
        title: 'REGRESSION',
        content: 'R² = 0.984 · p < 0.001 [REJECT NULL]',
        x: '86%',
        y: '62%',
        speed: -200,
        duration: 22,
        delay: 2.3,
        dx: -14,
        dy: -10,
        rotate: 4,
        opacity: 0.5,
        accentColor: '#FFFFFF',
      },

      // 12. Pandas Data Aggregation (Bottom Left)
      {
        id: 12,
        category: 'logo',
        icon: 'pandas',
        title: 'PANDAS PIPELINE',
        content: 'df.groupby([\'cohort\'])[\'clv\'].mean()',
        x: '10%',
        y: '80%',
        speed: -260,
        duration: 25,
        delay: 1.5,
        dx: 15,
        dy: -12,
        rotate: 3,
        opacity: 0.55,
        accentColor: '#E54835',
      },

      // 13. SQL Time-Series Aggregation (Bottom Center)
      {
        id: 13,
        category: 'sql',
        icon: 'terminal',
        title: 'SQL TIME-SERIES',
        content: 'GROUP BY DATE_TRUNC(\'month\', order_date)',
        x: '42%',
        y: '78%',
        speed: -190,
        duration: 27,
        delay: 3.1,
        dx: -12,
        dy: 14,
        rotate: -2,
        opacity: 0.48,
        accentColor: '#FFFFFF',
      },

      // 14. GitHub Repositories Telemetry (Bottom Right)
      {
        id: 14,
        category: 'logo',
        icon: 'github',
        title: 'GIT // PIPELINE',
        content: 'git push origin main [CI: PASSED]',
        x: '82%',
        y: '82%',
        speed: -270,
        duration: 23,
        delay: 0.3,
        dx: -10,
        dy: -16,
        rotate: -5,
        opacity: 0.5,
        accentColor: '#E54835',
      },

      // 15. Power BI Tabular Engine (Footer Tier)
      {
        id: 15,
        category: 'dax',
        icon: 'powerbi',
        title: 'STAR SCHEMA',
        content: 'POWER BI SERVICE // DAX ENGINE 100% OK',
        x: '64%',
        y: '92%',
        speed: -220,
        duration: 26,
        delay: 2.0,
        dx: 12,
        dy: 10,
        rotate: 2,
        opacity: 0.5,
        accentColor: '#FFFFFF',
      },
    ],
    []
  );

  return (
    <div
      aria-hidden="true"
      style={{ zIndex: 0 }}
      className="fixed inset-0 overflow-hidden pointer-events-none select-none font-mono"
    >
      {elements.map((el) => (
        <FloatingMotionCard
          key={el.id}
          element={el}
          scrollYProgress={scrollYProgress}
          shouldReduceMotion={shouldReduceMotion || false}
        />
      ))}
    </div>
  );
};

interface FloatingMotionCardProps {
  element: FloatingElementConfig;
  scrollYProgress: any;
  shouldReduceMotion: boolean;
}

const FloatingMotionCard: React.FC<FloatingMotionCardProps> = ({
  element,
  scrollYProgress,
  shouldReduceMotion,
}) => {
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : element.speed]
  );

  const renderIcon = () => {
    switch (element.icon) {
      case 'numpy':
        return <NumpyLogo className="w-5 h-5 shrink-0" />;
      case 'pandas':
        return <PandasLogo className="w-5 h-5 shrink-0" />;
      case 'github':
        return <GithubLogo className="w-5 h-5 shrink-0" />;
      case 'powerbi':
        return <PowerBiLogo className="w-5 h-5 shrink-0" />;
      case 'database':
        return <Database className="w-4 h-4 shrink-0 text-[#E54835]" />;
      case 'terminal':
        return <Terminal className="w-4 h-4 shrink-0 text-[#E54835]" />;
      case 'chart':
        return <LineChart className="w-4 h-4 shrink-0 text-[#E54835]" />;
      default:
        return <Cpu className="w-4 h-4 shrink-0 text-white" />;
    }
  };

  return (
    <motion.div
      style={{
        left: element.x,
        top: element.y,
        y: yParallax,
      }}
      className="absolute hidden md:block"
    >
      {/* Black, White, and Orange (#E54835) Floating Card */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, element.dx, 0, -element.dx, 0],
                y: [0, element.dy, 0, -element.dy, 0],
                rotate: [0, element.rotate, 0, -element.rotate, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: element.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: element.delay,
              }
        }
        style={{ opacity: element.opacity }}
        className="p-2 sm:p-2.5 rounded-none bg-black/90 dark:bg-black/95 border border-white/20 text-white shadow-xl backdrop-blur-md max-w-xs transition-opacity hover:opacity-95"
      >
        <div className="flex items-center gap-2 mb-1 border-b border-white/15 pb-1 text-[9px] font-bold tracking-wider">
          {renderIcon()}
          <span style={{ color: element.accentColor }} className="uppercase">
            {element.title}
          </span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E54835] animate-ping shrink-0" />
        </div>
        <div className="text-[10px] font-mono text-white/90 leading-tight truncate">
          {element.content}
        </div>
      </motion.div>
    </motion.div>
  );
};
