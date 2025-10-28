import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PrerollContextType {
  showPreroll: boolean;
  selectedService: string | null;
  handleServiceSelect: (serviceId: string) => void;
  handleSkipPreroll: () => void;
  resetPreroll: () => void;
}

const PrerollContext = createContext<PrerollContextType | undefined>(undefined);

const PREROLL_SESSION_KEY = 'le40_preroll_shown';
const SESSION_ID_KEY = 'le40_session_id';

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getOrCreateSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export function PrerollProvider({ children }: { children: React.ReactNode }) {
  const [showPreroll, setShowPreroll] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [viewStartTime, setViewStartTime] = useState<number>(0);

  useEffect(() => {
    const hasSeenPreroll = sessionStorage.getItem(PREROLL_SESSION_KEY);
    if (!hasSeenPreroll) {
      setShowPreroll(true);
      setViewStartTime(Date.now());
    }
  }, []);

  const logSelection = async (serviceId: string, interactionData?: Record<string, any>) => {
    try {
      const sessionId = getOrCreateSessionId();
      const timestamp = new Date().toISOString();

      await supabase.from('preroll_selections').insert({
        session_id: sessionId,
        selected_service: serviceId,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        timestamp: timestamp,
        interaction_data: interactionData || null
      });
    } catch (error) {
      console.error('Error logging preroll selection:', error);
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    const timeSpent = viewStartTime ? Date.now() - viewStartTime : 0;

    setSelectedService(serviceId);
    setShowPreroll(false);
    sessionStorage.setItem(PREROLL_SESSION_KEY, 'true');

    logSelection(serviceId, {
      time_spent_ms: timeSpent,
      interaction_type: 'selection'
    });
  };

  const handleSkipPreroll = () => {
    const timeSpent = viewStartTime ? Date.now() - viewStartTime : 0;

    setShowPreroll(false);
    sessionStorage.setItem(PREROLL_SESSION_KEY, 'true');

    logSelection('skip', {
      time_spent_ms: timeSpent,
      interaction_type: 'skip'
    });
  };

  const resetPreroll = () => {
    sessionStorage.removeItem(PREROLL_SESSION_KEY);
    setShowPreroll(true);
    setSelectedService(null);
    setViewStartTime(Date.now());
  };

  return (
    <PrerollContext.Provider
      value={{
        showPreroll,
        selectedService,
        handleServiceSelect,
        handleSkipPreroll,
        resetPreroll
      }}
    >
      {children}
    </PrerollContext.Provider>
  );
}

export function usePreroll() {
  const context = useContext(PrerollContext);
  if (context === undefined) {
    throw new Error('usePreroll must be used within a PrerollProvider');
  }
  return context;
}
