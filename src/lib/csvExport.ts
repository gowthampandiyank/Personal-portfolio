import { Project } from '../types';

/**
 * Technical utility to format rows into clean RFC 4180 compliant CSV string
 */
function toCsvString(headers: string[], rows: (string | number)[][]): string {
  const escapeCell = (val: string | number) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headerLine = headers.map(escapeCell).join(',');
  const rowLines = rows.map((row) => row.map(escapeCell).join(','));
  return [headerLine, ...rowLines].join('\r\n');
}

/**
 * Triggers client-side download of a CSV text file
 */
export function downloadCsvFile(filename: string, csvContent: string) {
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates realistic dummy CSV reporting datasets customized for each analyst project
 */
export function generateProjectDummyCsv(project: Project): { filename: string; content: string } {
  const slug = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .slice(0, 36);

  const titleLower = project.title.toLowerCase();

  if (titleLower.includes('hr') || titleLower.includes('retention') || titleLower.includes('attrition')) {
    const headers = [
      'Employee_ID',
      'Department',
      'Job_Role',
      'Tenure_Years',
      'Monthly_Salary_USD',
      'Performance_Rating',
      'Overtime_Status',
      'Satisfaction_Score_1_5',
      'Attrition_Risk_Pct',
      'Predicted_Outcome',
    ];
    const rows = [
      ['EMP-1049', 'Engineering', 'Senior Data Analyst', 4.5, 9400, 'Exceeds Expectations', 'No', 4.8, '8.2%', 'Retained'],
      ['EMP-1052', 'Marketing', 'Campaign Specialist', 2.1, 6200, 'Meets Expectations', 'Yes', 3.2, '42.5%', 'Monitored'],
      ['EMP-1088', 'Finance', 'Financial Analyst', 3.8, 8100, 'Exceeds Expectations', 'No', 4.5, '11.0%', 'Retained'],
      ['EMP-1104', 'Sales', 'Account Executive', 1.4, 5800, 'Needs Improvement', 'Yes', 2.4, '68.4%', 'High Risk'],
      ['EMP-1150', 'Operations', 'Supply Chain Analyst', 5.2, 7900, 'Exceeds Expectations', 'No', 4.6, '9.5%', 'Retained'],
      ['EMP-1202', 'Engineering', 'Backend Engineer', 3.1, 9800, 'Meets Expectations', 'Yes', 3.7, '28.0%', 'Stable'],
      ['EMP-1240', 'Product', 'Product Analytics Lead', 4.0, 11200, 'Outstanding', 'No', 4.9, '5.1%', 'Promoted'],
      ['EMP-1299', 'Customer Success', 'BI Consultant', 1.8, 6400, 'Meets Expectations', 'No', 3.9, '19.2%', 'Retained'],
      ['EMP-1335', 'Engineering', 'Data Engineer', 2.7, 9100, 'Exceeds Expectations', 'No', 4.3, '14.0%', 'Retained'],
      ['EMP-1380', 'Finance', 'Sr Revenue Accountant', 6.0, 8900, 'Exceeds Expectations', 'No', 4.7, '7.4%', 'Retained'],
    ];
    return {
      filename: `${slug}_telemetry_report.csv`,
      content: toCsvString(headers, rows),
    };
  }

  if (titleLower.includes('sales') || titleLower.includes('revenue') || titleLower.includes('commercial')) {
    const headers = [
      'Transaction_ID',
      'Posting_Date',
      'Region',
      'Sales_Channel',
      'SKU_Category',
      'Units_Sold',
      'Unit_Price_USD',
      'Discount_Rate',
      'Gross_Revenue_USD',
      'COGS_USD',
      'Net_Margin_USD',
      'Margin_Pct',
    ];
    const rows = [
      ['TX-98401', '2026-03-01', 'North America', 'Enterprise Direct', 'Analytics Cloud SaaS', 12, 1200.0, '5.0%', 13680.0, 2400.0, 11280.0, '82.5%'],
      ['TX-98402', '2026-03-02', 'EMEA', 'Partner Reseller', 'Data Warehouse Connect', 8, 850.0, '10.0%', 6120.0, 1100.0, 5020.0, '82.0%'],
      ['TX-98403', '2026-03-03', 'APAC', 'Digital Self-Serve', 'BI Dashboard Pro', 45, 120.0, '0.0%', 5400.0, 650.0, 4750.0, '88.0%'],
      ['TX-98404', '2026-03-04', 'North America', 'Enterprise Direct', 'Custom DAX Engine', 4, 4500.0, '12.0%', 15840.0, 3200.0, 12640.0, '79.8%'],
      ['TX-98405', '2026-03-05', 'LATAM', 'Partner Reseller', 'ETL Pipeline Automator', 16, 420.0, '8.0%', 6182.4, 1200.0, 4982.4, '80.6%'],
      ['TX-98406', '2026-03-06', 'North America', 'Enterprise Direct', 'Analytics Cloud SaaS', 20, 1200.0, '15.0%', 20400.0, 3800.0, 16600.0, '81.4%'],
      ['TX-98407', '2026-03-07', 'EMEA', 'Digital Self-Serve', 'BI Dashboard Pro', 62, 120.0, '5.0%', 7068.0, 890.0, 6178.0, '87.4%'],
    ];
    return {
      filename: `${slug}_commercial_performance.csv`,
      content: toCsvString(headers, rows),
    };
  }

  // Default rich analytics dataset
  const headers = [
    'Observation_ID',
    'Timestamp_UTC',
    'Pipeline_Node',
    'Dimension_Cluster',
    'Metric_Name',
    'Raw_Value',
    'Processed_Value',
    'Variance_Pct',
    'Validation_Status',
  ];
  const rows = [
    ['OBS-001', '2026-03-28 08:00:00', 'Ingestion_Node_1', 'Cluster Alpha', 'Query Latency (ms)', '142', '38', '-73.2%', 'Verified PASS'],
    ['OBS-002', '2026-03-28 08:15:00', 'Transformation_ETL', 'Cluster Alpha', 'Rows Transformed', '12500', '12500', '0.0%', 'Verified PASS'],
    ['OBS-003', '2026-03-28 08:30:00', 'Star_Schema_Agg', 'Cluster Beta', 'DAX Calculation Time', '850', '210', '-75.3%', 'Verified PASS'],
    ['OBS-004', '2026-03-28 08:45:00', 'Data_Quality_Rule', 'Cluster Beta', 'Anomaly Rate', '0.04%', '0.00%', '-100.0%', 'Verified PASS'],
    ['OBS-005', '2026-03-28 09:00:00', 'Executive_Dashboard', 'Cluster Gamma', 'Dashboard Load Time', '4.2s', '1.2s', '-71.4%', 'Verified PASS'],
    ['OBS-006', '2026-03-28 09:15:00', 'Data_Warehouse_Sync', 'Cluster Gamma', 'Database Throughput', '2.8k/s', '9.4k/s', '+235.7%', 'Verified PASS'],
  ];

  return {
    filename: `${slug}_analyst_metrics.csv`,
    content: toCsvString(headers, rows),
  };
}

/**
 * Generates an executive portfolio KPI summary report in CSV
 */
export function generateDashboardSummaryCsv(): { filename: string; content: string } {
  const headers = [
    'KPI_ID',
    'Core_Capability',
    'Primary_Metric',
    'Current_Value',
    'Target_Benchmark',
    'Trend_Direction',
    'Growth_Rate_YoY',
    'Primary_Technologies',
    'Quality_Audit_Status',
  ];
  const rows = [
    ['KPI-01', 'Data Warehousing & SQL Optimization', 'SQL Queries Executed', '12,500+', '4.2x Acceleration', 'UP', '+34.2%', 'PostgreSQL, Snowflake, BigQuery', '100% Pass'],
    ['KPI-02', 'ETL & Scheduled Pipelines', 'Operational Reports Automated', '140+', '35+ Hrs/Wk Saved', 'UP', '+48.0%', 'Power Query, Python, REST APIs', '100% Pass'],
    ['KPI-03', 'Business Intelligence & DAX', 'Executive Dashboards Built', '45+', '99.9% Model Accuracy', 'UP', '+62.5%', 'Power BI Service, DAX, Tableau', '100% Pass'],
    ['KPI-04', 'System Performance', 'Average Report Load Latency', '1.2s', '< 1.5s SLA Target', 'DOWN', '-68.0%', 'DirectQuery, In-Memory Tabular', 'Verified SLA'],
    ['KPI-05', 'Data Integrity', 'Total Rows Modeled', '3,200,000+', 'Zero Data Loss', 'UP', '+115.0%', 'Star & Snowflake Warehouses', 'Reconciled Daily'],
  ];

  return {
    filename: `gowtham_pandiyan_analytics_executive_summary_${new Date().toISOString().slice(0, 10)}.csv`,
    content: toCsvString(headers, rows),
  };
}
