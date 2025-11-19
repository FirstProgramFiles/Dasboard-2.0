import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { generateHistoricalData } from '../services/mockData';

const TechnicalTab: React.FC = () => {
  const data = generateHistoricalData();
  
  // Mock efficiency data
  const efficiencyData = [
    { name: 'Котельная 1', kpd: 92, norm: 90 },
    { name: 'Котельная 2', kpd: 88, norm: 90 },
    { name: 'ЦТП "Восток"', kpd: 94, norm: 92 },
    { name: 'ЦТП "Юг"', kpd: 85, norm: 90 },
  ];

  const resources = [
    { name: 'Газ (м³)', actual: 1200, plan: 1150 },
    { name: 'Э/Э (кВт·ч)', actual: 450, plan: 500 },
    { name: 'Вода (м³)', actual: 85, plan: 80 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-4 min-h-[300px] flex flex-col relative overflow-hidden group">
             <h3 className="text-slate-300 font-medium mb-4">Интерактивная карта объектов</h3>
             <div className="flex-1 bg-slate-900 rounded border border-slate-800 flex items-center justify-center relative">
                {/* Simulated Map Grid */}
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                
                {/* Simulated Pins */}
                <div className="absolute top-1/4 left-1/3 group/pin cursor-pointer">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    <div className="absolute -top-8 -left-8 bg-slate-800 text-xs p-1 rounded border border-slate-600 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap z-10">Котельная №1 (Норма)</div>
                </div>
                <div className="absolute top-1/2 left-1/2 group/pin cursor-pointer">
                    <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping absolute"></div>
                    <div className="w-3 h-3 bg-rose-500 rounded-full relative shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                     <div className="absolute -top-8 -left-8 bg-slate-800 text-xs p-1 rounded border border-slate-600 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap z-10 text-rose-400">ЦТП-42 (Авария)</div>
                </div>
                
                <p className="text-slate-600 select-none">Интеграция с ГИС системой</p>
             </div>
          </div>

          {/* Resource Usage */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
             <h3 className="text-slate-300 font-medium mb-4">Расход ресурсов (Тек. час)</h3>
             <div className="space-y-6">
                {resources.map((res) => (
                    <div key={res.name}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-400">{res.name}</span>
                            <span className="text-slate-200 font-mono">{res.actual} <span className="text-slate-500">/ {res.plan}</span></span>
                        </div>
                        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${res.actual > res.plan ? 'bg-rose-500' : 'bg-blue-500'}`} 
                                style={{width: `${Math.min((res.actual / res.plan) * 100, 100)}%`}}
                            ></div>
                        </div>
                    </div>
                ))}
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 h-80">
              <h3 className="text-slate-300 font-medium mb-4">Параметры теплоносителя (Сутки)</h3>
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="hour" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} interval={3} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[70, 110]} />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 12]} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#f97316" name="Температура (°C)" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="pressure" stroke="#3b82f6" name="Давление (кгс/см²)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 h-80">
             <h3 className="text-slate-300 font-medium mb-4">Коэффициент использования (КПД)</h3>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={efficiencyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: '#334155', opacity: 0.2}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
                    <Bar dataKey="kpd" name="Факт" fill="#10b981" barSize={20} radius={[0, 4, 4, 0]} />
                    <Bar dataKey="norm" name="Норма" fill="#334155" barSize={10} radius={[0, 4, 4, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
       </div>
    </div>
  );
};

export default TechnicalTab;