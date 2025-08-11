import { useCallback, useRef } from 'react';

export function useCelebration() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const celebrationRef = useRef<boolean>(false);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playKickSound = useCallback(() => {
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [getAudioContext]);

  const playGolSound = useCallback(() => {
    const audioContext = getAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Melodía de celebración
    const frequencies = [523, 659, 784, 1047]; // C, E, G, C
    const duration = 0.15;

    frequencies.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      osc.start(audioContext.currentTime + index * duration);
      osc.stop(audioContext.currentTime + index * duration + duration);
    });
  }, [getAudioContext]);

  const triggerCelebration = useCallback(() => {
    celebrationRef.current = true;
    setTimeout(() => {
      celebrationRef.current = false;
    }, 3000);
  }, []);

  const isCelebrating = useCallback(() => {
    return celebrationRef.current;
  }, []);

  return {
    playKickSound,
    playGolSound,
    triggerCelebration,
    isCelebrating
  };
}
