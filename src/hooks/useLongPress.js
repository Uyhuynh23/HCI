import { useRef, useState, useCallback } from 'react';

/**
 * Custom hook that provides long-press gesture detection.
 * Returns pointer event handlers and a boolean indicating press state.
 *
 * @param {Function} onLongPress - Callback fired after holding for `threshold` ms
 * @param {Object}   options
 * @param {number}   options.threshold    - Hold duration in ms (default 400)
 * @param {number}   options.moveCancel   - Movement distance in px that cancels the gesture (default 10)
 */
export function useLongPress(onLongPress, { threshold = 400, moveCancel = 10 } = {}) {
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const cancelled = useRef(false);

  const clear = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
    setIsPressed(false);
  }, []);

  const onPointerDown = useCallback((e) => {
    cancelled.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsPressed(true);

    timerRef.current = setTimeout(() => {
      if (!cancelled.current) {
        onLongPress(e);
        clear();
      }
    }, threshold);
  }, [onLongPress, threshold, clear]);

  const onPointerMove = useCallback((e) => {
    if (!timerRef.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > moveCancel) {
      cancelled.current = true;
      clear();
    }
  }, [moveCancel, clear]);

  const onPointerUp = useCallback(() => {
    cancelled.current = true;
    clear();
  }, [clear]);

  const onPointerCancel = useCallback(() => {
    cancelled.current = true;
    clear();
  }, [clear]);

  return {
    isPressed,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}
