import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal, Database, FileCode, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface CodeSnippet {
  id: string;
  language: 'sql' | 'python' | 'dax';
  tabTitle: string;
  filename: string;
  badge: string;
  description: string;
  targetPlatform: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'sql-retention',
    language: 'sql',
    tabTitle: 'SQL CTE & Window Functions',
    filename: 'analytics_dw/cohort_attrition_risk.sql',
    badge: 'PostgreSQL 16 / Snowflake',
    description: 'Multi-stage Common Table Expression (CTE) calculating departmental salary percentiles, dense rankings, and voluntary retention risk cohorts.',
    targetPlatform: 'PostgreSQL Enterprise Data Warehouse',
    code: `-- Stage 1: Departmental Salary Ranking & Percentile Benchmarks
WITH DepartmentalSalaryRank AS (
  SELECT 
    employee_id,
    department_id,
    salary,
    tenure_months,
    performance_score,
    DENSE_RANK() OVER (
      PARTITION BY department_id 
      ORDER BY salary DESC, performance_score DESC
    ) AS dept_rank,
    ROUND(AVG(salary) OVER (PARTITION BY department_id), 2) AS dept_avg_salary,
    PERCENT_RANK() OVER (
      PARTITION BY department_id 
      ORDER BY salary ASC
    ) AS compensation_percentile
  FROM analytics.dim_employees
  WHERE employment_status = 'Active'
),

-- Stage 2: Risk Stratification Based on Comp Variance & Performance
RetentionRiskCohorts AS (
  SELECT
    employee_id,
    department_id,
    salary,
    dept_rank,
    dept_avg_salary,
    CASE 
      WHEN salary < dept_avg_salary AND performance_score >= 4.2 THEN 'High Value Flight Risk'
      WHEN tenure_months >= 36 AND compensation_percentile < 0.35 THEN 'Stagnant Compensation Tier'
      WHEN performance_score >= 4.0 THEN 'Core High Performer'
      ELSE 'Nominal Retention'
    END AS retention_cohort
  FROM DepartmentalSalaryRank
)

-- Stage 3: Executive Cohort Aggregation for Leadership Reporting
SELECT 
  retention_cohort,
  COUNT(employee_id) AS total_headcount,
  ROUND(AVG(salary), 2) AS avg_annual_salary,
  ROUND(100.0 * COUNT(employee_id) / SUM(COUNT(employee_id)) OVER(), 2) AS cohort_percentage
FROM RetentionRiskCohorts
GROUP BY retention_cohort
ORDER BY total_headcount DESC;`,
  },
  {
    id: 'python-rfm',
    language: 'python',
    tabTitle: 'Python / Pandas Pipeline',
    filename: 'pipelines/rfm_customer_clustering.py',
    badge: 'Python 3.12 / Pandas 2.2',
    description: 'Algorithmic customer behavioral segmentation calculating Recency, Frequency, and Monetary (RFM) quintiles and customer lifetime value mapping.',
    targetPlatform: 'Python Automated ETL Pipeline',
    code: `import pandas as pd
import numpy as np

def compute_rfm_segments(orders_filepath: str, reference_date: str = '2026-03-31') -> pd.DataFrame:
    """Ingest order stream and construct quintile-based RFM customer clusters."""
    # 1. Ingest transactional dataset
    df = pd.read_parquet(orders_filepath)
    df['order_date'] = pd.to_datetime(df['order_date'])
    ref_date = pd.to_datetime(reference_date)

    # 2. Group by customer to calculate core RFM behavioral parameters
    rfm = df.groupby('customer_id').agg(
        recency_days=('order_date', lambda x: (ref_date - x.max()).days),
        frequency=('order_id', 'nunique'),
        monetary_value=('net_revenue', 'sum'),
        avg_order_value=('net_revenue', 'mean')
    ).reset_index()

    # 3. Calculate quintile scores (Scale 1-5; 5 represents highest value)
    rfm['R_score'] = pd.qcut(rfm['recency_days'], q=5, labels=[5, 4, 3, 2, 1])
    rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5])
    rfm['M_score'] = pd.qcut(rfm['monetary_value'].rank(method='first'), q=5, labels=[1, 2, 3, 4, 5])

    # 4. Synthesize composite scoring & map strategic retention personas
    conditions = [
        (rfm['R_score'].astype(int) >= 4) & (rfm['F_score'].astype(int) >= 4),
        (rfm['R_score'].astype(int) >= 3) & (rfm['F_score'].astype(int) >= 2),
        (rfm['R_score'].astype(int) <= 2) & (rfm['F_score'].astype(int) >= 3),
        (rfm['R_score'].astype(int) <= 2) & (rfm['F_score'].astype(int) <= 2),
    ]
    persona_labels = [
        'Champions & High LTV',
        'Active Steady Buyers',
        'At-Risk Customers',
        'Dormant / Churned'
    ]
    rfm['persona_segment'] = np.select(conditions, persona_labels, default='Occasional Buyers')

    return rfm.sort_values(by='monetary_value', ascending=False)`,
  },
  {
    id: 'dax-measures',
    language: 'dax',
    tabTitle: 'Power BI DAX Measures',
    filename: 'powerbi_models/sales_yoy_variance.dax',
    badge: 'Power BI Service / Tabular',
    description: 'Sophisticated DAX business measures computing Year-over-Year (YoY) revenue variances and trailing 30-day dynamic moving averages.',
    targetPlatform: 'Power BI DirectQuery & Tabular Model',
    code: `// Dynamic Year-Over-Year Revenue Growth Calculation Group
YoY_Revenue_Growth = 
VAR CurrentPeriodSales = [Total Net Revenue]
VAR PriorYearSales = 
    CALCULATE(
        [Total Net Revenue],
        SAMEPERIODLASTYEAR('Dim_Calendar'[Full_Date])
    )
VAR DollarVariance = CurrentPeriodSales - PriorYearSales
VAR PercentVariance = 
    DIVIDE(
        DollarVariance, 
        PriorYearSales, 
        0
    )
RETURN
    SWITCH(
        TRUE(),
        ISBLANK(PriorYearSales), BLANK(),
        PercentVariance
    )

// Dynamic Trailing 30-Day Moving Average
Rolling_30D_Avg_Sales = 
VAR AnchorDate = LASTDATE('Dim_Calendar'[Full_Date])
VAR TrailingWindowSales = 
    CALCULATE(
        AVERAGE('Fact_Sales'[Net_Amount]),
        DATESINPERIOD(
            'Dim_Calendar'[Full_Date],
            AnchorDate,
            -30,
            DAY
        )
    )
RETURN
    TrailingWindowSales`,
  },
];

export const CodeShowcase: React.FC = () => {
  const [activeSnippetId, setActiveSnippetId] = useState<string>(SNIPPETS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet = SNIPPETS.find((s) => s.id === activeSnippetId) || SNIPPETS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code to clipboard:', err);
    }
  };

  // Helper syntax highlighter that colors tokens gracefully without external dependencies
  const renderHighlightedCode = (code: string, language: 'sql' | 'python' | 'dax') => {
    const lines = code.split('\n');
    return lines.map((line, lineIdx) => {
      // Check for comments first
      const isComment =
        line.trim().startsWith('--') ||
        line.trim().startsWith('//') ||
        line.trim().startsWith('#') ||
        line.trim().startsWith('"""');

      if (isComment) {
        return (
          <div key={lineIdx} className="table-row">
            <span className="table-cell select-none pr-4 text-right text-[#6B6B67] dark:text-[#525250] font-mono text-xs opacity-50 w-8">
              {lineIdx + 1 < 10 ? `0${lineIdx + 1}` : lineIdx + 1}
            </span>
            <span className="table-cell text-[#8B8B86] dark:text-[#686862] italic font-mono text-xs leading-relaxed">
              {line}
            </span>
          </div>
        );
      }

      // Tokenize line words
      const words = line.split(/(\s+|[(),=;+\-*/[\]{}<>])/);
      return (
        <div key={lineIdx} className="table-row hover:bg-white/5 transition-colors">
          <span className="table-cell select-none pr-4 text-right text-[#6B6B67] dark:text-[#525250] font-mono text-xs opacity-50 w-8">
            {lineIdx + 1 < 10 ? `0${lineIdx + 1}` : lineIdx + 1}
          </span>
          <span className="table-cell font-mono text-xs leading-relaxed text-[#111111] dark:text-[#E2E2DE]">
            {words.map((token, tokenIdx) => {
              const upper = token.toUpperCase();

              // SQL / DAX Keywords
              const isKeyword = [
                'SELECT', 'FROM', 'WHERE', 'WITH', 'AS', 'AND', 'OR', 'CASE', 'WHEN', 'THEN',
                'ELSE', 'END', 'OVER', 'PARTITION', 'BY', 'ORDER', 'GROUP', 'DESC', 'ASC',
                'ROUND', 'DENSE_RANK', 'AVG', 'COUNT', 'SUM', 'VAR', 'RETURN', 'CALCULATE',
                'SAMEPERIODLASTYEAR', 'DIVIDE', 'SWITCH', 'TRUE', 'ISBLANK', 'BLANK',
                'DATESINPERIOD', 'LASTDATE', 'AVERAGE', 'DAY', 'import', 'def', 'return',
                'lambda', 'in', 'default'
              ].includes(upper) || ['import', 'def', 'return', 'lambda', 'in', 'as'].includes(token);

              // Functions
              const isFunction = [
                'read_parquet', 'to_datetime', 'groupby', 'agg', 'days', 'reset_index',
                'qcut', 'rank', 'astype', 'select', 'sort_values', 'max', 'mean', 'nunique',
                'DENSE_RANK', 'ROUND', 'AVG', 'PERCENT_RANK', 'COUNT', 'SUM', 'CALCULATE',
                'SAMEPERIODLASTYEAR', 'DIVIDE', 'SWITCH', 'ISBLANK', 'BLANK', 'DATESINPERIOD',
                'LASTDATE', 'AVERAGE'
              ].includes(token);

              // Strings
              const isString = /^['"].*['"]$/.test(token) || token.startsWith("'") || token.endsWith("'");

              // Numbers
              const isNumber = /^\d+(\.\d+)?$/.test(token);

              if (isKeyword) {
                return (
                  <span key={tokenIdx} className="text-[#E54835] dark:text-[#F87171] font-bold">
                    {token}
                  </span>
                );
              }
              if (isFunction) {
                return (
                  <span key={tokenIdx} className="text-[#0284C7] dark:text-[#38BDF8] font-semibold">
                    {token}
                  </span>
                );
              }
              if (isString) {
                return (
                  <span key={tokenIdx} className="text-[#059669] dark:text-[#34D399]">
                    {token}
                  </span>
                );
              }
              if (isNumber) {
                return (
                  <span key={tokenIdx} className="text-[#D97706] dark:text-[#FBBF24]">
                    {token}
                  </span>
                );
              }
              return <span key={tokenIdx}>{token}</span>;
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <section id="code" className="py-24 md:py-32 bg-transparent border-b border-white/40 dark:border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/40 dark:border-white/10">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#E54835] uppercase mb-2 block font-bold">
              03. Implementation Rigor
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] dark:text-[#EBEBE8] uppercase">
              Code Showcase
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-[#6B6B67] dark:text-[#9E9E9A] max-w-sm md:text-right">
            Production analytical queries, statistical data pipelines, and calculated DAX models.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {SNIPPETS.map((snippet) => {
            const isActive = snippet.id === activeSnippetId;
            return (
              <button
                key={snippet.id}
                onClick={() => {
                  setActiveSnippetId(snippet.id);
                  setCopied(false);
                }}
                className={`px-5 py-3 text-xs font-mono uppercase tracking-wider font-bold transition-all rounded-none flex items-center gap-2 select-none hover:-translate-y-0.5 active:translate-y-0 ${
                  isActive
                    ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-md border border-[#111111] dark:border-white'
                    : 'glass-btn text-[#6B6B67] dark:text-[#9E9E9A] hover:text-[#111111] dark:hover:text-white'
                }`}
              >
                {snippet.language === 'sql' && <Database className="w-3.5 h-3.5 text-[#E54835]" />}
                {snippet.language === 'python' && <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />}
                {snippet.language === 'dax' && <FileCode className="w-3.5 h-3.5 text-[#F59E0B]" />}
                <span>{snippet.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* The Code Terminal Viewer - Deep Glass Panel */}
        <div className="glass-panel-deep rounded-none overflow-hidden">
          {/* Terminal Window Header Bar */}
          <div className="px-5 py-3.5 bg-white/50 dark:bg-white/5 backdrop-blur-xl border-b border-white/50 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {/* Traffic light terminal dots */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E54835]/80 shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80 shadow-xs" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80 shadow-xs" />
              </div>

              {/* Filename & Target System */}
              <div className="flex items-center gap-2 text-xs font-mono truncate">
                <span className="font-bold text-[#111111] dark:text-[#EBEBE8] truncate">
                  {activeSnippet.filename}
                </span>
                <span className="text-[#8B8B86] dark:text-[#686862] hidden sm:inline">·</span>
                <span className="text-[10px] uppercase tracking-wider text-[#6B6B67] dark:text-[#9E9E9A] px-2 py-0.5 glass-pill rounded-none hidden md:inline">
                  {activeSnippet.badge}
                </span>
              </div>
            </div>

            {/* Copy to Clipboard Button */}
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center gap-2 rounded-none ${
                copied
                  ? 'bg-emerald-500 text-white border border-emerald-500 shadow-md'
                  : 'glass-btn text-[#111111] dark:text-[#EBEBE8] hover:-translate-y-0.5 active:translate-y-0'
              }`}
              title="Copy code snippet to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
          </div>

          {/* Description banner */}
          <div className="px-6 py-2.5 bg-white/40 dark:bg-white/5 border-b border-white/40 dark:border-white/10 text-xs font-mono text-[#6B6B67] dark:text-[#9E9E9A] flex items-center gap-2 backdrop-blur-md">
            <ChevronRight className="w-3.5 h-3.5 text-[#E54835] shrink-0" />
            <span>{activeSnippet.description}</span>
          </div>

          {/* Syntax Highlighted Code Body */}
          <div className="p-6 overflow-x-auto max-h-[520px] overflow-y-auto bg-white/30 dark:bg-[#07070b]/60 backdrop-blur-md">
            <div className="table w-full font-mono text-xs">
              {renderHighlightedCode(activeSnippet.code, activeSnippet.language)}
            </div>
          </div>

          {/* Footer Status Bar */}
          <div className="px-6 py-2.5 bg-white/50 dark:bg-white/5 border-t border-white/40 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-[#8B8B86] dark:text-[#686862] backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Target: {activeSnippet.targetPlatform}</span>
            </div>
            <div className="hidden sm:block">
              <span>Encoding: UTF-8 · Format: Verified Production Code</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
