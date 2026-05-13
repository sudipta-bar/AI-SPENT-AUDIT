import { useEffect } from 'react';
import { useAuditStore } from '../store/useAuditStore';

export function useHydrateStore() {
  const hydrate = useAuditStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);
}
