'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface StadiumSoundsContextType {
  playGolSound: () => void;
  playSilbatoSound: () => void;
  playMultitudSound: () => void;
  playPatadaSound: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const StadiumSoundsContext = createContext<StadiumSoundsContextType | undefined>(undefined);

export const useStadiumSounds = () => {
  const context = useContext(StadiumSoundsContext);
  if (!context) {
    throw new Error('useStadiumSounds must be used within a StadiumSoundsProvider');
  }
  return context;
};

interface StadiumSoundsProviderProps {
  children: React.ReactNode;
}

export const StadiumSoundsProvider: React.FC<StadiumSoundsProviderProps> = ({ children }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Inicializar AudioContext
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createOscillator = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume * (isMuted ? 0 : 1),
      audioContextRef.current.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContextRef.current.currentTime + duration
    );

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const createNoise = (duration: number, cutoffFrequency: number = 200) => {
    if (!audioContextRef.current) return;

    const bufferSize = audioContextRef.current.sampleRate * duration;
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
    const output = buffer.getChannelData(0);

    // Generar ruido blanco
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioContextRef.current.createBufferSource();
    const gainNode = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();

    whiteNoise.buffer = buffer;
    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // Configurar filtro lowpass
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoffFrequency, audioContextRef.current.currentTime);

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume * 0.1 * (isMuted ? 0 : 1),
      audioContextRef.current.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContextRef.current.currentTime + duration
    );

    whiteNoise.start(audioContextRef.current.currentTime);
    whiteNoise.stop(audioContextRef.current.currentTime + duration);
  };

  const playGolSound = () => {
    if (!audioContextRef.current) return;

    // Sonido de gol: 440Hz → 880Hz → 440Hz (1.5s)
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      880,
      audioContextRef.current.currentTime + 0.75
    );
    oscillator.frequency.exponentialRampToValueAtTime(
      440,
      audioContextRef.current.currentTime + 1.5
    );

    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume * (isMuted ? 0 : 1),
      audioContextRef.current.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContextRef.current.currentTime + 1.5
    );

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 1.5);
  };

  const playSilbatoSound = () => {
    // Silbato: Sine wave 1000Hz (0.3s)
    createOscillator(1000, 0.3, 'sine');
  };

  const playMultitudSound = () => {
    // Multitud: Ruido blanco filtrado lowpass 200Hz (2s)
    createNoise(2, 200);
  };

  const playPatadaSound = () => {
    // Patada: Sawtooth 60Hz → 20Hz (0.2s)
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(60, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      20,
      audioContextRef.current.currentTime + 0.2
    );

    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      volume * 0.5 * (isMuted ? 0 : 1),
      audioContextRef.current.currentTime + 0.01
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContextRef.current.currentTime + 0.2
    );

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.2);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const value: StadiumSoundsContextType = {
    playGolSound,
    playSilbatoSound,
    playMultitudSound,
    playPatadaSound,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  };

  return (
    <StadiumSoundsContext.Provider value={value}>
      {children}
    </StadiumSoundsContext.Provider>
  );
};
