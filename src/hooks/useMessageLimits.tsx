
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MessageLimits {
  canSend: boolean;
  currentCount: number;
  limitReached: boolean;
  loading: boolean;
}

export function useMessageLimits() {
  const { user } = useAuth();
  const [limits, setLimits] = useState<MessageLimits>({
    canSend: true,
    currentCount: 0,
    limitReached: false,
    loading: true
  });

  const checkLimits = async () => {
    if (!user) return;

    // Special exemption for test user
    if (user.email === 'maxstonthomas@gmail.com') {
      setLimits({
        canSend: true,
        currentCount: 0,
        limitReached: false,
        loading: false
      });
      return;
    }

    try {
      const { data, error } = await supabase.rpc('check_conversation_limit', {
        user_id: user.id
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const result = data[0];
        setLimits({
          canSend: result.can_send,
          currentCount: result.current_count,
          limitReached: result.limit_reached,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error checking message limits:', error);
      toast.error('Error checking message limits');
      setLimits(prev => ({ ...prev, loading: false }));
    }
  };

  const incrementCount = async () => {
    if (!user || user.email === 'maxstonthomas@gmail.com') return;

    try {
      const { error } = await supabase.rpc('increment_conversation_count', {
        user_id: user.id
      });

      if (error) throw error;
      await checkLimits();
    } catch (error) {
      console.error('Error incrementing message count:', error);
    }
  };

  const resetAfterAd = async () => {
    if (!user || user.email === 'maxstonthomas@gmail.com') return;

    try {
      const { error } = await supabase.rpc('reset_conversation_count_after_ad', {
        user_id: user.id
      });

      if (error) throw error;
      await checkLimits();
      toast.success('Message limit reset! You can send 10 more messages today.');
    } catch (error) {
      console.error('Error resetting message count:', error);
      toast.error('Error resetting message count');
    }
  };

  useEffect(() => {
    if (user) {
      checkLimits();
    } else {
      setLimits({
        canSend: false,
        currentCount: 0,
        limitReached: false,
        loading: false
      });
    }
  }, [user]);

  return {
    ...limits,
    incrementCount,
    resetAfterAd,
    refreshLimits: checkLimits
  };
}
