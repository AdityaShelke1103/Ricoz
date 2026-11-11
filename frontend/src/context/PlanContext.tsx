'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Plan } from '@/types';

interface PlanContextValue {
  plan: Plan;
  update: (patch: Partial<Plan>) => void;
  /** True once the visitor clicked "Request a quote for this plan". */
  requested: boolean;
  setRequested: (v: boolean) => void;
}

const PlanContext = createContext<PlanContextValue | null>(null);

const DEFAULT_PLAN: Plan = { propertyType: 'shopping-center', area: 250000, term: 3, scope: 'maintenance' };

/** Shares the planner's choices with the quote form further down the page. */
export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>(DEFAULT_PLAN);
  const [requested, setRequested] = useState(false);

  const value = useMemo<PlanContextValue>(
    () => ({ plan, update: (patch) => setPlan((p) => ({ ...p, ...patch })), requested, setRequested }),
    [plan, requested]
  );
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlan must be used inside <PlanProvider>');
  return ctx;
}
