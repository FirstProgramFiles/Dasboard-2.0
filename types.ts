export enum TabType {
  OVERVIEW = 'OVERVIEW',
  TECHNICAL = 'TECHNICAL',
  FINANCE = 'FINANCE',
  SALES = 'SALES',
  REPAIRS = 'REPAIRS',
}

export enum IncidentStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

export enum CriticalLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Metric {
  label: string;
  value: number | string;
  unit: string;
  trend?: number; // percentage
  status: 'ok' | 'warning' | 'error';
}

export interface Alert {
  id: string;
  time: string;
  message: string;
  level: CriticalLevel;
  category: 'TECH' | 'FINANCE' | 'SALES';
}

export interface Incident {
  id: string;
  time: string;
  location: string;
  description: string;
  status: IncidentStatus;
  durationHours: number;
}

export interface FinancialData {
  plan: number;
  fact: number;
  category: string;
}

export interface DashboardState {
  heatOutput: Metric;
  outTemp: Metric;
  pressure: Metric;
  incomeDay: Metric;
  budgetExecution: Metric;
  paymentRate: Metric;
  activeContracts: Metric;
  activeAccidents: number;
  disconnectedSubscribers: number;
  incidents: Incident[];
  alerts: Alert[];
}