import React, { createContext, useContext, useState, useEffect } from 'react';

interface PrerollContextType {
  showPreroll: boolean;
  selectedService: string | null;
  handleServiceSelect: (serviceId: string) => void;
  handleSkipPreroll: () => void;
  resetPreroll: () => void;
}

const PrerollContext = createContext<PrerollContextType | undefined>(undefined);

const PREROLL_SESSION_KEY = 'le40_preroll_shown';

export function PrerollProvider({ children }: { children: React.ReactNode }) {
  const [showPreroll, setShowPreroll] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const hasSeenPreroll = sessionStorage.getItem(PREROLL_SESSION_KEY);
    if (!hasSeenPreroll) {
      setShowPreroll(true);
    }
  }, []);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowPreroll(false);
    sessionStorage.setItem(PREROLL_SESSION_KEY, 'true');
    console.log('Service selected:', serviceId);
  };

  const handleSkipPreroll = () => {
    setShowPreroll(false);
    sessionStorage.setItem(PREROLL_SESSION_KEY, 'true');
    console.log('Preroll skipped');
  };

  const resetPreroll = () => {
    sessionStorage.removeItem(PREROLL_SESSION_KEY);
    setShowPreroll(true);
    setSelectedService(null);
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