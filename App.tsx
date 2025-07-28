import React, { useState, useCallback } from 'react';
import { translations } from './constants';
import TaxForm from './components/TaxForm';
import ResultDisplay from './components/ResultDisplay';
import AppHeader from './components/AppHeader';
import type { Language, TaxFormData, TaxResultData } from './types';
import { CounterpartyType } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('id');
  
  const initialFormData: TaxFormData = {
    counterpartyType: CounterpartyType.ENTITY,
    hasTaxId: true,
    description: '',
    grossUp: false,
  };

  const [formData, setFormData] = useState<TaxFormData>(initialFormData);
  const [result, setResult] = useState<TaxResultData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language];

  const handleReset = useCallback(() => {
    setFormData(initialFormData);
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  const handleCalculate = useCallback(async () => {
    if (!formData.description) {
      setError(t.errorInstruction);
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error: ${response.statusText}`);
      }

      const apiResult: TaxResultData = await response.json();
      setResult(apiResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [formData, language, t.errorInstruction]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        <AppHeader 
          language={language} 
          setLanguage={setLanguage} 
          handleReset={handleReset} 
          t={t}
        />
        <main className="mt-8">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
              <TaxForm
                formData={formData}
                setFormData={setFormData}
                handleCalculate={handleCalculate}
                loading={loading}
                t={t}
                language={language}
              />
              <ResultDisplay
                loading={loading}
                error={error}
                result={result}
                t={t}
              />
            </div>
          </div>
          <footer className="text-center mt-8 text-sm text-slate-500">
             <p className="mb-2">
              {t.authoredBy}{' '}
              <a 
                href="https://www.linkedin.com/in/wirahman/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold text-indigo-600 hover:underline"
              >
                Harry Wirahman
              </a>.
            </p>
             <p className="mt-1 text-xs max-w-2xl mx-auto">
              {t.disclaimerWarning}
            </p>
             <p className="mt-2 text-xs max-w-2xl mx-auto">
              {t.disclaimerPromo}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
