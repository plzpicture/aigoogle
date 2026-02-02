
import React, { useState, useMemo } from 'react';
import { DailyRecord } from '../types';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

interface HistoryTabProps {
  records: DailyRecord[];
}

const HistoryTab: React.FC<HistoryTabProps> = ({ records }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewDate, setViewDate] = useState(new Date());

  const currentMonthRecords = useMemo(() => {
    return records.filter(r => r.date.startsWith(viewDate.toISOString().slice(0, 7)));
  }, [records, viewDate]);

  const stats = useMemo(() => {
    const scores = currentMonthRecords.map(r => r.score);
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const good = currentMonthRecords.filter(r => r.score >= 75).length;
    const okay = currentMonthRecords.filter(r => r.score >= 60 && r.score < 75).length;
    const bad = currentMonthRecords.filter(r => r.score < 60).length;
    return { avg, good, okay, bad, total: currentMonthRecords.length };
  }, [currentMonthRecords]);

  const chartData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const ds = d.toISOString().split('T')[0];
      const rec = records.find(r => r.date === ds);
      return {
        name: d.toLocaleDateString('ko-KR', { weekday: 'short' }),
        score: rec?.score || 0,
        emoji: rec?.feeling.emoji || ''
      };
    });
  }, [records]);

  const days = useMemo(() => {
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const arr = Array(42).fill(null);
    for (let i = 0; i < daysInMonth; i++) {
      arr[i + firstDay] = i + 1;
    }
    return arr;
  }, [viewDate]);

  const selectedRecord = records.find(r => r.date === selectedDate);

  const getSummaryMessage = () => {
    const percent = stats.total > 0 ? (stats.good / stats.total) * 100 : 0;
    if (percent >= 50) return "🎉 정말 잘하고 있어요! 장 상태가 매우 좋습니다.";
    if (percent >= 30) return "💪 조금만 더 힘내세요! 식이섬유와 물을 더 챙겨보세요.";
    return "🤗 함께 개선해 나가요! GutBuddy가 도와드릴게요.";
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">히스토리 📅</h1>

      <div className="bg-white p-4 rounded-2xl custom-shadow">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-gray-700">주간 트렌드</p>
          <span className="text-xs font-bold text-[#D4AF37] bg-[#FFF9F0] px-2 py-1 rounded">평균: {stats.avg}%</span>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
              <Tooltip cursor={{ fill: '#F9FAFB' }} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.score >= 75 ? '#10B981' : entry.score >= 60 ? '#FBBF24' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl custom-shadow space-y-4">
        <div className="flex justify-between items-center">
          <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-2">‹</button>
          <h2 className="font-bold text-gray-800">{viewDate.toLocaleDateString('ko-KR', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-2">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => <span key={d} className="text-[10px] font-bold text-gray-300">{d}</span>)}
          {days.map((d, i) => {
            if (!d) return <div key={i} />;
            const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            const hasRecord = records.find(r => r.date === dateStr);
            const isSelected = dateStr === selectedDate;
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(dateStr)}
                className={`relative h-10 w-10 flex items-center justify-center rounded-xl text-sm transition-all
                  ${isSelected ? 'bg-[#D4AF37] text-white' : 'hover:bg-gray-50'}
                  ${isToday && !isSelected ? 'border-2 border-[#D4AF37]' : ''}
                `}
              >
                {d}
                {hasRecord && !isSelected && <span className="absolute bottom-1 text-[8px]">{hasRecord.feeling.emoji}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {selectedRecord && (
        <div className="bg-[#FFF9F0] border-2 border-[#D4AF37] p-4 rounded-2xl flex items-center gap-4 animate-fadeIn">
          <span className="text-4xl">{selectedRecord.feeling.emoji}</span>
          <div className="flex-1">
            <p className="font-bold text-gray-800">장 건강 점수: {selectedRecord.score}%</p>
            <p className="text-xs text-gray-500">배변: {selectedRecord.stoolCount}회 • {selectedRecord.memo || '기록된 메모 없음'}</p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl custom-shadow space-y-6">
        <h2 className="font-bold text-gray-800 flex items-center gap-2">🩺 이번 달 내 장 건강은 어땠을까요?</h2>
        <div className="space-y-4">
          <StatBar label="😄 좋았던 날" count={stats.good} total={stats.total} color="bg-green-500" />
          <StatBar label="😐 보통이었던 날" count={stats.okay} total={stats.total} color="bg-yellow-500" />
          <StatBar label="😣 안 좋았던 날" count={stats.bad} total={stats.total} color="bg-red-500" />
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm italic text-gray-600">
          {getSummaryMessage()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="기록된 일수" value={stats.total} color="bg-green-100 text-green-600" />
        <StatCard label="최상이었던 날" value={stats.good} color="bg-orange-100 text-orange-600" />
        <StatCard label="총 배변 횟수" value={currentMonthRecords.reduce((a, b) => a + b.stoolCount, 0)} color="bg-blue-100 text-blue-600" />
        <StatCard label="평균 점수" value={`${stats.avg}%`} color="bg-pink-100 text-pink-600" />
      </div>
    </div>
  );
};

const StatBar: React.FC<{ label: string, count: number, total: number, color: string }> = ({ label, count, total, color }) => {
  const percent = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-bold text-gray-600">
        <span>{label}</span>
        <span>{count}일 ({Math.round(percent)}%)</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string | number, color: string }> = ({ label, value, color }) => (
  <div className={`p-4 rounded-2xl ${color.split(' ')[0]}`}>
    <p className="text-xs font-bold uppercase opacity-70 mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color.split(' ')[1]}`}>{value}</p>
  </div>
);

export default HistoryTab;
