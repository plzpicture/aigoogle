import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true
});

export const analyzeStoolImage = async (base64Image: string) => {
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: base64Image
              }
            },
            {
              type: "text",
              text: "이 대변 이미지를 브리스톨 대변 척도에 따라 분석해 주세요. 타입(1-7), 간단한 건강 인사이트, 권장 사항을 포함해야 합니다. 한국어로 응답해 주세요. JSON 형식으로만 응답하세요: { \"type\": number, \"insight\": string, \"recommendation\": string }"
            }
          ]
        }
      ]
    });

    const textContent = response.content.find(c => c.type === 'text');
    if (textContent && textContent.type === 'text') {
      return JSON.parse(textContent.text);
    }
    return null;
  } catch (error) {
    console.error("분석 실패", error);
    return null;
  }
};

export const chatWithGutBuddy = async (
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  message: string
) => {
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: "당신은 소화 건강 전문 AI 동반자 'GutBuddy'입니다. 사용자에게 친절하고 유익한 정보를 제공하며, 한국어를 사용하세요. 가끔 이모지를 섞어서 대화하고, 답변은 간결하게 유지하세요.",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    });

    const textContent = response.content.find(c => c.type === 'text');
    if (textContent && textContent.type === 'text') {
      return textContent.text;
    }
    return "";
  } catch (error) {
    console.error("채팅 실패", error);
    return "죄송해요, 지금 배가 좀 아파서 응답하기 어렵네요. 나중에 다시 시도해 주세요! 🎈";
  }
};
