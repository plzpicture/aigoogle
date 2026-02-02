
import React from 'react';
import { UserProfile, DailyRecord } from '../types';

interface HomeTabProps {
  user: UserProfile;
  records: DailyRecord[];
}

const HomeTab: React.FC<HomeTabProps> = ({ user, records }) => {
  const currentScore = 72; // 목업 점수

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-br from-[#A8E6CF] to-[#88D4B4] p-6 rounded-[24px] text-white shadow-lg">
        <h1 className="text-2xl font-bold">👋 안녕하세요, {user.name}님!</h1>
        <p className="opacity-90">오늘 속은 좀 어떠신가요?</p>
      </div>

      <div className="bg-white p-6 rounded-[20px] custom-shadow flex flex-col items-center">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="80" cy="80" r="70" fill="transparent" stroke="#F3F4F6" strokeWidth="12" />
            <circle 
              cx="80" 
              cy="80" 
              r="70" 
              fill="transparent" 
              stroke="#D4AF37" 
              strokeWidth="12" 
              strokeDasharray={440} 
              strokeDashoffset={440 - (440 * currentScore) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">{currentScore}%</span>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">장 건강 점수</span>
          </div>
        </div>
      </div>

      <div className="bg-[#FFF9F0] border-2 border-[#A8E6CF] p-4 rounded-[16px] flex items-start gap-3">
        <span className="text-2xl">🤖</span>
        <p className="text-sm text-gray-700"><strong>GutBuddy 분석:</strong> 오늘 식이섬유 섭취가 아주 좋아요! 수분을 충분히 섭취해서 이 상태를 유지해보세요. ✨</p>
      </div>

      <div className="bg-white p-6 rounded-[20px] custom-shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-800">영양 정보 요약</h2>
          <span className="text-[#D4AF37] font-semibold">1,650 kcal</span>
        </div>
        <div className="space-y-4">
          <NutritionBar label="탄수화물" value={180} max={250} unit="g" color="bg-orange-400" />
          <NutritionBar label="단백질" value={65} max={100} unit="g" color="bg-blue-400" />
          <NutritionBar label="지방" value={45} max={70} unit="g" color="bg-yellow-400" />
          <NutritionBar label="식이섬유" value={18} max={30} unit="g" color="bg-[#A8E6CF]" />
        </div>
      </div>

      <button className="w-full bg-[#D4AF37] text-white p-5 rounded-[16px] font-bold text-lg shadow-xl shadow-[#D4AF37]/30 flex items-center justify-center gap-2 active:scale-95 transition-transform">
        <span>🚽</span> 빠른 대변 분석
      </button>
    </div>
  );
};

const NutritionBar: React.FC<{ label: string, value: number, max: number, unit: string, color: string }> = ({ label, value, max, unit, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-medium text-gray-500">
      <span>{label}</span>
      <span>{value}/{max}{unit}</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  </div>
);

export default HomeTab;
