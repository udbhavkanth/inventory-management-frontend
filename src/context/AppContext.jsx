import { createContext, useContext, useMemo } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const value = useMemo(
    () => ({
      appName: 'Inventory Management System',
    }),
    []
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}
