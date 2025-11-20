import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import OverviewTab from './components/OverviewTab';
import TechnicalTab from './components/TechnicalTab';
import FinanceTab from './components/FinanceTab';
import { TabType, DashboardState } from './types';
import { getInitialDashboardState } from './services/mockData';
import { analyzeDashboard } from './services/geminiService';
import { LayoutDashboard, Activity, PieChart, Users, Wrench } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.OVERVIEW);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<DashboardState>(getInitialDashboardState());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        heatOutput: { ...prev.heatOutput, value: Number(prev.heatOutput.value) + (Math.random() - 0.5) },
        pressure: { ...prev.pressure, value: Number((Number(prev.pressure.value) + (Math.random() * 0.2 - 0.1)).toFixed(1)) },
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    const result = await analyzeDashboard(data);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.OVERVIEW:
        return <OverviewTab data={data} />;
      case TabType.TECHNICAL:
        return <TechnicalTab />;
      case TabType.FINANCE:
        return <FinanceTab />;
      default:
        return <div className="text-slate-400 p-10 text-center">Раздел в разработке...</div>;
    }
  };

  const navItems = [
    { id: TabType.OVERVIEW, label: 'Главное', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: TabType.TECHNICAL, label: 'Техника', icon: <Activity className="w-4 h-4" /> },
    { id: TabType.FINANCE, label: 'Финансы', icon: <PieChart className="w-4 h-4" /> },
    { id: TabType.SALES, label: 'Сбыт', icon: <Users className="w-4 h-4" /> },
    { id: TabType.REPAIRS, label: 'Ремонты', icon: <Wrench className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 overflow-hidden">
      <Header 
        onOpenSidebar={() => setSidebarOpen(true)} 
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 flex flex-col overflow-hidden relative z-0">
            {/* Tab Navigation */}
            <div className="bg-slate-900 border-b border-slate-800 px-6 pt-4 flex-none">
                <nav className="flex space-x-6 overflow-x-auto no-scrollbar">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`pb-4 px-1 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                                activeTab === item.id
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {aiAnalysis && (
                  <div className="mb-6 bg-indigo-950/40 border border-indigo-500/50 rounded-lg p-4 animate-fade-in relative">
                      <button 
                        onClick={() => setAiAnalysis(null)} 
                        className="absolute top-2 right-2 text-indigo-300 hover:text-white text-xs"
                      >
                        Закрыть
                      </button>
                      <h3 className="text-indigo-300 font-bold text-sm mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                          AI АНАЛИЗ СИТУАЦИИ
                      </h3>
                      <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                        {aiAnalysis}
                      </p>
                  </div>
                )}
                {renderTabContent()}
                
                {/* Footer spacer */}
                <div className="h-12"></div>
            </div>
        </main>

        <Sidebar 
            alerts={data.alerts} 
            isOpen={isSidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;