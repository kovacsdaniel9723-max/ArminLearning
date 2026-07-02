/**
 * Osztályszint React kontextus – betöltés, mentés, szinkron gradeState
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { GradeLevel } from '../types/grade';
import { setCurrentGrade } from '../utils/gradeState';
import { loadSelectedGrade, saveSelectedGrade, migrateLegacyToGrade1 } from '../utils/gradeStorage';

interface GradeContextValue {
  grade: GradeLevel | null;
  isReady: boolean;
  selectGrade: (grade: GradeLevel) => Promise<void>;
}

const GradeContext = createContext<GradeContextValue | null>(null);

export const GradeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [grade, setGrade] = useState<GradeLevel | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await migrateLegacyToGrade1();
      const saved = await loadSelectedGrade();
      if (cancelled) return;
      if (saved) {
        setCurrentGrade(saved);
        setGrade(saved);
      } else {
        const { loadStatsForGrade, saveSelectedGrade } = await import('../utils/gradeStorage');
        const g1 = await loadStatsForGrade(1);
        if (g1 && (g1.correctAnswers > 0 || g1.gamesPlayed > 0)) {
          await saveSelectedGrade(1);
          setCurrentGrade(1);
          setGrade(1);
        }
      }
      setIsReady(true);
    })();
    return () => { cancelled = true; };
  }, []);

  const selectGrade = useCallback(async (g: GradeLevel) => {
    await saveSelectedGrade(g);
    setCurrentGrade(g);
    setGrade(g);
  }, []);

  return (
    <GradeContext.Provider value={{ grade, isReady, selectGrade }}>
      {children}
    </GradeContext.Provider>
  );
};

export function useGrade(): GradeContextValue {
  const ctx = useContext(GradeContext);
  if (!ctx) throw new Error('useGrade must be used within GradeProvider');
  return ctx;
}
