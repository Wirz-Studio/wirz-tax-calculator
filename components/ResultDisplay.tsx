
import React from 'react';
import type { TaxResultData } from '../types';

interface ResultDisplayProps {
  loading: boolean;
  error: string | null;
  result: TaxResultData | null;
  t: Record<string, string>;
}

const ResultCard: React.FC<{ label: string; value: React.ReactNode; className?: string }> = ({ label, value, className }) => (
  <div className={`bg-slate-50 p-4 rounded-lg ${className}`}>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-lg font-semibold text-slate-800">{value}</p>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ loading, error, result, t }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
          <p className="mt-4 text-lg font-semibold text-slate-600">{t.calculatingButton}</p>
          <p className="text-slate-500">{t.analyzingMessage}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-red-50 p-6 rounded-lg border border-red-200">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-xl font-bold text-red-700">{t.errorTitle}</h3>
          <p className="mt-2 text-red-600">{t.errorInstruction}</p>
          <p className="mt-2 text-xs text-red-500 font-mono bg-red-100 p-2 rounded">{error}</p>
        </div>
      );
    }

    if (result) {
      return (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <ResultCard label={t.taxType} value={result.taxType} />
            <ResultCard label={t.taxRate} value={`${result.ratePercentage}%`} />
          </div>
          <ResultCard label={t.taxBase} value={formatCurrency(result.taxBase)} />
          <ResultCard label={t.taxAmount} value={formatCurrency(result.taxAmount)} className="bg-indigo-50 border border-indigo-200" />
          
          <div className="pt-4">
            <h4 className="text-md font-semibold text-slate-700 mb-2">{t.explanation}</h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
              {result.explanation}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 p-6 border-2 border-dashed border-slate-300 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="mt-4 font-semibold text-lg">{t.resultTitle}</p>
        <p className="mt-1 max-w-sm">{t.initialMessage}</p>
      </div>
    );
  };
  
  return (
    <div className="lg:mt-0 mt-8 lg:border-l lg:pl-12 border-slate-200 min-h-[400px] flex flex-col justify-center">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
      {renderContent()}
    </div>
  );
};

export default ResultDisplay;