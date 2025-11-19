import { DashboardState, IncidentStatus, CriticalLevel, Alert, Incident } from '../types';

const generateRandomValue = (min: number, max: number, decimals = 0): number => {
  const val = Math.random() * (max - min) + min;
  return Number(val.toFixed(decimals));
};

export const getInitialDashboardState = (): DashboardState => {
  return {
    heatOutput: {
      label: 'Отпуск тепла',
      value: 1240.5,
      unit: 'Гкал',
      trend: 2.4,
      status: 'ok',
    },
    outTemp: {
      label: 'T вых. (средняя)',
      value: 94.2,
      unit: '°C',
      trend: -0.5,
      status: 'ok',
    },
    pressure: {
      label: 'Давление в сети',
      value: 8.4,
      unit: 'кгс/см²',
      trend: 0,
      status: 'warning', // Slightly low
    },
    incomeDay: {
      label: 'Поступления (сутки)',
      value: 1.2,
      unit: 'млн ₽',
      trend: 5.1,
      status: 'ok',
    },
    budgetExecution: {
      label: 'Исполнение бюджета',
      value: 92,
      unit: '%',
      status: 'warning',
    },
    paymentRate: {
      label: 'Платёжная дисциплина',
      value: 88,
      unit: '%',
      status: 'error', // Below target
    },
    activeContracts: {
      label: 'Активные договоры',
      value: 14520,
      unit: 'шт.',
      status: 'ok',
    },
    activeAccidents: 2,
    disconnectedSubscribers: 145,
    incidents: [
      {
        id: '1',
        time: '08:15',
        location: 'Котельная "Северная"',
        description: 'Падение давления на обратке',
        status: IncidentStatus.IN_PROGRESS,
        durationHours: 1.5,
      },
      {
        id: '2',
        time: '09:40',
        location: 'ЦТП-42',
        description: 'Отказ насоса №2',
        status: IncidentStatus.NEW,
        durationHours: 0.3,
      },
    ],
    alerts: [
      {
        id: 'a1',
        time: '10:05',
        message: 'ЦТП-42: Давление P1 ниже нормы (3.2 кгс/см²)',
        level: CriticalLevel.CRITICAL,
        category: 'TECH',
      },
      {
        id: 'a2',
        time: '09:55',
        message: 'Фин: Отклонение плана поступлений > 15%',
        level: CriticalLevel.MEDIUM,
        category: 'FINANCE',
      },
      {
        id: 'a3',
        time: '09:30',
        message: 'Участок 5: Превышение расхода подпитки',
        level: CriticalLevel.HIGH,
        category: 'TECH',
      },
    ],
  };
};

export const generateHistoricalData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      hour: `${i}:00`,
      load: generateRandomValue(800, 1300, 0),
      temp: generateRandomValue(85, 95, 1),
      pressure: generateRandomValue(8, 9, 1),
    });
  }
  return data;
};

export const generateFinanceData = () => {
    return [
        { name: 'Отопление', value: 65 },
        { name: 'ГВС', value: 25 },
        { name: 'Прочие', value: 10 },
    ]
}