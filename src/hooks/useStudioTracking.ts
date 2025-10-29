import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';

export type ProfileType = 'creator' | 'enterprise' | 'agency' | 'unknown';

export interface TrackingSession {
  sessionId: string;
  profileType: ProfileType;
  entryPage: string;
  referrer: string;
  deviceType: string;
}

export interface ConversionEvent {
  sessionId: string;
  eventType: string;
  eventData?: Record<string, any>;
  pageSection?: string;
  ctaClicked?: string;
}

let globalSessionId: string | null = null;

export function generateSessionId(): string {
  if (globalSessionId) return globalSessionId;
  globalSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return globalSessionId;
}

export function useStudioTracking() {
  const sessionId = useRef(generateSessionId());
  const scrollDepthTracked = useRef(0);
  const timeStarted = useRef(Date.now());

  const initSession = useCallback(async (profileType: ProfileType = 'unknown') => {
    const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';

    try {
      await supabase.from('studio_sessions').insert({
        session_id: sessionId.current,
        profile_type: profileType,
        entry_page: window.location.pathname,
        referrer: document.referrer || 'direct',
        device_type: deviceType,
      });
    } catch (error) {
      console.error('Failed to init session:', error);
    }
  }, []);

  const trackEvent = useCallback(async (event: Omit<ConversionEvent, 'sessionId'>) => {
    try {
      await supabase.from('studio_conversion_events').insert({
        session_id: sessionId.current,
        event_type: event.eventType,
        event_data: event.eventData || {},
        page_section: event.pageSection,
        cta_clicked: event.ctaClicked,
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, []);

  const updateScrollDepth = useCallback(async (depth: number) => {
    if (depth > scrollDepthTracked.current) {
      scrollDepthTracked.current = depth;
      try {
        await supabase
          .from('studio_sessions')
          .update({ scroll_depth: Math.round(depth) })
          .eq('session_id', sessionId.current);
      } catch (error) {
        console.error('Failed to update scroll depth:', error);
      }
    }
  }, []);

  const updateTimeSpent = useCallback(async () => {
    const timeSpent = Math.floor((Date.now() - timeStarted.current) / 1000);
    try {
      await supabase
        .from('studio_sessions')
        .update({ time_spent_seconds: timeSpent })
        .eq('session_id', sessionId.current);
    } catch (error) {
      console.error('Failed to update time spent:', error);
    }
  }, []);

  const trackStudioView = useCallback(async (studioId: string) => {
    try {
      const { data: session } = await supabase
        .from('studio_sessions')
        .select('studios_viewed')
        .eq('session_id', sessionId.current)
        .single();

      if (session) {
        const studiosViewed = session.studios_viewed || [];
        if (!studiosViewed.includes(studioId)) {
          await supabase
            .from('studio_sessions')
            .update({
              studios_viewed: [...studiosViewed, studioId]
            })
            .eq('session_id', sessionId.current);
        }
      }
    } catch (error) {
      console.error('Failed to track studio view:', error);
    }
  }, []);

  const trackConversion = useCallback(async (value: number) => {
    try {
      await supabase
        .from('studio_sessions')
        .update({
          converted: true,
          conversion_value: value
        })
        .eq('session_id', sessionId.current);

      await trackEvent({
        eventType: 'conversion',
        eventData: { value }
      });
    } catch (error) {
      console.error('Failed to track conversion:', error);
    }
  }, [trackEvent]);

  const saveConfiguration = useCallback(async (config: {
    studioId: string;
    studioName: string;
    formulaId: string;
    formulaName: string;
    durationId: string;
    durationHours: number;
    selectedOptions: Record<string, number>;
    totalPrice: number;
    profileType?: ProfileType;
  }) => {
    try {
      const shareToken = `config_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const { data, error } = await supabase
        .from('studio_configurations_v2')
        .insert({
          session_id: sessionId.current,
          profile_type: config.profileType || 'unknown',
          studio_id: config.studioId,
          studio_name: config.studioName,
          formula_id: config.formulaId,
          formula_name: config.formulaName,
          duration_id: config.durationId,
          duration_hours: config.durationHours,
          selected_options: config.selectedOptions,
          total_price: config.totalPrice,
          is_saved: true,
          share_token: shareToken,
        })
        .select()
        .single();

      if (error) throw error;

      await trackEvent({
        eventType: 'configuration_saved',
        eventData: { configId: data.id }
      });

      return { success: true, shareToken, configId: data.id };
    } catch (error) {
      console.error('Failed to save configuration:', error);
      return { success: false };
    }
  }, [trackEvent]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      updateScrollDepth(scrollPercent);
    };

    const handleBeforeUnload = () => {
      updateTimeSpent();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    const interval = setInterval(updateTimeSpent, 30000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(interval);
      updateTimeSpent();
    };
  }, [updateScrollDepth, updateTimeSpent]);

  return {
    sessionId: sessionId.current,
    initSession,
    trackEvent,
    trackStudioView,
    trackConversion,
    saveConfiguration,
  };
}
