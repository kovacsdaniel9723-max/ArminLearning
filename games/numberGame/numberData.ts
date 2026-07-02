/**
 * Számfelismerő játék adatok
 * Számok 1-20
 */

import { NumberQuestion } from '../../types';

export const numberQuestions: NumberQuestion[] = [
  {
    number: 1,
    iconGroups: [
      { count: 1, icons: ['⭐'] },
      { count: 3, icons: ['⭐', '⭐', '⭐'] },
      { count: 5, icons: ['⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 0,
  },
  {
    number: 2,
    iconGroups: [
      { count: 1, icons: ['⭐'] },
      { count: 2, icons: ['⭐', '⭐'] },
      { count: 4, icons: ['⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
  {
    number: 3,
    iconGroups: [
      { count: 2, icons: ['⭐', '⭐'] },
      { count: 3, icons: ['⭐', '⭐', '⭐'] },
      { count: 5, icons: ['⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
  {
    number: 4,
    iconGroups: [
      { count: 3, icons: ['⭐', '⭐', '⭐'] },
      { count: 4, icons: ['⭐', '⭐', '⭐', '⭐'] },
      { count: 6, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
  {
    number: 5,
    iconGroups: [
      { count: 3, icons: ['⭐', '⭐', '⭐'] },
      { count: 5, icons: ['⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 7, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
  {
    number: 6,
    iconGroups: [
      { count: 4, icons: ['⭐', '⭐', '⭐', '⭐'] },
      { count: 6, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 8, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
  {
    number: 7,
    iconGroups: [
      { count: 5, icons: ['⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 7, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 9, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
  {
    number: 8,
    iconGroups: [
      { count: 6, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 8, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 10, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
  {
    number: 9,
    iconGroups: [
      { count: 7, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 9, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 11, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
  {
    number: 10,
    iconGroups: [
      { count: 8, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 10, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
      { count: 12, icons: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐', '⭐'] },
    ],
    correctIndex: 1,
  },
];

/**
 * Véletlenszerű kérdés kiválasztása
 */
import { getCurrentGrade } from '../../utils/gradeState';

function buildGrade2NumberQuestion(): NumberQuestion {
  const number = 1 + Math.floor(Math.random() * 100);
  const wrong1 = number + 1 + Math.floor(Math.random() * 5);
  const wrong2 = Math.max(1, number - 1 - Math.floor(Math.random() * 5));
  const counts = [number, wrong1, wrong2].sort(() => Math.random() - 0.5);
  const correctIndex = counts.indexOf(number);
  const iconGroups = counts.map((count) => ({
    count,
    icons: Array.from({ length: Math.min(count, 10) }, () => '⭐').concat(
      count > 10 ? [`+${count - 10}`] : []
    ),
  }));
  return { number, iconGroups, correctIndex };
}

export const getRandomNumberQuestion = (): NumberQuestion => {
  if (getCurrentGrade() === 2) {
    return buildGrade2NumberQuestion();
  }
  const randomIndex = Math.floor(Math.random() * numberQuestions.length);
  return numberQuestions[randomIndex];
};
