import { GoogleGenAI } from "@google/genai";
import { DashboardState } from "../types";

// Safely access the API key. 
// In Vite/Browser environments, accessing 'process' directly can throw a ReferenceError if not polyfilled.
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn("Could not access process.env");
  }
  return '';
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey: apiKey });

export const analyzeDashboard = async (data: DashboardState): Promise<string> => {
  if (!apiKey) {
    return "Демо режим: API Key не найден. AI-аналитика недоступна.";
  }

  try {
    const prompt = `
      Действуй как главный инженер и финансовый директор теплоснабжающей компании.
      Проанализируй следующие оперативные данные дашборда и дай краткое резюме (максимум 3-4 предложения) для генерального директора.
      Сделай акцент на критических отклонениях, авариях и финансовых рисках.
      Используй профессиональную терминологию, но будь лаконичен.

      Данные:
      ${JSON.stringify(data, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Не удалось сгенерировать отчет.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ошибка при соединении с AI-ассистентом. Проверьте консоль.";
  }
};