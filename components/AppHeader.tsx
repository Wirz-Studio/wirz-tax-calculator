import React from 'react';
import type { Language } from '../types';
import { RefreshIcon } from '../constants';

interface AppHeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  handleReset: () => void;
  t: Record<string, string>;
}

const AppHeader: React.FC<AppHeaderProps> = ({ language, setLanguage, handleReset, t }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h3m-7-3h3v-3h-3v3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16l-3-2-3 2-3-2-3 2z" />
            </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">{t.title}</h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-3">
        <button
          onClick={toggleLanguage}
          className="px-3 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {language === 'id' ? 'English' : 'Bahasa Indonesia'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          title={t.resetButton}
        >
          <RefreshIcon className="w-4 h-4" />
          <span>{t.resetButton}</span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
