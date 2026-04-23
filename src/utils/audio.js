/**
 * Play a short two-tone success chime using Web Audio API.
 * No external audio files needed.
 */
export function playSuccessSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // First tone (higher, 880 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.12);

    // Second tone (higher still, 1320 Hz) — starts after a tiny gap
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1320, ctx.currentTime + 0.08);
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.08);
    osc2.stop(ctx.currentTime + 0.22);

    // Cleanup context after sound finishes
    setTimeout(() => ctx.close(), 300);
  } catch (e) {
    // Silently fail — audio is non-critical
  }
}
