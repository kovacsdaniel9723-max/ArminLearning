/**
 * Zene, rajz, digitális, testnevelés játékmotorok
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect, Polygon } from 'react-native-svg';
import * as Speech from 'expo-speech';
import { colors, spacing, typography } from '../../../theme';
import { grade2GameStyles as g2 } from '../../../theme/grade2GameStyles';
import { useGameSession } from '../../../hooks/useGameSession';
import { GameSessionLayout } from '../../../components/game/GameSessionLayout';
import { SpeakButton } from '../../../components/SpeakButton';
import { PaintCanvas, type PaintCanvasHandle } from '../../../components/PaintCanvas';
import { pickRhythmPattern, pickSoundTask, pickDanceSequence } from '../../../content/grade2/zeneData';
import { pickNetSafetyStep, DRAWING_COLORS, COLLAGE_SHAPES } from '../../../content/grade2/digitalisData';
import { pickDrawingTask } from '../../../content/grade2/drawingTasksData';
import { pickCoordinationPatternShuffled } from '../../../content/grade2/testnevData';
import { pickPunctuationTask, pickSortWords, SZOFAJ_CATEGORIES } from '../../../content/grade2/magyarData';
import { SortBasketEngine, type SortItem } from './SortBasketEngine';
import { TimedChoiceEngine } from './TimedChoiceEngine';

const BRUSH_SIZES = [
  { label: 'vékony', size: 4 },
  { label: 'közepes', size: 10 },
  { label: 'vastag', size: 18 },
];

export const PunctuationEngine: React.FC = () => (
  <TimedChoiceEngine
    title="❗ írásjel-vadász"
    roundSeconds={40}
    getQuestion={() => {
      const t = pickPunctuationTask();
      return {
        prompt: t.sentence.replace('___', ' ___ '),
        subtitle: 'melyik mondatvégi írásjel hiányzik?',
        options: t.options.map((o) => ({ label: o })),
        correct: t.correct,
      };
    }}
  />
);

export const WordTypeSafariEngine: React.FC = () => (
  <SortBasketEngine
    title="🌴 szófaj-szafari"
    categories={SZOFAJ_CATEGORIES.map((c) => ({
      id: c,
      label: c,
      emoji: c === 'főnév' ? '📦' : c === 'ige' ? '🏃' : '🌈',
    }))}
    getItems={() =>
      pickSortWords(4).map((w, i) => ({
        id: `${w.word}-${i}`,
        label: w.word,
        category: w.category,
      })) as SortItem[]
    }
  />
);

export const RhythmEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 50 });
  const [pattern, setPattern] = useState(() => pickRhythmPattern());
  const [step, setStep] = useState(0);
  const reset = () => { setPattern(pickRhythmPattern()); setStep(0); };

  const onTap = async () => {
    if (session.isProcessing) return;
    const expected = pattern.beats[step];
    if (expected === 'tap') {
      const next = step + 1;
      if (next >= pattern.beats.length) {
        await session.handleCorrect(reset);
      } else {
        setStep(next);
      }
    } else {
      await session.handleWrong(() => setStep(0));
    }
  };

  return (
    <GameSessionLayout title="🥁 ritmus-kopogó" timeLeft={session.timeLeft} streak={session.streak}
      showFeedback={session.showFeedback} feedbackMessage={session.feedbackMessage} feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp} levelUpLevel={session.levelUpLevel} levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp} showMovement={session.showMovement} movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)} onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.hint}>kövesd a ritmust – tapsolj a ●-nál!</Text>
      <View style={styles.beats}>
        {pattern.beats.map((b, i) => (
          <Text key={i} style={[styles.beat, i === step && styles.beatActive]}>{b === 'tap' ? '●' : '○'}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.tapBtn} onPress={onTap} disabled={session.isProcessing}>
        <Text style={styles.tapText}>taps!</Text>
      </TouchableOpacity>
    </GameSessionLayout>
  );
};

export const SoundPickEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 45 });
  const [task, setTask] = useState(() => pickSoundTask());
  const reset = () => setTask(pickSoundTask());

  useEffect(() => {
    Speech.speak(task.sound, { language: 'hu-HU' });
    return () => {
      Speech.stop();
    };
  }, [task]);

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (idx === task.correct) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout title="👂 hangfelismerő" timeLeft={session.timeLeft} streak={session.streak}
      showFeedback={session.showFeedback} feedbackMessage={session.feedbackMessage} feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp} levelUpLevel={session.levelUpLevel} levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp} showMovement={session.showMovement} movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)} onMovementSkip={() => session.skipMovement(reset)}
    >
      <TouchableOpacity style={styles.playBtn} onPress={() => Speech.speak(task.sound, { language: 'hu-HU' })}>
        <Text style={styles.playText}>🔊 hallgasd meg újra!</Text>
      </TouchableOpacity>
      <View style={styles.grid}>
        {task.options.map((opt, i) => (
          <TouchableOpacity key={i} style={g2.optionCompact} onPress={() => onPick(i)} disabled={session.isProcessing}>
            <Text style={styles.emoji}>{opt.emoji}</Text>
            <Text style={g2.optionLabel}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

export const DanceEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 60 });
  const [seq, setSeq] = useState(() => pickDanceSequence());
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= seq.moves.length) return;
    const id = setTimeout(() => setShown((s) => s + 1), 1500);
    return () => clearTimeout(id);
  }, [shown, seq.moves.length]);

  const onDone = async () => {
    if (session.isProcessing || shown < seq.moves.length) return;
    await session.handleCorrect(() => {
      setShown(0);
      setSeq(pickDanceSequence());
    });
  };

  return (
    <GameSessionLayout title="💃 mozgás a zenére" timeLeft={session.timeLeft} streak={session.streak}
      showFeedback={session.showFeedback} feedbackMessage={session.feedbackMessage} feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp} levelUpLevel={session.levelUpLevel} levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp} showMovement={session.showMovement} movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement()} onMovementSkip={() => session.skipMovement()}
    >
      <Text style={styles.hint}>másold a mozdulatokat a valóságban!</Text>
      {seq.moves.slice(0, shown).map((m, i) => (
        <View key={i} style={styles.moveRow}>
          <Text style={styles.moveEmoji}>{seq.emojis[i]}</Text>
          <Text style={styles.moveText}>{m}</Text>
        </View>
      ))}
      {shown >= seq.moves.length && (
        <TouchableOpacity style={styles.doneBtn} onPress={onDone} disabled={session.isProcessing}>
          <Text style={styles.doneText}>megcsináltam!</Text>
        </TouchableOpacity>
      )}
    </GameSessionLayout>
  );
};

export const CoordinationEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 55 });
  const [pattern, setPattern] = useState(() => pickCoordinationPatternShuffled());
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= pattern.steps.length) return;
    const id = setTimeout(() => setRevealed((r) => r + 1), 1200);
    return () => clearTimeout(id);
  }, [revealed, pattern.steps.length]);

  const reset = () => { setPattern(pickCoordinationPatternShuffled()); setRevealed(0); };

  const onDone = async () => {
    if (session.isProcessing || revealed < pattern.steps.length) return;
    await session.handleCorrect(reset);
  };

  return (
    <GameSessionLayout title="🎯 koordinációs kihívás" timeLeft={session.timeLeft} streak={session.streak}
      showFeedback={session.showFeedback} feedbackMessage={session.feedbackMessage} feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp} levelUpLevel={session.levelUpLevel} levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp} showMovement={session.showMovement} movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)} onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.hint}>simon mondja – csináld meg!</Text>
      {pattern.steps.slice(0, revealed).map((s, i) => (
        <Text key={i} style={styles.step}>{pattern.emoji[i]} {s}</Text>
      ))}
      {revealed >= pattern.steps.length && (
        <TouchableOpacity style={styles.doneBtn} onPress={onDone} disabled={session.isProcessing}>
          <Text style={styles.doneText}>kész vagyok!</Text>
        </TouchableOpacity>
      )}
    </GameSessionLayout>
  );
};

export const ClickTargetEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 45 });
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hits, setHits] = useState(0);
  const targetHits = 5;

  const moveTarget = () => {
    setPos({ x: 10 + Math.random() * 70, y: 10 + Math.random() * 50 });
  };

  const onHit = async () => {
    if (session.isProcessing) return;
    const next = hits + 1;
    setHits(next);
    if (next >= targetHits) {
      setHits(0);
      await session.handleCorrect(moveTarget);
    } else {
      moveTarget();
    }
  };

  return (
    <GameSessionLayout title="🖱️ egér-vadász" timeLeft={session.timeLeft} streak={session.streak} scroll={false}
      showFeedback={session.showFeedback} feedbackMessage={session.feedbackMessage} feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp} levelUpLevel={session.levelUpLevel} levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp} showMovement={session.showMovement} movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement()} onMovementSkip={() => session.skipMovement()}
    >
      <Text style={styles.hint}>kattints a célra! ({hits}/{targetHits})</Text>
      <View style={styles.arena}>
        <TouchableOpacity style={[styles.target, { left: `${pos.x}%`, top: `${pos.y}%` }]} onPress={onHit}>
          <Text style={styles.targetText}>🎯</Text>
        </TouchableOpacity>
      </View>
    </GameSessionLayout>
  );
};

export const NetSafetyEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 55 });
  const [step, setStep] = useState(() => pickNetSafetyStep());
  const reset = () => setStep(pickNetSafetyStep());

  const onPick = async (idx: number) => {
    if (session.isProcessing) return;
    if (step.choices[idx].safe) await session.handleCorrect(reset);
    else await session.handleWrong();
  };

  return (
    <GameSessionLayout title="🛡️ netbiztonság-mese" timeLeft={session.timeLeft} streak={session.streak}
      showFeedback={session.showFeedback} feedbackMessage={session.feedbackMessage} feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp} levelUpLevel={session.levelUpLevel} levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp} showMovement={session.showMovement} movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement(reset)} onMovementSkip={() => session.skipMovement(reset)}
    >
      <Text style={styles.story}>{step.text}</Text>
      <View style={styles.grid}>
        {step.choices.map((c, i) => (
          <TouchableOpacity key={i} style={g2.optionCompact} onPress={() => onPick(i)} disabled={session.isProcessing}>
            <Text style={styles.emoji}>{c.emoji}</Text>
            <Text style={g2.optionLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GameSessionLayout>
  );
};

export const DrawingEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 180, movementEnabled: false });
  const canvasRef = useRef<PaintCanvasHandle>(null);
  const [task, setTask] = useState(() => pickDrawingTask());
  const [color, setColor] = useState(DRAWING_COLORS[0]);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1].size);
  const [eraser, setEraser] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);

  const resetRound = useCallback(() => {
    setTask((prev) => pickDrawingTask(prev.id));
    setStrokeCount(0);
    setEraser(false);
    canvasRef.current?.clear();
  }, []);

  const onStroke = useCallback(() => {
    setStrokeCount((n) => n + 1);
  }, []);

  const onDone = async () => {
    if (strokeCount < task.minStrokes || session.isProcessing) return;
    await session.handleCorrect(resetRound);
  };

  const canFinish = strokeCount >= task.minStrokes;
  const progress = Math.min(100, Math.round((strokeCount / task.minStrokes) * 100));

  return (
    <GameSessionLayout title="🎨 alkotó szoba" timeLeft={session.timeLeft} streak={session.streak} scroll
      showFeedback={session.showFeedback} feedbackMessage={session.feedbackMessage} feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp} levelUpLevel={session.levelUpLevel} levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp} showMovement={session.showMovement} movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement()} onMovementSkip={() => session.skipMovement()}
    >
      <View style={styles.taskBanner}>
        <Text style={styles.taskEmoji}>{task.emoji}</Text>
        <Text style={styles.taskPrompt}>{task.prompt}</Text>
      </View>
      <SpeakButton text={task.prompt} label="🔊 feladat felolvasása" />

      <View style={styles.toolRow}>
        <Text style={styles.toolLabel}>ecset:</Text>
        {BRUSH_SIZES.map((b) => (
          <TouchableOpacity
            key={b.label}
            style={[styles.toolBtn, brushSize === b.size && !eraser && styles.toolBtnActive]}
            onPress={() => { setBrushSize(b.size); setEraser(false); }}
          >
            <View style={[styles.brushPreview, { width: b.size + 8, height: b.size + 8, backgroundColor: eraser ? colors.gray : color }]} />
            <Text style={styles.toolBtnText}>{b.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.toolBtn, eraser && styles.toolBtnActive]}
          onPress={() => setEraser(true)}
        >
          <Text style={styles.eraserIcon}>🧽</Text>
          <Text style={styles.toolBtnText}>radír</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn} onPress={() => { canvasRef.current?.clear(); setStrokeCount(0); }}>
          <Text style={styles.eraserIcon}>🗑️</Text>
          <Text style={styles.toolBtnText}>új lap</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.colors}>
        {DRAWING_COLORS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorDot, { backgroundColor: c, borderWidth: color === c && !eraser ? 4 : 2 }]}
            onPress={() => { setColor(c); setEraser(false); }}
          />
        ))}
      </View>

      <PaintCanvas
        ref={canvasRef}
        color={color}
        brushSize={brushSize}
        eraser={eraser}
        onStroke={onStroke}
        height={300}
      />

      <Text style={styles.progressHint}>
        {canFinish
          ? 'szép munka! nyomd meg a kész gombot! 🌟'
          : `festéssel haladás: ${strokeCount} / ${task.minStrokes} vonás (${progress}%)`}
      </Text>

      <TouchableOpacity
        style={[styles.doneBtn, !canFinish && styles.doneBtnDisabled]}
        onPress={onDone}
        disabled={!canFinish || session.isProcessing}
      >
        <Text style={styles.doneText}>kész a rajz! 🖼️</Text>
      </TouchableOpacity>
    </GameSessionLayout>
  );
};

export const CollageEngine: React.FC = () => {
  const session = useGameSession({ roundSeconds: 80, movementEnabled: false });
  const [placed, setPlaced] = useState<{ shape: string; color: string; x: number; y: number }[]>([]);

  const addShape = (shape: string, color: string) => {
    setPlaced((p) => [...p, { shape, color, x: 20 + Math.random() * 60, y: 20 + Math.random() * 50 }]);
  };

  const onDone = async () => {
    if (placed.length < 4) return;
    await session.handleCorrect(() => setPlaced([]));
  };

  return (
    <GameSessionLayout title="🧩 forma-kollázs" timeLeft={session.timeLeft} streak={session.streak} scroll={false}
      showFeedback={session.showFeedback} feedbackMessage={session.feedbackMessage} feedbackType={session.feedbackType}
      showLevelUp={session.showLevelUp} levelUpLevel={session.levelUpLevel} levelUpReward={session.levelUpReward}
      onCloseLevelUp={session.closeLevelUp} showMovement={session.showMovement} movementChallenge={session.movementChallenge}
      onMovementComplete={() => session.completeMovement()} onMovementSkip={() => session.skipMovement()}
    >
      <Text style={styles.hint}>rakd össze a képet alakzatokból!</Text>
      <View style={styles.collageBoard}>
        <Svg width="100%" height={220}>
          {placed.map((p, i) => {
            if (p.shape === 'kör') return <Circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={20} fill={p.color} />;
            if (p.shape === 'négyzet') return <Rect key={i} x={`${p.x - 5}%`} y={`${p.y - 5}%`} width={40} height={40} fill={p.color} />;
            if (p.shape === 'téglalap') return <Rect key={i} x={`${p.x - 6}%`} y={`${p.y - 3}%`} width={50} height={25} fill={p.color} />;
            return <Polygon key={i} points={`${p.x},${p.y - 5} ${p.x + 5},${p.y + 5} ${p.x - 5},${p.y + 5}`} fill={p.color} />;
          })}
        </Svg>
      </View>
      <View style={styles.shapes}>
        {COLLAGE_SHAPES.map((s) => (
          <TouchableOpacity key={s.shape} style={styles.shapePick} onPress={() => addShape(s.shape, s.color)}>
            <Text style={styles.shapeLabel}>{s.shape}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.doneBtn} onPress={onDone} disabled={placed.length < 4 || session.isProcessing}>
        <Text style={styles.doneText}>kész a kollázs!</Text>
      </TouchableOpacity>
    </GameSessionLayout>
  );
};

const styles = StyleSheet.create({
  hint: { ...typography.body, textAlign: 'center', color: colors.textLight, marginBottom: spacing.md },
  beats: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md, marginBottom: spacing.lg },
  beat: { fontSize: 32, color: colors.grayLight },
  beatActive: { color: colors.accent, transform: [{ scale: 1.2 }] },
  tapBtn: { backgroundColor: colors.primary, padding: spacing.xl, borderRadius: 80, alignSelf: 'center' },
  tapText: { ...typography.buttonLarge, color: colors.white },
  playBtn: { backgroundColor: colors.panelLight, padding: spacing.md, borderRadius: 16, marginBottom: spacing.md, alignItems: 'center', borderWidth: 3, borderColor: colors.primary },
  playText: { ...typography.body, fontWeight: '800', color: colors.textOnLight },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm },
  emoji: { fontSize: 36 },
  moveRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm, padding: spacing.sm, backgroundColor: colors.cardBackground, borderRadius: 12, borderWidth: 2, borderColor: colors.cardBorder },
  moveEmoji: { fontSize: 32 },
  moveText: { ...typography.body, flex: 1, color: colors.text },
  step: { ...typography.bodyLarge, marginBottom: spacing.sm, padding: spacing.sm, backgroundColor: colors.backgroundLight, borderRadius: 8, color: colors.text, borderWidth: 1, borderColor: colors.cardBorder },
  doneBtn: { backgroundColor: colors.secondary, padding: spacing.md, borderRadius: 16, marginTop: spacing.lg, alignItems: 'center' },
  doneText: { ...typography.button, color: colors.white },
  arena: { flex: 1, minHeight: 280, backgroundColor: colors.backgroundDark, borderRadius: 16, position: 'relative' },
  target: { position: 'absolute', padding: spacing.md },
  targetText: { fontSize: 48 },
  story: { ...typography.bodyLarge, textAlign: 'center', marginBottom: spacing.lg, padding: spacing.md, backgroundColor: colors.backgroundLight, borderRadius: 12, color: colors.text, borderWidth: 2, borderColor: colors.cardBorder },
  colors: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.md, justifyContent: 'center' },
  colorDot: { width: 40, height: 40, borderRadius: 20, borderColor: colors.textOnLight },
  taskBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.panelLight,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.sm,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  taskEmoji: { fontSize: 40 },
  taskPrompt: { ...typography.h3, color: colors.textOnLight, flex: 1, fontWeight: '800' },
  toolRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginBottom: spacing.sm, justifyContent: 'center', alignItems: 'center' },
  toolLabel: { ...typography.bodySmall, color: colors.textLight, fontWeight: '700', width: '100%', textAlign: 'center', marginBottom: 2 },
  toolBtn: {
    alignItems: 'center',
    backgroundColor: colors.panelLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.grayLight,
    minWidth: 64,
  },
  toolBtnActive: { borderColor: colors.primary, backgroundColor: colors.backgroundLight },
  toolBtnText: { ...typography.bodySmall, color: colors.textOnLight, fontWeight: '700', marginTop: 2 },
  brushPreview: { borderRadius: 99 },
  eraserIcon: { fontSize: 22 },
  progressHint: { ...typography.body, textAlign: 'center', color: colors.textLight, marginTop: spacing.sm, marginBottom: spacing.xs },
  doneBtnDisabled: { opacity: 0.45 },
  collageBoard: { height: 220, backgroundColor: colors.white, borderRadius: 16, borderWidth: 2, borderColor: colors.grayLight, marginBottom: spacing.md },
  shapes: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center' },
  shapePick: { backgroundColor: colors.primaryLight, padding: spacing.md, borderRadius: 12 },
  shapeLabel: { ...typography.bodySmall, color: colors.white, fontWeight: '700' },
});
