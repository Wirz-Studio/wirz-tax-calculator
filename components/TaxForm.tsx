import React, { useState, useRef, useCallback } from 'react';
import type { Language, TaxFormData } from '../types';
import { CounterpartyType } from '../types';
import { MicrophoneIcon, StopIcon } from '../constants';

interface TaxFormProps {
  formData: TaxFormData;
  setFormData: React.Dispatch<React.SetStateAction<TaxFormData>>;
  handleCalculate: () => void;
  loading: boolean;
  t: Record<string, string>;
  language: Language;
}

const TaxForm: React.FC<TaxFormProps> = ({
  formData,
  setFormData,
  handleCalculate,
  loading,
  t,
  language,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleToggleRecording = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.lang = language === 'id' ? 'id-ID' : 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      
      if (transcript) {
        setFormData(prev => ({
          ...prev,
          description: (prev.description ? prev.description + ' ' : '') + transcript.trim()
        }));
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognition.start();
  }, [isRecording, language, setFormData]);

  // Check for support once to avoid repeated checks in render
  const isSpeechSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="text-xl font-semibold text-slate-700 border-b pb-3">{t.header}</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="counterpartyType" className="block text-sm font-medium text-slate-600 mb-1">
            {t.counterpartyTypeLabel}
          </label>
          <select
            id="counterpartyType"
            name="counterpartyType"
            value={formData.counterpartyType}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            <option value={CounterpartyType.ENTITY}>{t.entity}</option>
            <option value={CounterpartyType.INDIVIDUAL}>{t.individual}</option>
          </select>
        </div>

        <div className="flex items-center pt-2">
          <input
            id="hasTaxId"
            name="hasTaxId"
            type="checkbox"
            checked={formData.hasTaxId}
            onChange={handleChange}
            disabled={loading}
            className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="hasTaxId" className="ml-3 text-sm font-medium text-slate-600">
            {t.hasTaxIdLabel}
          </label>
        </div>

        <div>
           <div className="flex justify-between items-center mb-1">
            <label htmlFor="description" className="block text-sm font-medium text-slate-600">
              {t.serviceDescriptionLabel}
            </label>
            {isSpeechSupported && (
              <div className="flex items-center gap-2">
                {isRecording && <span className="text-sm text-indigo-600 animate-pulse">{t.recordingLabel}</span>}
                <button
                  onClick={handleToggleRecording}
                  disabled={loading}
                  title={isRecording ? t.stopRecordingTooltip : t.recordDescriptionTooltip}
                  type="button"
                  className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isRecording ? <StopIcon className="h-5 w-5" /> : <MicrophoneIcon className="h-5 w-5" />}
                </button>
              </div>
            )}
          </div>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            rows={5}
            placeholder={t.serviceDescriptionPlaceholder}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        
        <div className="flex items-center pt-2" title={t.grossUpTooltip}>
          <input
            id="grossUp"
            name="grossUp"
            type="checkbox"
            checked={formData.grossUp}
            onChange={handleChange}
            disabled={loading}
            className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="grossUp" className="ml-3 text-sm font-medium text-slate-600">
            {t.grossUpLabel}
          </label>
        </div>
      </div>
      
      <button
        onClick={handleCalculate}
        disabled={loading || !formData.description}
        className="w-full flex justify-center items-center p-3 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
      >
        {loading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.calculatingButton}
            </>
        ) : (
            t.calculateButton
        )}
      </button>
    </div>
  );
};

export default TaxForm;