
import React, { useState } from 'react';
import { UserProfile, Gender, Goal, Frequency } from '../types';

interface OnboardingProps {
  onComplete: (data: Partial<UserProfile>) => void;
  initialUser: UserProfile;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, initialUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>(initialUser);

  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const updateField = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSymptom = (symptom: string) => {
    const current = formData.symptoms || [];
    if (current.includes(symptom)) {
      updateField('symptoms', current.filter(s => s !== symptom));
    } else {
      updateField('symptoms', [...current, symptom]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center p-8 space-y-6 animate-fadeIn">
            <span className="text-8xl">🌿</span>
            <h1 className="text-3xl font-bold text-gray-800">GutBuddy에 오신 걸 환영해요!</h1>
            <p className="text-gray-500 text-lg">AI 기반의 장 건강 맞춤형 도우미</p>
            <p className="text-gray-400">개인화된 경험을 위해 몇 가지 정보를 알려주세요</p>
            <button onClick={nextStep} className="w-full bg-[#D4AF37] text-white py-4 rounded-xl font-bold text-lg">시작하기 🚀</button>
          </div>
        );
      case 2:
        return (
          <div className="p-8 space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">어떻게 불러드릴까요? 😊</h2>
            <input
              type="text"
              placeholder="이름 또는 닉네임"
              className="w-full border-2 border-[#D4AF37] rounded-xl p-4 text-xl outline-none"
              value={formData.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
            />
            <button disabled={!formData.name} onClick={nextStep} className="w-full bg-[#D4AF37] disabled:bg-gray-300 text-white py-4 rounded-xl font-bold">다음으로</button>
          </div>
        );
      case 3:
        return (
          <div className="p-8 space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">성별이 어떻게 되시나요? 👤</h2>
            {[
              { label: '남성 👨', val: 'Male' },
              { label: '여성 👩', val: 'Female' },
              { label: '기타 🧑', val: 'Other' }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => { updateField('gender', opt.val as Gender); nextStep(); }}
                className={`w-full p-4 border-2 rounded-xl text-left text-lg flex justify-between items-center ${formData.gender === opt.val ? 'border-[#D4AF37] bg-[#FFF9F0]' : 'border-gray-100'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="p-8 space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">주요 목표가 무엇인가요? 🎯</h2>
            {[
              { label: '변비 완화 💪', val: 'Relieve constipation' },
              { label: '설사 관리 🩹', val: 'Manage diarrhea' },
              { label: '규칙적인 배변 ⏰', val: 'Regular bowel movements' },
              { label: '전반적인 장 건강 🌟', val: 'Overall gut health' },
              { label: '복부 팽만감 감소 🎈', val: 'Reduce bloating' },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => { updateField('goal', opt.val as Goal); nextStep(); }}
                className={`w-full p-4 border-2 rounded-xl text-left text-lg ${formData.goal === opt.val ? 'border-[#D4AF37] bg-[#FFF9F0]' : 'border-gray-100'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="p-8 space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">현재 증상이 있으신가요? 🩺</h2>
            {['복부 팽만 🎈', '가스 참 💨', '통증 😣', '불규칙함 📊', '없음 ✅'].map((opt) => (
              <button
                key={opt}
                onClick={() => toggleSymptom(opt)}
                className={`w-full p-4 border-2 rounded-xl text-left text-lg ${formData.symptoms?.includes(opt) ? 'border-[#D4AF37] bg-[#FFF9F0]' : 'border-gray-100'}`}
              >
                {opt}
              </button>
            ))}
            <button onClick={nextStep} className="w-full bg-[#D4AF37] text-white py-4 rounded-xl font-bold mt-4">다음으로</button>
          </div>
        );
      case 6:
        return (
          <div className="p-8 space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">배변 빈도는 어떤가요? 🚽</h2>
            {[
              { label: '하루 2회 이상 🔥', val: '2+ daily' },
              { label: '하루 1회 👍', val: 'Once daily' },
              { label: '2일마다 😐', val: 'Every 2 days' },
              { label: '일주일에 1-2회 😰', val: '1-2 weekly' },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => { updateField('frequency', opt.val as Frequency); nextStep(); }}
                className={`w-full p-4 border-2 rounded-xl text-left text-lg ${formData.frequency === opt.val ? 'border-[#D4AF37] bg-[#FFF9F0]' : 'border-gray-100'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        );
      case 7:
        return (
          <div className="p-8 space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800">알림 시간 설정 ⏰</h2>
            <input
              type="time"
              className="w-full border-2 border-[#D4AF37] rounded-xl p-4 text-3xl text-center outline-none"
              value={formData.reminderTime}
              onChange={(e) => updateField('reminderTime', e.target.value)}
            />
            <button onClick={nextStep} className="w-full bg-[#D4AF37] text-white py-4 rounded-xl font-bold">다음으로</button>
          </div>
        );
      case 8:
        return (
          <div className="p-8 space-y-8 animate-fadeIn text-center">
            <span className="text-8xl">🎉</span>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">준비가 끝났어요!</h2>
              <p className="text-gray-500">요약: {formData.name}님, 목표는 {formData.goal}입니다.</p>
            </div>
            <button onClick={() => onComplete(formData)} className="w-full bg-[#D4AF37] text-white py-4 rounded-xl font-bold text-xl shadow-lg shadow-[#D4AF37]/30">
              시작하기! 🚀
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full h-2 bg-gray-100 sticky top-0">
        <div 
          className="h-full bg-[#D4AF37] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {step > 1 && (
        <button onClick={prevStep} className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600">
          ← 뒤로
        </button>
      )}

      <div className="flex-1 flex flex-col justify-center">
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
