import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, BrainCircuit, Power, Activity } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar, onAnalyze, isAnalyzing }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-700 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-md">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-slate-400 hover:text-white" onClick={onOpenSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-md flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 leading-tight">ТЕПЛОСЕТЬ</h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Director Dashboard</p>
          </div>
        </div>
      </div>

      {/* Central Status Area */}
      <div className="hidden md:flex items-center gap-8 bg-slate-950/50 px-6 py-1.5 rounded-full border border-slate-800">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-500">СИСТЕМА ОНЛАЙН</span>
         </div>
         <div className="h-4 w-px bg-slate-800"></div>
         <div className="text-sm text-slate-300 font-mono">
            {currentTime.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' })}
            <span className="mx-2 opacity-50">|</span>
            {currentTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
         </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/20"
        >
          <BrainCircuit className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          {isAnalyzing ? 'Анализ...' : 'AI Анализ'}
        </button>

        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Поиск объекта..."
            className="bg-slate-800 border border-slate-700 rounded-full pl-9 pr-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 w-48 lg:w-64 transition-all"
          />
        </div>

        <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900"></span>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
            <span className="text-xs font-bold text-slate-300">AD</span>
        </div>
      </div>
    </header>
  );
};

export default Header;