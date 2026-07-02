/**
 * Matematika extra játékmotorok (2. osztály)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { useGameSession } from '../../../hooks/useGameSession';
import { GameSessionLayout } from '../../../components/game/GameSessionLayout';
import {
  pickNumberLineTask,
  pickSharingTask,
  pickShoppingTask,
  pickClockTask,
  formatClock,
  pickWordProblem,
  pickShapeHunt,
  pickMeasureTask,
} from '../../../content/grade2/matematikaExtraData';

function OptionGrid({
  options,
  onPick,
  disabled,
  renderLabel,
}: {
  options: (number | string)[];
  onPick: (idx: number) => void;
  disabled: boolean;
  renderLabel?: (v: number | string) => string;
}) {
  return (
    <View style={styles.grid}>
      {options.map((opt, i) => (
        <TouchableOpacity key={i} style={styles.option} onPress={() => onPick(i)} disabled={disabled}>
          <Text style={styles.optionText}>{renderLabel ? renderLabel(opt) : String(opt)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export const NumberLineEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 45 });
  const [task, setTask] = useState(() => pickNumberLineTask());
  const pos = task.start;
  const optsSet = new Set<number>([task.answer]);
  while (optsSet.size < 4) {
    optsSet.add(task.answer + (Math.floor(Math.random() * 5) - 2) * task.table);
  }
  const opts = [...optsSet].filter((v) => v > 0).slice(0, 4);
  while (opts.length < 4) opts.push(task.answer + opts.length * task.table);
  opts.sort(() => Math.random() - 0.5);
  const correctIdx = opts.indexOf(task.answer);

  const reset = () => setTask(pickNumberLineTask());

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === correctIdx) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🦘 szorzó-ugrás"
      timeLeft={session.timeLeft}
      streak={session.streak}
      showFeedback={session.showFeedback}
      feedbackMessage={session.feedbackMessage}
      feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp}
      levelUpLevel={session.levelUpLevel}
      levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp}
      showMovement={session.showMovement}
      movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.prompt}>ugrás {task.table}-esével, {task.jumps}x – honnan: {pos}</Text>
      <Text style={styles.line}>0 — {pos} — ? — …</Text>
      <Text style={styles.sub}>hova érsz?</Text>
      <OptionGrid options={opts} onPick={onPick} disabled={session.isProcessing} />
    </GameSessionLayout>
  );
};

export const SharingEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 50 });
  const [task, setTask] = useState(() => pickSharingTask());
  const reset = () => setTask(pickSharingTask());
  const opts = [task.perGroup, task.perGroup + 1, task.perGroup - 1, task.groups].filter((v) => v > 0);
  const unique = [...new Set(opts)].slice(0, 4).sort(() => Math.random() - 0.5);
  const correctIdx = unique.indexOf(task.perGroup);

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === correctIdx) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🎉 osztó-parti"
      timeLeft={session.timeLeft}
      streak={session.streak}
      showFeedback={session.showFeedback}
      feedbackMessage={session.feedbackMessage}
      feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp}
      levelUpLevel={session.levelUpLevel}
      levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp}
      showMovement={session.showMovement}
      movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.prompt}>{'🍪'.repeat(Math.min(task.total, 12))}{task.total > 12 ? ` +${task.total - 12}` : ''}</Text>
      <Text style={styles.sub}>oszd el {task.groups} barát között! hány jut egynek?</Text>
      <OptionGrid options={unique} onPick={onPick} disabled={session.isProcessing} />
    </GameSessionLayout>
  );
};

export const ShoppingEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 50 });
  const [task, setTask] = useState(() => pickShoppingTask());
  const reset = () => setTask(pickShoppingTask());
  const opts = [task.change, task.change + 5, task.change - 5, task.price].filter((v) => v >= 0);
  const unique = [...new Set(opts)].slice(0, 4).sort(() => Math.random() - 0.5);
  const correctIdx = unique.indexOf(task.change);

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === correctIdx) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🛒 vásárlós játék"
      timeLeft={session.timeLeft}
      streak={session.streak}
      showFeedback={session.showFeedback}
      feedbackMessage={session.feedbackMessage}
      feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp}
      levelUpLevel={session.levelUpLevel}
      levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp}
      showMovement={session.showMovement}
      movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.bigEmoji}>{task.emoji}</Text>
      <Text style={styles.sub}>ár: {task.price} ft, fizetsz: {task.paid} ft</Text>
      <Text style={styles.prompt}>mennyi a visszajáró?</Text>
      <OptionGrid options={unique} onPick={onPick} disabled={session.isProcessing} renderLabel={(v) => `${v} ft`} />
    </GameSessionLayout>
  );
};

export const ClockEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 45 });
  const [task, setTask] = useState(() => pickClockTask());
  const reset = () => setTask(pickClockTask());
  const wrong = [
    formatClock((task.hours % 12) + 1, task.minutes),
    formatClock(task.hours, task.minutes === 0 ? 30 : 0),
    formatClock(task.hours === 1 ? 12 : task.hours - 1, task.minutes),
  ];
  const correct = formatClock(task.hours, task.minutes);
  const opts = [correct, ...wrong].sort(() => Math.random() - 0.5);
  const correctIdx = opts.indexOf(correct);

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === correctIdx) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🕐 óra-kaland"
      timeLeft={session.timeLeft}
      streak={session.streak}
      showFeedback={session.showFeedback}
      feedbackMessage={session.feedbackMessage}
      feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp}
      levelUpLevel={session.levelUpLevel}
      levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp}
      showMovement={session.showMovement}
      movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.bigEmoji}>🕐</Text>
      <Text style={styles.prompt}>melyik időt mutatja az óra?</Text>
      <Text style={styles.sub}>{task.hours} óra {task.minutes} perc</Text>
      <OptionGrid options={opts} onPick={onPick} disabled={session.isProcessing} />
    </GameSessionLayout>
  );
};

export const WordProblemEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 55 });
  const [task, setTask] = useState(() => pickWordProblem());
  const reset = () => setTask(pickWordProblem());
  const opts = [task.answer, task.answer + 1, task.answer - 1, task.answer + 2].filter((v) => v >= 0);
  const unique = [...new Set(opts)].slice(0, 4).sort(() => Math.random() - 0.5);
  const correctIdx = unique.indexOf(task.answer);

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === correctIdx) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🔎 szöveges feladat nyomozó"
      timeLeft={session.timeLeft}
      streak={session.streak}
      showFeedback={session.showFeedback}
      feedbackMessage={session.feedbackMessage}
      feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp}
      levelUpLevel={session.levelUpLevel}
      levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp}
      showMovement={session.showMovement}
      movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.bigEmoji}>{task.icons.repeat(Math.min(task.a, 8))}</Text>
      <Text style={styles.story}>{task.text}</Text>
      <OptionGrid options={unique} onPick={onPick} disabled={session.isProcessing} />
    </GameSessionLayout>
  );
};

export const ShapeHuntEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 40 });
  const [task, setTask] = useState(() => pickShapeHunt());
  const reset = () => setTask(pickShapeHunt());

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === task.correctIndex) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="🔍 alakzat-vadászat"
      timeLeft={session.timeLeft}
      streak={session.streak}
      showFeedback={session.showFeedback}
      feedbackMessage={session.feedbackMessage}
      feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp}
      levelUpLevel={session.levelUpLevel}
      levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp}
      showMovement={session.showMovement}
      movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.prompt}>keresd meg: {task.target} {task.targetEmoji}</Text>
      <View style={styles.grid}>
        {task.scene.map((s, i) => (
          <TouchableOpacity key={i} style={styles.shapeBtn} onPress={() => onPick(i)} disabled={session.isProcessing}>
            <Text style={styles.shapeEmoji}>{s.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

export const MeasureEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 45 });
  const [task, setTask] = useState(() => pickMeasureTask());
  const reset = () => setTask(pickMeasureTask());
  const correctIdx = task.options.indexOf(task.correct);

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === correctIdx) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout
      title="📏 mérőmester"
      timeLeft={session.timeLeft}
      streak={session.streak}
      showFeedback={session.showFeedback}
      feedbackMessage={session.feedbackMessage}
      feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp}
      levelUpLevel={session.levelUpLevel}
      levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp}
      showMovement={session.showMovement}
      movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)}
      onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.bigEmoji}>{task.emoji}</Text>
      <Text style={styles.prompt}>hány cm hosszú a {task.object}?</Text>
      <View style={styles.ruler}>
        <Text style={styles.rulerText}>|——{task.lengthCm} cm——|</Text>
      </View>
      <OptionGrid options={task.options} onPick={onPick} disabled={session.isProcessing} renderLabel={(v) => `${v} cm`} />
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  prompt: { ...typography.h3, textAlign: 'center', marginBottom: spacing.md, color: colors.text },
  sub: { ...typography.body, textAlign: 'center', color: colors.textLight, marginBottom: spacing.md },
  story: { ...typography.bodyLarge, textAlign: 'center', marginBottom: spacing.lg, paddingHorizontal: spacing.sm },
  line: { ...typography.h2, textAlign: 'center', color: colors.primary, marginBottom: spacing.sm },
  bigEmoji: { fontSize: 48, textAlign: 'center', marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  option: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    minWidth: '40%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  optionText: { ...typography.h3, color: colors.text },
  shapeBtn: { padding: spacing.md, backgroundColor: colors.accentLight, borderRadius: 16 },
  shapeEmoji: { fontSize: 48 },
  ruler: { backgroundColor: colors.white, padding: spacing.md, borderRadius: 8, marginBottom: spacing.lg, alignItems: 'center' },
  rulerText: { ...typography.body, fontFamily: 'monospace' },
});
