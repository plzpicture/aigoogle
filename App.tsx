
import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, DailyRecord, Tab } from './types';
import Onboarding from './components/Onboarding';
import HomeTab from './components/HomeTab';
import LogTab from './components/LogTab';
import HistoryTab from './components/HistoryTab';
import InsightsTab from './components/InsightsTab';
import ProfileTab from './components/ProfileTab';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    gender: null,
    goal: null,
    symptoms: [],
    frequency: null,
    reminderTime: '09:00',
    onboarded: false,
    level: 1,
    exp: 450,
  });

  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [records, setRecords] = useState<DailyRecord[]>([]);

  // 초기 더미 데이터 한국어화
  useEffect(() => {
    const initialRecords: DailyRecord[] = [
      { date: '2025-05-10', feeling: { emoji: '😄', label: '최고예요' }, score: 85, stoolCount: 1, memo: '에너지가 넘치는 하루였어요!' },
      { date: '2025-05-11', feeling: { emoji: '😊', label: '좋아요' }, score: 76, stoolCount: 1, memo: '무난한 하루였습니다.' },
      { date: '2025-05-12', feeling: { emoji: '😐', label: '보통이에요' }, score: 62, stoolCount: 0, memo: '약간 더부룩해요.' },
      { date: '2025-05-13', feeling: { emoji: '😣', label: '안 좋아요' }, score: 45, stoolCount: 0, memo: '배가 좀 아프네요.' },
      { date: '2025-05-14', feeling: { emoji: '😄', label: '최고예요' }, score: 92, stoolCount: 2, memo: '완벽한 하루!' },
    ];
    setRecords(initialRecords);
  }, []);

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data, onboarded: true }));
    setActiveTab(Tab.Home);
  };

  const handleAddRecord = (record: DailyRecord) => {
    setRecords(prev => {
      const existing = prev.findIndex(r => r.date === record.date);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = record;
        return updated;
      }
      return [...prev, record];
    });
    setUser(prev => ({ ...prev, exp: prev.exp + 50 }));
  };

  const handleResetProfile = () => {
    setUser(prev => ({ ...prev, onboarded: false }));
  };

  if (!user.onboarded) {
    return (
      <div className="flex justify-center min-h-screen bg-[#FFF9F0]">
        <div className="w-full max-w-[430px] bg-[#FFF9F0]">
          <Onboarding onComplete={handleOnboardingComplete} initialUser={user} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-[#FFF9F0]">
      <div className="w-full max-w-[430px] bg-white flex flex-col relative custom-shadow min-h-screen">
        <main className="flex-1 overflow-y-auto pb-20 bg-[#FFF9F0]">
          {activeTab === Tab.Home && <HomeTab user={user} records={records} />}
          {activeTab === Tab.Log && <LogTab onSave={handleAddRecord} />}
          {activeTab === Tab.History && <HistoryTab records={records} />}
          {activeTab === Tab.Insights && <InsightsTab />}
          {activeTab === Tab.Profile && <ProfileTab user={user} records={records} onEdit={handleResetProfile} />}
        </main>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 w-full max-w-[430px] h-20 bg-white border-t border-gray-100 flex items-center justify-around z-50 rounded-t-[20px] custom-shadow">
          <TabButton icon="🏠" label="홈" active={activeTab === Tab.Home} onClick={() => setActiveTab(Tab.Home)} />
          <TabButton icon="🍽️" label="기록" active={activeTab === Tab.Log} onClick={() => setActiveTab(Tab.Log)} />
          <TabButton icon="📅" label="히스토리" active={activeTab === Tab.History} onClick={() => setActiveTab(Tab.History)} />
          <TabButton icon="📊" label="통계" active={activeTab === Tab.Insights} onClick={() => setActiveTab(Tab.Insights)} />
          <TabButton icon="👤" label="프로필" active={activeTab === Tab.Profile} onClick={() => setActiveTab(Tab.Profile)} />
        </nav>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-colors ${active ? 'text-[#D4AF37]' : 'text-gray-400'}`}
  >
    <span className="text-2xl mb-1">{icon}</span>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export default App;
