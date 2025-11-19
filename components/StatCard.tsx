import React from 'react';
import { Metric } from '../types';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StatCardProps {
  metric: Metric;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ metric, icon }) => {
  const isPositive = metric.trend && metric.trend > 0;
  const isNegative = metric.trend && metric.trend < 0;

  // Determine color based on status, not just trend direction
  let statusColor = 'text-slate-100';
  if (metric.status === 'warning') statusColor = 'text-amber-400';
  if (metric.status === 'error') statusColor = 'text-rose-400';
  if (metric.status === 'ok') statusColor = 'text-emerald-400';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-sm hover:border-slate-600 transition-colors relative overflow-hidden">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider truncate pr-4">
          {metric.label}
        </h3>
        {icon && <div className="text-slate-500 opacity-50">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${statusColor}`}>
          {metric.value}
        </span>
        <span className="text-slate-500 text-sm font-medium">{metric.unit}</span>
      </div>
      {metric.trend !== undefined && (
        <div className="mt-2 flex items-center text-xs">
            {metric.trend > 0 ? (
                <ArrowUpRight className="w-3 h-3 text-emerald-500 mr-1" />
            ) : metric.trend < 0 ? (
                <ArrowDownRight className="w-3 h-3 text-rose-500 mr-1" />
            ) : (
                <Minus className="w-3 h-3 text-slate-500 mr-1" />
            )}
            <span className={metric.trend > 0 ? 'text-emerald-500' : metric.trend < 0 ? 'text-rose-500' : 'text-slate-500'}>
                {Math.abs(metric.trend)}% к вчерашнему дню
            </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;