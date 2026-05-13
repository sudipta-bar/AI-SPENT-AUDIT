import { create } from 'zustand';
import { DEFAULT_FORM } from '../lib/constants';

const STORAGE_KEY = 'ai-spend-audit-draft';
const RESULT_KEY = 'ai-spend-audit-result';
const TOKEN_KEY = 'ai-spend-audit-admin-token';

function safeRead(key, fallback) {
  if (typeof window === 'undefined') return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const useAuditStore = create((set, get) => ({
  draft: safeRead(STORAGE_KEY, DEFAULT_FORM),
  latestResult: safeRead(RESULT_KEY, null),
  adminToken: safeRead(TOKEN_KEY, ''),
  setDraft: (updater) =>
    set((state) => {
      const nextDraft = typeof updater === 'function' ? updater(state.draft) : updater;
      safeWrite(STORAGE_KEY, nextDraft);
      return { draft: nextDraft };
    }),
  resetDraft: () => {
    safeWrite(STORAGE_KEY, DEFAULT_FORM);
    set({ draft: DEFAULT_FORM });
  },
  setLatestResult: (result) => {
    safeWrite(RESULT_KEY, result);
    set({ latestResult: result });
  },
  setAdminToken: (token) => {
    safeWrite(TOKEN_KEY, token);
    set({ adminToken: token });
  },
  logoutAdmin: () => {
    safeWrite(TOKEN_KEY, '');
    set({ adminToken: '' });
  },
  hydrate: () => {
    set({
      draft: safeRead(STORAGE_KEY, DEFAULT_FORM),
      latestResult: safeRead(RESULT_KEY, null),
      adminToken: safeRead(TOKEN_KEY, '')
    });
  },
  getStateSnapshot: () => get()
}));
