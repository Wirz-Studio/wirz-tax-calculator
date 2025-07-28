import React from 'react';
import type { Language } from './types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    title: 'WirZ - Withholding Tax Calculator',
    header: 'Transaction Details',
    counterpartyTypeLabel: 'Counterparty Type',
    individual: 'Individual',
    entity: 'Legal Entity',
    hasTaxIdLabel: 'Counterparty has NPWP/NIK',
    serviceDescriptionLabel: 'Description of Service and Amount Paid',
    serviceDescriptionPlaceholder: 'e.g., building rental fee 10,000,000, material cost 5,000,000',
    grossUpLabel: 'Gross Up Calculation',
    grossUpTooltip: 'Check this if the amount entered is the net amount received after tax.',
    calculateButton: 'Calculate PPh',
    calculatingButton: 'Calculating...',
    analyzingMessage: 'Analyzing your transaction...',
    resetButton: 'Reset',
    resultTitle: 'Tax Calculation Result',
    taxType: 'Tax Type',
    taxRate: 'Tax Rate',
    taxBase: 'Tax Base (DPP)',
    taxAmount: 'PPh Amount',
    explanation: 'Explanation',
    errorTitle: 'An Error Occurred',
    errorInstruction: 'Please fill out the description completely or try again later.',
    initialMessage: 'Please fill in the form to calculate the applicable withholding tax.',
    authoredBy: 'Authored by',
    disclaimerWarning: 'Disclaimer: This calculator provides an estimation based on automated analysis and should not be considered as legal or tax advice. Please contact me for further consultation regarding your tax issues.',
    disclaimerPromo: 'As a registered tax consultant in Indonesia, Harry Wirahman can help solve your tax issue.',
    recordDescriptionTooltip: 'Record description with voice',
    stopRecordingTooltip: 'Stop recording',
    recordingLabel: 'Listening...',
  },
  id: {
    title: 'WirZ - Kalkulator PPh Pot/Put',
    header: 'Detail Transaksi',
    counterpartyTypeLabel: 'Jenis Lawan Transaksi',
    individual: 'Orang Pribadi',
    entity: 'Badan Hukum',
    hasTaxIdLabel: 'Lawan transaksi memiliki NPWP/NIK',
    serviceDescriptionLabel: 'Deskripsi Jenis Jasa dan Jumlah yang dibayarkan',
    serviceDescriptionPlaceholder: 'cth: sewa gedung 10.000.000, biaya material 5.000.000',
    grossUpLabel: 'Perhitungan Gross Up',
    grossUpTooltip: 'Centang jika jumlah yang dimasukkan adalah jumlah bersih yang diterima setelah pajak.',
    calculateButton: 'Hitung PPh',
    calculatingButton: 'Menghitung...',
    analyzingMessage: 'Menganalisis transaksi Anda...',
    resetButton: 'Reset',
    resultTitle: 'Hasil Perhitungan Pajak',
    taxType: 'Jenis Pajak',
    taxRate: 'Tarif Pajak',
    taxBase: 'Dasar Pengenaan Pajak (DPP)',
    taxAmount: 'Jumlah PPh',
    explanation: 'Penjelasan',
    errorTitle: 'Terjadi Kesalahan',
    errorInstruction: 'Silakan isi deskripsi dengan lengkap atau coba lagi nanti.',
    initialMessage: 'Silakan isi formulir untuk menghitung PPh potong/pungut yang berlaku.',
    authoredBy: 'Dibuat oleh',
    disclaimerWarning: 'Sanggahan: Kalkulator ini memberikan estimasi berdasarkan analisis otomatis dan tidak boleh dianggap sebagai nasihat hukum atau pajak. Silakan hubungi saya untuk berkonsultasi lebih lanjut mengenai masalah perpajakan Anda.',
    disclaimerPromo: 'Sebagai konsultan pajak terdaftar di Indonesia, Harry Wirahman dapat membantu menyelesaikan masalah perpajakan Anda.',
    recordDescriptionTooltip: 'Rekam deskripsi dengan suara',
    stopRecordingTooltip: 'Hentikan perekaman',
    recordingLabel: 'Mendengarkan...',
  },
};

export const RefreshIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4" />
    <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
  </svg>
);

export const MicrophoneIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z"></path>
        <path d="M17 11a1 1 0 011 1v1a5 5 0 01-10 0v-1a1 1 0 112 0v1a3 3 0 006 0v-1a1 1 0 011-1z"></path>
    </svg>
);

export const StopIcon = ({ className }: { className: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
    </svg>
);