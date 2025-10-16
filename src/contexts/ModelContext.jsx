import React, { createContext, useContext, useCallback } from 'react';
import { generate as proxyGenerate } from '../utils/modelProxy';

const ModelContext = createContext(null);

export function ModelProvider({ children }) {
  // generateText calls the proxy; if no model provided, proxy uses DEFAULT_MODEL (claude-sonnet-3.5)
  const generate = useCallback(async ({ prompt, model, options } = {}) => {
    const payload = { prompt, model, options };
    const res = await proxyGenerate({ prompt, model, options });
    return res;
  }, []);

  return (
    <ModelContext.Provider value={{ generate }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const ctx = useContext(ModelContext);
  if (!ctx) throw new Error('useModel must be used within ModelProvider');
  return ctx;
}

export default ModelContext;
