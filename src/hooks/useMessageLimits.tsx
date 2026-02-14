import { useState } from 'react';

interface MessageLimits {
  canSend: boolean;
  currentCount: number;
  limitReached: boolean;
  loading: boolean;
}

export function useMessageLimits() {
  const [limits] = useState<MessageLimits>({
    canSend: true,
    currentCount: 0,
    limitReached: false,
    loading: false
  });

  const incrementCount = async () => {};
  const resetAfterAd = async () => {};
  const checkLimits = async () => {};

  return {
    ...limits,
    incrementCount,
    resetAfterAd,
    refreshLimits: checkLimits
  };
}
