import { GoogleGenAI } from "@google/genai";
import { DashboardState } from "../types";

// Initialize the Gemini API client with the API key from the environment.
// The API key must be obtained exclusively from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDashboard = async (data: DashboardState): Promise<string> => {
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