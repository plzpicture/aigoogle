
import React from 'react';

export const BRISTOL_SCALE = [
  { type: 1, description: '따로 떨어진 딱딱한 덩어리, 견과류 같음 (배출하기 어려움)', emoji: '🪨' },
  { type: 2, description: '소시지 모양이지만 덩어리가 져 있음', emoji: '🥖' },
  { type: 3, description: '소시지 모양이지만 표면에 균열이 있음', emoji: '🥨' },
  { type: 4, description: '소시지나 뱀처럼 매끄럽고 부드러움', emoji: '🐍' },
  { type: 5, description: '가장자리가 분명하고 부드러운 덩어리', emoji: '☁️' },
  { type: 6, description: '가장자리가 울퉁불퉁하고 푹신한 조각, 진흙 같은 변', emoji: '🍦' },
  { type: 7, description: '물기가 많고 고체 조각이 없음 (완전한 액체)', emoji: '🌊' }
];

export const LEVELS = [
  { lv: 1, name: '씨앗', emoji: '🌰', req: 0 },
  { lv: 2, name: '새싹', emoji: '🌱', req: 100 },
  { lv: 3, name: '어린잎', emoji: '🌿', req: 300 },
  { lv: 4, name: '묘목', emoji: '🪴', req: 600 },
  { lv: 5, name: '나무', emoji: '🌳', req: 1000 },
  { lv: 6, name: '만개', emoji: '🌸', req: 1500 },
];

export const BADGES = [
  { id: 1, name: '얼리버드', emoji: '🌅', unlocked: true },
  { id: 2, name: '7일 연속', emoji: '🔥', unlocked: true },
  { id: 3, name: '식이섬유 왕', emoji: '🥦', unlocked: false },
  { id: 4, name: '수분 섭취', emoji: '💧', unlocked: true },
  { id: 5, name: '분석가', emoji: '🔬', unlocked: false },
  { id: 6, name: '100회 달성', emoji: '💯', unlocked: false },
];
