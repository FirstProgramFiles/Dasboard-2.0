import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { generateFinanceData } from '../services/mockData';

const FinanceTab: React.FC = () => {
  const pieData = generateFinanceData();
  const COLORS = ['#3b82f6', '#f59e0b', '#64748b'];

  const expenseData = [
    { category: 'Газ', plan: 400, fact: 420 },
    { category: 'Э/Э', plan: 150, fact: 145 },
    { category: 'ФОТ', plan: 300, fact: 300 },
    { category: 'Ремонты', plan: 100, fact: 120 },
    { category: 'Налоги', plan: 120, fact: 120 },
  ];

  return (
    <div className="h-full flex flex-col gap-4 animate-fade-in">
       <div className="flex-[3] min-h-0 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col">
             <h3 className="text-slate-300 font-medium mb-2 text-center flex-none">Структура поступлений</h3>
             <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#ffffff' }}
                            itemStyle={{ color: '#ffffff' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col">
             <h3 className="text-slate-300 font-medium mb-4 flex-none">Исполнение бюджета расходов (ТОП-5)</h3>
             <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="category" stroke="#64748b" tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#ffffff' }}
                            itemStyle={{ color: '#ffffff' }}
                            cursor={{fill: '#334155', opacity: 0.4}}
                        />
                        <Legend />
                        <Bar dataKey="plan" name="План (млн ₽)" fill="#475569" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="fact" name="Факт (млн ₽)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
       </div>

       <div className="flex-1 min-h-0 bg-slate-800 border border-slate-700 rounded-lg p-6 flex flex-col justify-center">
          <h3 className="text-slate-300 font-medium mb-4 flex-none">Дебиторская задолженность</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 p-4 rounded border border-slate-700 text-center">
                  <p className="text-slate-500 text-sm mb-1">Общая сумма</p>
                  <p className="text-3xl font-bold text-rose-500">42.5 млн ₽</p>
                  <p className="text-xs text-rose-400 mt-2">+1.2% за неделю</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded border border-slate-700 text-center">
                  <p className="text-slate-500 text-sm mb-1">Просрочка &gt; 3 мес</p>
                  <p className="text-3xl font-bold text-amber-500">15.1 млн ₽</p>
                  <p className="text-xs text-slate-400 mt-2">35% от общей</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded border border-slate-700 text-center">
                  <p className="text-slate-500 text-sm mb-1">Судебная работа</p>
                  <p className="text-3xl font-bold text-slate-100">8.4 млн ₽</p>
                  <p className="text-xs text-emerald-400 mt-2">Взыскано: 1.2 млн</p>
              </div>
          </div>
       </div>
    </div>
  );
};

export default FinanceTab;