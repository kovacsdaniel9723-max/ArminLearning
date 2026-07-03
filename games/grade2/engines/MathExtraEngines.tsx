/**
 * Matematika extra játékmotorok (2. osztály)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../../theme';
import { grade2GameStyles as g2 } from '../../../theme/grade2GameStyles';
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
import { shuffleArray, useRoundOptions, buildUniqueNumberOptions } from '../utils/roundOptions';

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
        <TouchableOpacity key={`${String(opt)}-${i}`} style={g2.option} onPress={() => onPick(i)} disabled={disabled}>
          <Text style={g2.optionText}>{renderLabel ? renderLabel(opt) : String(opt)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export const NumberLineEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 45 });
  const [task, setTask] = useState(() => pickNumberLineTask());
  const pos = task.start;

  const { options: opts, correctIdx } = useRoundOptions(task, () => {
    const candidates: number[] = [];
    for (let i = 1; candidates.length < 6 && i < 10; i++) {
      const up = task.answer + i * task.table;
      const down = task.answer - i * task.table;
      if (up > 0) candidates.push(up);
      if (down > 0) candidates.push(down);
    }
    return buildUniqueNumberOptions(task.answer, 4, candidates);
  });

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
      <Text style={styles.prompt}>számtű – ugrás {task.table}-esével</Text>
      <Text style={styles.sub}>kezdet: {pos} · {task.jumps} ugrás · hova érsz?</Text>
      <Text style={styles.line}>{pos} → ?</Text>
      <OptionGrid options={opts} onPick={onPick} disabled={session.isProcessing} />
    </GameSessionLayout>
  );
};

export const SharingEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 50 });
  const [task, setTask] = useState(() => pickSharingTask());
  const reset = () => setTask(pickSharingTask());

  const { options: unique, correctIdx } = useRoundOptions(task, () =>
    buildUniqueNumberOptions(task.perGroup, 4, [
      task.perGroup + 1,
      task.perGroup - 1,
      task.groups,
      task.perGroup + 2,
      task.total,
    ]),
  );

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

  const { options: unique, correctIdx } = useRoundOptions(task, () =>
    buildUniqueNumberOptions(task.change, 4, [
      task.change + 5,
      task.change - 5,
      task.price,
      task.paid,
      task.change + 10,
    ].filter((v) => v >= 0)),
  );

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

  const { options: opts, correctIdx } = useRoundOptions(task, () => {
    const wrong = [
      formatClock((task.hours % 12) + 1, task.minutes),
      formatClock(task.hours, task.minutes === 0 ? 30 : 0),
      formatClock(task.hours === 1 ? 12 : task.hours - 1, task.minutes),
    ];
    const correct = formatClock(task.hours, task.minutes);
    const options = shuffleArray([correct, ...wrong]);
    return { options, correctIdx: options.indexOf(correct) };
  });

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
      <Text style={styles.prompt}>melyik felirat ugyanazt az időt írja?</Text>
      <View style={g2.infoPanel}>
        <Text style={g2.infoPanelText}>{task.hours} óra {task.minutes} perc</Text>
      </View>
      <OptionGrid options={opts} onPick={onPick} disabled={session.isProcessing} />
    </GameSessionLayout>
  );
};

export const WordProblemEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 55 });
  const [task, setTask] = useState(() => pickWordProblem());
  const reset = () => setTask(pickWordProblem());

  const { options: unique, correctIdx } = useRoundOptions(task, () =>
    buildUniqueNumberOptions(task.answer, 4, [
      task.answer + 1,
      task.answer - 1,
      task.answer + 2,
      task.a,
      task.b,
    ].filter((v) => v >= 0)),
  );

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
      <Text style={styles.sub}>mennyi a válasz?</Text>
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
          <TouchableOpacity key={`${s.shape}-${i}`} style={styles.shapeBtn} onPress={() => onPick(i)} disabled={session.isProcessing}>
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
      <View style={g2.infoPanel}>
        <Text style={styles.rulerText}>|——{task.lengthCm} cm——|</Text>
      </View>
      <OptionGrid options={task.options} onPick={onPick} disabled={session.isProcessing} renderLabel={(v) => `${v} cm`} />
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  prompt: { ...typography.h3, textAlign: 'center', marginBottom: spacing.md, color: colors.text },
  sub: { ...typography.body, textAlign: 'center', color: colors.textLight, marginBottom: spacing.md },
  story: { ...typography.bodyLarge, textAlign: 'center', marginBottom: spacing.sm, paddingHorizontal: spacing.sm, color: colors.text },
  line: { ...typography.h2, textAlign: 'center', color: colors.primary, marginBottom: spacing.sm },
  bigEmoji: { fontSize: 48, textAlign: 'center', marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  shapeBtn: { padding: spacing.md, backgroundColor: colors.cardBackground, borderRadius: 16, borderWidth: 2, borderColor: colors.primary },
  shapeEmoji: { fontSize: 48 },
  rulerText: { ...typography.body, fontFamily: 'monospace', color: colors.primary, fontWeight: '700' },
});
