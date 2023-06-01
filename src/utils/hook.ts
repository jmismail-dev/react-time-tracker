import { useState, useEffect } from "react";

enum TimerState {
  STOP,
  PAUSE,
  RUNNING
}

type TimerKeys = keyof typeof TimerState;

/**
 * Hook that runs a timer when Initialized
 */

export function useTimer() {
  const [timer, setTimer] = useState(0);
  const [state, setState] = useState(TimerState.RUNNING);

  useEffect(() => {
    const timer = setInterval(() => {
      if (state === TimerState.RUNNING) {
        setTimer((timer) => {
          return timer + 1000;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state]);

  /**
   * Button to Pause or Resume
   */
  const pauseOrResume = () => {
    if (state === TimerState.PAUSE || state === TimerState.STOP) {
      setState(TimerState.RUNNING);
    }

    if (state === TimerState.RUNNING) {
      setState(TimerState.PAUSE);
    }
  };

  /**
   * Stop Timer
   */

  const stopTimer = () => {
    if (state === TimerState.RUNNING || state === TimerState.PAUSE) {
      setState(TimerState.STOP);
      setTimer(0);
    }
  };

  return {
    timer: timer / 1000,
    pauseOrResume,
    timerState: TimerState[state] as TimerKeys,
    stopTimer
  };
}
