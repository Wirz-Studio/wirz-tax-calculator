
import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import { getTaxAnalysis } from './geminiService';
import { logInteraction, logError } from './loggingService';
import type { Language, TaxFormData, TaxResultData } from '../types';

const app: Express = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// API route for tax calculation
app.post('/api/calculate', async (req: Request, res: Response) => {
  const { formData, language } = req.body as { formData: TaxFormData, language: Language };

  if (!formData || !language) {
    return res.status(400).json({ message: "Missing formData or language in request body" });
  }

  try {
    const result = await getTaxAnalysis(formData, language);
    logInteraction(formData, result);
    res.status(200).json(result);
  } catch (error) {
    logError(formData, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    res.status(500).json({ message: `Error processing tax analysis: ${errorMessage}` });
  }
});

// Serve static files from the root directory
// This will serve index.html, index.tsx, etc.
const staticPath = path.join(__dirname, '..', '..');
app.use(express.static(staticPath));

// For any other request, serve the index.html to support client-side routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
