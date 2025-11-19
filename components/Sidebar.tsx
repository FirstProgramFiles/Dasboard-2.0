import React from 'react';
import { Alert, CriticalLevel } from '../types';
import { AlertTriangle, Phone, Share2, FileText, X } from 'lucide-react';

interface SidebarProps {
  alerts: Alert[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ alerts, isOpen, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-700 transform transition-transform duration-300 ease-in-out z-40 shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:static lg:w-80 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <h2 className="text-slate-100 font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Оперативный Центр
        </h2>
        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Critical Feed */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Критические события</h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded border-l-2 ${
                alert.level === CriticalLevel.CRITICAL
                  ? 'bg-rose-950/30 border-rose-500'
                  : alert.level === CriticalLevel.HIGH
                  ? 'bg-amber-950/30 border-amber-500'
                  : 'bg-blue-950/30 border-blue-500'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    alert.level === CriticalLevel.CRITICAL ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {alert.time}
                </span>
                <span className="text-[10px] text-slate-500">{alert.category}</span>
              </div>
              <p className="text-sm text-slate-300 leading-snug">{alert.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Уведомления системы</h3>
             <div className="p-3 rounded bg-slate-800/50 border border-slate-700 mb-2">
                <p className="text-xs text-slate-400">Обновление прогноза погоды: ожидается понижение температуры до -15°C к 22:00.</p>
             </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex flex-col items-center justify-center p-3 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors group">
            <FileText className="w-5 h-5 text-blue-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-slate-300">Отчет (PDF)</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors group">
            <Phone className="w-5 h-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs text-slate-300">Диспетчер</span>
          </button>
          <button className="col-span-2 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors text-xs text-slate-300 group">
            <Share2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            Отправить сводку подчиненным
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;