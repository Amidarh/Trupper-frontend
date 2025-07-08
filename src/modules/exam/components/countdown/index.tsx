'use client';

import { useState, useEffect } from 'react';
import { useAltStore } from '@/lib/zustand/userStore';

// Define the props interface for the Countdown component
interface CountdownProps {
  onCountdownEnd?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ onCountdownEnd }) => {
  const examDuration = useAltStore((state) => state.examDuration);
  const examState = useAltStore((state) => state.examState);
  const setExamDuration = useAltStore((state) => state.setExamDuration);
  // Retrieve initial time from localStorage or use duration * 60
  const initialTime: number =
    examDuration ?? (Number(examState?.duration) || 0) * 60;

  // State with explicit types
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [color, setColor] = useState<string>('#699b3f');

  // Effect for countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft: number) => {
        if (prevTimeLeft <= 0) {
          clearInterval(interval);
          if (onCountdownEnd) {
            onCountdownEnd();
          }
          setExamDuration(0);
          return 0;
        }
        const newTimeLeft = prevTimeLeft - 1;
        console.log({ newTimeLeft });
        setExamDuration(newTimeLeft);
        return newTimeLeft;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [onCountdownEnd]);

  // Effect for updating color based on time left
  useEffect(() => {
    if (timeLeft < (Number(examState?.duration) * 60) / 3) {
      setColor('red');
    } else if (timeLeft < (Number(examState?.duration) * 60) / 2) {
      setColor('orange');
    } else {
      setColor('var(--primary-color)');
    }
  }, [timeLeft, examDuration]);

  // Format time function with explicit parameter and return type
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div>
      <h3 style={{ color }}>{formatTime(timeLeft)}</h3>
    </div>
  );
};
