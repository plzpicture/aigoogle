
import React, { useState } from 'react';
import { BRISTOL_SCALE } from '../constants';
import { chatWithGutBuddy } from '../services/claudeService';

const InsightsTab: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '안녕하세요! 저는 GutBuddy입니다. 소화 상태에 대해 궁금한 점을 물어보거나 식단 사진을 업로드해 보세요! 🍎' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const response = await chatWithGutBuddy([], userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-8 flex flex-col min-h-full">
      <h1 className="text-2xl font-bold text-gray-800">인사이트 📊</h1>

      {/* Daily Report Card */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] p-6 rounded-[24px] text-white shadow-lg space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-bold opacity-80 uppercase">오늘의 건강 상태</p>
            <h2 className="text-4xl font-bold mt-1">훌륭함</h2>
          </div>
          <span className="text-5xl">🌟</span>
        </div>
        <div className="bg-white/20 p-4 rounded-xl space-y-2">
          <p className="text-xs flex items-center gap-2 font-medium">✓ 식이섬유 섭취 양호</p>
          <p className="text-xs flex items-center gap-2 font-medium">✓ 수분 섭취 목표 달성</p>
          <p className="text-xs flex items-center gap-2 font-medium">△ 유산균 섭취를 고려해보세요</p>
        </div>
      </div>

      {/* Bristol Scale Detailed Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="font-bold text-gray-800 text-lg">브리스톨 대변 척도 가이드 💩</h2>
          <span className="text-[10px] text-gray-400 font-bold bg-gray-100 px-2 py-1 rounded">표준 자가진단표</span>
        </div>
        <div className="grid gap-3">
          {BRISTOL_SCALE.map((item) => (
            <div 
              key={item.type} 
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                item.type === 4 ? 'border-[#A8E6CF] bg-[#F0FFF9]' : 'border-gray-50 bg-white'
              } custom-shadow`}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-3xl bg-gray-50 rounded-xl">
                {item.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-black text-[#D4AF37]">TYPE {item.type}</span>
                  {item.type === 4 && (
                    <span className="text-[8px] px-1.5 py-0.5 bg-[#A8E6CF] text-green-800 rounded-full font-bold">가장 이상적</span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-gray-600 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 text-center italic">
          * 타입 3, 4는 정상적인 변에 해당하며, 4번이 가장 건강한 상태입니다.
        </p>
      </div>

      {/* AI Health Chat */}
      <div className="flex-1 bg-white rounded-[24px] custom-shadow flex flex-col overflow-hidden min-h-[450px]">
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">실시간 AI 파트너</span>
          </div>
          <span className="text-xs font-bold text-[#D4AF37]">GutBuddy v2.0</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[350px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-[20px] text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-[#D4AF37] text-white rounded-tr-none shadow-md shadow-[#D4AF37]/20' 
                  : 'bg-[#FFF9F0] text-gray-700 rounded-tl-none border border-[#F2E8D5]'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-gray-400 font-bold pl-2">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              GutBuddy가 답변을 준비하고 있어요
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <button className="p-3 bg-gray-50 rounded-xl text-lg hover:bg-gray-100 active:scale-90 transition-all">📸</button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="장 건강에 대해 무엇이든 물어보세요..."
            className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 border border-gray-100"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || loading}
            className="p-3 bg-[#D4AF37] text-white rounded-xl font-bold px-5 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-[#D4AF37]/20"
          >
            전송
          </button>
        </div>
      </div>
      
      {/* Spacer for bottom tab bar */}
      <div className="h-4" />
    </div>
  );
};

export default InsightsTab;
