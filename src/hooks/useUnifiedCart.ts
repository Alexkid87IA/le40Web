import { useContext } from 'react';
import { UnifiedCartContext } from '../contexts/UnifiedCartContext';

export const useUnifiedCart = () => {
  const context = useContext(UnifiedCartContext);

  if (!context) {
    throw new Error('useUnifiedCart must be used within UnifiedCartProvider');
  }

  return context;
};
