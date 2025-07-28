import { GoogleGenAI, Type } from "@google/genai";
import type { Language, TaxFormData, TaxResultData } from '../types';

if (!process.env.API_KEY) {
  // This check is important for development. In Cloud Run, the key will be injected.
  console.error("CRITICAL: API_KEY environment variable not set.");
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    taxType: {
      type: Type.STRING,
      description: "The specific Indonesian PPh article (e.g., 'PPh Pasal 23', 'PPh Pasal 21', 'PPh Final Pasal 4 ayat 2')."
    },
    ratePercentage: {
      type: Type.NUMBER,
      description: "The final applicable tax rate as a number (e.g., for 2%, return 2). This should include any penalties."
    },
    taxBase: {
      type: Type.NUMBER,
      description: "The calculated tax base (DPP - Dasar Pengenaan Pajak). In a gross-up scenario, this is the grossed-up value."
    },
    taxAmount: {
      type: Type.NUMBER,
      description: "The final calculated PPh amount (DPP multiplied by the tax rate)."
    },
    explanation: {
      type: Type.STRING,
      description: "A clear, concise explanation of why this tax is applicable, its legal basis, how the calculation was performed (including DPP determination, rate penalties, and gross-up logic if used), and any adjustments for non-taxable items."
    }
  },
  required: ["taxType", "ratePercentage", "taxBase", "taxAmount", "explanation"]
};

export const getTaxAnalysis = async (formData: TaxFormData, language: Language): Promise<TaxResultData> => {
  const { counterpartyType, hasTaxId, description, grossUp } = formData;
  
  const langInstruction = language === 'id' ? 'Bahasa Indonesia' : 'English';

  const prompt = `
    Act as an expert Indonesian tax law consultant. Analyze the transaction below for withholding tax (PPh).
    - Counterparty Type: ${counterpartyType}
    - Has Tax ID (NPWP/NIK): ${hasTaxId}
    - Service Description and Amount: "${description}"
    - Gross-Up Requested: ${grossUp}

    Your tasks:
    1.  **Analyze Description for Service and Amount**: Scrutinize the description to identify the specific service(s) and the corresponding amounts. If it includes non-taxable costs (e.g., 'material senilai...', 'reimbursement'), separate them. The tax base (DPP) must only be the service/rental fee component. The primary amount for calculation MUST be derived from this description.
    2.  **Determine PPh Article & Rate**: Identify the correct PPh article (21, 23, 4(2), etc.) and its standard rate. Apply the penalty rate increase if 'Has Tax ID' is false (100% for PPh 23, 20% for PPh 21).
    3.  **Calculate DPP & PPh**:
        -   If **Gross-Up is false**: The DPP is the taxable service value from step 1. Calculate PPh = DPP * Rate.
        -   If **Gross-Up is true**: The taxable amount identified in the description is the NET amount received by the counterparty. First, determine the applicable tax rate. Then calculate the grossed-up DPP: Gross DPP = Net Amount / (1 - (Rate / 100)). The final PPh is Gross DPP - Net Amount. The 'taxBase' in your response must be this Gross DPP.
    4.  **Explain**: In ${langInstruction}, clearly explain the PPh article, the rate used (including penalties), how the DPP was calculated (mentioning any excluded material costs and the specific amounts derived from the description), and the gross-up logic if applied.

    Respond ONLY with a JSON object that strictly follows the provided schema.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation to ensure the result matches the expected structure
    if (
      typeof result.taxType === 'string' &&
      typeof result.ratePercentage === 'number' &&
      typeof result.taxBase === 'number' &&
      typeof result.taxAmount === 'number' &&
      typeof result.explanation === 'string'
    ) {
      return result as TaxResultData;
    } else {
      throw new Error("Received malformed JSON data from API.");
    }
  } catch (error) {
    // The error will be caught by the route handler in index.ts
    if (error instanceof Error) {
        throw new Error(`Failed to get tax analysis: ${error.message}`);
    }
    throw new Error("An unknown error occurred during tax analysis.");
  }
};
