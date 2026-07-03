/**
 * Extra 2. osztályos játékok – rím, pénz, szorzótábla
 */

import React from 'react';
import { TimedChoiceEngine } from './TimedChoiceEngine';
import { pickRhymeTask, pickCoinTask, pickMultiplyDrill } from '../../../content/grade2/extraGamesData';

export const RimVadaszEngine: React.FC = () => (
  <TimedChoiceEngine
    title="🎵 rím-vadász"
    roundSeconds={45}
    getQuestion={() => {
      const t = pickRhymeTask();
      return {
        prompt: `melyik rímelt a „${t.word}” szóra?`,
        subtitle: '🎵 hallgasd meg magadban!',
        options: t.options.map((o) => ({ label: o })),
        correct: t.correct,
      };
    }}
  />
);

export const PenzermeEngine: React.FC = () => (
  <TimedChoiceEngine
    title="🪙 pénzérmék"
    roundSeconds={50}
    getQuestion={() => {
      const t = pickCoinTask();
      return {
        prompt: `${t.coins.map((c) => c.emoji).join(' ')} összesen hány forint?`,
        subtitle: 'számold össze az érméket!',
        options: t.options.map((o) => ({ label: `${o} ft` })),
        correct: t.correct,
      };
    }}
  />
);

export const SzorzotablaEngine: React.FC = () => (
  <TimedChoiceEngine
    title="✖️ szorzótábla"
    roundSeconds={40}
    getQuestion={() => {
      const t = pickMultiplyDrill();
      return {
        prompt: `${t.a} × ${t.b} = ?`,
        subtitle: '2-es, 5-ös és 10-es tábla',
        options: t.options.map((o) => ({ label: String(o) })),
        correct: t.correct,
      };
    }}
  />
);
