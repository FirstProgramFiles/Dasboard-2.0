import React from 'react';
import { DashboardState, IncidentStatus } from '../types';
import StatCard from './StatCard';
import { Flame, Thermometer, Gauge, DollarSign, Wallet, CreditCard, Users, AlertOctagon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateHistoricalData } from '../services/mockData';

interface OverviewTabProps {
  data: DashboardState;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data }) => {
  const chartData = generateHistoricalData();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Technical Metrics */}
      <div>
        <h2 className="text-slate-100 text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
          Теплоснабжение & Технические данные
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <StatCard metric={data.heatOutput} icon={<Flame className="w-5 h-5" />} />
          <StatCard metric={data.outTemp} icon={<Thermometer className="w-5 h-5" />} />
          <StatCard metric={data.pressure} icon={<Gauge className="w-5 h-5" />} />
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-sm">
           <h3 className="text-slate-300 font-medium mb-4 text-sm">Динамика тепловой нагрузки (24ч)</h3>
           <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} interval={3} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} unit=" Гкал" domain={['dataMin - 50', 'dataMax + 50']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#93c5fd' }}
                />
                <Area type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
           </div>
        </div>

        {/* Incident Summary */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-slate-300 font-medium text-sm">Аварийная ситуация</h3>
               <span className={`px-2 py-1 rounded text-xs font-bold ${data.activeAccidents > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {data.activeAccidents > 0 ? `${data.activeAccidents} АКТИВНЫХ` : 'НОРМА'}
               </span>
            </div>
            
            <div className="flex-1 space-y-4">
               <div className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-700">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-rose-500/10 rounded-full text-rose-500">
                        <AlertOctagon className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-sm text-slate-400">Отключено абонентов</p>
                        <p className="text-2xl font-bold text-rose-400">{data.disconnectedSubscribers}</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-2">
                  <p className="text-xs text-slate-500 uppercase font-bold">Последние инциденты</p>
                  {data.incidents.slice(0, 2).map(inc => (
                      <div key={inc.id} className="flex items-center gap-3 p-2 hover:bg-slate-700/50 rounded transition-colors">
                          <div className={`w-2 h-2 rounded-full ${inc.status === IncidentStatus.NEW ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`}></div>
                          <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-200 truncate">{inc.location}</p>
                              <p className="text-xs text-slate-500 truncate">{inc.description}</p>
                          </div>
                          <span className="text-xs font-mono text-slate-400">{inc.time}</span>
                      </div>
                  ))}
               </div>
            </div>
        </div>
      </div>

      {/* Finance & Sales */}
      <div>
        <h2 className="text-slate-100 text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
          Финансы и Сбыт
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard metric={data.incomeDay} icon={<DollarSign className="w-5 h-5" />} />
          <StatCard metric={data.budgetExecution} icon={<Wallet className="w-5 h-5" />} />
          <StatCard metric={data.paymentRate} icon={<CreditCard className="w-5 h-5" />} />
          <StatCard metric={data.activeContracts} icon={<Users className="w-5 h-5" />} />
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;