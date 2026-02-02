
import React from 'react';
import { UserProfile, DailyRecord } from '../types';
import { LEVELS, BADGES } from '../constants';

interface ProfileTabProps {
  user: UserProfile;
  records: DailyRecord[];
  onEdit: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, records, onEdit }) => {
  const currentLevel = LEVELS.find(l => l.lv === user.level) || LEVELS[0];
  const nextLevel = LEVELS.find(l => l.lv === user.level + 1) || currentLevel;
  const progress = (user.exp / nextLevel.req) * 100;

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 bg-[#FFF9F0] rounded-full flex items-center justify-center text-4xl border-4 border-[#D4AF37] shadow-lg">
            👤
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#D4AF37] text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
            {currentLevel.emoji}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-[#D4AF37] font-bold text-sm">레벨 {user.level} {currentLevel.name}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-gray-500">
          <span>{user.exp} EXP</span>
          <span>다음 단계: {nextLevel.name} ({nextLevel.req} EXP)</span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
          <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F2D06B]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatItem icon="🔥" label="연속 기록" value="7" />
        <StatItem icon="📅" label="총 기록" value={records.length} />
        <StatItem icon="💚" label="평균 점수" value="76" />
      </div>

      <div className="bg-white p-6 rounded-[24px] custom-shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-800">업적 배지</h2>
          <span className="text-xs text-[#D4AF37] font-bold">전체 보기</span>
        </div>
        <div className="flex justify-between overflow-x-auto gap-4 pb-2">
          {BADGES.map(badge => (
            <div key={badge.id} className={`flex flex-col items-center space-y-2 min-w-[60px] ${badge.unlocked ? 'opacity-100' : 'opacity-20 grayscale'}`}>
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-2xl shadow-sm border border-gray-100">
                {badge.emoji}
              </div>
              <span className="text-[10px] font-bold text-center whitespace-nowrap">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-gray-800">구독 요금제</h2>
        <div className="space-y-3">
          <PlanCard title="베이직" price="무료" />
          <PlanCard title="프로" price="월 9,900원" badge="인기" active />
          <PlanCard title="패밀리" price="월 19,000원" badge="최고 가성비" />
        </div>
      </div>

      <button onClick={onEdit} className="w-full text-gray-400 font-bold py-4 text-sm border-2 border-dashed border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
        ⚙️ 프로필 설정 편집
      </button>
    </div>
  );
};

const StatItem: React.FC<{ icon: string, label: string, value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-2xl custom-shadow text-center flex flex-col items-center">
    <span className="text-xl mb-1">{icon}</span>
    <span className="text-[10px] text-gray-400 font-bold uppercase">{label}</span>
    <span className="text-lg font-bold text-gray-800">{value}</span>
  </div>
);

const PlanCard: React.FC<{ title: string, price: string, badge?: string, active?: boolean }> = ({ title, price, badge, active }) => (
  <div className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${active ? 'border-[#D4AF37] bg-[#FFF9F0]' : 'border-gray-100 bg-white'}`}>
    <div>
      <div className="flex items-center gap-2">
        <p className="font-bold text-gray-800">{title}</p>
        {badge && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#D4AF37] text-white font-bold uppercase">{badge}</span>}
      </div>
      <p className="text-sm text-gray-500">{price}</p>
    </div>
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-gray-200'}`}>
      {active && <span className="text-[10px] text-white">✓</span>}
    </div>
  </div>
);

export default ProfileTab;
