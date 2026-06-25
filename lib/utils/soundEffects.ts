/**
 * soundEffects.ts
 *
 * Programmatic sound effects using the Web Audio API.
 * Each toast event has a dedicated synthesis function that generates
 * sound on the fly — no audio files or HTML audio elements required.
 *
 * Usage: call playSoundEffect(event: ToastId) alongside dispatch(addToast())
 * in any component that fires a toast event.
 */

import { ToastId } from "@/types/toast";

let ctx: AudioContext | null = null;

// utilizing singleton pattern
const getAudioContext = (): AudioContext => {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

// Sound effect synthesis
const playQuestAccepted = (c: AudioContext) => {
  [
    [440, 0],
    [554, 0.12],
    [659, 0.24],
    [880, 0.38],
  ].forEach(([f, t]) => {
    const o = c.createOscillator(),
      g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.type = "triangle";
    o.frequency.setValueAtTime(f, c.currentTime + t);
    g.gain.setValueAtTime(0.25, c.currentTime + t);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t + 0.35);
    o.start(c.currentTime + t);
    o.stop(c.currentTime + t + 0.35);
  });
};

const playQuestCompleted = (c: AudioContext) => {
  [
    [523, 0],
    [659, 0.1],
    [784, 0.2],
    [1047, 0.32],
    [784, 0.5],
    [1047, 0.65],
  ].forEach(([f, t]) => {
    const o = c.createOscillator(),
      g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.type = "sine";
    o.frequency.setValueAtTime(f, c.currentTime + t);
    g.gain.setValueAtTime(0.28, c.currentTime + t);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t + 0.4);
    o.start(c.currentTime + t);
    o.stop(c.currentTime + t + 0.4);
  });
};

const playQuestFailed = (c: AudioContext) => {
  [277, 233, 196, 155, 110].forEach((f, i) => {
    const isLast = i === 4;
    const o = c.createOscillator(),
      g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.type = "sawtooth";
    o.frequency.setValueAtTime(f, c.currentTime + i * 0.1);
    g.gain.setValueAtTime(0.28, c.currentTime + i * 0.1);
    g.gain.exponentialRampToValueAtTime(
      0.001,
      c.currentTime + i * 0.1 + (isLast ? 0.7 : 0.1),
    );
    o.start(c.currentTime + i * 0.1);
    o.stop(c.currentTime + i * 0.1 + (isLast ? 0.7 : 0.1));
  });
};

const playItemGained = (c: AudioContext) => {
  [
    [1200, 0],
    [1500, 0.09],
    [1800, 0.18],
  ].forEach(([f, t]) => {
    const o = c.createOscillator(),
      g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.type = "sine";
    o.frequency.setValueAtTime(f, c.currentTime + t);
    g.gain.setValueAtTime(0.2, c.currentTime + t);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + t + 0.22);
    o.start(c.currentTime + t);
    o.stop(c.currentTime + t + 0.22);
  });
};

const playItemEquipped = (c: AudioContext) => {
  const snap = c.createOscillator(),
    snapG = c.createGain();
  snap.connect(snapG);
  snapG.connect(c.destination);
  snap.type = "square";
  snap.frequency.setValueAtTime(800, c.currentTime);
  snap.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.04);
  snapG.gain.setValueAtTime(0.3, c.currentTime);
  snapG.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.05);
  snap.start(c.currentTime);
  snap.stop(c.currentTime + 0.05);

  const ring = c.createOscillator(),
    ringG = c.createGain();
  ring.connect(ringG);
  ringG.connect(c.destination);
  ring.type = "sine";
  ring.frequency.setValueAtTime(1800, c.currentTime + 0.04);
  ringG.gain.setValueAtTime(0.18, c.currentTime + 0.04);
  ringG.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
  ring.start(c.currentTime + 0.04);
  ring.stop(c.currentTime + 0.5);
};

const playItemPurchased = (c: AudioContext) => {
  [880, 1100, 1320].forEach((freq, i) => {
    const o = c.createOscillator(),
      g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.type = "sine";
    o.frequency.setValueAtTime(freq, c.currentTime + i * 0.08);
    g.gain.setValueAtTime(0.3, c.currentTime + i * 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.08 + 0.3);
    o.start(c.currentTime + i * 0.08);
    o.stop(c.currentTime + i * 0.08 + 0.3);
  });
};

const playItemUsed = (c: AudioContext) => {
  const o = c.createOscillator(),
    g = c.createGain();
  o.connect(g);
  g.connect(c.destination);
  o.type = "sine";
  o.frequency.setValueAtTime(800, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(440, c.currentTime + 0.08);
  o.frequency.exponentialRampToValueAtTime(640, c.currentTime + 0.16);
  o.frequency.exponentialRampToValueAtTime(304, c.currentTime + 0.28);
  g.gain.setValueAtTime(0.0, c.currentTime);
  g.gain.linearRampToValueAtTime(0.22, c.currentTime + 0.04);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.32);
  o.start(c.currentTime);
  o.stop(c.currentTime + 0.32);
};

const playBattleDamageDealt = (c: AudioContext) => {
  const o = c.createOscillator(),
    g = c.createGain();
  o.connect(g);
  g.connect(c.destination);
  o.type = "sawtooth";
  o.frequency.setValueAtTime(900, c.currentTime);
  g.gain.setValueAtTime(0.3, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.22);
  o.start(c.currentTime);
  o.stop(c.currentTime + 0.22);
};

const playBattleDamageReceived = (c: AudioContext) => {
  [0, 0.22].forEach((offset) => {
    const o = c.createOscillator(),
      g = c.createGain();
    o.connect(g);
    g.connect(c.destination);
    o.type = "sine";
    o.frequency.setValueAtTime(300, c.currentTime + offset);
    o.frequency.exponentialRampToValueAtTime(
      160,
      c.currentTime + offset + 0.09,
    );
    o.frequency.exponentialRampToValueAtTime(
      240,
      c.currentTime + offset + 0.15,
    );
    o.frequency.exponentialRampToValueAtTime(
      100,
      c.currentTime + offset + 0.25,
    );
    g.gain.setValueAtTime(0.0, c.currentTime + offset);
    g.gain.linearRampToValueAtTime(0.25, c.currentTime + offset + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + offset + 0.28);
    o.start(c.currentTime + offset);
    o.stop(c.currentTime + offset + 0.28);
  });
};

const playSaveProgress = (c: AudioContext) => {
  const o = c.createOscillator(),
    g = c.createGain();
  o.connect(g);
  g.connect(c.destination);
  o.type = "sine";
  o.frequency.setValueAtTime(450, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(1100, c.currentTime + 0.6);
  g.gain.setValueAtTime(0.0, c.currentTime);
  g.gain.linearRampToValueAtTime(0.2, c.currentTime + 0.1);
  g.gain.setValueAtTime(0.2, c.currentTime + 0.45);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.75);
  o.start(c.currentTime);
  o.stop(c.currentTime + 0.75);
};

// Sound effect method switch
export const playSoundEffect = (event: ToastId) => {
  const audioCtx = getAudioContext();
  switch (event) {
    case "quest_accepted":
      playQuestAccepted(audioCtx);
      break;
    case "quest_completed":
      playQuestCompleted(audioCtx);
      break;
    case "quest_failed":
      playQuestFailed(audioCtx);
      break;
    case "item_gained":
      playItemGained(audioCtx);
      break;
    case "item_equipped":
      playItemEquipped(audioCtx);
      break;
    case "item_purchased":
      playItemPurchased(audioCtx);
      break;
    case "item_used":
      playItemUsed(audioCtx);
      break;
    case "battle_damage_dealt":
      playBattleDamageDealt(audioCtx);
      break;
    case "battle_damage_received":
      playBattleDamageReceived(audioCtx);
      break;
    case "save_progress":
      playSaveProgress(audioCtx);
      break;
  }
};
