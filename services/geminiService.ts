
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeStoolImage = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: "이 대변 이미지를 브리스톨 대변 척도에 따라 분석해 주세요. 타입(1-7), 간단한 건강 인사이트, 권장 사항을 포함해야 합니다. 한국어로 응답해 주세요. 형식: JSON: { 'type': number, 'insight': string, 'recommendation': string }" }
        ]
      },
      config: {
        responseMimeType: 'application/json'
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("분석 실패", error);
    return null;
  }
};

export const chatWithGutBuddy = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "당신은 소화 건강 전문 AI 동반자 'GutBuddy'입니다. 사용자에게 친절하고 유익한 정보를 제공하며, 한국어를 사용하세요. 가끔 이모지를 섞어서 대화하고, 답변은 간결하게 유지하세요."
      }
    });
    
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("채팅 실패", error);
    return "죄송해요, 지금 배가 좀 아파서 응답하기 어렵네요. 나중에 다시 시도해 주세요! 🎈";
  }
};
