export const save = (k: string, v: any) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ }
};
export const load = <T = any>(k: string, fallback: T | null = null): T | null => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch { return fallback; }
};
