import type { TaxFormData, TaxResultData } from '../types';

/**
 * Logs a successful interaction to the console.
 * When running on Google Cloud Run, this console output is automatically
 * ingested by Google Cloud Logging, providing a secure, centralized log.
 * @param formData The data submitted by the user.
 * @param result The result received from the analysis.
 */
export const logInteraction = (formData: TaxFormData, result: TaxResultData): void => {
  const logData = {
    severity: 'INFO',
    event: 'TaxCalculationSuccess',
    timestamp: new Date().toISOString(),
    userInput: formData,
    response: result,
  };
  console.log(JSON.stringify(logData));
};

/**
 * Logs an error to the console.
 * This is also automatically captured by Google Cloud Logging.
 * @param formData The data submitted by the user when the error occurred.
 * @param error The error object or message.
 */
export const logError = (formData: TaxFormData, error: unknown): void => {
    const errorData = {
        severity: 'ERROR',
        event: 'TaxCalculationError',
        timestamp: new Date().toISOString(),
        userInput: formData,
        error: error instanceof Error ? { message: error.message, stack: error.stack } : String(error),
    };
    console.error(JSON.stringify(errorData));
}
