
import React, { useState } from 'react';
import { DailyRecord } from '../types';

interface LogTabProps {
  onSave: (record: DailyRecord) => void;
}

const LogTab: React.FC<LogTabProps> = ({ onSave }) => {
  const [mealTab, setMealTab] = useState<'아침' | '점심' | '저녁'>('아침');
  const [stoolCount, setStoolCount] = useState(0);
  const [feeling, setFeeling] = useState<{ emoji: string; label: string }>({ emoji: '😊', label: '좋아요' });
  const [notes, setNotes] = useState('');

  const moods = [
    { emoji: '😄', label: '최고예요' },
    { emoji: '😊', label: '좋아요' },
    { emoji: '😐', label: '보통이에요' },
    { emoji: '😣', label: '안 좋아요' },
    { emoji: '😫', label: '힘들어요' },
  ];

  const handleSave = () => {
    const record: DailyRecord = {
      date: new Date().toISOString().split('T')[0],
      feeling,
      score: 70 + (stoolCount * 5) + (feeling.label === '최고예요' ? 20 : 0),
      stoolCount,
      memo: notes
    };
    onSave(record);
    alert("성공적으로 저장되었습니다! 🎉");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">데일리 기록 🍽️</h1>

      <div className="flex bg-gray-100 p-1 rounded-xl">
        {(['아침', '점심', '저녁'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setMealTab(tab)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mealTab === tab ? 'bg-white shadow text-[#D4AF37]' : 'text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase">식단 사진</p>
          <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <span className="text-3xl group-hover:scale-110 transition-transform">📸</span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase">대변 분석</p>
          <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-full flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <span className="text-3xl group-hover:scale-110 transition-transform">🔬</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-[#A8E6CF] text-gray-700 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all">
        🔍 AI로 분석하기
      </button>

      <div className="space-y-4">
        <p className="font-bold text-gray-800">오늘 기분은 어떠신가요?</p>
        <div className="flex justify-between">
          {moods.map(m => (
            <button
              key={m.label}
              onClick={() => setFeeling(m)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${feeling.label === m.label ? 'bg-[#FFF9F0] ring-2 ring-[#D4AF37]' : 'opacity-50'}`}
            >
              <span className="text-3xl">{m.emoji}</span>
              <span className="text-[10px] mt-1 font-bold">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl custom-shadow flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-800">배변 횟수</p>
          <p className="text-xs text-gray-400">오늘의 총 횟수</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl">
          <button onClick={() => setStoolCount(Math.max(0, stoolCount - 1))} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-xl font-bold">-</button>
          <span className="text-xl font-bold w-4 text-center">{stoolCount}</span>
          <button onClick={() => setStoolCount(stoolCount + 1)} className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-xl font-bold">+</button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-bold text-gray-800">메모</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="추가로 기록하고 싶은 내용이 있나요?"
          className="w-full h-24 border-2 border-gray-100 rounded-xl p-4 text-sm focus:border-[#D4AF37] outline-none transition-colors"
        />
      </div>

      <button onClick={handleSave} className="w-full bg-green-500 text-white p-5 rounded-[16px] font-bold text-lg shadow-xl shadow-green-200 active:scale-95 transition-transform">
        ✅ 기록 저장
      </button>
    </div>
  );
};

export default LogTab;
