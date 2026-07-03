/**
 * Paint-szerű rajzvászon – web canvas, húzásra fest
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme';

const DEFAULT_HEIGHT = 300;

export interface PaintCanvasHandle {
  clear: () => void;
  hasDrawing: () => boolean;
}

interface PaintCanvasProps {
  color: string;
  brushSize: number;
  eraser: boolean;
  onStroke?: () => void;
  height?: number;
}

export const PaintCanvas = forwardRef<PaintCanvasHandle, PaintCanvasProps>(function PaintCanvas(
  { color, brushSize, eraser, onStroke, height = DEFAULT_HEIGHT },
  ref,
) {
  const containerRef = useRef<View>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const hasDrawingRef = useRef(false);
  const brushRef = useRef({ color, brushSize, eraser });
  const onStrokeRef = useRef(onStroke);
  brushRef.current = { color, brushSize, eraser };
  onStrokeRef.current = onStroke;

  const applyBrush = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const { color: c, brushSize: bs, eraser: er } = brushRef.current;
    ctx.strokeStyle = er ? '#ffffff' : c;
    ctx.lineWidth = er ? bs * 2.8 : bs;
  }, []);

  const fillWhite = useCallback(() => {
    const ctx = ctxRef.current;
    const { w, h } = sizeRef.current;
    if (!ctx || w <= 0 || h <= 0) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    hasDrawingRef.current = false;
  }, []);

  const setupCanvas = useCallback((canvas: HTMLCanvasElement, displayW: number, displayH: number) => {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = Math.floor(displayW * dpr);
    canvas.height = Math.floor(displayH * dpr);
    canvas.style.width = `${displayW}px`;
    canvas.style.height = `${displayH}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    sizeRef.current = { w: displayW, h: displayH };
    ctxRef.current = ctx;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, displayW, displayH);
    applyBrush();
    return ctx;
  }, [applyBrush]);

  useImperativeHandle(ref, () => ({
    clear: () => fillWhite(),
    hasDrawing: () => hasDrawingRef.current,
  }));

  useEffect(() => {
    applyBrush();
  }, [color, brushSize, eraser, applyBrush]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const container = containerRef.current as unknown as HTMLElement | null;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'crosshair';
    canvas.style.userSelect = 'none';
    container.replaceChildren(canvas);

    const resize = () => {
      const displayW = container.clientWidth || container.offsetWidth;
      if (displayW > 0) setupCanvas(canvas, displayW, height);
    };
    resize();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    ro?.observe(container);

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        const t = e.touches[0] ?? e.changedTouches[0];
        return { x: t.clientX - rect.left, y: t.clientY - rect.top };
      }
      const me = e as MouseEvent;
      return { x: me.clientX - rect.left, y: me.clientY - rect.top };
    };

    const drawLine = (x: number, y: number) => {
      const ctx = ctxRef.current;
      const last = lastRef.current;
      if (!ctx || !last) return;
      applyBrush();
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastRef.current = { x, y };
      hasDrawingRef.current = true;
      onStrokeRef.current?.();
    };

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      drawingRef.current = true;
      const p = getPos(e);
      lastRef.current = p;
      applyBrush();
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + 0.1, p.y + 0.1);
        ctx.stroke();
        hasDrawingRef.current = true;
        onStrokeRef.current?.();
      }
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!drawingRef.current) return;
      e.preventDefault();
      const p = getPos(e);
      drawLine(p.x, p.y);
    };

    const end = () => {
      drawingRef.current = false;
      lastRef.current = null;
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);
    canvas.addEventListener('touchcancel', end);

    return () => {
      ro?.disconnect();
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', move);
      canvas.removeEventListener('touchend', end);
      canvas.removeEventListener('touchcancel', end);
      ctxRef.current = null;
    };
  }, [height, setupCanvas, applyBrush]);

  if (Platform.OS !== 'web') {
    return (
      <View style={[styles.fallback, { height }]}>
        {/* web-only app */}
      </View>
    );
  }

  return <View ref={containerRef} style={[styles.container, { height }]} />;
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  fallback: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.grayLight,
  },
});
