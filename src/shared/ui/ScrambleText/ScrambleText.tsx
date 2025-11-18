import React, { useCallback, useEffect, useRef, useState } from 'react';

type ChaosTextProps = {
   text: string;
   className?: string;
   perLetterRevealMs?: number[];
   minRevealMs?: number;
   maxRevealMs?: number;
   flipStepMs?: number;
   charPool?: string;
   retriggerWhileRunning?: boolean;

   smooth?: boolean;
   scaleFrom?: number;
   opacityFrom?: number;

   hideLastOnHover?: boolean;
   tailDelayMs?: number;

   /** Насколько тусклым будет последний символ (0..1) — работает только когда идёт скрамбл */
   trailOpacityTo?: number;
   /** Применять шлейф только к буквам, которые ещё не зафиксированы */
   trailOnlyOnActive?: boolean;
};

const DEFAULT_POOL = 'абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ';

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const ScrambleText: React.FC<ChaosTextProps> = ({
   text,
   className,
   perLetterRevealMs,
   minRevealMs = 300,
   maxRevealMs = 1200,
   flipStepMs = 35,
   charPool = DEFAULT_POOL,
   retriggerWhileRunning = false,

   smooth = false,
   scaleFrom = 1.05,
   opacityFrom = 0.85,

   hideLastOnHover = true,
   tailDelayMs = 0,

   trailOpacityTo = 0.7,
   trailOnlyOnActive = false,
}) => {
   const lettersRef = useRef<string[]>(Array.from(text));
   const [display, setDisplay] = useState<string[]>(lettersRef.current);

   const displayRef = useRef<string[]>(lettersRef.current);
   const lockedRef = useRef<boolean[]>(Array(lettersRef.current.length).fill(false));
   const revealAtRef = useRef<number[]>([]);
   const startAtRef = useRef<number>(0);
   const rafRef = useRef<number | null>(null);
   const runningRef = useRef(false);

   const lastFlipAtRef = useRef<number[]>([]);
   const lastNowRef = useRef(0);

   // хвост
   const tailCharRef = useRef<string | null>(null);
   const tailHiddenRef = useRef<boolean>(false);
   const tailAddedRef = useRef<boolean>(false);
   const tailTimeoutRef = useRef<number | null>(null);

   const randomChar = useCallback(() => {
      const i = Math.floor(Math.random() * charPool.length);
      return charPool[i];
   }, [charPool]);

   const buildRevealTimes = useCallback(() => {
      const L = lettersRef.current.length;
      const out = new Array(L);
      for (let i = 0; i < L; i++) {
         if (perLetterRevealMs && perLetterRevealMs[i] != null) {
            out[i] = Math.max(0, perLetterRevealMs[i]!);
         } else if (/\s/.test(lettersRef.current[i])) {
            out[i] = 0;
         } else {
            out[i] = Math.floor(minRevealMs + Math.random() * (maxRevealMs - minRevealMs));
         }
      }
      return out;
   }, [perLetterRevealMs, minRevealMs, maxRevealMs]);

   const cancelRaf = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
   };
   const clearTailTimeout = () => {
      if (tailTimeoutRef.current != null) clearTimeout(tailTimeoutRef.current);
      tailTimeoutRef.current = null;
   };

   const addTailNow = useCallback(() => {
      if (!tailHiddenRef.current || tailAddedRef.current || tailCharRef.current == null) return;
      tailHiddenRef.current = false;
      tailAddedRef.current = true;
      const next = [...displayRef.current, tailCharRef.current];
      displayRef.current = next;
      setDisplay(next);
   }, []);

   const tick = useCallback(
      (now: number) => {
         lastNowRef.current = now;
         const elapsed = now - startAtRef.current;

         let changed = false;
         let allLocked = true;
         const next = displayRef.current.slice();

         for (let i = 0; i < lettersRef.current.length; i++) {
            if (lockedRef.current[i]) continue;
            allLocked = false;

            const revealAt = revealAtRef.current[i] ?? 0;
            const t = clamp(revealAt === 0 ? 1 : elapsed / revealAt);
            const bias = smooth ? easeOutCubic(t) : 0;

            if (elapsed >= revealAt) {
               lockedRef.current[i] = true;
               next[i] = lettersRef.current[i];
               changed = true;
               continue;
            }

            const lastFlip = lastFlipAtRef.current[i] ?? 0;
            const factor = smooth ? 0.6 + 0.8 * (1 - bias) : 1;
            if (now - lastFlip >= flipStepMs * factor) {
               const showTarget = smooth && Math.random() < bias * 0.55;
               next[i] = showTarget ? lettersRef.current[i] : randomChar();
               lastFlipAtRef.current[i] = now;
               changed = true;
            }
         }

         if (changed) {
            displayRef.current = next;
            setDisplay(next);
         }

         if (!allLocked) {
            rafRef.current = requestAnimationFrame(tick);
         } else {
            if (hideLastOnHover && tailHiddenRef.current && !tailAddedRef.current) {
               if (tailDelayMs > 0) {
                  tailTimeoutRef.current = window.setTimeout(addTailNow, tailDelayMs);
               } else {
                  addTailNow();
               }
            }
            runningRef.current = false;
            cancelRaf();
         }
      },
      [flipStepMs, smooth, randomChar, hideLastOnHover, tailDelayMs, addTailNow],
   );

   const start = useCallback(() => {
      if (runningRef.current && !retriggerWhileRunning) return;

      cancelRaf();
      clearTailTimeout();

      runningRef.current = true;
      startAtRef.current = performance.now();

      const full = Array.from(text);
      const L = full.length;

      if (hideLastOnHover && L > 0) {
         tailCharRef.current = full[L - 1];
         lettersRef.current = full.slice(0, L - 1);
         tailHiddenRef.current = true;
         tailAddedRef.current = false;
      } else {
         tailCharRef.current = null;
         lettersRef.current = full.slice();
         tailHiddenRef.current = false;
         tailAddedRef.current = true;
      }

      // стартуем с хаоса
      displayRef.current = lettersRef.current.map(ch => (/\s/.test(ch) ? ch : randomChar()));
      setDisplay(displayRef.current);

      lockedRef.current = Array(lettersRef.current.length).fill(false);
      revealAtRef.current = buildRevealTimes();
      lastFlipAtRef.current = Array(lettersRef.current.length).fill(startAtRef.current - flipStepMs - 1);

      rafRef.current = requestAnimationFrame(tick);
   }, [text, hideLastOnHover, retriggerWhileRunning, buildRevealTimes, tick, randomChar, flipStepMs]);

   useEffect(() => {
      cancelRaf();
      clearTailTimeout();

      const full = Array.from(text);
      lettersRef.current = full;
      lockedRef.current = Array(lettersRef.current.length).fill(false);
      displayRef.current = full.slice();
      setDisplay(displayRef.current);

      tailCharRef.current = null;
      tailHiddenRef.current = false;
      tailAddedRef.current = true;

      runningRef.current = false;
   }, [text]);

   useEffect(
      () => () => {
         cancelRaf();
         clearTailTimeout();
      },
      [],
   );

   const renderChar = (ch: string, i: number) => {
      // прогресс сглаживания
      const now = lastNowRef.current || performance.now();
      const elapsed = now - startAtRef.current;
      const revealAt = revealAtRef.current[i] ?? 0;
      const t = smooth ? clamp(revealAt === 0 ? 1 : elapsed / revealAt) : 1;
      const k = 1 - t;

      const scale = smooth ? 1 + (scaleFrom - 1) * k : 1;
      const baseOpacity = smooth ? 1 - (1 - opacityFrom) * k : 1;

      // шлейф по индексу — ТОЛЬКО пока идёт скрамбл
      let trailFactor = 1;
      if (runningRef.current) {
         const N = displayRef.current.length || 1;
         const pos = N > 1 ? i / (N - 1) : 0;
         const target = lerp(1, clamp(trailOpacityTo, 0, 1), pos);

         // если нужно — применяем только к активным (не зафиксированным) буквам
         const apply = trailOnlyOnActive ? !lockedRef.current[i] : true;

         trailFactor = apply ? target : 1;
      }

      const finalOpacity = clamp(baseOpacity * trailFactor, 0, 1);

      return (
         <span
            key={i}
            style={{
               display: 'inline-block',
               transform: `scale(${scale})`,
               opacity: finalOpacity,
               transition: 'transform 80ms linear, opacity 80ms linear',
               willChange: 'transform, opacity',
            }}
         >
            {ch}
         </span>
      );
   };

   return (
      <span className={className} onMouseEnter={start}>
         {display.map(renderChar)}
      </span>
   );
};
